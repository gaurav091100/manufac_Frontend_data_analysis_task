import React from "react";
import data from "../data/cropData.json";
import { getMaxMinProductionPerYear, getAverageMetricsPerCrop } from "../utils/cropUtils";
import CropTable from "./CropTable";

// Main AggregatedTables component
const AggregatedTables: React.FC = () => {
  const tableAData = getMaxMinProductionPerYear(data);
  const tableBData = getAverageMetricsPerCrop(data);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px",padding:"10px" }}>
      <div>
        
          <CropTable
            title="Crop Production Overview by Year"
            headers={["Year", "Crop with Maximum Production", "Crop with Minimum Production"]}
            rows={tableAData}
            columns={["year", "maxCrop", "minCrop"]}
          />
       
      </div>
      <div>
        
          <CropTable
            title="Average Metrics per Crop (1950-2020)"
            headers={["Crop", "Average Yield (Kg/Ha)", "Average Cultivation Area (Ha)"]}
            rows={tableBData}
            columns={["crop", "avgYield", "avgArea"]}
          />
        
      </div>
    </div>
  );
};

export default AggregatedTables;
