// Helper function to round numbers to 3 decimal places
const roundToThree = (num: number): number => Math.round(num * 1000) / 1000;

/**
 * Interface for crop data.
 */
interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
  }
  
  /**
   * Interface for max and min crop production by year.
   */
  interface MaxMinProduction {
    year: number;
    maxCrop: string;
    minCrop: string;
  }
  
  /**
   * Interface for average metrics (yield and area) per crop.
   */
  interface AverageMetrics {
    crop: string;
    avgYield: number;
    avgArea: number;
  }


  /**
 * Function to get the maximum and minimum crop production per year
 * @param data - The crop data
 * @returns An array of objects containing year, maxCrop, and minCrop
 */

export const getMaxMinProductionPerYear = (data: CropData[]): MaxMinProduction[] => {
  const groupedByYear = data?.reduce(
    (
      acc: Record<number, { crop: string; production: number }[]>,
      item: CropData
    ) => {
      const year = parseInt(
        item["Year"].toString().match(/\d+/)?.[0] || "0",
        10
      );
      const production = Number(item["Crop Production (UOM:t(Tonnes))"]) || 0;

      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({ crop: item["Crop Name"], production });
      return acc;
    },
    {}
  );

  return Object.entries(groupedByYear).map(([year, crops]) => {
    // Find the maximum and minimum production
    const maxProduction = Math.max(...crops.map((crop) => crop.production));
    const minProduction = Math.min(...crops.map((crop) => crop.production));

    // Filter crops with the maximum and minimum production
    const maxCrops = crops
      .filter((crop) => crop.production === maxProduction)
      .map((crop) => crop.crop)
      .join(", ");
    const minCrops = crops
      .filter((crop) => crop.production === minProduction)
      .map((crop) => crop.crop)
      .join(", ");

    return { year: parseInt(year), maxCrop: maxCrops, minCrop: minCrops };
  });
};

/**
 * Function to calculate average yield and cultivation area per crop
 * @param data - The crop data
 * @returns An array of objects containing crop, avgYield, and avgArea
 */

export const getAverageMetricsPerCrop = (data: CropData[]): AverageMetrics[] => {
  const groupedByCrop = data.reduce(
    (
      acc: Record<
        string,
        { totalYield: number; totalArea: number; count: number }
      >,
      item: CropData
    ) => {
      const crop = item["Crop Name"];
      const yieldValue =
        Number(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
      const area =
        Number(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

      if (!acc[crop]) {
        acc[crop] = { totalYield: 0, totalArea: 0, count: 0 };
      }
      acc[crop].totalYield += yieldValue;
      acc[crop].totalArea += area;
      acc[crop].count += 1;
      return acc;
    },
    {}
  );

  return Object.entries(groupedByCrop).map(([crop, metrics]) => {
    return {
      crop,
      avgYield: roundToThree(metrics.totalYield / metrics.count),
      avgArea: roundToThree(metrics.totalArea / metrics.count),
    };
  });
};
