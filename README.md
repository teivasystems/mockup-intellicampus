# IntelliCampus — Early Alert for Students at Risk

> ServiceNow Next Experience (Polaris) workspace mockup for the IntelliCampus × ServiceNow POC.  
> Target: **Knowledge 2026 demo** — a university VP of Student Affairs watches a 15-minute walkthrough and says *"I want this on my campus."*

![ServiceNow](https://img.shields.io/badge/ServiceNow-Next_Experience-1b2a3e?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![Status](https://img.shields.io/badge/Status-POC_Mockup-f0b323?style=flat-square)

## Quick Start

```bash
npm install
npm start        # → http://localhost:3000
```

## What This Is

A pixel-accurate, interactive React mockup of the IntelliCampus Early Alert scoped application as it would appear natively inside ServiceNow's Next Experience workspace. It demonstrates the full early alert journey:

1. **AI agent detects risk** → Dashboard shows real-time monitoring status  
2. **Cases created automatically** → Case list with Red/Yellow/Green tier coding  
3. **Advisor reviews AI insight** → Case detail with risk signals, Now Assist drawer  
4. **Intervention and tracking** → Action buttons, intervention log, activity feed  
5. **Faculty visibility** → Read-only faculty notification view  
6. **Continuous monitoring** → Risk tier upgrades/downgrades, resolution outcomes  

### Pro+ Layer 1/3 Toggle

The case detail screen includes a **Pro+ toggle** that shows the same app with and without Now Assist features — proving the Layer 1 (base platform) / Layer 3 (Pro+) tiering strategy is technically viable.

## Project Structure

```
src/
├── App.jsx                    # Main app — tab routing, state management
├── tokens.js                  # Polaris design tokens (colors, spacing, typography)
├── index.jsx                  # React entry point
│
├── data/
│   └── demo-data.js           # Synthetic student records, trend data
│
├── components/
│   ├── Icon.jsx               # Inline SVG icon library (30+ icons)
│   ├── SNHeader.jsx           # ServiceNow Unified Navigation header
│   ├── WorkspaceTabBar.jsx    # Workspace tab bar with teal active state
│   ├── Card.jsx               # Card, Badge, Btn, PillSelect primitives
│   ├── DecoPattern.jsx        # Decorative SVG background pattern
│   ├── RiskBadge.jsx          # Risk tier badge + RISK constant map
│   └── NowAssistDrawer.jsx    # Slide-out AI assistant panel
│
├── charts/
│   ├── DonutChart.jsx         # Risk distribution donut (SVG)
│   └── TrendChart.jsx         # At-risk trend area chart (SVG)
│
└── screens/
    ├── DashboardScreen.jsx    # K26 hero — KPIs, donut, trend, recent alerts
    ├── AlertListScreen.jsx    # Early Alert case list with data table
    ├── CaseDetailScreen.jsx   # Advisor workspace — AI summary, signals, actions
    ├── StudentsScreen.jsx     # Student directory (stub)
    ├── FacultyScreen.jsx      # Faculty notification view
    ├── AdvisorsScreen.jsx     # Advisor caseload cards (stub)
    ├── ConfigScreen.jsx       # Risk threshold configuration (stub)
    └── AnalyticsScreen.jsx    # Retention analytics (stub)
```

## Design System

This mockup follows the **ServiceNow Polaris** design language:

| Token | Value | Usage |
|---|---|---|
| `headerBg` | `#1b2a3e` | Unified Navigation chrome |
| `workspaceTabBg` | `#2d3a4a` | Workspace tab bar |
| `brandTeal` | `#4fd1c5` | Active tab indicator, Now Assist accent |
| `brandPrimary` | `#0b60b0` | Links, primary interactive elements |
| `negative` | `#c1272d` | Red/High Risk tier |
| `warning` | `#f0b323` | Yellow/Watch tier |
| `positive` | `#1a7d36` | Green/On Track tier |
| Font | Source Sans 3 | All text — weights 300, 400, 600, 700 |
| Spacing | 4px grid | s1=4, s2=8, s3=12, s4=16, s5=20, s6=24... |

All tokens are centralized in `src/tokens.js`.

## Demo Narrative (K26 Walkthrough)

| Time | Screen | Talking Point |
|---|---|---|
| 0–2 min | Dashboard | "2,847 students monitored. 38 Red alerts. The system finds problems before anyone asks." |
| 2–5 min | Early Alerts | "AI-created cases, prioritized by risk. Advisors see their working queue." |
| 5–8 min | Case Detail (Jamal) | "AI explains why — GPA drop, absences, engagement decline. Advisor sees signals + actions." |
| 8–10 min | Now Assist drawer | "Natural language summary. Confidence score. Recommended interventions." |
| 10–11 min | Pro+ toggle OFF | "Same app without Pro+ — proves Layer 1 works standalone." |
| 11–12 min | Faculty tab | "Faculty see their flagged students. Read-only. Can add observations." |
| 12–14 min | Analytics | "62% recovery rate. +8.3% retention impact. The ROI story." |
| 14–15 min | Config | "Configurable per institution — thresholds, templates, SLA rules." |

## POC Architecture Alignment

This mockup maps to the [SOW technical scope](./docs/):

- **Data Model**: Student Record, Early Alert Case, Risk Signal (child), Intervention Log (child), Institution Config
- **Case Lifecycle**: New → Triaged → Intervened → Monitoring → Resolved (Improved/Withdrawn/Graduated/Transferred)
- **Workflows**: Case intake, notification (advisor + faculty), escalation, re-evaluation, resolution
- **Integration Surface**: Inbound REST (AI agent → SN), outbound REST (SN → AI agent), bidirectional loop visible in Activity log
- **Pro+ Overlay**: Now Assist summarization, AI Agent Fabric, Predictive Intelligence — all feature-flagged via Pro+ toggle

## Contributing

1. **Tokens** — change colors/spacing in `src/tokens.js`, everything updates
2. **New screen** — add to `src/screens/`, import in `App.jsx`, add tab entry
3. **New component** — add to `src/components/`, import where needed
4. **Demo data** — edit `src/data/demo-data.js` to adjust student records, risk signals, etc.

## License

Confidential — IntelliCampus × Teiva Systems. Strategy discussion only.
