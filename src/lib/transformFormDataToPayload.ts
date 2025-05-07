import { RfpFormData } from '@/../schema/rfp-schema';

export function transformFormDataToPayload(data: RfpFormData) {
  return {
    typeOfRfp: data.typeOfRfp,
    RfpReference: data.rfpReference,
    startDate: data.startDate || null,
    completionDate: data.completionDate || null,
    panelMeetingDate: data.panelAppealMeeting || null,
    panelDecisionDate: data.panelAppealDecisionDate || null,

    locationType: {
      create: {
        type: data.locationType?.type || '',
      },
    },

    generalInfo: {
      create: {
        licensee: data.generalInfo?.licensee || '',
        address: data.generalInfo?.address || '',
        contactNumber: data.generalInfo?.contactNumber || '',
        faxNumber: data.generalInfo?.faxNumber || '',
        reportRef: data.generalInfo?.reportRef || '',
        reportDate: data.generalInfo?.reportDate || '',
        responsiblePosition: data.generalInfo?.responsiblePosition || '',
        responsibleDepartment: data.generalInfo?.responsibleDepartment || '',
        fmIdScada: '',
        fmIdSwsAssetNo: '',
        siteManagerName: '',
      },
    },

    location: {
      create: {
        region: data.location?.region || '',
        stpcc: data.location?.stpcc || '',
        description: data.location?.description || '',
        coordinateN: data.location?.coordinateN || 0,
        coordinateE: data.location?.coordinateE || 0,
        siteDrawingRef: '',
        flowDiagramRef: '',
      },
    },

    flowMeasurement: {
      create: {
        cumulativeFlow: data.flowMeasurement?.cumulativeFlow || false,
        fifteenMinFlow: data.flowMeasurement?.fifteenMinFlow || false,
        eventRecording: data.flowMeasurement?.eventRecording || false,
      },
    },

    data: {
      create: {
        manualMethod: data.data?.manualMethod || '',
        dataLogger: data.data?.dataLogger || '',
        remoteReading: data.data?.remoteReading || '',
        outstationDetails: data.data?.outstationDetails || '',
        storageDetails: data.data?.storageDetails || '',
        ubReport: data.data?.ubReport || '',
        ubValue: data.data?.ubValue || '',
        dataManagementProcedure: data.data?.dataManagementProcedure || '',
      },
    },

    maf: {
      create: {
        detail: data.maf?.detail || '',
        sopRef: data.maf?.sopRef || '',
        selectionSummary: data.maf?.selectionSummary || '',
      },
    },
  };
}
