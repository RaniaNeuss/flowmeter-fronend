import { z } from 'zod';

// 🔹 Enums
export const TypeOfRfpEnum = z.enum(['Inlet', 'Outlet', 'Monitoring', 'Discharge']);
export const LocationTypeEnum = z.enum(['Industrial', 'Residential', 'Commercial', 'Other']);

// 🔹 General Info Section Schema
export const GeneralInfoSchema = z.object({
  rfpNo: z.string().optional(),
  licensee: z.string().min(1, 'Licensee is required'),
  address: z.string().min(1, 'Address is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  faxNumber: z.string().optional(),
  reportDate: z.preprocess(
    (val) => {
      if (typeof val === 'string' || val instanceof Date || typeof val === 'number') {
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return undefined;
    },
    z.date({ required_error: 'Report date is required' })
  ),
  reportRef: z.string().min(1, 'Report ref is required'),
  responsiblePosition: z.string().optional(),
  responsibleDepartment: z.string().optional(),
  fmIdScada: z.string().optional(),
  fmIdSwsAssetNo: z.string().optional(),
  siteManagerName: z.string().optional(),
});

// 🔹 Inventory & Maintenance Schemas
const InventorySchema = z.object({
  make: z.string().optional(),
  type: z.string().optional(),
  model: z.string().optional(),
  serial: z.string().optional(),
  fmSize: z.string().optional(),
  pipelineSize: z.string().optional(),
  velocityRange: z.string().optional(),
  accuracyReading: z.string().optional(),
  accuracyFullScale: z.string().optional(),
  readingMethod: z.string().optional(),
});

const InstallationSchema = z.object({
  meterInstallDate: z.string(),
  meterRemovalDate: z.string(),
  hydraulicUpstream: z.string().optional(),
  hydraulicDownstream: z.string().optional(),
  environmental: z.string().optional(),
  onSiteTesting: z.string().optional(),
  safetyRisks: z.string().optional(),
  securityOfLocation: z.string().optional(),
});

const MaintenanceSchema = z.object({
  maintenanceRef: z.boolean(),
  preventativeScheduleRef: z.boolean(),
});

// 🔹 Full RFP Form Schema
export const RfpSchema = z.object({
  item: z.string().optional(),
  typeOfRfp: TypeOfRfpEnum,
  rfpReference: z.string().min(1, 'RFP Reference is required'),
  xrefRfpList: z.string().optional(),

  inletToWwTreatment: z.boolean().optional(),
  outletFromWwTreatment: z.boolean().optional(),
  terminalPumpingOutput: z.boolean().optional(),
  wastewaterTankerDischarge: z.boolean().optional(),
  tankerFillPoint: z.boolean().optional(),
  incidentReporting: z.boolean().optional(),

  approvalExpiry: z.string().optional(),
  approvedReapplication: z.string().optional(),
  appealApplication: z.string().optional(),
  appealExtensionApplication: z.string().optional(),
  appealExtensionDecision: z.string().optional(),
  panelAppealMeeting: z.string().optional(),
  panelAppealDecisionDate: z.string().optional(),
  doeAppealDecisionDate: z.string().optional(),
  panelAppealFinalResult: z.string().optional(),

  generalInfo: GeneralInfoSchema,

  startDate: z.string().optional(),
  completionDate: z.string().optional(),
  panelMeetingDate: z.string().optional(),
  panelDecisionDate: z.string().optional(),

  locationType: z
    .object({
      type: LocationTypeEnum,
    })
    .optional(),

  location: z
    .object({
      region: z.string().optional(),
      stpcc: z.string().optional(),
      description: z.string().optional(),
      coordinateN: z.number().optional(),
      coordinateE: z.number().optional(),
      siteDrawingRef: z.string().optional(),
      flowDiagramRef: z.string().optional(),
    })
    .optional(),

    flowMeasurement: z
    .object({
      cumulativeFlow: z.boolean(),
      fifteenMinFlow: z.boolean(),
      eventRecording: z.boolean(),
      selectedOption: z.enum(['cumulativeFlow', 'fifteenMinFlow', 'eventRecording']).optional(),
    })
    .optional(),
  

  flowMonitoring: z
    .object({
      inventory: InventorySchema.optional(),
      installation: InstallationSchema.optional(),
      maintenance: MaintenanceSchema.optional(),
    })
    .optional(),

  data: z
    .object({
      manualMethod: z.string().optional(),
      dataLogger: z.string().optional(),
      remoteReading: z.string().optional(),
      outstationDetails: z.string().optional(),
      storageDetails: z.string().optional(),
      ubReport: z.string().optional(),
      ubValue: z.string().optional(),
      dataManagementProcedure: z.string().optional(),
    })
    .optional(),

  maf: z
    .object({
      detail: z.string().optional(),
      sopRef: z.string().optional(),
      selectionSummary: z.string().optional(),
    })
    .optional(),

  attachments: z
    .array(
      z.object({
        type: z.string(),
        filePath: z.string(),
        uploadedAt: z.string().optional(),
      })
    )
    .optional(),
});

export type RfpFormData = z.infer<typeof RfpSchema>;

export const defaultRfpFormData: RfpFormData = {
  item: '',
  typeOfRfp: 'Inlet',
  rfpReference: '',
  xrefRfpList: '',

  inletToWwTreatment: false,
  outletFromWwTreatment: false,
  terminalPumpingOutput: false,
  wastewaterTankerDischarge: false,
  tankerFillPoint: false,
  incidentReporting: false,

  approvalExpiry: '',
  approvedReapplication: '',
  appealApplication: '',
  appealExtensionApplication: '',
  appealExtensionDecision: '',
  panelAppealMeeting: '',
  panelAppealDecisionDate: '',
  doeAppealDecisionDate: '',
  panelAppealFinalResult: '',

  generalInfo: {
    rfpNo: '',
    licensee: '',
    address: '',
    contactNumber: '',
    faxNumber: '',
    reportDate: new Date(),
    reportRef: '',
    responsiblePosition: '',
    responsibleDepartment: '',
    fmIdScada: '',
    fmIdSwsAssetNo: '',
    siteManagerName: '',
  },

  locationType: { type: 'Industrial' },
  location: {
    region: '',
    stpcc: '',
    description: '',
    coordinateN: undefined,
    coordinateE: undefined,
    siteDrawingRef: '',
    flowDiagramRef: '',
  },

  flowMeasurement: {
    cumulativeFlow: false,
    fifteenMinFlow: false,
    eventRecording: false,
    selectedOption: undefined,
  },
  

  flowMonitoring: {
    inventory: {
      make: '',
      type: '',
      model: '',
      serial: '',
      fmSize: '',
      pipelineSize: '',
      velocityRange: '',
      accuracyReading: '',
      accuracyFullScale: '',
      readingMethod: '',
    },
    installation: {
      meterInstallDate: '',
      meterRemovalDate: '',
      hydraulicUpstream: '',
      hydraulicDownstream: '',
      environmental: '',
      onSiteTesting: '',
      safetyRisks: '',
      securityOfLocation: '',
    },
    maintenance: {
      maintenanceRef: false,
      preventativeScheduleRef: false,
    },
  },

  data: {
    manualMethod: '',
    dataLogger: '',
    remoteReading: '',
    outstationDetails: '',
    storageDetails: '',
    ubReport: '',
    ubValue: '',
    dataManagementProcedure: '',
  },

  maf: {
    detail: '',
    sopRef: '',
    selectionSummary: '',
  },

  attachments: [],
};
