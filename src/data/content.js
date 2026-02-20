export const content = {
  brand: {
    name: 'FieldCommand.io',
    location: 'Pueblo, CO United States',
    tagline: 'Field service CRM for commercial contractors.'
  },
  cta: {
    requestDemo: 'https://calendar.app.google/AqN36k96QYokL3y18?src=general',
    watchWalkthrough: '/walkthrough.html'
  },
  nav: {
    links: [
      { label: "Who's it for", href: '/who-its-for.html' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Support', href: '#contact' },
      { label: 'Request a demo', href: 'https://calendar.app.google/AqN36k96QYokL3y18?src=general' }
    ]
  },
  hero: {
    eyebrow: 'Built for commercial electrical contractors and similar multi-crew field contractors',
    title: 'Command every job in real time.',
    subtitle: 'See job health early enough to protect margin, not explain misses later.',
    detail:
      'Track labor, job costing, change orders, and billing status across active work without waiting for end-of-month cleanup.',
    trustNote: '',
    primaryCta: { label: 'Start free trial', action: 'start-trial', plan: 'control' },
    secondaryCta: {
      label: 'Request a demo',
      action: 'request-demo',
      href: 'https://calendar.app.google/AqN36k96QYokL3y18?src=general'
    },
    productVisual: {
      src: './public/images/job-command-center-mock.svg',
      alt: 'FieldCommand job command center showing live costing, alerts, and billed change orders',
      note: 'Product UI mock placeholder. Replace with production screenshot when available.'
    },
    bullets: [
      'Live job costing by labor, material, and phase',
      'Early warning on margin bleed and unbilled change orders',
      'Crew-level visibility from capture through final invoice'
    ]
  },
  problem: {
    eyebrow: 'Where profit leaks',
    title: "Busy doesn't mean profitable.",
    body:
      'Many commercial electrical teams still run the operation across QuickBooks, text messages, and spreadsheets. FieldCommand keeps bidding, execution, costing, and billing in one operating view so margin bleed and missed change orders are visible while work is still in motion.'
  },
  capabilities: [
    {
      id: 'core',
      tier: 'FieldCommand - Core',
      title: 'Get organized and bid with confidence.',
      body:
        "Track what is quoted, won, active, and closed without duct-taped systems. Build tighter estimates and keep field updates tied to the job record.",
      fit: 'For commercial electrical contractors who need operating discipline before complexity scales.',
      image: {
        src: './public/images/core-placeholder.svg',
        alt: 'Crew reviewing plans near electrical panel'
      }
    },
    {
      id: 'control',
      tier: 'FieldCommand - Control',
      title: 'Stop margin bleed mid-job',
      body:
        "See labor and cost drift as it happens. Track change orders from request to approved to billed so revenue does not stall between the field and office.",
      fit: 'For growing commercial electrical teams that need margin control during execution, not after closeout.',
      image: {
        src: './public/images/control-placeholder.svg',
        alt: 'Clipboard with job notes and conduit layout'
      }
    },
    {
      id: 'command',
      tier: 'FieldCommand - Command',
      title: 'Run complex jobs with confidence',
      body:
        'Forecast outcomes, enforce approvals, and keep multi-crew projects on track. Spot risk early, tighten controls, and reduce owner-only fire drills.',
      fit: 'For commercial electrical contractors and similar multi-crew field contractors managing multi-phase operations.',
      image: {
        src: './public/images/command-placeholder.svg',
        alt: 'Electrical drawings and scheduling board'
      }
    }
  ],
  process: {
    steps: [
      {
        title: 'Capture',
        body: 'Capture leads, site scope, and field details in one system from day one.'
      },
      {
        title: 'Bid',
        body: 'Build and send commercial estimates quickly with clear job assumptions and pricing.'
      },
      {
        title: 'Manage',
        body: 'Manage crews, job costing, and change orders in real time so execution stays on plan.'
      },
      {
        title: 'Bill',
        body: 'Bill progress work and approved change orders fast, from bid through final invoice.'
      }
    ]
  },
  pricing: {
    blurb: 'Most contractors start on Core or Control and upgrade as complexity increases. Every plan includes a defined seat count.',
    tiers: [
      {
        key: 'core',
        name: 'Core',
        title: 'Foundation Tier',
        seats: 5,
        audience: 'Small commercial shops getting out of chaos.',
        monthly: 199,
        features: [
          'Commercial CRM and job pipeline (lead to bid to job to close)',
          'Commercial estimating and proposals',
          'Time tracking and basic scheduling',
          'Invoicing, deposits, and payments',
          'Mobile field access'
        ],
        stripePriceId: 'core'
      },
      {
        key: 'control',
        name: 'Control',
        title: 'Profit Protection Tier',
        seats: 10,
        audience: 'Growing contractors bleeding margin mid-job.',
        monthly: 299,
        popular: true,
        leadIn: 'Everything in Core, plus:',
        features: [
          'Full job costing (labor + expenses)',
          'Margin visibility while work is in progress',
          'Change orders tracked and billed',
          'Crew scheduling and job assignments',
          'QuickBooks sync'
        ],
        stripePriceId: 'control'
      },
      {
        key: 'command',
        name: 'Command',
        title: 'Operational Control Tier',
        seats: 20,
        audience: 'Owners running multi-crew, multi-phase work.',
        monthly: 399,
        leadIn: 'Everything in Control, plus:',
        features: [
          'Forecasting and early warning job projections',
          'Approval workflows and controls',
          'Compliance dashboards',
          'Multi-crew and multi-project oversight',
          'API access for custom workflows'
        ],
        stripePriceId: 'command'
      }
    ]
  },
  faq: [
    {
      q: 'Who is FieldCommand built for?',
      a: 'FieldCommand is built primarily for commercial electrical contractors, and works well for similar multi-crew field contractors that need tighter control of costing, margins, and billing.'
    },
    {
      q: 'How fast can we get started?',
      a: 'Most teams can stand up Core quickly. We scope onboarding around job volume, crew structure, and reporting needs so rollout matches your operation.'
    },
    {
      q: 'Do you support QuickBooks?',
      a: 'Yes. QuickBooks sync is available in Control and Command to keep financial records aligned with field and operational data.'
    },
    {
      q: 'Can we change plans later?',
      a: 'Yes. Many teams start on Core or Control and move up as crews, project phases, and operational complexity increase.'
    }
  ],
  contact: {
    title: 'Contact our team',
    body:
      'Have questions or want a demo? Send us a message and get direct answers on fit, pricing, and rollout for your crews.'
  },
  footer: {
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Log In', href: 'https://app.fieldcommand.io' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Who\'s it for', href: './who-its-for.html' },
      { label: 'Privacy Policy', href: './privacy.html' },
      { label: 'Terms of Service', href: './terms.html' }
    ]
  }
};
