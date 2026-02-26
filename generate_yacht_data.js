/**
 * Generate value.json and volume.json for Yacht Market segments
 * Reads ORIGINAL data from /tmp/ to get correct geography totals
 * Ensures:
 * - Aggregated parent records with _aggregated and _level flags
 * - All leaf segments have year data
 * - Parent totals = sum of children
 * - Cross-segment deep hierarchy
 * - By Country for regions only
 */
const fs = require('fs');
const path = require('path');

// Read ORIGINAL data from backup (not the already-overwritten files)
const oldValue = JSON.parse(fs.readFileSync(path.join(__dirname, 'original_value_backup.json'), 'utf-8'));
const oldVolume = JSON.parse(fs.readFileSync(path.join(__dirname, 'original_volume_backup.json'), 'utf-8'));

const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

const regionCountries = {
  "North America": ["U.S.", "Canada"],
  "Europe": ["U.K.", "Germany", "Italy", "France", "Spain", "Russia", "Rest of Europe"],
  "Asia Pacific": ["China", "India", "Japan", "South Korea", "ASEAN", "Australia", "Rest of Asia Pacific"],
  "Latin America": ["Brazil", "Argentina", "Mexico", "Rest of Latin America"],
  "Middle East & Africa": ["GCC", "South Africa", "Rest of Middle East & Africa"]
};

// Get total for a geography from original data
function getOriginalTotals(data, geography) {
  const segTypes = Object.keys(data[geography] || {});
  const firstType = segTypes.find(t => t !== 'By Country');
  if (!firstType || !data[geography][firstType]) {
    const totals = {};
    years.forEach((y, i) => { totals[y] = 20 + i * 5; });
    return totals;
  }

  const totals = {};
  years.forEach(y => { totals[y] = 0; });

  const segments = data[geography][firstType];
  for (const seg of Object.values(segments)) {
    if (typeof seg !== 'object') continue;
    years.forEach(y => {
      const val = seg[String(y)];
      if (typeof val === 'number') totals[y] += val;
    });
  }
  return totals;
}

// Distribute total with a share
function dist(totalSeries, share) {
  const series = {};
  years.forEach(y => {
    series[String(y)] = Math.round((totalSeries[y] || 0) * share * 10) / 10;
  });
  return series;
}

// Sum multiple year-series
function sumSeries() {
  const args = Array.from(arguments);
  const result = {};
  years.forEach(y => {
    const key = String(y);
    result[key] = 0;
    args.forEach(s => { result[key] += (s[key] || 0); });
    result[key] = Math.round(result[key] * 10) / 10;
  });
  return result;
}

// Service leaf shares (total = 1.0)
const serviceShares = {
  "New Build Brokerage": 0.18,
  "Pre Owned Yacht Brokerage": 0.14,
  "Sale And Purchase Advisory": 0.08,
  "Full Scope Yacht Management": 0.12,
  "Technical Management Only": 0.10,
  "Crew Management Only": 0.09,
  "Compliance And Regulatory Management Only": 0.07,
  "Financial And Accounting Management Only": 0.06,
  "Yacht Charter Service": 0.16
};

const lengthShares = {
  "Below 30 Meters": 0.28,
  "30-50 Meters": 0.25,
  "50-70 Meters": 0.22,
  "70-100 Meters": 0.15,
  "Above 100 Meters": 0.10
};

const propulsionShares = {
  "Conventional Diesel Propulsion": 0.52,
  "Diesel-electric Propulsion": 0.30,
  "Others (Hybrid, Waterjet propulsion, Gas Turbine, etc.)": 0.18
};

const lengthLeaves = Object.keys(lengthShares);
const brokerageChildren = ["New Build Brokerage", "Pre Owned Yacht Brokerage", "Sale And Purchase Advisory"];
const managementChildren = ["Full Scope Yacht Management", "Technical Management Only", "Crew Management Only", "Compliance And Regulatory Management Only", "Financial And Accounting Management Only"];

function buildGeographyData(totalSeries) {
  const data = {};

  // ========== BY SERVICE (hierarchical with aggregated parents) ==========
  // Children leaf data
  const brokLeafData = {};
  brokerageChildren.forEach(n => { brokLeafData[n] = dist(totalSeries, serviceShares[n]); });
  const mgmtLeafData = {};
  managementChildren.forEach(n => { mgmtLeafData[n] = dist(totalSeries, serviceShares[n]); });
  const charterData = dist(totalSeries, serviceShares["Yacht Charter Service"]);

  // Aggregated parents (sum of children + metadata)
  const brokAggYears = sumSeries(...Object.values(brokLeafData));
  const mgmtAggYears = sumSeries(...Object.values(mgmtLeafData));

  data["By Service"] = {
    "Yacht Brokerage Service": {
      ...brokAggYears, _aggregated: true, _level: 2,
      "New Build Brokerage": brokLeafData["New Build Brokerage"],
      "Pre Owned Yacht Brokerage": brokLeafData["Pre Owned Yacht Brokerage"],
      "Sale And Purchase Advisory": brokLeafData["Sale And Purchase Advisory"]
    },
    "Yacht Management Service": {
      ...mgmtAggYears, _aggregated: true, _level: 2,
      "Full Scope Yacht Management": mgmtLeafData["Full Scope Yacht Management"],
      "Technical Management Only": mgmtLeafData["Technical Management Only"],
      "Crew Management Only": mgmtLeafData["Crew Management Only"],
      "Compliance And Regulatory Management Only": mgmtLeafData["Compliance And Regulatory Management Only"],
      "Financial And Accounting Management Only": mgmtLeafData["Financial And Accounting Management Only"]
    },
    "Yacht Charter Service": charterData
  };

  // ========== BY LENGTH (flat) ==========
  data["By length"] = {};
  lengthLeaves.forEach(n => { data["By length"][n] = dist(totalSeries, lengthShares[n]); });

  // ========== BY SERVICE, BY LENGTH (deep cross-segment) ==========
  data["By Service, By length"] = {};

  function buildCrossGroup(parentName, children) {
    if (children === null) {
      // Yacht Charter Service By Length: no sub-services, lengths directly
      const svcKey = parentName.replace(" By Length", "").replace(" by Length", "");
      const svcShare = serviceShares[svcKey];
      const group = {};
      lengthLeaves.forEach(len => {
        group[len] = dist(totalSeries, svcShare * lengthShares[len]);
      });
      const aggYears = sumSeries(...Object.values(group));
      return { ...aggYears, _aggregated: true, _level: 2, ...group };
    } else {
      // Has sub-service children, each with length leaves
      const childGroups = {};
      children.forEach(childName => {
        const childShare = serviceShares[childName];
        const lengthItems = {};
        lengthLeaves.forEach(len => {
          lengthItems[len] = dist(totalSeries, childShare * lengthShares[len]);
        });
        const childAgg = sumSeries(...Object.values(lengthItems));
        childGroups[childName] = { ...childAgg, _aggregated: true, _level: 3, ...lengthItems };
      });
      // Parent aggregation from child aggregations
      const childYearSeries = Object.values(childGroups).map(cg => {
        const ys = {};
        years.forEach(y => { ys[String(y)] = cg[String(y)] || 0; });
        return ys;
      });
      const parentAgg = sumSeries(...childYearSeries);
      return { ...parentAgg, _aggregated: true, _level: 2, ...childGroups };
    }
  }

  data["By Service, By length"]["Yacht Brokerage Service by Length"] = buildCrossGroup("Yacht Brokerage Service by Length", brokerageChildren);
  data["By Service, By length"]["Yacht Management Service by Length"] = buildCrossGroup("Yacht Management Service by Length", managementChildren);
  data["By Service, By length"]["Yacht Charter Service By Length"] = buildCrossGroup("Yacht Charter Service By Length", null);

  // ========== BY PROPULSION TYPE (flat) ==========
  data["By Propulsion Type"] = {};
  Object.keys(propulsionShares).forEach(n => {
    data["By Propulsion Type"][n] = dist(totalSeries, propulsionShares[n]);
  });

  return data;
}

// Main
const newValue = {};
const newVolume = {};

const allGeographies = Object.keys(oldValue);
for (const geo of allGeographies) {
  const totalVal = getOriginalTotals(oldValue, geo);
  const totalVol = getOriginalTotals(oldVolume, geo);
  const isRegion = regionCountries[geo] !== undefined;

  newValue[geo] = buildGeographyData(totalVal);
  newVolume[geo] = buildGeographyData(totalVol);

  if (isRegion) {
    newValue[geo]["By Country"] = {};
    newVolume[geo]["By Country"] = {};
    const countries = regionCountries[geo];
    for (const country of countries) {
      const cTotalVal = getOriginalTotals(oldValue, country);
      const cTotalVol = getOriginalTotals(oldVolume, country);
      const cValSeries = {};
      const cVolSeries = {};
      years.forEach(y => {
        cValSeries[String(y)] = Math.round((cTotalVal[y] || 0) * 10) / 10;
        cVolSeries[String(y)] = Math.round((cTotalVol[y] || 0) * 10) / 10;
      });
      newValue[geo]["By Country"][country] = cValSeries;
      newVolume[geo]["By Country"][country] = cVolSeries;
    }
  }
}

fs.writeFileSync(path.join(__dirname, 'public/data/value.json'), JSON.stringify(newValue, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, 'public/data/volume.json'), JSON.stringify(newVolume, null, 2), 'utf-8');

console.log('Generated value.json and volume.json');
console.log('Geographies:', Object.keys(newValue).length);
console.log('Region segment types:', Object.keys(newValue["North America"]).join(", "));
console.log('Country segment types:', Object.keys(newValue["U.S."]).join(", "));

// Validation
const bs = newValue["North America"]["By Service"];
console.log('\n=== Validation: North America > By Service ===');
console.log('Yacht Brokerage Service: _aggregated=' + bs["Yacht Brokerage Service"]._aggregated + ', _level=' + bs["Yacht Brokerage Service"]._level + ', 2021=' + bs["Yacht Brokerage Service"]["2021"]);
console.log('  New Build Brokerage 2021:', bs["Yacht Brokerage Service"]["New Build Brokerage"]["2021"]);
console.log('  Pre Owned 2021:', bs["Yacht Brokerage Service"]["Pre Owned Yacht Brokerage"]["2021"]);
console.log('  Sale And Purchase 2021:', bs["Yacht Brokerage Service"]["Sale And Purchase Advisory"]["2021"]);
const sum = bs["Yacht Brokerage Service"]["New Build Brokerage"]["2021"] +
  bs["Yacht Brokerage Service"]["Pre Owned Yacht Brokerage"]["2021"] +
  bs["Yacht Brokerage Service"]["Sale And Purchase Advisory"]["2021"];
console.log('  Children sum:', Math.round(sum * 10) / 10, '== parent:', bs["Yacht Brokerage Service"]["2021"]);
console.log('Yacht Management Service: _aggregated=' + bs["Yacht Management Service"]._aggregated + ', 2021=' + bs["Yacht Management Service"]["2021"]);
console.log('Yacht Charter Service: _aggregated=' + bs["Yacht Charter Service"]._aggregated + ', 2021=' + bs["Yacht Charter Service"]["2021"]);

const cs = newValue["North America"]["By Service, By length"];
console.log('\n=== Cross-segment validation ===');
console.log('Brokerage by Length: _aggregated=' + cs["Yacht Brokerage Service by Length"]._aggregated + ', _level=' + cs["Yacht Brokerage Service by Length"]._level + ', 2021=' + cs["Yacht Brokerage Service by Length"]["2021"]);
console.log('  New Build Brokerage: _aggregated=' + cs["Yacht Brokerage Service by Length"]["New Build Brokerage"]._aggregated + ', _level=' + cs["Yacht Brokerage Service by Length"]["New Build Brokerage"]._level);
console.log('  New Build > Below 30m 2021:', cs["Yacht Brokerage Service by Length"]["New Build Brokerage"]["Below 30 Meters"]["2021"]);
