import { US_STATES, STATE_DETAILS } from './states';

// Deterministic hashing to map a slug combination to a specific template index.
// Prevents hydration mismatches by ensuring identical render output on client & server.
export function getDeterministicIndex(str: string, count: number): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % count;
}

// Categorizes 20 service slugs into 4 core functional groups to generate relevant copy parameters.
export function getServiceCategory(slug: string): 'design' | 'dev' | 'seo' | 'specialized' {
    const designSlugs = ['custom-web-design', 'website-redesign', 'branding', 'ui-ux-design'];
    const devSlugs = ['web-development', 'shopify-development', 'custom-cms', 'mobile-development', 'api-integrations', 'cloud-infrastructure'];
    const seoSlugs = ['seo-optimization', 'performance-marketing', 'social-media-ugc', 'geo-optimization', 'aeo-optimization', 'ai-lead-generation'];
    
    if (designSlugs.includes(slug)) return 'design';
    if (devSlugs.includes(slug)) return 'dev';
    if (seoSlugs.includes(slug)) return 'seo';
    return 'specialized';
}

export function getPSEOTemplates(
    lang: string,
    serviceSlug: string,
    serviceName: string,
    stateSlug: string,
    stateName: string
) {
    const hashKey = `${serviceSlug}-${stateSlug}`;
    const category = getServiceCategory(serviceSlug);
    const state = STATE_DETAILS[stateSlug] || {
        name: stateName,
        localRegions: `across the state of ${stateName}`,
        economicFocus: 'business and technology services',
        regionalPainPoint: 'standing out in a competitive digital space',
        regionalValueProp: 'high-quality custom digital systems',
        adjective: 'results-driven'
    };

    // 1. Who This Service Is For (3 variations per category)
    const whoForPools = {
        design: [
            [`Scaling Startups ${state.localRegions}`, 'E-commerce & DTC Brands', 'Growing B2B Enterprises', `Modern Agencies in ${stateName}`],
            [`Local Service Providers ${state.localRegions}`, 'Product Design Teams', 'Venture-Backed Brands', 'Rebranding Corporations'],
            [`Tech & SaaS Platforms in ${stateName}`, 'High-Growth Retailers', 'Professional Service Firms', 'Multi-Location Brands'],
        ],
        dev: [
            [`Engineering Teams ${state.localRegions}`, 'SaaS & Tech Platforms', 'High-Traffic E-commerce Sites', 'Enterprises Needing Custom Code'],
            [`Growth-Stage Startups in ${stateName}`, 'Data-Driven Businesses', 'Custom Tooling Seekers', 'Scaleups Seeking Custom Architecture'],
            ['API-First Businesses', 'Mobile-Centric Brands', `Modern Tech Ventures ${state.localRegions}`, 'Infrastructure Scaleups'],
        ],
        seo: [
            ['B2B Lead Generation Brands', 'E-commerce Store Owners', `Local Service Companies ${state.localRegions}`, 'High-Growth Startups'],
            ['Search-Focused Businesses', 'Content-Driven Creators', `Firms Targeting ${stateName} Searchers`, 'Venture-Backed Platforms'],
            [`Data-Led Marketing Directors in ${stateName}`, 'Direct-to-Consumer Brands', 'National Companies', 'SEO-First Operations'],
        ],
        specialized: [
            [`Healthcare Providers in ${stateName}`, 'AI-Integrated Platforms', 'Firms Requiring Web Maintenance', 'Security-First Businesses'],
            ['Telemedicine Startups', 'Automated Workflow Teams', `Scaleups ${state.localRegions} Seeking Web Support`, 'Regulated Industry Leaders'],
            [`Tech Innovators in ${stateName}`, 'AI Product Builders', 'Corporate Web Support Seekers', 'Compliance-Driven Brands'],
        ]
    };
    const whoForIndex = getDeterministicIndex(hashKey + '-whoFor', whoForPools[category].length);
    const whoFor = whoForPools[category][whoForIndex];

    // 2. What's Included (Checklist deliverables, 5 per pool dynamically selected)
    const includesPools = {
        design: [
            'Tailored visual style guide',
            'Responsive mobile-optimized screens',
            'User journey mapping & UX audit',
            'High-fidelity Figma prototypes',
            'Interactive micro-animations',
            'Modern branding systems',
            'Asset handoff & styling guidelines'
        ],
        dev: [
            'Clean semantic codebases',
            'Custom database integrations',
            'Server-side rendering (SSR) setups',
            'REST/GraphQL API endpoints',
            'Dynamic headless CMS architectures',
            'Robust serverless functions',
            'Automated deployment pipelines'
        ],
        seo: [
            'Comprehensive keyword mapping',
            'Site speed & Core Web Vitals tune-ups',
            'Structured data & Schema integration',
            'On-page SEO optimization audit',
            'Localized search intent strategy',
            'Performance tracking dashboards',
            'Content structure planning'
        ],
        specialized: [
            'Secure database integrations',
            'AI API & model integrations',
            '24/7 server monitoring & backups',
            'Automated security patching',
            'Automated lead scraping workflows',
            'LLM pipeline integrations',
            'Continuous uptime validation'
        ]
    };
    const includesIndex = getDeterministicIndex(hashKey + '-includes', 3);
    const includesPool = includesPools[category];
    const includes = [
        includesPool[includesIndex % includesPool.length],
        includesPool[(includesIndex + 1) % includesPool.length],
        includesPool[(includesIndex + 2) % includesPool.length],
        includesPool[(includesIndex + 3) % includesPool.length],
        includesPool[(includesIndex + 4) % includesPool.length]
    ];

    // 3. Business Benefits (4 dynamically selected)
    const benefitsPools = {
        design: [
            `Elevated brand authority in ${stateName}`,
            'Higher user engagement & dwell time',
            'Lower bounce rates across devices',
            'Increased conversion rates',
            'Cohesive digital identity',
            'Stronger customer trust signals'
        ],
        dev: [
            'Uncompromising site performance',
            'Flexible and scalable tech stack',
            'Reduced long-term development costs',
            'Improved operational efficiency',
            'Secure and fast user sessions',
            'Seamless third-party tools integration'
        ],
        seo: [
            'Consistent flow of organic leads',
            `Dominant rankings in ${stateName} search`,
            'Lower customer acquisition costs',
            'Maximized return on ad spend (ROAS)',
            'Data-backed marketing insights',
            'Continuous search engine visibility'
        ],
        specialized: [
            'High reliability & system uptime',
            'Compliance with industry standards',
            'Automated pipeline efficiencies',
            'Reduced manual operational hours',
            `Uptime assurance in ${stateName}`,
            'AI-driven scalability benefits'
        ]
    };
    const benefitsIndex = getDeterministicIndex(hashKey + '-benefits', 3);
    const benefitsPool = benefitsPools[category];
    const benefits = [
        benefitsPool[benefitsIndex % benefitsPool.length],
        benefitsPool[(benefitsIndex + 1) % benefitsPool.length],
        benefitsPool[(benefitsIndex + 2) % benefitsPool.length],
        benefitsPool[(benefitsIndex + 3) % benefitsPool.length]
    ];

    // 4. English dynamic templates (Substantially unique copy with local context)
    if (lang === 'en' || !['es', 'fr', 'de'].includes(lang)) {
        const titleTemplates = [
            `${serviceName} Services in ${stateName}`,
            `Premium ${serviceName} for ${stateName} Brands`,
            `High-Performance ${serviceName} | Serving ${stateName}`
        ];
        const descTemplates = [
            `We deliver custom, results-driven ${serviceName.toLowerCase()} ${state.localRegions}, optimized for ${state.economicFocus}.`,
            `Transform your brand in ${stateName} with our elite ${serviceName.toLowerCase()} solutions. We address the challenge of ${state.regionalPainPoint} to drive results.`,
            `From fast-growing teams to established firms ${state.localRegions}, we provide high-performance ${serviceName.toLowerCase()} backed by our ${state.regionalValueProp}.`
        ];
        const whyChooseTemplates = [
            [
                { title: 'Strategy-First Mindset', description: `We don't just build; we strategize to meet your exact business goals in ${stateName} and optimize for ${state.economicFocus}.` },
                { title: 'SEO & Performance Native', description: 'Built-in speed and optimization from the very first line of code to reduce load latency.' },
                { title: 'Global-First Quality', description: `Delivering international standards of design and dev to local leaders ${state.localRegions}.` },
                { title: 'True Partnership', description: 'We function as an extension of your growth and development team long-term.' }
            ],
            [
                { title: 'Modern Stack Experts', description: 'Harnessing React, Next.js, and headless CMS for lightning-fast speeds and reliable systems.' },
                { title: 'Transparent Workflow', description: 'Track every milestone with direct communication, slack integrations, and live staging.' },
                { title: 'Data-Driven Decisions', description: `We rely on analytics and user research to address your pain point of ${state.regionalPainPoint}.` },
                { title: 'Scalable Architecture', description: 'Building modular solutions ready to expand as your business grows and expands.' }
            ],
            [
                { title: 'Outcome-Based Delivery', description: 'Focused on metrics that matter—leads, search rankings, conversions, and revenue.' },
                { title: 'Clean & Documented Code', description: 'Zero technical debt, ensuring easy handoffs, fast deployments, and future updates.' },
                { title: 'Design Excellence', description: `Premium aesthetic crafted to make your brand stand out in the crowded ${stateName} marketplace.` },
                { title: 'Continuous Support', description: 'Proactive maintenance, performance tuning, and optimizations long after the launch.' }
            ]
        ];
        const processTemplates = [
            [
                { title: 'Discovery & Analysis', description: `Understanding your goals, market positioning, and audience in the ${stateName} landscape.` },
                { title: 'Strategy & Roadmap', description: `Creating a detailed execution plan, wireframes, and tech specifications optimized for ${state.adjective} needs.` },
                { title: 'Design & Build', description: 'Developing high-fidelity assets and writing clean, scalable, and secure code.' },
                { title: 'Launch & Growth', description: 'Final deployment, testing, and transition to ongoing marketing, hosting, or support.' }
            ],
            [
                { title: 'Research & Audits', description: `Reviewing competitor landscapes and auditing current assets for ${stateName} businesses.` },
                { title: 'Concept & Architecture', description: `Formulating the user journey, design system, and database structures to resolve ${state.regionalPainPoint}.` },
                { title: 'Production & QA', description: 'High-fidelity execution coupled with rigorous testing on all viewports, screens, and browsers.' },
                { title: 'Release & Optimization', description: 'Pushing live with continuous monitoring of speed, analytics, and conversion metrics.' }
            ],
            [
                { title: 'Alignment & Kickoff', description: `Clarifying project parameters, timelines, and success metrics for your ${stateName} team.` },
                { title: 'Prototyping & UX', description: 'Drafting interactive layouts to validate user flows and system logic before coding.' },
                { title: 'Development & Integration', description: 'Writing performant code and integrating APIs, analytics, databases, and CRM tools.' },
                { title: 'Deployment & Handover', description: 'Going live smoothly with training, documentation, and support provided to your staff.' }
            ]
        ];
        const growthTemplates = [
            `Investing in custom ${serviceName.toLowerCase()} is a strategic lever for sustainable growth in ${stateName}. In a market defined by ${state.economicFocus}, success requires more than generic templates. By focusing on resolving the issue of ${state.regionalPainPoint}, we help local businesses establish long-term competitive advantages and scalable systems.`,
            `To capture market share ${state.localRegions}, your digital infrastructure must scale with your traffic. Our custom ${serviceName.toLowerCase()} services combine ${state.regionalValueProp} with modern engineering to turn your online assets into high-converting revenue channels.`,
            `For established brands in ${stateName}, modern ${serviceName.toLowerCase()} is the ultimate growth catalyst. We solve the specific friction of ${state.regionalPainPoint} by deploying modular, fast, and search-optimized digital architectures that deliver compound value.`
        ];
        const ctaTitleTemplates = [
            `Ready to Scale Your ${serviceName} in ${stateName}?`,
            `Let's Build Something Exceptional in ${stateName}`,
            `Elevate Your Digital Presence in ${stateName} Today`
        ];
        const ctaDescTemplates = [
            `Get in touch with our team for a free consultation. We'll map out a customized ${serviceName.toLowerCase()} strategy tailored to ${state.economicFocus}.`,
            `Book a strategy call to discuss how our bespoke ${serviceName.toLowerCase()} services can drive conversions and rankings to address ${state.regionalPainPoint}.`,
            `Let's talk about your next project. We will show you how high-performance ${serviceName.toLowerCase()} backed by ${state.regionalValueProp} can accelerate growth.`
        ];

        const index = getDeterministicIndex(hashKey, 3);

        return {
            detailTitle: titleTemplates[index],
            detailSubtitle: descTemplates[index],
            whoFor,
            includes,
            benefits,
            whyChoose: whyChooseTemplates[index],
            process: processTemplates[index],
            growthSupport: growthTemplates[index],
            ctaTitle: ctaTitleTemplates[index],
            ctaSubtitle: ctaDescTemplates[index]
        };
    }

    // 5. Spanish dynamic templates (Fully translated with dynamic state parameters)
    if (lang === 'es') {
        const titleTemplates = [
            `Servicios de ${serviceName} en ${stateName}`,
            `Premium ${serviceName} para Marcas en ${stateName}`,
            `${serviceName} de Alto Rendimiento en ${stateName}`
        ];
        const descTemplates = [
            `Ofrecemos soluciones personalizadas de ${serviceName.toLowerCase()} ${state.localRegions}, enfocadas en velocidad, escalabilidad y la economía de ${state.economicFocus}.`,
            `Transforma tu presencia digital en ${stateName} con nuestros servicios de ${serviceName.toLowerCase()}. Diseñados para mitigar la fricción de ${state.regionalPainPoint}.`
        ];
        const growthTemplates = [
            `Invertir en ${serviceName.toLowerCase()} es una decisión estratégica para el crecimiento sostenible en ${stateName}. Alineamos tecnología avanzada con SEO local para resolver la dificultad de ${state.regionalPainPoint}.`,
            `Un enfoque a la medida de ${serviceName.toLowerCase()} permite a las empresas de ${stateName} construir ventajas competitivas duraderas, potenciado por ${state.regionalValueProp}.`
        ];
        const ctaTitleTemplates = [
            `¿Listo para potenciar tu ${serviceName} en ${stateName}?`,
            `Construyamos algo excepcional en ${stateName}`
        ];

        const index = getDeterministicIndex(hashKey, 2);

        return {
            detailTitle: titleTemplates[index],
            detailSubtitle: descTemplates[index],
            whoFor,
            includes,
            benefits,
            whyChoose: [
                { title: 'Enfoque Estratégico', description: `Desarrollamos soluciones adaptadas a los objetivos de tu negocio en ${stateName} y enfocadas en ${state.economicFocus}.` },
                { title: 'Velocidad y SEO', description: 'Optimización y rendimiento garantizados desde la primera línea de código para resolver problemas de indexación.' },
                { title: 'Estándares Internacionales', description: `Ofrecemos diseño y desarrollo de calidad global a líderes locales ${state.localRegions}.` },
                { title: 'Soporte Continuo', description: 'Somos socios en tu crecimiento a largo plazo.' }
            ],
            process: [
                { title: 'Análisis y Descubrimiento', description: `Entendemos tu mercado, competencia y objetivos en la región de ${stateName}.` },
                { title: 'Estrategia y Planificación', description: `Diseñamos la arquitectura y definimos la tecnología adecuada para resolver ${state.regionalPainPoint}.` },
                { title: 'Desarrollo y Pruebas', description: 'Escribimos código limpio, rápido y escalable con validación completa de seguridad.' },
                { title: 'Lanzamiento', description: 'Despliegue final con monitoreo continuo de velocidad y tasas de conversión.' }
            ],
            growthSupport: growthTemplates[index],
            ctaTitle: ctaTitleTemplates[index],
            ctaSubtitle: `Agenda una llamada estratégica hoy para conversar sobre cómo nuestro servicio de ${serviceName.toLowerCase()} impulsará los resultados de tu empresa en ${stateName}.`
        };
    }

    // 6. French dynamic templates
    if (lang === 'fr') {
        const titleTemplates = [
            `Services de ${serviceName} en ${stateName}`,
            `${serviceName} Premium pour les Marques en ${stateName}`,
            `Performance ${serviceName} en ${stateName}`
        ];
        const descTemplates = [
            `Nous créons des solutions sur mesure de ${serviceName.toLowerCase()} en ${stateName}, axées sur la performance, l'évolutivité et le SEO.`,
            `Propulsez votre présence en ligne en ${stateName} grâce à nos services de ${serviceName.toLowerCase()}.`
        ];
        const ctaTitleTemplates = [
            `Prêt à développer votre ${serviceName} en ${stateName} ?`,
            `Créons quelque chose d'exceptionnel en ${stateName}`
        ];

        const index = getDeterministicIndex(hashKey, 2);

        return {
            detailTitle: titleTemplates[index],
            detailSubtitle: descTemplates[index],
            whoFor,
            includes,
            benefits,
            whyChoose: [
                { title: 'Stratégie & Performance', description: `Des solutions pensées pour les objectifs d'affaires de votre entreprise en ${stateName}.` },
                { title: 'SEO & Rapidité', description: 'Une optimisation poussée pour le référencement et la vitesse de chargement.' },
                { title: 'Normes Globales', description: 'Une expertise internationale pour les entreprises de la région.' },
                { title: 'Accompagnement', description: 'Un support technique et stratégique sur le long terme.' }
            ],
            process: [
                { title: 'Analyse & Découverte', description: `Comprendre vos objectifs et votre public cible en ${stateName}.` },
                { title: 'Stratégie & Architecture', description: 'Définir les parcours utilisateurs et la stack technologique.' },
                { title: 'Création & Code', description: 'Développement de code robuste et de designs premium.' },
                { title: 'Déploiement & Suivi', description: 'Mise en ligne avec monitoring d\'uptime et de vitesse.' }
            ],
            growthSupport: `Investir dans un service de ${serviceName.toLowerCase()} sur mesure est un levier de croissance durable pour votre entreprise en ${stateName}.`,
            ctaTitle: ctaTitleTemplates[index],
            ctaSubtitle: `Réservez un appel stratégique aujourd'hui pour découvrir comment le ${serviceName.toLowerCase()} peut accélérer votre croissance en ${stateName}.`
        };
    }

    // 7. German dynamic templates
    const titleTemplates = [
        `${serviceName}-Services in ${stateName}`,
        `Premium-${serviceName} für Unternehmen in ${stateName}`,
        `Leistungsstarke ${serviceName} in ${stateName}`
    ];
    const descTemplates = [
        `Wir bieten maßgeschneiderte ${serviceName}-Lösungen in ${stateName}, optimiert für Geschwindigkeit, Skalierbarkeit und SEO.`,
        `Optimieren Sie Ihre digitale Präsenz in ${stateName} mit unseren ${serviceName}-Dienstleistungen.`
    ];
    const ctaTitleTemplates = [
        `Bereit, Ihr ${serviceName} in ${stateName} zu skalieren?`,
        `Lassen Sie uns etwas Außergewöhnliches in ${stateName} bauen`
    ];

    const index = getDeterministicIndex(hashKey, 2);

    return {
        detailTitle: titleTemplates[index],
        detailSubtitle: descTemplates[index],
        whoFor,
        includes,
        benefits,
        whyChoose: [
            { title: 'Strategischer Ansatz', description: `Maßgeschneiderte Web-Lösungen für Ihre Unternehmensziele in ${stateName}.` },
            { title: 'Schnelligkeit & SEO', description: 'Höchste Performance und Suchmaschinenoptimierung ab dem ersten Tag.' },
            { title: 'Globale Standards', description: 'Internationales Niveau in Design und Entwicklung für lokale Marktführer.' },
            { title: 'Langfristige Partnerschaft', description: 'Wir begleiten Ihr Wachstum und optimieren Ihre Systeme kontinuierlich.' }
        ],
        process: [
            { title: 'Analyse & Beratung', description: `Verständnis Ihrer Ziele, Zielgruppe und Wettbewerber in ${stateName}.` },
            { title: 'Konzeption & Planung', description: 'Ausarbeitung der User Journey und der technischen Architektur.' },
            { title: 'Design & Entwicklung', description: 'Premium-Gestaltung und Entwicklung von schnellem Code.' },
            { title: 'Launch & Optimierung', description: 'Uptime-Monitoring und Optimierung der Konversionsraten.' }
        ],
        growthSupport: `Die Investition in maßgeschneiderte ${serviceName}-Lösungen sichert Ihrem Unternehmen in ${stateName} langfristige Marktanteile und Wachstum.`,
        ctaTitle: ctaTitleTemplates[index],
        ctaSubtitle: `Buchen Sie ein Strategiegespräch, um zu besprechen, wie ${serviceName} das Wachstum Ihres Unternehmens in ${stateName} beschleunigen kann.`
    };
}
