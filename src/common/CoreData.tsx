export type Core = {
  sku: string;
  coreArea: number; // in mm^2
  windowArea: number; // in mm^2
  areaProduct: number; // in mm^3
  meanTurnLength: number; // in mm
};

export const coreList: Core[] = [
  {
    sku: "ETD-29/16/10",
    coreArea: 76,
    windowArea: 95,
    areaProduct: 14440,
    meanTurnLength: 53,
  },
  {
    sku:"ETD-30/15/7",
    coreArea: 60,
    windowArea: 90,
    areaProduct: 5400,
    meanTurnLength: 57,
  },
  {
    sku: "ETD 34/17/11",
    coreArea: 97.1,
    windowArea: 123,
    areaProduct: 23800,
    meanTurnLength: 60,
  },
  {
    sku: "ETD 39/20/13",
    coreArea: 123,
    windowArea: 177,
    areaProduct: 44420,
    meanTurnLength: 69,
  },
  {
    sku: "ETD 44/22/15",
    coreArea: 173,
    windowArea: 214,
    areaProduct: 74000,
    meanTurnLength: 77,
  },
  {
    sku: "ETD 49/25/16",
    coreArea: 221,
    windowArea: 273,
    areaProduct: 115200,
    meanTurnLength: 85,
  },
  {
    sku: "ETD 54/28/19",
    coreArea: 280,
    windowArea: 316,
    areaProduct: 176736,
    meanTurnLength: 96,
  },
  {
    sku: "ETD 59/31/22",
    coreArea: 368,
    windowArea: 366,
    areaProduct: 27000,
    meanTurnLength: 106,
  },
];
