export type Core = {
  SKU: string;
  "Core Area": number; // in mm^2
  "Window Area": number; // in mm^2
  "Area Product": number; // in mm^3
  "Mean Turn Length": number; // in mm
};

export const coreList: Core[] = [
  {
    SKU: "ETD-29/16/10",
    "Core Area": 76,
    "Window Area": 95,
    "Area Product": 14440,
    "Mean Turn Length": 53,
  },
  {
    SKU: "ETD 34/17/11",
    "Core Area": 97.1,
    "Window Area": 123,
    "Area Product": 23800,
    "Mean Turn Length": 60,
  },
  {
    SKU: "ETD 39/20/13",
    "Core Area": 123,
    "Window Area": 177,
    "Area Product": 44420,
    "Mean Turn Length": 69,
  },
  {
    SKU: "ETD 44/22/15",
    "Core Area": 173,
    "Window Area": 214,
    "Area Product": 74000,
    "Mean Turn Length": 77,
  },
  {
    SKU: "ETD 49/25/16",
    "Core Area": 221,
    "Window Area": 273,
    "Area Product": 115200,
    "Mean Turn Length": 85,
  },
  {
    SKU: "ETD 54/28/19",
    "Core Area": 280,
    "Window Area": 316,
    "Area Product": 176736,
    "Mean Turn Length": 96,
  },
  {
    SKU: "ETD 59/31/22",
    "Core Area": 368,
    "Window Area": 366,
    "Area Product": 27000,
    "Mean Turn Length": 106,
  },
];
