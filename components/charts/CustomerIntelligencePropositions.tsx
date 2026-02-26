'use client'

import { useState } from 'react'

interface ColumnGroup {
  label: string
  color: string
  columns: { key: string; label: string; width?: string }[]
}

// ============ PROPOSITION 1: Yacht Brokerage ============
const proposition1Groups: ColumnGroup[] = [
  {
    label: 'Customer Information',
    color: '#F8D7C4',
    columns: [
      { key: 'orgName', label: 'Organization / Company Name', width: '180px' },
      { key: 'parentGroup', label: 'Parent Group / Holding Company', width: '180px' },
      { key: 'country', label: 'Country', width: '120px' },
      { key: 'cityHub', label: 'City / Hub (Marina / Cluster)', width: '180px' },
      { key: 'customerType', label: 'Customer Type', width: '140px' },
      { key: 'brokerageServiceFocus', label: 'Brokerage Service Focus', width: '180px' },
      { key: 'propulsionPref', label: 'Propulsion Preference', width: '160px' },
      { key: 'transactionSize', label: 'Transaction / Portfolio Size', width: '180px' },
      { key: 'keyRegions', label: 'Key Regions of Operation', width: '180px' },
    ]
  },
  {
    label: 'Contact Details',
    color: '#B8D4E8',
    columns: [
      { key: 'keyContact', label: 'Key Contact Person', width: '160px' },
      { key: 'designation', label: 'Designation / Department', width: '160px' },
      { key: 'email', label: 'Email Address', width: '180px' },
      { key: 'phone', label: 'Phone / WhatsApp', width: '150px' },
      { key: 'linkedin', label: 'LinkedIn Profile', width: '150px' },
      { key: 'website', label: 'Website URL', width: '150px' },
    ]
  },
  {
    label: 'Needs & Pain Points',
    color: '#B8D4E8',
    columns: [
      { key: 'primaryNeed', label: 'Primary Need Focus (Products / Services / Both)', width: '180px' },
      { key: 'needsNewBuild', label: 'Key Needs \u2013 New Build Brokerage', width: '180px' },
      { key: 'needsPreOwned', label: 'Key Needs \u2013 Pre-Owned Brokerage', width: '180px' },
      { key: 'needsSalePurchase', label: 'Key Needs \u2013 Sale & Purchase Advisory', width: '200px' },
      { key: 'painPoints', label: 'Pain Points / Challenges', width: '180px' },
    ]
  },
  {
    label: 'CMI Insights',
    color: '#B8D4E8',
    columns: [
      { key: 'benchmarking', label: 'Benchmarking Summary (Peer Group)', width: '200px' },
      { key: 'strategicFit', label: 'Strategic Fit Score (1-5)', width: '150px' },
      { key: 'sourceRef', label: 'Source / Reference Notes', width: '180px' },
    ]
  }
]

const proposition1Data: Record<string, string>[] = [
  { orgName: 'Northrop & Johnson', parentGroup: 'MarineMax Inc.', country: 'United States', cityHub: 'Fort Lauderdale Marina', customerType: 'Brokerage House', brokerageServiceFocus: 'New Build & Pre-Owned', propulsionPref: 'Conventional Diesel', transactionSize: '$15M \u2013 $80M', keyRegions: 'North America, Caribbean', keyContact: 'James Richardson', designation: 'VP \u2013 Brokerage Division', email: 'j.richardson@nj.com', phone: '+1 954 555 0142', linkedin: 'linkedin.com/in/jrichardson-nj', website: 'www.northropandjohnson.com', primaryNeed: 'Both', needsNewBuild: 'Custom superyacht builds 50m+; shipyard liaison', needsPreOwned: 'High-value resale listings; survey coordination', needsSalePurchase: 'Market valuation; deal structuring for UHNW clients', painPoints: 'Lengthy transaction cycles; cross-border regulatory hurdles', benchmarking: 'Top-3 US brokerage by deal volume; strong UHNW network', strategicFit: '5', sourceRef: 'Industry database; annual brokerage report 2025' },
  { orgName: 'Burgess Yachts', parentGroup: 'Burgess Group', country: 'United Kingdom', cityHub: 'London / Monaco', customerType: 'Full-Service Brokerage', brokerageServiceFocus: 'New Build Brokerage', propulsionPref: 'Diesel-electric', transactionSize: '$25M \u2013 $150M+', keyRegions: 'Europe, Middle East', keyContact: 'Sophie Lambert', designation: 'Director \u2013 New Construction', email: 's.lambert@burgessyachts.com', phone: '+44 20 7766 0001', linkedin: 'linkedin.com/in/sophielambert-by', website: 'www.burgessyachts.com', primaryNeed: 'Services', needsNewBuild: 'Superyacht 70m+ project management; naval architect coordination', needsPreOwned: 'Limited \u2013 focused on new builds', needsSalePurchase: 'Regulatory advisory for EU/UK flagging', painPoints: 'Supply chain delays at European shipyards; rising steel costs', benchmarking: 'Leading European new-build broker; exclusive shipyard partnerships', strategicFit: '5', sourceRef: 'Monaco Yacht Show directory; Burgess annual review' },
  { orgName: 'Fraser Yachts', parentGroup: 'Fraser Group', country: 'Monaco', cityHub: 'Port Hercule, Monaco', customerType: 'Brokerage & Charter', brokerageServiceFocus: 'Pre-Owned Yacht Brokerage', propulsionPref: 'Conventional Diesel', transactionSize: '$10M \u2013 $60M', keyRegions: 'Mediterranean, Asia Pacific', keyContact: 'Marc Douillard', designation: 'Head of Sales', email: 'm.douillard@fraseryachts.com', phone: '+377 97 70 0001', linkedin: 'linkedin.com/in/marcdouillard', website: 'www.fraseryachts.com', primaryNeed: 'Both', needsNewBuild: 'Refit & conversion advisory', needsPreOwned: 'Central listings for 30\u201370m segment; sea trial logistics', needsSalePurchase: 'Flag state advisory; insurance brokerage', painPoints: 'Market price volatility post-pandemic; buyer due diligence timelines', benchmarking: 'Top-5 global pre-owned broker by listings volume', strategicFit: '4', sourceRef: 'Superyacht Times Top 100; Fraser fleet data' },
  { orgName: 'Y.CO', parentGroup: 'Y.CO Ltd.', country: 'United Kingdom', cityHub: 'London / Antibes', customerType: 'Brokerage & Management', brokerageServiceFocus: 'Sale & Purchase Advisory', propulsionPref: 'Hybrid Propulsion', transactionSize: '$20M \u2013 $100M', keyRegions: 'Europe, North America', keyContact: 'Gary Wright', designation: 'CEO', email: 'g.wright@y.co', phone: '+44 20 3637 0001', linkedin: 'linkedin.com/in/garywright-yco', website: 'www.y.co', primaryNeed: 'Services', needsNewBuild: 'Eco-yacht consulting; hybrid propulsion advisory', needsPreOwned: 'Sustainable yacht retrofit valuations', needsSalePurchase: 'End-to-end S&P for eco-conscious UHNW buyers', painPoints: 'Limited hybrid inventory; client education on green tech', benchmarking: 'Pioneer in sustainable yacht advisory; strong ESG positioning', strategicFit: '4', sourceRef: 'Company website; Boat International profile' },
  { orgName: 'IYC \u2013 International Yacht Company', parentGroup: 'IYC Group', country: 'United States', cityHub: 'Fort Lauderdale / Palma', customerType: 'Brokerage House', brokerageServiceFocus: 'New Build & Pre-Owned', propulsionPref: 'Conventional Diesel', transactionSize: '$5M \u2013 $45M', keyRegions: 'North America, Mediterranean', keyContact: 'Daniel Ziriakus', designation: 'President', email: 'd.ziriakus@iyc.com', phone: '+1 954 522 0001', linkedin: 'linkedin.com/in/danielziriakus', website: 'www.iyc.com', primaryNeed: 'Both', needsNewBuild: 'Mid-range new builds 30\u201350m; Turkish/Italian shipyard access', needsPreOwned: 'Volume pre-owned listings 30\u201350m; price benchmarking', needsSalePurchase: 'Multi-deal portfolio management for repeat buyers', painPoints: 'Competition from digital listing platforms; margin pressure', benchmarking: 'Strong mid-market presence; high deal velocity', strategicFit: '4', sourceRef: 'FLIBS exhibitor directory; IYC fleet report' },
  { orgName: 'Camper & Nicholsons', parentGroup: 'C&N International', country: 'Monaco', cityHub: 'Monaco / London / Miami', customerType: 'Full-Service Brokerage', brokerageServiceFocus: 'New Build Brokerage', propulsionPref: 'Diesel-electric', transactionSize: '$30M \u2013 $200M+', keyRegions: 'Global', keyContact: 'Paolo Casani', designation: 'CEO', email: 'p.casani@camperandnicholsons.com', phone: '+377 97 97 7700', linkedin: 'linkedin.com/in/paolocasani', website: 'www.camperandnicholsons.com', primaryNeed: 'Services', needsNewBuild: 'Ultra-luxury 80m+ new builds; concept-to-delivery management', needsPreOwned: 'Heritage fleet resale advisory', needsSalePurchase: 'Cross-border tax structuring; ownership SPV setup', painPoints: 'Client expectations for delivery timelines; regulatory complexity', benchmarking: 'Oldest yacht brokerage (est. 1782); premium brand equity', strategicFit: '5', sourceRef: 'C&N Heritage Report; Monaco Yacht Show data' },
  { orgName: 'Ocean Independence', parentGroup: 'Ocean Independence AG', country: 'Switzerland', cityHub: 'Z\u00fcrich / Antibes / Fort Lauderdale', customerType: 'Brokerage & Charter', brokerageServiceFocus: 'Pre-Owned Yacht Brokerage', propulsionPref: 'Conventional Diesel', transactionSize: '$8M \u2013 $50M', keyRegions: 'Europe, North America', keyContact: 'Toby Allies', designation: 'Managing Director', email: 't.allies@oceanindependence.com', phone: '+41 44 380 0001', linkedin: 'linkedin.com/in/tobyallies', website: 'www.oceanindependence.com', primaryNeed: 'Both', needsNewBuild: 'Explorer yacht new-build coordination', needsPreOwned: 'Explorer & expedition yacht resale; technical inspections', needsSalePurchase: 'Niche valuation for expedition yachts', painPoints: 'Small explorer yacht market; limited comparable sales data', benchmarking: 'Niche leader in explorer yacht brokerage', strategicFit: '3', sourceRef: 'Company profile; Superyacht News features' },
]

// ============ PROPOSITION 2: Yacht Management ============
const proposition2Groups: ColumnGroup[] = [
  {
    label: 'Customer Information',
    color: '#F8D7C4',
    columns: [
      { key: 'orgName', label: 'Organization / Company Name', width: '180px' },
      { key: 'parentGroup', label: 'Parent Group / Holding Company', width: '180px' },
      { key: 'country', label: 'Country', width: '120px' },
      { key: 'cityHub', label: 'City / Hub (Marina / Cluster)', width: '180px' },
      { key: 'customerType', label: 'Customer Type', width: '140px' },
      { key: 'mgmtServiceFocus', label: 'Management Service Focus', width: '180px' },
      { key: 'yachtLengthFocus', label: 'Yacht Length Focus', width: '160px' },
      { key: 'propulsionPref', label: 'Propulsion Preference', width: '160px' },
      { key: 'fleetUnderMgmt', label: 'Fleet Under Management (#)', width: '180px' },
      { key: 'keyRegions', label: 'Key Regions of Operation', width: '180px' },
    ]
  },
  {
    label: 'Contact Details',
    color: '#B8D4E8',
    columns: [
      { key: 'keyContact', label: 'Key Contact Person', width: '160px' },
      { key: 'designation', label: 'Designation / Department', width: '160px' },
      { key: 'email', label: 'Email Address', width: '180px' },
      { key: 'phone', label: 'Phone / WhatsApp', width: '150px' },
      { key: 'linkedin', label: 'LinkedIn Profile', width: '150px' },
      { key: 'website', label: 'Website URL', width: '150px' },
    ]
  },
  {
    label: 'Needs & Pain Points',
    color: '#B8D4E8',
    columns: [
      { key: 'primaryNeed', label: 'Primary Need Focus (Products / Services / Both)', width: '180px' },
      { key: 'needsTechnical', label: 'Key Needs \u2013 Technical Management', width: '180px' },
      { key: 'needsCrew', label: 'Key Needs \u2013 Crew Management', width: '180px' },
      { key: 'needsCompliance', label: 'Key Needs \u2013 Compliance / Regulatory', width: '200px' },
      { key: 'needsFinancial', label: 'Key Needs \u2013 Financial & Accounting', width: '200px' },
      { key: 'painPoints', label: 'Pain Points / Challenges', width: '180px' },
    ]
  },
  {
    label: 'CMI Insights',
    color: '#B8D4E8',
    columns: [
      { key: 'benchmarking', label: 'Benchmarking Summary (Peer Group)', width: '200px' },
      { key: 'strategicFit', label: 'Strategic Fit Score (1-5)', width: '150px' },
      { key: 'sourceRef', label: 'Source / Reference Notes', width: '180px' },
    ]
  }
]

const proposition2Data: Record<string, string>[] = [
  { orgName: 'Hill Robinson', parentGroup: 'Hill Robinson Group', country: 'United Kingdom', cityHub: 'London / Antibes / Fort Lauderdale', customerType: 'Full-Scope Management', mgmtServiceFocus: 'Full Scope Yacht Management', yachtLengthFocus: '50\u2013100 Meters', propulsionPref: 'Conventional Diesel', fleetUnderMgmt: '45+', keyRegions: 'Europe, North America, Caribbean', keyContact: 'Adam Richardson', designation: 'CEO', email: 'a.richardson@hillrobinson.com', phone: '+44 20 7590 0001', linkedin: 'linkedin.com/in/adamrichardson-hr', website: 'www.hillrobinson.com', primaryNeed: 'Services', needsTechnical: 'Planned maintenance systems; dry dock coordination; refit oversight', needsCrew: 'Crew recruitment & certification; rotation planning', needsCompliance: 'ISM/ISPS code compliance; flag state audits; MLC adherence', needsFinancial: 'Operating budget management; owner reporting; VAT optimization', painPoints: 'Crew retention in tight labor market; rising insurance premiums', benchmarking: 'Leading independent yacht manager; 45+ vessel fleet', strategicFit: '5', sourceRef: 'Company annual report; Superyacht Group profile' },
  { orgName: 'Moravia Yachting', parentGroup: 'Moravia Group', country: 'Monaco', cityHub: 'Monaco / Palma de Mallorca', customerType: 'Technical & Crew Management', mgmtServiceFocus: 'Technical Management Only', yachtLengthFocus: '30\u201370 Meters', propulsionPref: 'Diesel-electric', fleetUnderMgmt: '28', keyRegions: 'Mediterranean, Middle East', keyContact: 'Elena Voronova', designation: 'Director of Operations', email: 'e.voronova@moraviayachting.com', phone: '+377 93 50 0012', linkedin: 'linkedin.com/in/elenavoronova', website: 'www.moraviayachting.com', primaryNeed: 'Services', needsTechnical: 'Engine overhaul scheduling; HVAC systems; AV/IT upgrades', needsCrew: 'Engineering crew placement; chief engineer recruitment', needsCompliance: 'Class society survey prep; LY3 compliance consulting', needsFinancial: 'Technical budgeting only; cost tracking per vessel', painPoints: 'Equipment lead times for older vessels; class survey backlogs', benchmarking: 'Strong Mediterranean technical management reputation', strategicFit: '4', sourceRef: 'Superyacht Times directory; industry interviews' },
  { orgName: 'Edmiston & Company', parentGroup: 'Edmiston Group', country: 'Monaco', cityHub: 'Monaco / London', customerType: 'Management & Brokerage', mgmtServiceFocus: 'Crew Management Only', yachtLengthFocus: '50\u2013100 Meters', propulsionPref: 'Conventional Diesel', fleetUnderMgmt: '35', keyRegions: 'Europe, Caribbean', keyContact: 'Nicholas Edmiston', designation: 'Chairman', email: 'n.edmiston@edmiston.com', phone: '+377 93 30 5400', linkedin: 'linkedin.com/in/nicholasedmiston', website: 'www.edmiston.com', primaryNeed: 'Services', needsTechnical: 'Coordination with external tech managers only', needsCrew: 'Full crew sourcing; captain & stew recruitment; payroll management', needsCompliance: 'MLC 2006 crew compliance; STCW certification tracking', needsFinancial: 'Crew payroll & benefits administration', painPoints: 'Seasonal crew availability; competitive salary expectations', benchmarking: 'Premium crew management services; strong captain network', strategicFit: '4', sourceRef: 'Monaco Yacht Show; Edmiston annual fleet report' },
  { orgName: 'Dohle Yachts', parentGroup: 'Peter D\u00f6hle Schiffahrts-KG', country: 'Germany', cityHub: 'Hamburg / Palma', customerType: 'Compliance Specialist', mgmtServiceFocus: 'Compliance And Regulatory Management Only', yachtLengthFocus: '70\u2013100 Meters', propulsionPref: 'Diesel-electric', fleetUnderMgmt: '22', keyRegions: 'Europe, Asia Pacific', keyContact: 'Christoph D\u00f6hle', designation: 'Managing Director', email: 'c.dohle@dohle-yachts.com', phone: '+49 40 3170 0001', linkedin: 'linkedin.com/in/christophdohle', website: 'www.dohle-yachts.com', primaryNeed: 'Services', needsTechnical: 'ISM documentation systems', needsCrew: 'Flag state crew certification', needsCompliance: 'Full ISM/ISPS implementation; DOC management; port state inspections', needsFinancial: 'Compliance cost tracking & reporting', painPoints: 'Evolving IMO regulations; multi-flag fleet complexity', benchmarking: 'Strong commercial shipping pedigree applied to superyachts', strategicFit: '4', sourceRef: 'Dohle Group corporate; Superyacht Report profile' },
  { orgName: 'Luxury Yacht Group', parentGroup: 'LYG Holdings', country: 'United States', cityHub: 'Fort Lauderdale', customerType: 'Financial Management', mgmtServiceFocus: 'Financial And Accounting Management Only', yachtLengthFocus: '30\u201370 Meters', propulsionPref: 'Conventional Diesel', fleetUnderMgmt: '60+', keyRegions: 'North America, Caribbean', keyContact: 'Robert Kelly', designation: 'CFO', email: 'r.kelly@luxuryyachtgroup.com', phone: '+1 954 525 0001', linkedin: 'linkedin.com/in/robertkelly-lyg', website: 'www.luxuryyachtgroup.com', primaryNeed: 'Services', needsTechnical: 'Minimal \u2013 outsourced', needsCrew: 'Payroll processing only', needsCompliance: 'US tax compliance; import duty advisory', needsFinancial: 'Full P&L management; cash flow forecasting; owner financial reporting', painPoints: 'Complex multi-jurisdiction tax structures; owner transparency demands', benchmarking: 'Largest US-focused yacht financial management firm', strategicFit: '3', sourceRef: 'FLIBS directory; industry financial benchmarks' },
  { orgName: 'V.Ships Leisure', parentGroup: 'V.Group', country: 'Monaco', cityHub: 'Monaco / Singapore', customerType: 'Full-Scope Management', mgmtServiceFocus: 'Full Scope Yacht Management', yachtLengthFocus: 'Above 100 Meters', propulsionPref: 'Diesel-electric', fleetUnderMgmt: '15', keyRegions: 'Global', keyContact: 'Roberto Giorgi', designation: 'President', email: 'r.giorgi@vshipsleisure.com', phone: '+377 99 99 0001', linkedin: 'linkedin.com/in/robertogiorgi', website: 'www.vshipsleisure.com', primaryNeed: 'Services', needsTechnical: 'Mega-yacht technical oversight; newbuild supervision; green propulsion', needsCrew: 'Large crew management (30+ per vessel); training programs', needsCompliance: 'IMO Tier III emissions compliance; MARPOL adherence', needsFinancial: 'Multi-entity ownership accounting; charter revenue management', painPoints: 'Limited 100m+ management talent pool; decarbonization pressure', benchmarking: 'Part of world\u2019s largest ship manager; premium mega-yacht focus', strategicFit: '5', sourceRef: 'V.Group corporate; The Superyacht Report' },
]

// ============ PROPOSITION 3: Yacht Charter ============
const proposition3Groups: ColumnGroup[] = [
  {
    label: 'Customer Information',
    color: '#F8D7C4',
    columns: [
      { key: 'orgName', label: 'Organization / Company Name', width: '180px' },
      { key: 'parentGroup', label: 'Parent Group / Holding Company', width: '180px' },
      { key: 'country', label: 'Country', width: '120px' },
      { key: 'cityHub', label: 'City / Hub (Marina / Cluster)', width: '180px' },
      { key: 'customerType', label: 'Customer Type', width: '140px' },
      { key: 'charterServiceFocus', label: 'Charter Service Focus', width: '180px' },
      { key: 'charterModel', label: 'Charter Model (Agency / Operator)', width: '200px' },
      { key: 'yachtLengthFocus', label: 'Yacht Length Focus', width: '160px' },
      { key: 'propulsionPref', label: 'Propulsion Preference', width: '160px' },
      { key: 'charterFleet', label: 'Charter Fleet / Listings (#)', width: '180px' },
      { key: 'keyRegions', label: 'Key Regions of Operation', width: '180px' },
    ]
  },
  {
    label: 'Contact Details',
    color: '#B8D4E8',
    columns: [
      { key: 'keyContact', label: 'Key Contact Person', width: '160px' },
      { key: 'designation', label: 'Designation / Department', width: '160px' },
      { key: 'email', label: 'Email Address', width: '180px' },
      { key: 'phone', label: 'Phone / WhatsApp', width: '150px' },
      { key: 'linkedin', label: 'LinkedIn Profile', width: '150px' },
      { key: 'website', label: 'Website URL', width: '150px' },
    ]
  },
  {
    label: 'Needs & Pain Points',
    color: '#B8D4E8',
    columns: [
      { key: 'primaryNeed', label: 'Primary Need Focus (Products / Services / Both)', width: '180px' },
      { key: 'needsMarketing', label: 'Key Needs \u2013 Marketing / Listings', width: '180px' },
      { key: 'needsBooking', label: 'Key Needs \u2013 Booking / Sales', width: '180px' },
      { key: 'needsOperations', label: 'Key Needs \u2013 Operations / Guest Experience', width: '220px' },
      { key: 'painPoints', label: 'Pain Points / Challenges', width: '180px' },
    ]
  },
  {
    label: 'CMI Insights',
    color: '#B8D4E8',
    columns: [
      { key: 'benchmarking', label: 'Benchmarking Summary (Peer Group)', width: '200px' },
      { key: 'strategicFit', label: 'Strategic Fit Score (1-5)', width: '150px' },
      { key: 'sourceRef', label: 'Source / Reference Notes', width: '180px' },
    ]
  }
]

const proposition3Data: Record<string, string>[] = [
  { orgName: 'CharterWorld', parentGroup: 'CharterWorld Ltd.', country: 'New Zealand', cityHub: 'Auckland / Monaco', customerType: 'Charter Agency', charterServiceFocus: 'Luxury Charter Bookings', charterModel: 'Agency', yachtLengthFocus: '30\u2013100 Meters', propulsionPref: 'Conventional Diesel', charterFleet: '500+ listings', keyRegions: 'Global', keyContact: 'Mark Wilson', designation: 'Founder & Director', email: 'm.wilson@charterworld.com', phone: '+64 9 555 0101', linkedin: 'linkedin.com/in/markwilson-cw', website: 'www.charterworld.com', primaryNeed: 'Services', needsMarketing: 'SEO-driven yacht listing platform; high-res media content', needsBooking: 'Online inquiry management; multi-currency quoting', needsOperations: 'Itinerary planning tools; destination concierge partnerships', painPoints: 'Competition from OTA platforms; client acquisition cost rising', benchmarking: 'Largest independent charter listing platform by web traffic', strategicFit: '4', sourceRef: 'SimilarWeb data; industry directory' },
  { orgName: 'Ahoy Club', parentGroup: 'Ahoy Club Pty Ltd.', country: 'Australia', cityHub: 'Sydney / Monaco', customerType: 'Charter Platform', charterServiceFocus: 'Digital Charter Marketplace', charterModel: 'Agency', yachtLengthFocus: '30\u201370 Meters', propulsionPref: 'Conventional Diesel', charterFleet: '3,500+ listings', keyRegions: 'Asia Pacific, Mediterranean', keyContact: 'Ian Malouf', designation: 'Founder & CEO', email: 'i.malouf@ahoyclub.com', phone: '+61 2 9555 0001', linkedin: 'linkedin.com/in/ianmalouf-ahoy', website: 'www.ahoyclub.com', primaryNeed: 'Both', needsMarketing: 'AI-powered matching; dynamic pricing engine; mobile-first UX', needsBooking: 'Instant booking confirmation; automated contracts & APA', needsOperations: 'Guest preference profiling; real-time crew communication', painPoints: 'Building trust in digital-first model; yacht owner onboarding', benchmarking: 'Fastest-growing digital charter platform; strong tech DNA', strategicFit: '5', sourceRef: 'Ahoy Club press releases; TechCrunch coverage' },
  { orgName: 'Yachtzoo', parentGroup: 'Yachtzoo SA', country: 'Monaco', cityHub: 'Monaco / Antibes', customerType: 'Charter Operator', charterServiceFocus: 'Charter Fleet Operations', charterModel: 'Operator', yachtLengthFocus: '50\u2013100 Meters', propulsionPref: 'Diesel-electric', charterFleet: '25 managed', keyRegions: 'Mediterranean, Caribbean', keyContact: 'Franck Recoing', designation: 'Managing Director', email: 'f.recoing@yachtzoo.com', phone: '+377 97 77 0001', linkedin: 'linkedin.com/in/franckrecoing', website: 'www.yachtzoo.com', primaryNeed: 'Services', needsMarketing: 'Charter show presence; broker network cultivation', needsBooking: 'Central availability calendar; charter contract management', needsOperations: 'Provisioning coordination; crew briefing for charter rotations', painPoints: 'Seasonal demand concentration; weather-related cancellations', benchmarking: 'Premium operator-broker hybrid; strong Monaco network', strategicFit: '4', sourceRef: 'Monaco Yacht Show; Yachtzoo fleet database' },
  { orgName: 'Boatbookings', parentGroup: 'Boatbookings Ltd.', country: 'United Kingdom', cityHub: 'London', customerType: 'Charter Agency', charterServiceFocus: 'Online Charter Bookings', charterModel: 'Agency', yachtLengthFocus: 'Below 30 Meters', propulsionPref: 'Conventional Diesel', charterFleet: '2,000+ listings', keyRegions: 'Mediterranean, Caribbean, SE Asia', keyContact: 'Harry Garside', designation: 'CEO', email: 'h.garside@boatbookings.com', phone: '+44 20 7193 0001', linkedin: 'linkedin.com/in/harrygarside', website: 'www.boatbookings.com', primaryNeed: 'Both', needsMarketing: 'Content marketing; destination guides; social media strategy', needsBooking: 'Real-time availability API; instant quote generation', needsOperations: 'Base handover coordination; guest safety briefings', painPoints: 'Price transparency pressure; broker vs. direct booking competition', benchmarking: 'Leading UK-based online charter agency; strong mid-market', strategicFit: '3', sourceRef: 'Boatbookings company info; Crunchbase' },
  { orgName: 'OceanStyle', parentGroup: 'OceanStyle SAS', country: 'France', cityHub: 'Antibes / Saint-Tropez', customerType: 'Charter Operator', charterServiceFocus: 'Ultra-Luxury Charter', charterModel: 'Operator', yachtLengthFocus: '70\u2013100 Meters', propulsionPref: 'Diesel-electric', charterFleet: '12 managed', keyRegions: 'French Riviera, Adriatic', keyContact: 'Jean-Claude Carme', designation: 'President', email: 'jc.carme@oceanstyle.com', phone: '+33 4 93 34 0001', linkedin: 'linkedin.com/in/jccarme', website: 'www.oceanstyle.com', primaryNeed: 'Services', needsMarketing: 'Exclusive event partnerships; UHNW network marketing', needsBooking: 'White-glove booking experience; personal charter consultant', needsOperations: 'Michelin-chef provisioning; luxury concierge; helicopter transfers', painPoints: 'Guest experience consistency across diverse crew; high operating costs', benchmarking: 'Ultra-premium charter operator; Riviera market leader', strategicFit: '4', sourceRef: 'Antibes Yacht Show; OceanStyle brochure' },
  { orgName: 'Moorings Charter', parentGroup: 'TUI Marine (TUI Group)', country: 'United States', cityHub: 'Clearwater, FL / BVI', customerType: 'Charter Fleet Operator', charterServiceFocus: 'Bareboat & Crewed Charter', charterModel: 'Operator', yachtLengthFocus: 'Below 30 Meters', propulsionPref: 'Conventional Diesel', charterFleet: '400+ fleet', keyRegions: 'Caribbean, Mediterranean, Indian Ocean', keyContact: 'Josie Tucci', designation: 'President \u2013 Marine Division', email: 'j.tucci@moorings.com', phone: '+1 727 530 0001', linkedin: 'linkedin.com/in/josietucci', website: 'www.moorings.com', primaryNeed: 'Both', needsMarketing: 'B2C digital campaigns; loyalty programs; travel agent network', needsBooking: 'Self-service booking engine; fleet calendar optimization', needsOperations: 'Base operations in 20+ destinations; vessel turnaround efficiency', painPoints: 'Fleet aging & replacement capex; hurricane season disruptions', benchmarking: 'Global market leader in bareboat charter by fleet size', strategicFit: '3', sourceRef: 'TUI Group annual report; Moorings press releases' },
]

// ============ TABLE COMPONENT ============
function PropositionTable({ groups, data, title }: { groups: ColumnGroup[]; data: Record<string, string>[]; title: string }) {
  const allColumns = groups.flatMap(g => g.columns)
  const totalRows = Math.max(data.length, 10)

  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: `${allColumns.length * 160}px` }}>
            <thead>
              <tr>
                {groups.map((group, gi) => (
                  <th
                    key={gi}
                    colSpan={group.columns.length}
                    className="text-center text-xs font-semibold py-1.5 border border-gray-300"
                    style={{ backgroundColor: group.color }}
                  >
                    {group.label}
                  </th>
                ))}
              </tr>
              <tr>
                {allColumns.map((col, ci) => (
                  <th
                    key={ci}
                    className="text-xs font-semibold text-gray-700 py-2 px-3 border border-gray-300 bg-gray-50 text-left whitespace-normal"
                    style={{ minWidth: col.width || '150px', maxWidth: col.width || '200px' }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: totalRows }).map((_, ri) => {
                const row = data[ri]
                return (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                    {allColumns.map((col, ci) => (
                      <td
                        key={ci}
                        className="py-3 px-3 border border-gray-200 text-xs text-gray-700"
                        style={{ minWidth: col.width || '150px', maxWidth: col.width || '200px' }}
                      >
                        {row ? (row[col.key] || '') : '\u00A0'}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface Props {
  title?: string
  height?: number
}

export default function CustomerIntelligencePropositions({ title, height }: Props) {
  const [activeProposition, setActiveProposition] = useState<1 | 2 | 3>(1)

  const propositionTabs = [
    { id: 1 as const, label: 'Proposition 1', subtitle: 'Yacht Brokerage' },
    { id: 2 as const, label: 'Proposition 2', subtitle: 'Yacht Management' },
    { id: 3 as const, label: 'Proposition 3', subtitle: 'Yacht Charter' },
  ]

  return (
    <div>
      {title && (
        <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      )}

      <div className="flex border-b border-gray-200 mb-6">
        {propositionTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveProposition(tab.id)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeProposition === tab.id
                ? 'border-[#52B69A] text-[#52B69A]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="block">{tab.label}</span>
            <span className={`block text-xs mt-0.5 ${
              activeProposition === tab.id ? 'text-[#52B69A]' : 'text-gray-400'
            }`}>
              {tab.subtitle}
            </span>
          </button>
        ))}
      </div>

      {activeProposition === 1 && (
        <PropositionTable
          groups={proposition1Groups}
          data={proposition1Data}
          title="Proposition 1 \u2013 Yacht Brokerage Customer Intelligence"
        />
      )}
      {activeProposition === 2 && (
        <PropositionTable
          groups={proposition2Groups}
          data={proposition2Data}
          title="Proposition 2 \u2013 Yacht Management Customer Intelligence"
        />
      )}
      {activeProposition === 3 && (
        <PropositionTable
          groups={proposition3Groups}
          data={proposition3Data}
          title="Proposition 3 \u2013 Yacht Charter Customer Intelligence"
        />
      )}
    </div>
  )
}
