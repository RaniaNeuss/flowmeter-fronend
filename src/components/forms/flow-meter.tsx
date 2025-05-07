
'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Stepper, StepperItem, StepperSeparator, StepperIndicator, StepperTrigger } from '@/components/ui/stepper';
import { Eye, X } from 'lucide-react';
import { StepOne } from './step-one';
import { StepTwo } from './step-two';
import { StepThree } from './step-three';
import { StepFour } from './step-four';
import { StepFiveFlowmeterDetails } from './StepFiveFlowmeterDetails';
import { StepSixFlowmeterInventory } from './StepSixFlowmeterInventory';
import { StepSevenFlowmeterInstallation } from './StepSevenFlowmeterInstallation';
import { StepEightDataCollection } from './StepEightDataCollection';
import { RfpSchema, RfpFormData, defaultRfpFormData  } from '@/../schema/rfp-schema'; 
import { Resolver } from 'react-hook-form';
import { transformFormDataToPayload } from '@/lib/transformFormDataToPayload';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';


interface FlowMeterFormWizardProps {
  id?: string;
}



interface GraphPreviewProps {
  onClose: () => void;
  liveData: RfpFormData;
}

const GraphPreview = ({ onClose, liveData }: GraphPreviewProps) => {
  const formatDate = (date?: string | Date) => {
    if (!date) return 'N/A';
    const parsed = typeof date === 'string' ? new Date(date) : date;
    return parsed.toLocaleDateString();
  };

  const renderSection = (label: string, value?: string | number | boolean) => (
    <div>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="text-sm">{value !== undefined && value !== '' ? value.toString() : 'N/A'}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md p-6 sticky top-6 relative space-y-6 overflow-y-auto max-h-[90vh]"
    >
      <button
        onClick={onClose}
        title="Hide insights"
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X size={18} />
      </button>
      <h3 className="text-lg font-semibold mb-3">📋 Full Form Preview</h3>

      <div className="space-y-4">
        {/* Sections */}
        {renderSection('Item', liveData.item)}
        {renderSection('Type of RFP', liveData.typeOfRfp)}
        {renderSection('RFP Reference', liveData.rfpReference)}
        {renderSection('XRef RFP List', liveData.xrefRfpList)}

        {/* General Info */}
        <div className="pt-4">
          <h4 className="font-semibold">General Info</h4>
          {renderSection('Licensee', liveData.generalInfo?.licensee)}
          {renderSection('Address', liveData.generalInfo?.address)}
          {renderSection('Contact Number', liveData.generalInfo?.contactNumber)}
          {renderSection('Fax Number', liveData.generalInfo?.faxNumber)}
          {renderSection('Report Ref', liveData.generalInfo?.reportRef)}
          {renderSection('Report Date', formatDate(liveData.generalInfo?.reportDate))}
          {renderSection('Responsible Position', liveData.generalInfo?.responsiblePosition)}
          {renderSection('Responsible Department', liveData.generalInfo?.responsibleDepartment)}
        </div>

        {/* Other sections you had stay same... */}
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function FlowMeterFormWizard({ id }: FlowMeterFormWizardProps) {
  const { toast } = useToast();
  // const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showGraph, setShowGraph] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [1, 2, 3, 4, 5, 6, 7, 8];
  const stepTitles = [
    'Basic Information',
    'General Info',
    'Location & Measurement',
    'Monitoring Details',
    'Flowmeter Details',
    'Flowmeter Inventory',
    'Flowmeter Installation & Maintenance',
    'Data Collection & Exchange',
  ];
  const methods = useForm<RfpFormData>({
    resolver: zodResolver(RfpSchema) as Resolver<RfpFormData>,
        defaultValues: defaultRfpFormData,
    mode: 'onSubmit',
  });

  const handleFinalSubmit: SubmitHandler<RfpFormData> = async (data) => {
    try {
      const payload = transformFormDataToPayload(data);
      console.log('🚀 Final Payload:', payload);
      const token = localStorage.getItem('token'); // Or from auth context
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/rfp/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.message || 'Failed to submit');
  
      setIsSubmitted(true);
      setTimeout(() => {
        methods.reset(defaultRfpFormData);
        localStorage.removeItem('rfpDraft');
        setCurrentStep(1);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast({
        title: '❌ Submission Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred.',
        variant: 'destructive',
      });
    }
  };
  

  const handleNextStep = () => {
    if (currentStep < steps.length) setCurrentStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= steps.length) setCurrentStep(step);
  };

  const saveDraft = () => {
    const data = methods.getValues();
    localStorage.setItem('rfpDraft', JSON.stringify(data));
    toast({ title: 'Draft Saved', description: 'You can continue later.' });
  };

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    methods.reset(defaultRfpFormData);
    localStorage.removeItem('rfpDraft');
    setCurrentStep(1);
    setShowResetConfirm(false);
  };
  

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem('rfpDraft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <StepOne />;
      case 2: return <StepTwo />;
      case 3: return <StepThree />;
      case 4: return <StepFour />;
      case 5: return <StepFiveFlowmeterDetails />;
      case 6: return <StepSixFlowmeterInventory />;
      case 7: return <StepSevenFlowmeterInstallation />;
      case 8: return <StepEightDataCollection />;
      default: return null;
    }
  };

  return (
    <>
      <Toaster />
      <FormProvider {...methods}>
        <section className="bg-gradient-to-b from-white to-muted/40 py-12 min-h-screen">
          <motion.div
            key={showGraph ? 'with-panel' : 'centered'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full px-4 md:px-8 lg:px-16 ${
              showGraph
                ? 'grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10'
                : 'flex justify-center'
            }`}
          >
            {/* Left Side Form */}
            <motion.div
              layout
              transition={{ duration: 0.4 }}
              className={`${showGraph ? 'w-full' : 'w-full max-w-3xl'}`}
            >
              {!isSubmitted ? (
                <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const isValid = await methods.trigger();
                
                  if (!isValid) {
                    toast({
                      title: '⚠️ Incomplete Form',
                      description: 'Please fill all required fields before proceeding.',
                      variant: 'destructive',
                    });
                    return;
                  }
                
                  const data = methods.getValues();
                
                  if (currentStep < steps.length) {
                    handleNextStep();
                  } else {
                    handleFinalSubmit(data);
                  }
                }}
                
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && currentStep < steps.length) {
                      e.preventDefault();
                      handleNextStep();
                    }
                  }}
                  className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-10"
                >
                  {/* Title */}
                  <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold">{id ? 'Edit Flow Meter RFP' : 'Create New Flow Meter RFP'}</h1>
                    <p className="text-muted-foreground text-sm">{stepTitles[currentStep - 1]}</p>
                  </div>

                  {/* Progress bar */}
                  <Progress value={(currentStep / steps.length) * 100} className="mb-4" title="Progress" />

                  {/* Stepper */}
                  <Stepper value={currentStep} onValueChange={handleStepChange} className="w-full bg-muted/60 rounded-lg p-3 shadow">
                    {steps.map((step) => (
                      <StepperItem key={step} step={step} className="flex-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <StepperTrigger onClick={() => handleStepChange(step)}>
                                <StepperIndicator />
                              </StepperTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Step {step}: {stepTitles[step - 1]}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {step < steps.length && <StepperSeparator />}
                      </StepperItem>
                    ))}
                  </Stepper>

                  {/* Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-muted/50 border p-6 rounded-lg shadow-sm"
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between pt-4 gap-4">
                    <Button type="button" variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
                      Previous
                    </Button>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {!showGraph && (
                        <Button variant="outline" onClick={() => setShowGraph(true)}>
                          <Eye size={16} className="mr-2" /> Show Panel
                        </Button>
                      )}
                      <Button type="button" variant="ghost" onClick={saveDraft}>Save Draft</Button>
                      <Button type="button" variant="ghost" onClick={() => setShowResetConfirm(true)}>
  Reset
</Button>

                      {currentStep < steps.length ? (
                        <Button type="button" onClick={handleNextStep}>Next</Button>
                      ) : (
                        <Button type="submit">Submit Final</Button>
                      )}
                    </div>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center h-full text-center p-10"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="text-green-500 text-5xl"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-3xl font-bold mt-4 mb-2">Submission Successful!</h2>
                  <p className="text-muted-foreground mb-4">Thank you for your submission.</p>
                </motion.div>
              )}
            </motion.div>

            {/* Right Side: Preview */}
            <AnimatePresence>
              {showGraph && (
                <GraphPreview onClose={() => setShowGraph(false)} liveData={methods.watch()} />
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Summary Dialog */}
        <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Reset the form?</AlertDialogTitle>
      <AlertDialogDescription>
        This will clear all entered data and delete the saved draft. This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirmReset}>Reset Anyway</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      </FormProvider>
    </>
  );
}
