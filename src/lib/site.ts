export const BRAND = {
  name: "Concord Pacific, Corp.",
  short: "Concord Pacific",
  mark: "CONCORD PACIFIC",
  locale: "Beverly Hills, California",
  tagline: "Exceptional Locations. World-Class Design. Disciplined Development. Enduring Value.",
  promise: "We Develop What Should Exist Next.",
  disciplines: ["Development", "Investment", "Design", "Construction", "Capital"],
  email: {
    investors: "investors@concordpacificcorp.com",
    development: "development@concordpacificcorp.com",
    general: "info@concordpacificcorp.com",
  },
  phone: "+1 (310) 000-0000",
  address: "9465 Wilshire Boulevard, Beverly Hills, CA 90212",
} as const;

export const NAV = [
  { label: "Developments", href: "/developments" },
  { label: "Experience", href: "/portfolio" },
  { label: "Our Strategy", href: "/strategy" },
  { label: "Design", href: "/design" },
  { label: "Global Sourcing", href: "/sourcing" },
  { label: "Leadership", href: "/leadership" },
  { label: "Investor Relations", href: "/investors" },
  { label: "Contact", href: "/contact" },
] as const;

export const PLATFORM = [
  { k: "01", t: "Real-Estate Development", d: "Opportunity identification, acquisition, entitlement and project strategy." },
  { k: "02", t: "Investment", d: "Underwriting, transaction structure, capital allocation and asset strategy." },
  { k: "03", t: "Construction", d: "Pre-construction, budgeting, execution and quality control." },
  { k: "04", t: "Architecture & Design", d: "World-class architectural vision appropriate to each site." },
  { k: "05", t: "Global Procurement", d: "Direct and international sourcing intended to enhance quality and purchasing efficiency." },
  { k: "06", t: "Capital", d: "Investor equity and appropriate project-level financing." },
  { k: "07", t: "Ownership & Asset Management", d: "Lease-up, stabilization, operation, refinancing and disposition." },
];

export const MARKET_CRITERIA = [
  "Limited Supply",
  "High Barriers to Entry",
  "Affluent Demographics",
  "Strong Fundamentals",
  "Enduring Residential Demand",
  "Long-Term Desirability",
];

export const VALUE_LEVERS = [
  { t: "Disciplined Acquisition", d: "We underwrite for the downside and acquire only where the basis supports the vision." },
  { t: "Thoughtful Design", d: "Architecture is an investment decision, not a decoration budget." },
  { t: "Sophisticated Capitalization", d: "Structure matched to the risk profile of each phase of development." },
  { t: "Rigorous Development Execution", d: "Entitlement, documentation and delivery managed as one continuous discipline." },
  { t: "Global Procurement", d: "Direct relationships with qualified manufacturers, fabricators and suppliers." },
  { t: "Construction Excellence", d: "Pre-construction involvement so constructability informs design." },
  { t: "Operational Discipline", d: "Active oversight from groundbreaking through stabilization." },
];

/** Storyboard 04 — OUR VALUE-CREATION PROCESS. Twelve disciplines, in sequence. */
export const VALUE_CHAIN_STEPS = [
  { t: "Identify",  d: "Markets, sites and off-market opportunities.",        image: "/images/hero-01-coastline.webp" },
  { t: "Underwrite", d: "Basis, program, absorption and downside.",           image: "/images/hero-02-beverly-hills.webp" },
  { t: "Acquire",   d: "Structure, diligence and close.",                     image: "/images/hero-03-bel-air.webp" },
  { t: "Entitle",   d: "Zoning, hearings, conditions and approvals.",         image: "/images/hero-05-model.webp" },
  { t: "Design",    d: "Architecture, interiors and landscape.",              image: "/images/hero-04-sketch.webp" },
  { t: "Engineer",  d: "Structural, civil and building systems.",             image: "/images/det-frame.webp" },
  { t: "Capitalize", d: "Equity, debt and phased capital.",                   image: "/images/ppl-view.webp" },
  { t: "Source",    d: "Direct manufacturer and fabricator relationships.",   image: "/images/mat-counter.webp" },
  { t: "Build",     d: "Pre-construction, delivery and quality control.",     image: "/images/hero-06-construction.webp" },
  { t: "Lease / Sell", d: "Absorption, pricing and closings.",                image: "/images/interior-living.webp" },
  { t: "Stabilize", d: "Occupancy, operations and NOI.",                      image: "/images/hero-07-completed.webp" },
  { t: "Hold / Refinance / Dispose", d: "Realize value, or hold for the long term.", image: "/images/interior-kitchen.webp" },
];

export const VALUE_CHAIN = VALUE_CHAIN_STEPS.map((s) => s.t);

export const PRODUCT_TYPES = [
  {
    id: "condominiums",
    label: "Luxury Condominiums",
    line: "Developed to feel like private homes — not simply apartments.",
    body: "Sophisticated condominium developments combining exceptional locations, generous residences, architectural distinction, premium materials, privacy and thoughtfully selected amenities.",
    chain: ["Develop", "Build", "Market", "Sell / Hold"],
    image: "/images/interior-kitchen.webp",
  },
  {
    id: "multifamily",
    label: "Luxury Multifamily",
    line: "Designed for long-term desirability.",
    body: "Upscale apartment developments designed to provide an elevated residential experience through architecture, amenities, materials, technology and service.",
    chain: ["Develop", "Lease", "Stabilize", "Hold / Refinance / Sell"],
    image: "/images/interior-living.webp",
  },
  {
    id: "estates",
    label: "Select Estate Residences",
    line: "Individual architecture for exceptional locations.",
    body: "Exceptional private residences where location, land, views, architecture and development economics create an opportunity for a truly distinctive home.",
    chain: ["Acquire", "Develop", "Build", "Realize Value"],
    image: "/images/hero-07-completed.webp",
  },
];

export const RESIDENCE_QUALITIES = [
  "Exceptional Location", "Sophisticated Architecture", "Generous Floor Plans",
  "Premium Materials", "Thoughtful Interiors", "Advanced Technology",
  "Safety & Resilience", "Indoor-Outdoor Living", "Landscape Design", "Disciplined Construction",
];

export const ARCHITECTURAL_LANGUAGES = [
  { t: "Contemporary / Modern", d: "Clean lines, expansive glazing, open interiors, natural light and sophisticated materials.", image: "/images/mat-slide.webp" },
  { t: "Warm Modern", d: "Contemporary architecture softened through stone, wood, landscape and natural textures.", image: "/images/interior-living.webp" },
  { t: "California Contemporary", d: "Architecture centered around natural light, landscape and seamless indoor-outdoor living.", image: "/images/hero-07-completed.webp" },
  { t: "Modern Mediterranean", d: "A contemporary interpretation of Mediterranean architecture combining timeless proportions with modern interiors.", image: "/images/interior-kitchen.webp" },
  { t: "European Contemporary", d: "Sophisticated residential architecture influenced by leading European design traditions.", image: "/images/det-lever.webp" },
  { t: "Timeless / Transitional", d: "Traditional architectural proportions interpreted for contemporary residential living.", image: "/images/wood-stair.webp" },
  { t: "Custom Architectural Concepts", d: "For exceptional properties, an entirely individual architectural language can be developed specifically for the site.", image: "/images/hero-04-sketch.webp" },
];

export const MODERN_FEATURES = [
  "Floor-to-Ceiling Windows", "Expansive Glass", "Open-Plan Living", "High Ceilings",
  "Large Terraces", "Indoor-Outdoor Environments", "Private Outdoor Space", "Custom Kitchens",
  "Spa-Inspired Bathrooms", "Architectural Lighting", "Custom Millwork", "Natural Stone",
  "Premium Wood", "Smart-Home Technology", "Premium Appliances", "Landscape Integration",
];

export const GEOGRAPHIES = [
  { c: "Spain", d: "Contemporary architectural thinking, bold forms and sophisticated urban residential design.", tags: ["Architecture", "Design"] },
  { c: "Italy", d: "Architecture influenced by an extraordinary tradition of design, materials, craftsmanship and proportion.", tags: ["Architecture", "Interiors", "Materials"] },
  { c: "France", d: "Sophisticated perspectives on architecture, interiors, materiality and luxury.", tags: ["Architecture", "Design"] },
  { c: "Germany", d: "Technical precision, engineering, efficiency and disciplined contemporary architecture.", tags: ["Architecture", "Engineering", "Building Technology"] },
  { c: "United States", d: "Leading architectural talent combining contemporary residential design with an understanding of American luxury markets and local development requirements.", tags: ["Architecture", "Engineering", "Development", "Construction"] },
];

export const TECHNICAL_TEAM = [
  "Architects", "Structural Engineers", "Civil Engineers", "Mechanical Engineers",
  "Electrical Engineers", "Plumbing Engineers", "Interior Designers", "Exterior / Facade Designers",
  "Landscape Designers", "Drafters", "BIM & 3D Modeling Professionals", "Technical Designers",
  "Specialty Consultants", "Construction Professionals", "Specialized Trades",
];

export const LOCAL_EXECUTION = [
  "Entitlements", "Building Codes", "Structural Engineering", "Seismic Design",
  "Mechanical / Electrical / Plumbing", "Energy Requirements", "Fire & Life Safety",
  "Accessibility", "Construction Documentation", "Permitting", "Constructability", "Quality Control",
];

export const SOURCING_CATEGORIES = [
  { t: "Custom Kitchens & Cabinetry", image: "/images/mat-counter.webp" },
  { t: "Interior Doors", image: "/images/det-fold.webp" },
  { t: "Exterior Doors", image: "/images/det-frame.webp" },
  { t: "Windows & Glazing Systems", image: "/images/mat-window.webp" },
  { t: "Wood Flooring", image: "/images/tex-grain.webp" },
  { t: "Stone & Tile", image: "/images/tex-herring.webp" },
  { t: "Roofing Systems", image: "/images/pan-eave.webp" },
  { t: "Plumbing Fixtures", image: "/images/det-lever.webp" },
  { t: "Lighting", image: "/images/wood-stair.webp" },
  { t: "Custom Millwork", image: "/images/det-handle.webp" },
  { t: "Closets & Built-Ins", image: "/images/wood-kitchen.webp" },
  { t: "Bathroom Components", image: "/images/det-track.webp" },
  { t: "Architectural Metals", image: "/images/mat-slide.webp" },
  { t: "Facade Materials", image: "/images/pan-exterior.webp" },
  { t: "Landscape Materials", image: "/images/terrace-dusk.webp" },
];

export const GLOBAL_FLOW = [
  "Global Manufacturing", "Quality Control", "Logistics",
  "California Development", "Local Construction", "Completed Luxury Residence",
];

export const DISTINCTIVE_FEATURES = [
  "Private Elevator Access", "Expansive Terraces", "Rooftop Environments", "Private Gardens",
  "Resort-Style Pools", "Fitness & Wellness Facilities", "Resident Lounges", "Secure Parking",
  "EV Charging", "Smart-Home Technology", "Advanced Security", "Early Fire & Smoke Detection",
  "Water-Leak Detection", "Energy-Efficient Systems", "Acoustic Design", "Package & Delivery Systems",
  "Pet-Friendly Amenities",
];

export const TECHNOLOGY = [
  "Smart-Home Control", "Lighting Automation", "Climate Control", "Access Control",
  "Video Security", "Early Fire Detection", "Water-Leak Detection", "Energy Monitoring",
  "EV Infrastructure", "Backup-Power Strategies", "Smart-Building Monitoring", "Seismic Design",
];

export const PROJECTS = [
  {
    slug: "2391-roscomare-road",
    name: "2391 Roscomare Road",
    place: "Bel-Air, Los Angeles",
    headline: "10 Large-Format Luxury Residences",
    summary:
      "Approximately 36,000 square feet of total building area. Approximately 3,000–4,000 square feet per residence. A ground-up residential development created by the principals.",
    note:
      "The property has been retained by Peter Cohen as a rental investment, demonstrating experience extending from development into long-term ownership and operation.",
    stats: [
      { k: "Residences", v: "10" },
      { k: "Total Building Area", v: "~36,000 SF" },
      { k: "Residence Size", v: "~3,000–4,000 SF" },
      { k: "Current Strategy", v: "Rental / Long-Term Hold" },
    ],
    chain: ["Develop", "Complete", "Lease", "Hold"],
    image: "/images/hero-03-bel-air.webp",
    gallery: ["/images/interior-kitchen.webp", "/images/interior-grand-living.webp", "/images/mat-counter.webp", "/images/terrace-dusk.webp"],
  },
  {
    slug: "810-n-croft-avenue",
    name: "810 N. Croft Avenue",
    place: "Los Angeles, California",
    headline: "6 Condominium Residences",
    summary:
      "An existing property was acquired and redeveloped into a new six-residence condominium development.",
    note: "Approximate completion 2012.",
    stats: [
      { k: "Residences", v: "6" },
      { k: "Development Site", v: "~6,500 SF" },
      { k: "Completion", v: "2012 (approx.)" },
      { k: "Residence Range", v: "~1,400–2,200+ SF" },
    ],
    chain: ["Acquire", "Redevelop", "Construct", "Complete"],
    image: "/images/hero-condo-exterior.webp",
    gallery: ["/images/interior-kitchen.webp", "/images/ital-glass.webp", "/images/floor-light.webp", "/images/door-double.webp"],
  },
  {
    slug: "11507-orum-road",
    name: "11507 Orum Road",
    place: "Bel-Air, Los Angeles",
    headline: "Approximately 10,000 SF Luxury Residence",
    summary:
      "A substantial luxury residential development on approximately 1.3 acres in Bel-Air. The project represents Peter Cohen's experience extending beyond commercial investment into luxury residential development.",
    note:
      "The approximately 10,000-square-foot contemporary residence was subsequently reported sold for approximately $20.5 million.",
    stats: [
      { k: "Residence", v: "~10,000 SF" },
      { k: "Site", v: "~1.3 Acres" },
      { k: "Location", v: "Bel-Air" },
      { k: "Reported Sale", v: "~$20.5M" },
    ],
    chain: ["Acquire", "Develop", "Build", "Realize Value"],
    image: "/images/hero-estate-nightpool.webp",
    gallery: ["/images/interior-living.webp", "/images/hero-estate-pooldeck.webp", "/images/pan-eave.webp", "/images/wood-stair.webp"],
  },
];

export const PORTFOLIO = [
  { name: "8200 Wilshire Boulevard", place: "Beverly Hills", type: "Office", detail: "Approximately 30,000 SF boutique office property. Reported acquisition approximately $17.5 million.", x: 58.65, y: 80.53 },
  { name: "Camarillo Plaza", place: "Camarillo", type: "Retail", detail: "Approximately 74,000 SF community shopping center. Reported acquisition approximately $17.8 million. Acquisition, improvements, repositioning and leasing.", x: 52.48, y: 79.05 },
  { name: "The Village at Dos Vientos", place: "Newbury Park / Thousand Oaks", type: "Retail", detail: "Retail property forming part of Peter Cohen's Southern California commercial real-estate experience.", x: 53.36, y: 79.58 },
  { name: "Thousand Oaks Retail Portfolio", place: "Thousand Oaks", type: "Retail", detail: "Additional retail investment and ownership experience in the Thousand Oaks market.", x: 54.36, y: 79.5 },
  { name: "The Rose Hotel", place: "Venice, Los Angeles", type: "Hospitality", detail: "15 Rose Avenue. Approximately 10,900 SF / 25 units. Reported acquisition approximately $10 million.", x: 57.81, y: 81.28 },
  { name: "Stockdale Tower", place: "Bakersfield", type: "Office", detail: "12-story office tower acquired through a partnership involving Peter Cohen.", x: 52.35, y: 67.78 },
  { name: "California Corporate Center", place: "Bakersfield", type: "Office", detail: "4550 California Avenue. Approximately 195,530 SF office complex associated with Peter Cohen's partnership investment experience.", x: 52.24, y: 67.75 },
  { name: "Westwind Drive Medical Office", place: "Bakersfield", type: "Medical Office", detail: "Approximately 34,560 SF medical-office property occupied by the U.S. Department of Veterans Affairs.", x: 52.09, y: 67.5 },
  { name: "72 N. Fair Oaks", place: "Pasadena", type: "Commercial", detail: "Commercial property associated with Cardinal Equities / Peter Cohen.", x: 60.87, y: 79.7 },
  { name: "2391 Roscomare Road", place: "Bel-Air, Los Angeles", type: "Residential Development", detail: "10 large-format luxury residences. ~36,000 SF total building area.", x: 58.09, y: 80.07 },
  { name: "810 N. Croft Avenue", place: "Los Angeles", type: "Condominium Development", detail: "6 condominium residences delivered approximately 2012.", x: 58.68, y: 80.37 },
  { name: "11507 Orum Road", place: "Bel-Air, Los Angeles", type: "Estate Development", detail: "~10,000 SF contemporary residence on approximately 1.3 acres.", x: 57.92, y: 80.16 },
];

export const LEADERSHIP = [
  {
    name: "Roman Alexander",
    role: "Founder & Partner",
    focus: "Development & Vision",
    bio: "Roman Alexander brings decades of California real-estate experience together with hands-on residential development experience. His principal development history includes 2391 Roscomare Road, 810 N. Croft Avenue and substantial luxury residential development in Bel-Air.",
    tags: ["Development Strategy", "Site Selection", "Design Direction", "Residential Product", "Project Creation"],
    photo: "/images/leadership-roman-alexander.webp",
  },
  {
    name: "Peter Cohen",
    role: "Partner",
    focus: "Real Estate Investment, Legal & Capital Strategy",
    bio: "Peter Cohen brings extensive real-estate investment, development, ownership and asset-management experience through Cardinal Equities and affiliated partnerships. His experience encompasses a historically reported portfolio exceeding 1.5 million square feet. His publicly reported education includes a J.D. from Stanford Law School, with distinctions, and a B.S. from UCLA, summa cum laude. Peter previously practiced real-estate law at Dewey Ballantine LLP in Los Angeles.",
    tags: ["Investment", "Development", "Transactions", "Legal", "Capital Strategy", "Asset Management"],
    photo: "/images/leadership-peter-cohen.webp",
  },
  {
    name: "Alexander Shvartsman",
    role: "Partner",
    focus: "Construction & Development",
    bio: "Alexander “Alex” Shvartsman is a seasoned Southern California general contractor with decades of experience in luxury residential construction, ground-up development, major renovations and complex hillside projects. His experience encompasses the complete construction process — from pre-construction, permitting and budgeting through structural construction, subcontractor coordination, quality control and final completion — with a hands-on approach focused on craftsmanship, precision, cost management and execution. Selected project experience includes a ground-up two-story residence with basement and attached garage at 1523 N. Stradella Road in Bel-Air, and major residential construction at 770 N. Wildomar Street in Pacific Palisades, featuring a basement, subterranean garage and extensive improvements.",
    tags: ["Pre-Construction", "Permitting", "Budgeting", "Subcontractor Coordination", "Quality Control", "Hillside Construction"],
    photo: "/images/leadership-alexander-shvartsman.webp",
  },
  {
    name: "Robin Nahouray",
    role: "President, Supreme Construction Management",
    focus: "Construction Management & General Contracting",
    bio: "Robin Nahouray is a seasoned construction and real estate development professional with extensive experience in residential and multifamily development throughout Southern California, spanning construction management, general contracting, development, permitting, budgeting, scheduling, subcontractor coordination and project execution. As President of Supreme Construction Management, he brings an owner/developer perspective to every project, with a focus on quality construction, cost control, schedule management, accountability and practical problem-solving from pre-construction through completion. Selected project experience includes Chateau Century, a 14-unit four-story multifamily development at 1825 Pandora Avenue in Los Angeles, and a four-unit condominium development over a subterranean garage at 1007 6th Street in Santa Monica.",
    tags: ["Construction Management", "General Contracting", "Permitting", "Budgeting & Scheduling", "Subcontractor Coordination", "Project Execution"],
    photo: "/images/leadership-robin-nahouray.webp",
  },
];

export const INVEST_STEPS = [
  { n: "01", t: "Explore", d: "Learn about the platform and available opportunities." },
  { n: "02", t: "Create an Account", d: "Establish a secure investor profile." },
  { n: "03", t: "Determine Eligibility", d: "Complete applicable investor information." },
  { n: "04", t: "Review", d: "Review project information, definitive offering materials, financial disclosures and risks." },
  { n: "05", t: "Subscribe", d: "Select an investment amount and complete applicable subscription documentation." },
  { n: "06", t: "Sign", d: "Electronically execute required documents." },
  { n: "07", t: "Fund", d: "Following acceptance, fund through an approved secure process." },
  { n: "08", t: "Follow", d: "Track development progress through your investor account." },
];

export const DEV_TIMELINE = [
  "Site Acquired", "Design", "Entitlements", "Financing", "Groundbreaking", "Foundation",
  "Structure", "Building Envelope", "Interiors", "Landscaping", "Completion",
  "Lease-Up / Sales", "Stabilization / Realization",
];

export const DASHBOARD_ITEMS = [
  "Investment Dashboard", "Current Investments", "Project Status", "Development Progress",
  "Construction Photography & Video", "Offering Documents", "Executed Documents",
  "Capital Contributions", "Applicable Capital Calls", "Quarterly Reports",
  "Financial Statements", "Distribution History", "Tax Documents", "Account Information",
];

export const BRAND_PILLARS = [
  { t: "Exceptional Locations.", d: "We seek premier locations with strong fundamentals and enduring desirability." },
  { t: "World-Class Design.", d: "We seek exceptional architectural and design talent in the United States and internationally." },
  { t: "Global Resources.", d: "We evaluate engineering, technical talent, manufacturers and materials worldwide." },
  { t: "Disciplined Procurement.", d: "We seek to reduce unnecessary procurement costs while maintaining demanding quality standards." },
  { t: "Experienced Execution.", d: "Development and construction experience guides projects from acquisition through completion." },
  { t: "Intelligent Safety.", d: "Technology, early detection, security and resilience are considered as part of the residential product." },
  { t: "Investor Access.", d: "Our objective is to provide eligible investors with access to carefully selected development opportunities through appropriately structured offerings." },
];

export const CONTACT_TYPES = [
  { id: "investor", label: "Investor", blurb: "Tell us about your investment interest." },
  { id: "development", label: "Development / Property Opportunity", blurb: "Show us the property." },
  { id: "broker", label: "Broker", blurb: "Introduce a site, a listing or a client." },
  { id: "media", label: "Media", blurb: "Editorial, press and speaking enquiries." },
  { id: "general", label: "General", blurb: "Everything else." },
];

export const FOOTER = [
  {
    h: "Company",
    links: [
      { l: "About", h: "/strategy" },
      { l: "Leadership", h: "/leadership" },
      { l: "Strategy", h: "/strategy" },
      { l: "Development Process", h: "/strategy#process" },
      { l: "Architecture & Design", h: "/design" },
      { l: "Global Sourcing", h: "/sourcing" },
      { l: "Contact", h: "/contact" },
    ],
  },
  {
    h: "Experience",
    links: [
      { l: "Developments", h: "/developments" },
      { l: "Principal Experience", h: "/portfolio" },
      { l: "Cardinal Equities Experience", h: "/portfolio#cardinal" },
      { l: "Portfolio Map", h: "/portfolio#map" },
    ],
  },
  {
    h: "Investors",
    links: [
      { l: "Why Development", h: "/investors#why" },
      { l: "Investment Opportunities", h: "/investors#opportunities" },
      { l: "How Investing Works", h: "/investors#how" },
      { l: "Investor Relations", h: "/investors#relations" },
      { l: "Invest", h: "/investors#opportunities" },
      { l: "Investor Login", h: "/investors/login" },
    ],
  },
  {
    h: "Connect",
    links: [
      { l: "Development Opportunities", h: "/contact?type=development" },
      { l: "Submit a Property", h: "/contact?type=development" },
      { l: "Broker Relations", h: "/contact?type=broker" },
      { l: "Media", h: "/contact?type=media" },
      { l: "Email Us", h: "/contact" },
      { l: "Request a Call", h: "/contact?type=call" },
    ],
  },
  {
    h: "Legal",
    links: [
      { l: "Investment Disclosures", h: "/legal/disclosures" },
      { l: "Privacy Policy", h: "/legal/privacy" },
      { l: "Terms of Use", h: "/legal/terms" },
      { l: "Accessibility", h: "/legal/accessibility" },
    ],
  },
];

export const INVESTOR_JOURNEY = [
  "This is a serious luxury development company.",
  "The principals have real experience.",
  "They have developed, built, owned and operated real estate.",
  "Their product is differentiated.",
  "They have access to global design and sourcing resources.",
  "I understand how they intend to control cost and quality.",
  "I understand the development strategy.",
  "I can see the investment opportunity.",
  "I can review the information and determine whether it is appropriate for me.",
  "I can invest through a secure process if eligible.",
  "I can follow the property being developed.",
];
