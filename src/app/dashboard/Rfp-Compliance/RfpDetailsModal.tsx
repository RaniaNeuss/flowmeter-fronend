'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RfpFormData } from '@/types';

interface Props {
  rfp: RfpFormData;
  onClose: () => void;
}

export function RfpDetailsModal({ rfp, onClose }: Props) {
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-primary">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
      <hr className="my-4" />
    </div>
  );

  const Field = ({ label, value }: { label: string; value?: string | number | boolean | Date | null }) => {
    const formattedValue =
      value instanceof Date ? value.toLocaleDateString() : value !== undefined && value !== null ? value : '—';
    return (
      <div>
        <div className="text-muted-foreground text-sm">{label}</div>
        <div className="font-medium">{formattedValue}</div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>RFP Details - {rfp.rfpReference}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 p-4">
          {/* General RFP Info */}
          <Section title="General RFP Information">
            <Field label="Type of RFP" value={rfp.typeOfRfp} />
            <Field label="Start Date" value={rfp.startDate} />
            <Field label="Completion Date" value={rfp.completionDate} />
            <Field label="Panel Meeting Date" value={rfp.panelMeetingDate} />
            <Field label="Panel Decision Date" value={rfp.panelDecisionDate} />
            <Field label="Location Type" value={rfp.locationType?.type} />
          </Section>

          {/* General Info */}
          {rfp.generalInfo && (
            <Section title="Licensee General Information">
              <Field label="Licensee Name" value={rfp.generalInfo.licensee} />
              <Field label="Address" value={rfp.generalInfo.address} />
              <Field label="Contact Number" value={rfp.generalInfo?.contactNumber}/>
              <Field label="Fax Number" value={rfp.generalInfo.faxNumber} />
              <Field label="Report Date" value={rfp.generalInfo.reportDate} />
              <Field label="Report Reference" value={rfp.generalInfo.reportRef} />
              <Field label="Responsible Position" value={rfp.generalInfo.responsiblePosition} />
              <Field label="Department" value={rfp.generalInfo.responsibleDepartment} />
              <Field label="SCADA ID" value={rfp.generalInfo.fmIdScada} />
              <Field label="SWS Asset Number" value={rfp.generalInfo.fmIdSwsAssetNo} />
              <Field label="Site Manager Name" value={rfp.generalInfo.siteManagerName} />
            </Section>
          )}

          {/* Location Info */}
          {rfp.location && (
            <Section title="Location Information">
              <Field label="Region" value={rfp.location.region} />
              <Field label="STPCC" value={rfp.location.stpcc} />
              <Field label="Description" value={rfp.location.description} />
              <Field label="N Coordinate" value={rfp.location.coordinateN} />
              <Field label="E Coordinate" value={rfp.location.coordinateE} />
              <Field label="Site Drawing Ref" value={rfp.location.siteDrawingRef} />
              <Field label="Flow Diagram Ref" value={rfp.location.flowDiagramRef} />
            </Section>
          )}

          {/* Flow Measurement */}
          {rfp.flowMeasurement && (
            <Section title="Flow Measurement">
              <Field label="Cumulative Flow" value={rfp.flowMeasurement.cumulativeFlow ? "✔" : "✖"} />
              <Field label="15-Minute Flow" value={rfp.flowMeasurement.fifteenMinFlow ? "✔" : "✖"} />
              <Field label="Event Recording" value={rfp.flowMeasurement.eventRecording ? "✔" : "✖"} />
            </Section>
          )}

          {/* Flow Meter Inventory */}
          {rfp.flowMonitoring?.inventory && (
            <Section title="Flow Meter Inventory">
              <Field label="Make" value={rfp.flowMonitoring.inventory.make} />
              <Field label="Type" value={rfp.flowMonitoring.inventory.type} />
              <Field label="Model" value={rfp.flowMonitoring.inventory.model} />
              <Field label="Serial" value={rfp.flowMonitoring.inventory.serial} />
              <Field label="FM Size" value={rfp.flowMonitoring.inventory.fmSize} />
              <Field label="Pipeline Size" value={rfp.flowMonitoring.inventory.pipelineSize} />
              <Field label="Velocity Range" value={rfp.flowMonitoring.inventory.velocityRange} />
              <Field label="Accuracy Reading" value={rfp.flowMonitoring.inventory.accuracyReading} />
              <Field label="Accuracy Full Scale" value={rfp.flowMonitoring.inventory.accuracyFullScale} />
              <Field label="Reading Method" value={rfp.flowMonitoring.inventory.readingMethod} />
            </Section>
          )}

          {/* Installation Info */}
          {rfp.flowMonitoring?.installation && (
            <Section title="Installation Information">
              <Field label="Meter Install Date" value={rfp.flowMonitoring.installation.meterInstallDate} />
              <Field label="Meter Removal Date" value={rfp.flowMonitoring.installation.meterRemovalDate} />
              <Field label="Hydraulic Upstream" value={rfp.flowMonitoring.installation.hydraulicUpstream} />
              <Field label="Hydraulic Downstream" value={rfp.flowMonitoring.installation.hydraulicDownstream} />
              <Field label="Environmental Conditions" value={rfp.flowMonitoring.installation.environmental} />
              <Field label="On-Site Testing" value={rfp.flowMonitoring.installation.onSiteTesting} />
              <Field label="Safety Risks" value={rfp.flowMonitoring.installation.safetyRisks} />
              <Field label="Security of Location" value={rfp.flowMonitoring.installation.securityOfLocation} />
            </Section>
          )}

          {/* Maintenance Info */}
          {rfp.flowMonitoring?.maintenance && (
            <Section title="Maintenance Information">
              <Field label="Maintenance Reference" value={rfp.flowMonitoring.maintenance.maintenanceRef ? "✔" : "✖"} />
              <Field label="Preventative Maintenance Schedule" value={rfp.flowMonitoring.maintenance.preventativeScheduleRef ? "✔" : "✖"} />
            </Section>
          )}

          {/* Data Info */}
          {rfp.data && (
            <Section title="Data Collection and Management">
              <Field label="Manual Method" value={rfp.data.manualMethod} />
              <Field label="Data Logger" value={rfp.data.dataLogger} />
              <Field label="Remote Reading" value={rfp.data.remoteReading} />
              <Field label="Outstation Details" value={rfp.data.outstationDetails} />
              <Field label="Storage Details" value={rfp.data.storageDetails} />
              <Field label="UB Report" value={rfp.data.ubReport} />
              <Field label="UB Value" value={rfp.data.ubValue} />
              <Field label="Data Management Procedure" value={rfp.data.dataManagementProcedure} />
            </Section>
          )}

          {/* MAF Info */}
          {rfp.maf && (
            <Section title="Metrological Assurance Framework (MAF)">
              <Field label="Detail" value={rfp.maf.detail} />
              <Field label="SOP Reference" value={rfp.maf.sopRef} />
              <Field label="Selection Summary" value={rfp.maf.selectionSummary} />
            </Section>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
