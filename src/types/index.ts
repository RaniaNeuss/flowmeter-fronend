// export type RfpFormData = {
//   id?: number;
//   item: string;
//   typeOfRfp: string;
//   rfpReference: string;
//   xrefRfpList?: string;

//   inletToWwTreatment?: boolean;
//   outletFromWwTreatment?: boolean;
//   terminalPumpingOutput?: boolean;
//   wastewaterTankerDischarge?: boolean;
//   tankerFillPoint?: boolean;
//   incidentReporting?: boolean;

//   approvalExpiry?: string;
//   approvedReapplication?: string;
//   appealApplication?: string;
//   appealExtensionApplication?: string;
//   appealExtensionDecision?: string;
//   panelAppealMeeting?: string;
//   panelAppealDecisionDate?: string;
//   doeAppealDecisionDate?: string;
//   panelAppealFinalResult?: string;

//   generalInfo?: {
//     rfpNo?: string;
//     licensee?: string;
//     address?: string;
//     phone?: string;
//     fax?: string;
//     reportDate?: string;
//     reportRef?: string;
//   };

//   startDate?: string;
//   completionDate?: string;
//   panelMeetingDate?: string;
//   panelDecisionDate?: string;

//   locationType?: {
//     type: string;
//   };

//   location?: {
//     address: string;
//     lat?: number;
//     lng?: number;
//   };

//   flowMeasurement?: {
//     cumulativeFlow?: boolean;
//     fifteenMinFlow?: boolean;
//     eventRecording?: boolean;
//   };

//   flowMonitoring?: {
//     inventory?: {
//       make?: string;
//       model?: string;
//       // ...extend as needed
//     };
//     installation?: {
//       meterInstallDate?: string;
//       meterRemovalDate?: string;
//     };
//     maintenance?: {
//       maintenanceRef?: boolean;
//       preventativeScheduleRef?: boolean;
//     };
//   };

//   data?: {
//     notes?: string;
//   };

//   maf?: {
//     approved: boolean;
//   };

//   attachments?: {
//     type: string;
//     filePath: string;
//     uploadedAt?: string;
//   }[];
// };



export type RfpFormData = {
  id?: number;
  item: string;
  typeOfRfp: string;
  rfpReference: string;
  xrefRfpList?: string;

  inletToWwTreatment?: boolean;
  outletFromWwTreatment?: boolean;
  terminalPumpingOutput?: boolean;
  wastewaterTankerDischarge?: boolean;
  tankerFillPoint?: boolean;
  incidentReporting?: boolean;

  approvalExpiry?: string;
  approvedReapplication?: string;
  appealApplication?: string;
  appealExtensionApplication?: string;
  appealExtensionDecision?: string;
  panelAppealMeeting?: string;
  panelAppealDecisionDate?: string;
  doeAppealDecisionDate?: string;
  panelAppealFinalResult?: string;

  generalInfo?: {
    rfpNo?: string;
    licensee?: string;
    address?: string;
    contactNumber?: string;
    faxNumber?: string;
    reportDate?: Date;
    reportRef?: string;
    responsiblePosition?: string;
    responsibleDepartment?: string;
    fmIdScada?: string;
    fmIdSwsAssetNo?: string;
    siteManagerName?: string;
  };

  startDate?: string;
  completionDate?: string;
  panelMeetingDate?: string;
  panelDecisionDate?: string;

  locationType?: {
    type: string;
  };

  location?: {
    address: string;
    lat?: number;
    lng?: number;
    region?: string;
    stpcc?: string;
    description?: string;
    coordinateN?: number;
    coordinateE?: number;
    siteDrawingRef?: string;
    flowDiagramRef?: string;
  };

  flowMeasurement?: {
    cumulativeFlow?: boolean;
    fifteenMinFlow?: boolean;
    eventRecording?: boolean;
  };

  flowMonitoring?: {
    inventory?: {
      make?: string;
      model?: string;
      type?: string;
      serial?: string;
      fmSize?: string;
      pipelineSize?: string;
      velocityRange?: string;
      accuracyReading?: string;
      accuracyFullScale?: string;
      readingMethod?: string;
    };
    installation?: {
      meterInstallDate?: string;
      meterRemovalDate?: string;
      hydraulicUpstream?: string;
      hydraulicDownstream?: string;
      environmental?: string;
      onSiteTesting?: string;
      safetyRisks?: string;
      securityOfLocation?: string;
    };
    maintenance?: {
      maintenanceRef?: boolean;
      preventativeScheduleRef?: boolean;
    };
  };

  data?: {
    manualMethod?: string;
    dataLogger?: string;
    remoteReading?: string;
    outstationDetails?: string;
    storageDetails?: string;
    ubReport?: string;
    ubValue?: string;
    dataManagementProcedure?: string;
  };

  maf?: {
    detail?: string;
    sopRef?: string;
    selectionSummary?: string;
  };

  attachments?: {
    type: string;
    filePath: string;
    uploadedAt?: string;
  }[];
};


export interface RfpDateField {
  name: keyof RfpFormData;
  label: string;
  type?: 'text';
}
export interface DatePickerProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  startYear?: number;
  endYear?: number;
}
