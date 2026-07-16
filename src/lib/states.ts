export interface StateDetail {
  name: string;
  localRegions: string;
  economicFocus: string;
  regionalPainPoint: string;
  regionalValueProp: string;
  adjective: string;
}

export const US_STATES: Record<string, string> = {
  alabama: 'Alabama',
  alaska: 'Alaska',
  arizona: 'Arizona',
  arkansas: 'Arkansas',
  california: 'California',
  colorado: 'Colorado',
  connecticut: 'Connecticut',
  delaware: 'Delaware',
  florida: 'Florida',
  georgia: 'Georgia',
  hawaii: 'Hawaii',
  idaho: 'Idaho',
  illinois: 'Illinois',
  indiana: 'Indiana',
  iowa: 'Iowa',
  kansas: 'Kansas',
  kentucky: 'Kentucky',
  louisiana: 'Louisiana',
  maine: 'Maine',
  maryland: 'Maryland',
  massachusetts: 'Massachusetts',
  michigan: 'Michigan',
  minnesota: 'Minnesota',
  mississippi: 'Mississippi',
  missouri: 'Missouri',
  montana: 'Montana',
  nebraska: 'Nebraska',
  nevada: 'Nevada',
  'new-hampshire': 'New Hampshire',
  'new-jersey': 'New Jersey',
  'new-mexico': 'New Mexico',
  'new-york': 'New York',
  'north-carolina': 'North Carolina',
  'north-dakota': 'North Dakota',
  ohio: 'Ohio',
  oklahoma: 'Oklahoma',
  oregon: 'Oregon',
  pennsylvania: 'Pennsylvania',
  'rhode-island': 'Rhode Island',
  'south-carolina': 'South Carolina',
  'south-dakota': 'South Dakota',
  tennessee: 'Tennessee',
  texas: 'Texas',
  utah: 'Utah',
  vermont: 'Vermont',
  virginia: 'Virginia',
  washington: 'Washington',
  'west-virginia': 'West Virginia',
  wisconsin: 'Wisconsin',
  wyoming: 'Wyoming',
};

export const STATE_DETAILS: Record<string, StateDetail> = {
  alabama: {
    name: 'Alabama',
    localRegions: 'from Huntsville\'s biotech corridor to the industrial hubs of Birmingham',
    economicFocus: 'aerospace engineering, manufacturing, and growing tech hubs',
    regionalPainPoint: 'migrating legacy systems to modern, cloud-native frameworks without disrupting active operations',
    regionalValueProp: 'enterprise-grade security coupled with cost-efficient delivery models',
    adjective: 'industrial-strength'
  },
  alaska: {
    name: 'Alaska',
    localRegions: 'from Anchorage\'s shipping corridors to Juneau\'s commerce networks',
    economicFocus: 'logistics, remote tourism, and resource management systems',
    regionalPainPoint: 'delivering ultra-fast, low-bandwidth optimized interfaces for remote connection speeds',
    regionalValueProp: 'lightweight, performance-first assets that load instantly anywhere',
    adjective: 'highly resilient'
  },
  arizona: {
    name: 'Arizona',
    localRegions: 'from Phoenix\'s tech valley to Tucson\'s defense and research sectors',
    economicFocus: 'semiconductor innovation, clean-tech, and scaling SaaS platforms',
    regionalPainPoint: 'standing out in a highly competitive, fast-growing Southwest digital marketplace',
    regionalValueProp: 'high-converting user acquisition pipelines tailored to active markets',
    adjective: 'rapidly expanding'
  },
  arkansas: {
    name: 'Arkansas',
    localRegions: 'from Northwest Arkansas\' retail empires to Little Rock\'s financial centers',
    economicFocus: 'global supply chains, logistics, and corporate retail networks',
    regionalPainPoint: 'integrating complex inventory, ERP, and shipping databases with customer-facing portals',
    regionalValueProp: 'robust database integrations and custom middleware solutions',
    adjective: 'supply-chain native'
  },
  california: {
    name: 'California',
    localRegions: 'from Silicon Valley\'s startup ecosystem to Los Angeles\' creative and entertainment hubs',
    economicFocus: 'venture-backed startups, digital entertainment, and high-growth DTC brands',
    regionalPainPoint: 'capturing market share in an saturated digital landscape with skyrocketing customer acquisition costs',
    regionalValueProp: 'visually disruptive, premium design systems built on next-gen frameworks',
    adjective: 'tech-driven'
  },
  colorado: {
    name: 'Colorado',
    localRegions: 'from Denver\'s urban tech centers to Boulder\'s active-lifestyle and aerospace hubs',
    economicFocus: 'outdoor lifestyle brands, environmental tech, and aerospace scaleups',
    regionalPainPoint: 'translating active, real-world brand values into engaging interactive digital experiences',
    regionalValueProp: 'authentic brand storytelling backed by custom WebGL and motion graphics',
    adjective: 'outdoor-centric'
  },
  connecticut: {
    name: 'Connecticut',
    localRegions: 'from Hartford\'s insurance capital to the corporate corridors of Stamford',
    economicFocus: 'insurance technology (InsurTech), financial services, and wealth management',
    regionalPainPoint: 'meeting strict data compliance standards while keeping customer experiences modern and smooth',
    regionalValueProp: 'secure, compliance-friendly development and accessible UI/UX layouts',
    adjective: 'compliance-focused'
  },
  delaware: {
    name: 'Delaware',
    localRegions: 'from Wilmington\'s banking sectors to the commercial zones of Dover',
    economicFocus: 'corporate services, banking technology, and legal frameworks',
    regionalPainPoint: 'managing complex multi-tenant client portals and transaction-heavy backends securely',
    regionalValueProp: 'enterprise-level data protection and highly scalable client portals',
    adjective: 'finance-grade'
  },
  florida: {
    name: 'Florida',
    localRegions: 'from Miami\'s web3 and startup hubs to Orlando\'s tourism and hospitality networks',
    economicFocus: 'high-volume e-commerce, hospitality, real estate, and healthcare leaders',
    regionalPainPoint: 'converting volatile seasonal traffic spikes into consistent, year-round digital revenue',
    regionalValueProp: 'high-capacity hosting architectures and optimized checkout pathways',
    adjective: 'conversion-optimized'
  },
  georgia: {
    name: 'Georgia',
    localRegions: 'from Atlanta\'s fintech and transaction hub to Savannah\'s global ports',
    economicFocus: 'financial technology (FinTech), logistics, and creative digital agencies',
    regionalPainPoint: 'building secure payment processing portals and supply-chain interfaces with zero downtime',
    regionalValueProp: 'robust payment gateway integrations and custom shipping trackers',
    adjective: 'logistics-focused'
  },
  hawaii: {
    name: 'Hawaii',
    localRegions: 'from Honolulu\'s travel networks to the local commerce grids of Maui',
    economicFocus: 'tourism, luxury hospitality, and native consumer brands',
    regionalPainPoint: 'engaging international audiences while preserving local cultural brand integrity online',
    regionalValueProp: 'immersive multimedia experiences and multi-language localized designs',
    adjective: 'hospitality-oriented'
  },
  idaho: {
    name: 'Idaho',
    localRegions: 'from Boise\'s booming tech valley to the agricultural centers of Idaho Falls',
    economicFocus: 'enterprise technology, agricultural logistics, and scaling consumer goods',
    regionalPainPoint: 'digitizing traditional business workflows to keep pace with rapid regional growth',
    regionalValueProp: 'clean, functional layouts that streamline legacy business operations',
    adjective: 'growth-oriented'
  },
  illinois: {
    name: 'Illinois',
    localRegions: 'from Chicago\'s Loop financial center to the logistics hubs of Peoria',
    economicFocus: 'industrial logistics, commodity trading, and financial technology scaleups',
    regionalPainPoint: 'processing huge datasets and real-time transaction records without database latency',
    regionalValueProp: 'high-throughput server-side rendering and database index optimizations',
    adjective: 'enterprise-class'
  },
  indiana: {
    name: 'Indiana',
    localRegions: 'from Indianapolis\' tech sector to the manufacturing centers of Fort Wayne',
    economicFocus: 'marketing technology, medical manufacturing, and logistics companies',
    regionalPainPoint: 'maintaining consistent B2B lead pipelines in a shifting national manufacturing landscape',
    regionalValueProp: 'high-converting landing pages and automated CRM lead capture systems',
    adjective: 'manufacturing-native'
  },
  iowa: {
    name: 'Iowa',
    localRegions: 'from Des Moines\' financial sector to the agtech hubs of Cedar Rapids',
    economicFocus: 'agricultural technology (AgTech), financial services, and local commerce',
    regionalPainPoint: 'building trust with traditional consumer bases while introducing modern digital products',
    regionalValueProp: 'clear, accessible design systems that prioritize user ease and accessibility',
    adjective: 'agtech-centric'
  },
  kansas: {
    name: 'Kansas',
    localRegions: 'from Wichita\'s aviation sector to the corporate parks of Overland Park',
    economicFocus: 'aerospace manufacturing, agricultural distribution, and corporate logistics',
    regionalPainPoint: 'scaling B2B dealer and distributor portals to support national sales networks',
    regionalValueProp: 'complex multi-role portal development and custom access controls',
    adjective: 'distribution-focused'
  },
  kentucky: {
    name: 'Kentucky',
    localRegions: 'from Louisville\'s logistics networks to Lexington\'s equine and manufacturing hubs',
    economicFocus: 'national distribution logistics, manufacturing, and consumer goods',
    regionalPainPoint: 'building resilient shipping calculators and fulfillment dashboards that run smoothly',
    regionalValueProp: 'custom shipping APIs and automated inventory syncing setups',
    adjective: 'logistics-native'
  },
  louisiana: {
    name: 'Louisiana',
    localRegions: 'from New Orleans\' tourism district to Baton Rouge\'s shipping terminals',
    economicFocus: 'cultural tourism, energy logistics, and maritime trade',
    regionalPainPoint: 'optimizing booking pipelines and travel platforms for mobile users in real-time',
    regionalValueProp: 'highly responsive booking engines and lightweight media assets',
    adjective: 'tourism-oriented'
  },
  maine: {
    name: 'Maine',
    localRegions: 'from Portland\'s creative ports to the manufacturing zones of Bangor',
    economicFocus: 'artisanal consumer goods, tourism, and maritime logistics',
    regionalPainPoint: 'scaling local DTC brands to compete effectively in national e-commerce channels',
    regionalValueProp: 'premium Shopify store builds and search-optimized product schemas',
    adjective: 'artisanal-centric'
  },
  maryland: {
    name: 'Maryland',
    localRegions: 'from Baltimore\'s biotech labs to the defense corridors of Rockville',
    economicFocus: 'biotechnology, federal defense contracting, and health informatics',
    regionalPainPoint: 'adhering to rigorous state and federal data privacy standards without sacrificing UX',
    regionalValueProp: 'highly secure, HIPAA-aligned architectures and clean data schemas',
    adjective: 'security-first'
  },
  massachusetts: {
    name: 'Massachusetts',
    localRegions: 'from Boston\'s biotech and VC sectors to Worcester\'s research corridors',
    economicFocus: 'biomedical research, advanced robotics, and academic SaaS products',
    regionalPainPoint: 'presenting highly complex scientific and technical datasets in intuitive consumer layouts',
    regionalValueProp: 'clean data visualization, dashboard designs, and interactive charts',
    adjective: 'academic-grade'
  },
  michigan: {
    name: 'Michigan',
    localRegions: 'from Detroit\'s automotive tech hubs to Grand Rapids\' manufacturing centers',
    economicFocus: 'automotive software, advanced manufacturing, and tech scaleups',
    regionalPainPoint: 'modernizing legacy industrial brand images to attract next-gen digital clients',
    regionalValueProp: 'sleek visual overhauls and strategy-led rebranding campaigns',
    adjective: 'engineering-centric'
  },
  minnesota: {
    name: 'Minnesota',
    localRegions: 'from the Twin Cities\' corporate centers to Duluth\'s commerce shipping lanes',
    economicFocus: 'medical devices, corporate retail, and Fortune 500 business systems',
    regionalPainPoint: 'designing massive websites with thousands of pages while maintaining strict brand consistency',
    regionalValueProp: 'modular Tailwind design systems and automated asset workflows',
    adjective: 'corporate-scale'
  },
  mississippi: {
    name: 'Mississippi',
    localRegions: 'from Jackson\'s business districts to the Gulf Coast shipyards',
    economicFocus: 'agriculture, manufacturing, and healthcare networks',
    regionalPainPoint: 'extending digital reach to rural customer segments with slow internet speeds',
    regionalValueProp: 'ultra-optimized asset bundles and fast, light-weight HTML generation',
    adjective: 'highly accessible'
  },
  missouri: {
    name: 'Missouri',
    localRegions: 'from St. Louis\' biotech hubs to Kansas City\'s tech and logistics corridors',
    economicFocus: 'agtech, transport logistics, and financial service platforms',
    regionalPainPoint: 'connecting diverse transport tracking systems with clean customer dashboard designs',
    regionalValueProp: 'custom API integrations and real-time transit status widgets',
    adjective: 'transit-focused'
  },
  montana: {
    name: 'Montana',
    localRegions: 'from Bozeman\'s tech hub to Missoula\'s outdoor and creative sectors',
    economicFocus: 'outdoor recreation, nature tourism, and boutique DTC brands',
    regionalPainPoint: 'capturing the rugged, organic spirit of the brand inside a clean digital interface',
    regionalValueProp: 'custom interactive animations and atmospheric, premium styling',
    adjective: 'lifestyle-centric'
  },
  nebraska: {
    name: 'Nebraska',
    localRegions: 'from Omaha\'s financial and insurance core to Lincoln\'s startup hub',
    economicFocus: 'insurance tech (InsurTech), agricultural logistics, and finance',
    regionalPainPoint: 'designing clear, self-service claims and quote systems that reduce manual support tickets',
    regionalValueProp: 'intuitive form layouts and automated customer registration scripts',
    adjective: 'service-focused'
  },
  nevada: {
    name: 'Nevada',
    localRegions: 'from Las Vegas\' entertainment sectors to Reno\'s logistics and battery parks',
    economicFocus: 'hospitality, event management, and industrial logistics',
    regionalPainPoint: 'building real-time event booking and inventory check systems that prevent double-booking',
    regionalValueProp: 'highly reliable concurrent database locking and real-time API syncs',
    adjective: 'hospitality-native'
  },
  'new-hampshire': {
    name: 'New Hampshire',
    localRegions: 'from Manchester\'s tech mills to the Portsmouth commercial harbors',
    economicFocus: 'industrial manufacturing, healthcare systems, and tech startups',
    regionalPainPoint: 'migrating desktop-only industrial software to responsive, mobile-first web apps',
    regionalValueProp: 'fluid mobile-first layout conversions and modern web framework upgrades',
    adjective: 'industrial-tech'
  },
  'new-jersey': {
    name: 'New Jersey',
    localRegions: 'from Jersey City\'s financial center to the pharmaceutical corridors of Princeton',
    economicFocus: 'pharmaceutical research, distribution logistics, and financial tech',
    regionalPainPoint: 'validating clinical trial and supply metrics across distributed networks securely',
    regionalValueProp: 'fully audited, secure database endpoints and compliance compliance structures',
    adjective: 'pharma-grade'
  },
  'new-mexico': {
    name: 'New Mexico',
    localRegions: 'from Albuquerque\'s research zones to Santa Fe\'s creative sectors',
    economicFocus: 'aerospace engineering, energy research, and creative arts commerce',
    regionalPainPoint: 'showcasing visually complex creative portfolios or scientific papers elegantly',
    regionalValueProp: 'custom gallery structures and clean, focus-worthy typography layouts',
    adjective: 'research-aligned'
  },
  'new-york': {
    name: 'New York',
    localRegions: 'from Manhattan\'s global financial core to the tech incubators of Brooklyn',
    economicFocus: 'global finance, digital media, creative advertising, and tech startups',
    regionalPainPoint: 'standing out in the world\'s most competitive and aggressive market for consumer attention',
    regionalValueProp: 'high-end, custom WebGL animations and cinematic digital experiences',
    adjective: 'prestige-caliber'
  },
  'north-carolina': {
    name: 'North Carolina',
    localRegions: 'from the Research Triangle\'s biotech hubs to Charlotte\'s financial center',
    economicFocus: 'biomedical research, banking technology, and high-growth SaaS platforms',
    regionalPainPoint: 'aligning strict corporate banking protocols with clean, modern consumer web design',
    regionalValueProp: 'secure, high-performance web structures built on Next.js Turbopack',
    adjective: 'banking-grade'
  },
  'north-dakota': {
    name: 'North Dakota',
    localRegions: 'from Fargo\'s tech startups to the energy logistics sectors of Bismarck',
    economicFocus: 'agricultural logistics, industrial energy, and tech services',
    regionalPainPoint: 'building robust machinery rental and shipping tools that handle custom pricing tiers',
    regionalValueProp: 'flexible ecommerce checkout matrices and dynamic pricing engines',
    adjective: 'commerce-centric'
  },
  ohio: {
    name: 'Ohio',
    localRegions: 'from Columbus\' startup hub to the industrial centers of Cleveland and Cincinnati',
    economicFocus: 'logistics technology, manufacturing, and health networks',
    regionalPainPoint: 'connecting physical distribution databases with online B2B ordering portals',
    regionalValueProp: 'real-time inventory syncing and automated order processing interfaces',
    adjective: 'logistics-centric'
  },
  oklahoma: {
    name: 'Oklahoma',
    localRegions: 'from Oklahoma City\'s energy hub to Tulsa\'s aerospace corridors',
    economicFocus: 'aerospace maintenance, energy logistics, and agricultural trade',
    regionalPainPoint: 'creating complex data management dashboards that remain responsive on tablets and mobiles',
    regionalValueProp: 'highly responsive CSS grid layouts and modular dashboard elements',
    adjective: 'energy-aligned'
  },
  oregon: {
    name: 'Oregon',
    localRegions: 'from Portland\'s creative tech grid to the active-apparel hubs of Beaverton',
    economicFocus: 'active-apparel, environmental tech, and creative startups',
    regionalPainPoint: 'establishing distinct brand stories that connect with environmentally conscious consumers',
    regionalValueProp: 'creative, organic visual layouts that capture brand personality',
    adjective: 'sustainable-focus'
  },
  pennsylvania: {
    name: 'Pennsylvania',
    localRegions: 'from Philadelphia\'s biotech hubs to Pittsburgh\'s robotics and healthcare sectors',
    economicFocus: 'healthcare systems, advanced robotics, and business services',
    regionalPainPoint: 'simplifying complex patient and client onboarding flows to increase conversion rates',
    regionalValueProp: 'optimized user journey mapping and friction-free onboarding forms',
    adjective: 'clinical-grade'
  },
  'rhode-island': {
    name: 'Rhode Island',
    localRegions: 'from Providence\'s creative design studios to Newport\'s marine commerce',
    economicFocus: 'design services, marine technologies, and local DTC brands',
    regionalPainPoint: 'presenting heritage brand assets in a modern, mobile-friendly interface',
    regionalValueProp: 'refined typography layouts and classic design principles with modern web tech',
    adjective: 'heritage-aligned'
  },
  'south-carolina': {
    name: 'South Carolina',
    localRegions: 'from Charleston\'s tech community to the industrial hubs of Greenville',
    economicFocus: 'tourism, automotive engineering, and high-growth tech startups',
    regionalPainPoint: 'creating high-conversion landing pages that capture both tourist and local B2B leads',
    regionalValueProp: 'local search engine optimization and lightning-fast page loading speeds',
    adjective: 'growth-oriented'
  },
  'south-dakota': {
    name: 'South Dakota',
    localRegions: 'from Sioux Falls\' financial hubs to the tourism networks of Rapid City',
    economicFocus: 'financial services, banking compliance, and tourism commerce',
    regionalPainPoint: 'structuring high-volume loan and payment calculation widgets securely and reliably',
    regionalValueProp: 'custom client-side calculation utilities and optimized JS packages',
    adjective: 'finance-focused'
  },
  tennessee: {
    name: 'Tennessee',
    localRegions: 'from Nashville\'s healthcare and music hubs to Memphis\' logistics corridors',
    economicFocus: 'healthcare administration, music entertainment, and global cargo logistics',
    regionalPainPoint: 'developing highly visual entertainment pages alongside highly secure health database portals',
    regionalValueProp: 'versatile design systems that serve both visual branding and structural security',
    adjective: 'multimedia-capable'
  },
  texas: {
    name: 'Texas',
    localRegions: 'from Austin\'s tech silicon hills to the corporate hubs of Dallas and Houston',
    economicFocus: 'high-growth technology hubs, energy corporations, and scaling enterprises',
    regionalPainPoint: 'supporting massive user scaling and regional traffic surges without page slowdowns',
    regionalValueProp: 'highly scalable next-gen server architectures and content delivery network caching',
    adjective: 'enterprise-ready'
  },
  utah: {
    name: 'Utah',
    localRegions: 'from Salt Lake City\'s Silicon Slopes to the active hubs of Provo',
    economicFocus: 'venture-backed SaaS platforms, active-lifestyle, and ecommerce brands',
    regionalPainPoint: 'optimizing product trial signup flows to maximize monthly recurring revenue conversions',
    regionalValueProp: 'SaaS-oriented UX patterns and conversion-focused call-to-action designs',
    adjective: 'saas-optimized'
  },
  vermont: {
    name: 'Vermont',
    localRegions: 'from Burlington\'s commerce grids to local regional craft hubs',
    economicFocus: 'artisanal foods, ecological tourism, and local trade cooperatives',
    regionalPainPoint: 'communicating hyper-local, craft values to national digital shoppers online',
    regionalValueProp: 'handcrafted-feel design layouts paired with modern e-commerce checkout flows',
    adjective: 'craft-oriented'
  },
  virginia: {
    name: 'Virginia',
    localRegions: 'from Arlington\'s tech hubs to the defense corridors of Hampton Roads',
    economicFocus: 'defense contracting, government technology, and cloud infrastructure scaleups',
    regionalPainPoint: 'building accessible interfaces that fully meet federal compliance (Section 508) guidelines',
    regionalValueProp: 'fully accessible web interfaces and strict code verification audits',
    adjective: 'accessibility-native'
  },
  washington: {
    name: 'Washington',
    localRegions: 'from Seattle\'s tech giants to the agricultural and logistics sectors of Spokane',
    economicFocus: 'cloud computing scaleups, retail operations, and tech innovators',
    regionalPainPoint: 'connecting diverse API systems and data pipes with simple, logical customer backends',
    regionalValueProp: 'expert Next.js developer integration and clean API structures',
    adjective: 'cloud-scale'
  },
  'west-virginia': {
    name: 'West Virginia',
    localRegions: 'from Charleston\'s industrial sectors to the tourism networks of Morgantown',
    economicFocus: 'energy production, natural resource tourism, and localized services',
    regionalPainPoint: 'designing simple, high-visibility sites that load over unpredictable rural mobile connections',
    regionalValueProp: 'high-performance asset reduction and responsive styling optimization',
    adjective: 'mobile-optimized'
  },
  wisconsin: {
    name: 'Wisconsin',
    localRegions: 'from Milwaukee\'s engineering sector to the tech startups of Madison',
    economicFocus: 'precision engineering, agricultural technology, and software scaleups',
    regionalPainPoint: 'building interactive configuration tools for complex engineering and product catalogs',
    regionalValueProp: 'interactive custom JavaScript configuration interfaces and step-by-step forms',
    adjective: 'engineering-grade'
  },
  wyoming: {
    name: 'Wyoming',
    localRegions: 'from Cheyenne\'s data storage grids to Jackson\'s travel destinations',
    economicFocus: 'data centers, hospitality services, and mineral logistics',
    regionalPainPoint: 'creating clean online brochures and booking flows that load instantly with zero layout shifts',
    regionalValueProp: 'static site generation and highly optimized web layout standards',
    adjective: 'static-performance'
  }
};
