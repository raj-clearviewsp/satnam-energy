// Data behind "Trying to Make Sense of Southeast Asia's Energy Outlooks".
// Harmonised from each outlook's own published tables. Values are for 2025, 2030, 2035, 2040, 2045, 2050.
// The second string marks points interpolated between published years (1 = interpolated).

export const YEARS = [2025, 2030, 2035, 2040, 2045, 2050];

export const OUTLOOKS = [
  { key: 'iea', name: 'IEA 2026', short: 'IEA', color: 'var(--azure)' },
  { key: 'ace', name: 'ACE 9th', short: 'ACE', color: 'var(--rust)' },
  { key: 'eria', name: 'ERIA 2025', short: 'ERIA', color: 'var(--teal)' },
  { key: 'aperc', name: 'APERC 9th', short: 'APERC', color: 'var(--brass)' },
  { key: 'dnv', name: 'DNV 2026', short: 'DNV', color: 'var(--plum)' },
  { key: 'aps', name: 'IEA pledges', short: 'IEA pledges', color: 'var(--azure)', dashed: true },
];

export const MEASURES = [
  { m: 'fe', name: 'Final energy', unit: 'EJ', pts: false },
  { m: 'ind', name: 'Industry', unit: 'EJ', pts: false },
  { m: 'tra', name: 'Transport', unit: 'EJ', pts: false },
  { m: 'bld', name: 'Buildings and other', unit: 'EJ', pts: false },
  { m: 'el', name: 'Electricity generation', unit: 'TWh', pts: false },
  { m: 'esh', name: 'Electricity share', unit: '%', pts: true },
  { m: 'int', name: 'Energy per dollar of GDP', unit: 'MJ per dollar', pts: false },
  { m: 'gas', name: 'Gas supply', unit: 'EJ', pts: false },
  { m: 'gpg', name: 'Gas-fired power', unit: 'TWh', pts: false },
  { m: 'co2', name: 'CO2', unit: 'Mt', pts: false },
];

export const PATHS = {
  fe: {
    iea: [[21.56, 24.45, 27.73, 30.05, 32.05, 34.17], '110010'],
    ace: [[21.88, 27.47, 33.37, 40.54, 49.25, 54.96], '001101'],
    eria: [[21.14, 26.08, 30.58, 35.85, 41.61, 48.29], '101010'],
    aperc: [[21.8, 26.29, 30.09, 33.44, 36.3, 38.75], '000000'],
    dnv: [[22.62, 26.64, 29.53, 31.83, 33.23, 33.84], '000000'],
    aps: [[21.42, 23.52, 25.83, 26.73, 27.12, 27.51], '110010'],
  },
  ind: {
    iea: [[9.389, 10.74, 12.28, 13.29, 14.09, 14.93], '110010'],
    ace: [[9.851, 12.39, 15.56, 19.53, 24.53, 28.59], '001101'],
    eria: [[9.742, 11.95, 13.77, 15.87, 18.27, 21.03], '101010'],
    aperc: [[10.58, 13.19, 15.46, 17.54, 19.46, 21.21], '000000'],
    dnv: [[10.12, 11.89, 12.87, 13.51, 13.84, 13.82], '000000'],
    aps: [[9.355, 10.51, 11.81, 12.39, 12.58, 12.77], '110010'],
  },
  tra: {
    iea: [[6.473, 7.182, 7.969, 8.512, 8.93, 9.368], '110010'],
    ace: [[7.222, 9.923, 11.76, 13.93, 16.51, 16.59], '001101'],
    eria: [[6.46, 8.314, 10.06, 12.17, 14.5, 17.29], '101010'],
    aperc: [[6.75, 7.63, 8.303, 8.755, 8.973, 9.02], '000000'],
    dnv: [[7.327, 8.652, 9.524, 10.06, 10.12, 9.786], '000000'],
    aps: [[6.432, 6.91, 7.424, 7.353, 7.03, 6.721], '110010'],
  },
  bld: {
    iea: [[5.697, 6.527, 7.478, 8.252, 9.027, 9.874], '110010'],
    ace: [[4.811, 5.162, 6.026, 7.034, 8.21, 9.557], '001101'],
    eria: [[4.926, 5.824, 6.747, 7.816, 8.831, 9.977], '101010'],
    aperc: [[4.476, 5.475, 6.327, 7.15, 7.872, 8.522], '000000'],
    dnv: [[5.17, 6.099, 7.141, 8.264, 9.274, 10.23], '000000'],
    aps: [[5.632, 6.096, 6.597, 6.988, 7.489, 8.025], '110010'],
  },
  el: {
    iea: [[1521, 1884, 2334, 2729, 3102, 3525], '110010'],
    ace: [[1883, 2180, 2911, 3886, 5179, 6901], '001010'],
    eria: [[1446, 1865, 2222, 2648, 3072, 3565], '101010'],
    aperc: [[1416, 1921, 2367, 2853, 3322, 3776], '000000'],
    dnv: [[1420, 1872, 2437, 3068, 3775, 4498], '000000'],
    aps: [[1527, 1932, 2445, 3050, 3733, 4569], '110010'],
  },
  esh: {
    iea: [[23.21, 25.2, 27.37, 29.48, 31.42, 33.49], '110010'],
    ace: [[20.97, 20.31, 20.82, 21.33, 21.86, 22.73], '001101'],
    aperc: [[21.16, 23.86, 26.05, 28.14, 30.07, 31.93], '000000'],
    dnv: [[20.9, 22.34, 25.33, 28.6, 32.47, 36.74], '000000'],
    aps: [[23.42, 26.63, 30.27, 35.43, 40.68, 46.72], '110010'],
  },
  int: {
    iea: [[1.681, 1.557, 1.441, 1.328, 1.234, 1.147], '110010'],
    ace: [[2.561, 2.544, 2.479, 2.416, 2.354, 2.193], '101101'],
    eria: [[5.734, 5.65, 5.213, 4.81, 4.474, 4.163], '101010'],
    dnv: [[1.858, 1.748, 1.636, 1.545, 1.443, 1.335], '000000'],
    aps: [[1.671, 1.498, 1.343, 1.181, 1.044, 0.9232], '110010'],
  },
  gas: {
    iea: [[6.604, 7.505, 8.53, 8.815, 9.162, 9.522], '110010'],
    ace: [[6.682, 7.951, 10.24, 13.2, 17, 21.91], '001010'],
    eria: [[6.306, 8.081, 9.692, 11.62, 13.48, 15.65], '101010'],
    aperc: [[7.909, 9.93, 11.7, 13.24, 14.82, 16.43], '000000'],
    dnv: [[7.472, 9.273, 10.6, 10.79, 10.22, 9.661], '000000'],
    aps: [[6.469, 6.629, 6.793, 6.123, 4.905, 3.929], '110010'],
  },
  gpg: {
    iea: [[395.9, 492.2, 612, 660, 701.2, 745], '110010'],
    ace: [[615.5, 621.9, 1034, 1720, 2426, 3423], '001010'],
    eria: [[474.8, 679.4, 836.4, 1030, 1201, 1400], '101010'],
    aperc: [[543.8, 783.6, 960.3, 1109, 1270, 1441], '000000'],
    dnv: [[425.2, 603.6, 721.5, 730.5, 687, 644.4], '000000'],
    aps: [[385.2, 417.7, 453, 409, 266.8, 174], '110010'],
  },
  co2: {
    iea: [[2006, 2199, 2411, 2486, 2524, 2563], '110010'],
    ace: [[2938, 3195, 3623, 4109, 4616, 5185], '001010'],
    eria: [[1742, 2202, 2613, 3101, 3607, 4196], '101010'],
    aperc: [[2027, 2447, 2720, 2948, 3212, 3364], '000000'],
    dnv: [[2189, 2380, 2501, 2415, 2223, 1969], '000000'],
    aps: [[1971, 1981, 1991, 1681, 1280, 975], '110010'],
  },
};

// Fuel colours from the Satnam design kit.
export const FUELS = {
  gas: { name: 'Gas', color: '#C08A2F' },
  coal: { name: 'Coal and oil', color: '#4E4A45' },
  hydro: { name: 'Hydro', color: '#41799F' },
  wind: { name: 'Wind', color: '#79B0AA' },
  solar: { name: 'Solar', color: '#DFB33C' },
  low: { name: 'Other low-carbon', color: '#7E9150' },
  rest: { name: 'Not split by source', color: 'transparent', open: true },
};
export const FUEL_ORDER = ['gas', 'coal', 'hydro', 'wind', 'solar', 'low', 'rest'];

// Generation in 2050 by source (TWh), with 2024 for reference.
export const MIX_CASES = [
  { k: 'act', name: '2024 actual', sub: 'IEA Annex A', base: false, v: { gas: 379, coal: 708, hydro: 225, wind: 18, solar: 44, low: 83 } },
  { k: 'aps', name: 'IEA 2026', sub: 'Pledges, not a base case', base: false, v: { gas: 174, coal: 215, hydro: 558, wind: 1081, solar: 1742, low: 799 } },
  { k: 'dnv', name: 'DNV 2026', sub: 'Incl. rooftop solar', base: true, v: { gas: 644.4, coal: 288.8, hydro: 504.1, wind: 905.1, solar: 1838.0, low: 317.8 } },
  { k: 'iea', name: 'IEA 2026', sub: 'Stated Policies', base: true, v: { gas: 745, coal: 894, hydro: 498, wind: 523, solar: 542, low: 323 } },
  { k: 'aperc', name: 'APERC 9th', sub: 'Reference; seven members', base: true, v: { gas: 1440.9, coal: 837.6, hydro: 376.8, wind: 270.6, solar: 507.1, low: 342.5 } },
  { k: 'eria', name: 'ERIA 2025', sub: 'Business as usual', base: true, v: { gas: 1399.9, coal: 1399.0, hydro: 410.2, wind: 64.8, solar: 140.5, low: 150.3 } },
  { k: 'ace', name: 'ACE 9th', sub: 'AMS Targets', base: true, v: { gas: 3423.4, rest: 3477.4 } },
];

// 2050 level as a multiple of 2025, by measure and outlook.
export const SPREAD = [
  { m: 'fe', name: 'Final energy', sub: '', v: { dnv: 1.496, iea: 1.585, aperc: 1.777, eria: 2.285, ace: 2.512 } },
  { m: 'el', name: 'Electricity generation', sub: '', v: { iea: 2.318, eria: 2.466, aperc: 2.667, dnv: 3.167, ace: 3.664 } },
  { m: 'gas', name: 'Gas supply', sub: '', v: { dnv: 1.293, iea: 1.442, aperc: 2.077, eria: 2.481, ace: 3.279 } },
  { m: 'gpg', name: 'Gas-fired power', sub: '', v: { dnv: 1.515, iea: 1.882, aperc: 2.65, eria: 2.948, ace: 5.562 } },
  { m: 'coal', name: 'Coal-fired power', sub: 'four outlooks', v: { dnv: 0.448, iea: 1.253, aperc: 1.525, eria: 2.343 } },
  { m: 'sw', name: 'Solar and wind power', sub: 'four outlooks', v: { eria: 3.271, aperc: 9.404, iea: 14.675, dnv: 29.222 } },
];

// 2050 outcomes, from least to most gas in power.
export const OUTCOMES = [
  {
    c: 'dnv', name: 'DNV 2026', gasShare: 14, co2Base: 2189,
    co2: { gas: 448.3, coal: 512.6, oil: 691.0, other: 317.2 },
    gas25: 207.6, gas50: 268.3,
    inv: { clean: 109.9, gas: 8.8, coal: 6.9, oil: 6.7 },
  },
  {
    c: 'iea', name: 'IEA 2026', gasShare: 21, co2Base: 2006,
    co2: { gas: 457, coal: 1158, oil: 717, other: 231 },
    gas25: 183.4, gas50: 264.5,
    inv: { clean: 45.8, gas: 8.2, coal: 1.4, oil: 0.1 },
  },
  {
    c: 'aperc', name: 'APERC 9th', gasShare: 38, co2Base: 2027,
    co2: { gas: 840.2, coal: 1697.7, oil: 825.7 },
    gas25: 219.7, gas50: 456.4,
    inv: { clean: 38.2, gas: 21.1, coal: 9.3 },
  },
  {
    c: 'eria', name: 'ERIA 2025', gasShare: 39, co2Base: 1742,
    co2: { gas: 812.4, coal: 1890.5, oil: 1493.1 },
    gas25: 175.2, gas50: 434.6,
    inv: null,
  },
  {
    c: 'ace', name: 'ACE 9th', gasShare: 50, co2Base: 2938,
    co2: { rest: 5185 },
    gas25: 185.6, gas50: 608.6,
    inv: { clean: 48.5, gas: 25.7, coal: 2.3, oil: 0.6 },
  },
];

export const OUTCOME_KEYS = {
  gas: { name: 'Gas', color: '#C08A2F' },
  coal: { name: 'Coal', color: '#4E4A45' },
  oil: { name: 'Oil', color: '#8A6B4C' },
  other: { name: 'Other CO2', color: '#A9A29B' },
  clean: { name: 'Clean power', color: '#1E6660' },
  rest: { name: 'Not split by fuel', color: 'transparent', open: true },
};
