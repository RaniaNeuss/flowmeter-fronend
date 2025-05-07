import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { RfpFormData } from '@/../schema/rfp-schema';

interface GraphPreviewProps {
  onClose: () => void;
  data: RfpFormData;
}

export const GraphPreview = ({ onClose, data }: GraphPreviewProps) => {
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  };

  const renderItem = (label: string, value: string | number | boolean | undefined | null) => (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'Not specified'}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      className="sticky top-6 max-h-[90vh] overflow-y-auto w-full bg-white rounded-xl shadow-md p-6"
    >
      <button onClick={onClose} title="Hide insights" className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        <X size={18} />
      </button>

      <Card className="border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl">📋 Review All RFP Data</CardTitle>
        </CardHeader>

        <CardContent className="px-0 space-y-6">

          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderItem('Item', data.item)}
              {renderItem('Type of RFP', data.typeOfRfp)}
              {renderItem('RFP Reference', data.rfpReference)}
              {renderItem('Cross Ref RFP List', data.xrefRfpList)}
              {renderItem('Start Date', formatDate(data.startDate))}
              {renderItem('Completion Date', formatDate(data.completionDate))}
              {renderItem('Panel Meeting Date', formatDate(data.panelMeetingDate))}
              {renderItem('Panel Decision Date', formatDate(data.panelDecisionDate))}
            </div>
          </section>

          <Separator />

          {/* General Info */}
          {data.generalInfo && (
            <section>
              <h3 className="text-lg font-semibold mb-2">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderItem('RFP No', data.generalInfo.rfpNo)}
                {renderItem('Licensee', data.generalInfo.licensee)}
                {renderItem('Address', data.generalInfo.address)}
                {renderItem('Contact Number', data.generalInfo.contactNumber)}
                {renderItem('Fax Number', data.generalInfo.faxNumber)}
                {renderItem('Report Ref', data.generalInfo.reportRef)}
                {renderItem('Report Date', formatDate(data.generalInfo.reportDate))}
                {renderItem('Responsible Position', data.generalInfo.responsiblePosition)}
                {renderItem('Responsible Department', data.generalInfo.responsibleDepartment)}
                {renderItem('SCADA ID', data.generalInfo.fmIdScada)}
                {renderItem('SWS Asset No', data.generalInfo.fmIdSwsAssetNo)}
                {renderItem('Site Manager Name', data.generalInfo.siteManagerName)}
              </div>
            </section>
          )}

          <Separator />

          {/* Location */}
          {data.location && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderItem('Region', data.location.region)}
                {renderItem('STPCC', data.location.stpcc)}
                {renderItem('Description', data.location.description)}
                {renderItem('Coordinate N', data.location.coordinateN)}
                {renderItem('Coordinate E', data.location.coordinateE)}
                {renderItem('Site Drawing Ref', data.location.siteDrawingRef)}
                {renderItem('Flow Diagram Ref', data.location.flowDiagramRef)}
              </div>
            </section>
          )}

          <Separator />

          {/* Flow Measurement */}
          {data.flowMeasurement && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Flow Measurement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderItem('Cumulative Flow', data.flowMeasurement.cumulativeFlow)}
                {renderItem('15 Min Flow', data.flowMeasurement.fifteenMinFlow)}
                {renderItem('Event Recording', data.flowMeasurement.eventRecording)}
              </div>
            </section>
          )}

          <Separator />

          {/* Flow Monitoring: Inventory, Installation, Maintenance */}
          {data.flowMonitoring?.inventory && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Flowmeter Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderItem('Make', data.flowMonitoring.inventory.make)}
                {renderItem('Type', data.flowMonitoring.inventory.type)}
                {renderItem('Model', data.flowMonitoring.inventory.model)}
                {renderItem('Serial', data.flowMonitoring.inventory.serial)}
                {renderItem('FM Size', data.flowMonitoring.inventory.fmSize)}
                {renderItem('Pipeline Size', data.flowMonitoring.inventory.pipelineSize)}
                {renderItem('Velocity Range', data.flowMonitoring.inventory.velocityRange)}
                {renderItem('Accuracy Reading', data.flowMonitoring.inventory.accuracyReading)}
                {renderItem('Accuracy Full Scale', data.flowMonitoring.inventory.accuracyFullScale)}
                {renderItem('Reading Method', data.flowMonitoring.inventory.readingMethod)}
              </div>
            </section>
          )}

          {data.flowMonitoring?.installation && (
            <>
              <Separator />
              <section>
                <h3 className="text-lg font-semibold mb-2">Installation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderItem('Meter Install Date', formatDate(data.flowMonitoring.installation.meterInstallDate))}
                  {renderItem('Meter Removal Date', formatDate(data.flowMonitoring.installation.meterRemovalDate))}
                  {renderItem('Hydraulic Upstream', data.flowMonitoring.installation.hydraulicUpstream)}
                  {renderItem('Hydraulic Downstream', data.flowMonitoring.installation.hydraulicDownstream)}
                  {renderItem('Environmental', data.flowMonitoring.installation.environmental)}
                  {renderItem('On-Site Testing', data.flowMonitoring.installation.onSiteTesting)}
                  {renderItem('Safety Risks', data.flowMonitoring.installation.safetyRisks)}
                  {renderItem('Security of Location', data.flowMonitoring.installation.securityOfLocation)}
                </div>
              </section>
            </>
          )}

          {data.flowMonitoring?.maintenance && (
            <>
              <Separator />
              <section>
                <h3 className="text-lg font-semibold mb-2">Maintenance Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderItem('Maintenance Ref', data.flowMonitoring.maintenance.maintenanceRef)}
                  {renderItem('Preventative Schedule Ref', data.flowMonitoring.maintenance.preventativeScheduleRef)}
                </div>
              </section>
            </>
          )}

          <Separator />

          {/* Data */}
          {data.data && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Data Collection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderItem('Manual Method', data.data.manualMethod)}
                {renderItem('Data Logger', data.data.dataLogger)}
                {renderItem('Remote Reading', data.data.remoteReading)}
                {renderItem('Outstation Details', data.data.outstationDetails)}
                {renderItem('Storage Details', data.data.storageDetails)}
                {renderItem('UB Report', data.data.ubReport)}
                {renderItem('UB Value', data.data.ubValue)}
                {renderItem('Data Management Procedure', data.data.dataManagementProcedure)}
              </div>
            </section>
          )}

          <Separator />

          {/* MAF */}
          {data.maf && (
            <section>
              <h3 className="text-lg font-semibold mb-2">MAF (Metrological Assurance Framework)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderItem('Detail', data.maf.detail)}
                {renderItem('SOP Ref', data.maf.sopRef)}
                {renderItem('Selection Summary', data.maf.selectionSummary)}
              </div>
            </section>
          )}

          <Separator />

          {/* Attachments */}
          {data.attachments && data.attachments.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-2">Attachments</h3>
              <ul className="list-disc pl-4">
                {data.attachments.map((att, i) => (
                  <li key={i}>
                    {att.type} — <a href={att.filePath} target="_blank" className="text-blue-600 underline">View File</a>
                    {att.uploadedAt && <> (Uploaded: {formatDate(att.uploadedAt)})</>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
