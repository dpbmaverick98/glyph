# Glyph Product Design - First-Time Journey & Roadmap

## First-Time User Journey Map

### Stage 1: Discovery (Before Landing)
**User State:** Looking for documentation solutions
**Touchpoints:**
- GitHub trending
- Twitter/X posts
- Hacker News
- Friend recommendation
- Searching "Mintlify alternative" or "free documentation framework"

**Key Questions in User's Mind:**
- Is this better than what I'm using?
- Will it look professional?
- How hard is it to set up?
- Can I customize it?

---

### Stage 2: Landing Page (First Impression - 3 seconds)
**Goal:** Make them say "wow" and want to try it

**Current Problems:**
- ❌ Landing page is just markdown-rendered content
- ❌ No theme showcase
- ❌ No immediate visual impact
- ❌ Looks like every other docs site

**What We Need:**
1. **Immediate Visual Hook** - Animated hero, particles, or unique visual
2. **Theme Switcher** - Let them see 3 different looks instantly
3. **Live Demo** - Interactive playground or animated preview
4. **Social Proof** - GitHub stars, testimonials, "used by"
5. **Clear CTA** - One obvious action: "Try it now"

---

### Stage 3: Quick Try (5 minutes)
**Goal:** Get them from landing to running site in < 5 minutes

**Current Flow:**
```
Landing → Read docs → Install → Configure → Build → Deploy
```

**Ideal Flow:**
```
Landing → One-click deploy (Vercel/Netlify) → Live site in 30 seconds
         ↓
    OR: npx create → dev server → editing
```

**What We Need:**
1. **Deploy to Vercel** button (one-click)
2. **StackBlitz/CodeSandbox** embed on landing
3. **Template gallery** - Choose your look first
4. **Guided setup** wizard

---

### Stage 4: First Success (15 minutes)
**Goal:** They have a site that looks good and they feel proud

**Current Problems:**
- Default theme might not match their brand
- No guidance on structure
- Docs are generic

**What We Need:**
1. **Template selector** during setup
2. **Auto-generated structure** based on their project type
3. **First-run tutorial** overlay
4. **Instant preview** of changes

---

### Stage 5: Customization (1 hour)
**Goal:** They make it their own and feel invested

**Current Problems:**
- No theme presets
- Must edit CSS directly
- No visual theme editor

**What We Need:**
1. **Theme presets** (5+ built-in themes)
2. **Visual theme config** (color picker, font selector)
3. **Animation presets** (subtle, playful, professional, minimal)
4. **Component library** (more than just cards/callouts)

---

### Stage 6: Production Deploy (Day 1)
**Goal:** They ship it and share it

**What We Need:**
1. **One-command deploy** to popular hosts
2. **SEO optimization** checklist
3. **Analytics integration** guide
4. **Custom domain** setup

---

## What We Need to Build

### P0: Critical (Landing Page & First Impression)

#### 1. New Landing Page System
```
app/src/landing/
├── themes/
│   ├── default/           # Clean, minimal (current)
│   ├── pixel/             # Retro gaming aesthetic
│   ├── glass/             # Glassmorphism
│   ├── brutalist/         # Bold, raw
│   └── cyber/             # Dark, neon
├── components/
│   ├── HeroSection.tsx
│   ├── FeatureGrid.tsx
│   ├── CodeShowcase.tsx
│   ├── ThemeSwitcher.tsx
│   ├── LivePreview.tsx
│   └── SocialProof.tsx
└── LandingPage.tsx        # Main orchestrator
```

#### 2. Theme System Architecture
```
app/src/themes/
├── registry.ts            # Theme definitions
├── types.ts               # Theme interface
├── base/                  # Shared styles
├── minimal/               # Clean, Apple-like
├── pixel/                 # 8-bit, retro
├── glass/                 # Glassmorphism
├── brutalist/             # Swiss design
└── cyber/                 # Cyberpunk
```

Each theme includes:
- `colors.ts` - Color palette
- `typography.ts` - Font choices
- `animations.ts` - Motion presets
- `components/` - Theme-specific components
- `preview.png` - Thumbnail for selector

#### 3. Landing Page Sections

**Hero Section:**
- Animated headline (typewriter, scramble, or fade)
- Subheadline with value prop
- Two CTAs: "Try Demo" (primary) + "View on GitHub" (secondary)
- Live theme switcher showing 3 variants
- Background: Subtle gradient or particle animation

**Live Preview Section:**
- Split screen: Code on left, Preview on right
- Shows actual docs being edited in real-time
- Or: Animated GIF/video showing workflow

**Theme Showcase:**
- Grid of 5 theme thumbnails
- Click to preview full theme
- "Use this theme" button

**Feature Grid:**
- 6 features with icons
- Animated on scroll

**Code Quickstart:**
- Copy-paste install command
- One-click deploy buttons (Vercel, Netlify, Cloudflare)

**Social Proof:**
- GitHub stars count (live)
- Testimonial quotes
- "Used by" logos

**Footer:**
- Links
- Newsletter signup
- Social links

---

### P1: Important (Docs Restructure)

#### New Documentation Structure
```
docs/
├── landing.md             # Landing page content
├── docs.json              # Navigation config
│
├── 00-getting-started/    # Numbered for ordering
│   ├── 00-introduction.md
│   ├── 01-quickstart.md
│   ├── 02-installation.md
│   ├── 03-your-first-page.md
│   └── 04-deployment.md
│
├── 01-core-concepts/
│   ├── 00-what-is-glyph.md
│   ├── 01-markdown-guide.md
│   ├── 02-components.md
│   ├── 03-theming.md
│   └── 04-configuration.md
│
├── 02-themes/
│   ├── 00-overview.md
│   ├── 01-minimal.md
│   ├── 02-pixel.md
│   ├── 03-glass.md
│   ├── 04-brutalist.md
│   ├── 05-cyber.md
│   └── 06-custom-theme.md
│
├── 03-components/
│   ├── 00-overview.md
│   ├── 01-callout.md
│   ├── 02-card.md
│   ├── 03-accordion.md
│   ├── 04-tabs.md
│   ├── 05-code-blocks.md
│   ├── 06-tables.md
│   └── 07-custom-components.md
│
├── 04-integrations/
│   ├── 00-overview.md
│   ├── 01-vercel.md
│   ├── 02-netlify.md
│   ├── 03-github-pages.md
│   ├── 04-search.md
│   └── 05-analytics.md
│
├── 05-examples/
│   ├── 00-showcase.md
│   ├── 01-api-docs.md
│   ├── 02-blog.md
│   └── 03-knowledge-base.md
│
└── 06-reference/
    ├── 00-configuration.md
    ├── 01-api.md
    └── 02-cli.md
```

---

### P2: Nice to Have (Advanced Features)

#### More Components
- Steps/Stepper (for tutorials)
- Frame (screenshot wrapper)
- Tooltip
- Badge
- Timeline
- Comparison table
- File tree
- Terminal window
- Mermaid diagrams

#### Animation Library
```
app/src/animations/
├── presets.ts
├── hooks/
│   ├── useScrollReveal.ts
│   ├── useTypewriter.ts
│   ├── useScramble.ts
│   └── useParticles.ts
└── components/
    ├── FadeIn.tsx
    ├── SlideIn.tsx
    ├── StaggerChildren.tsx
    └── ParticleBackground.tsx
```

#### CLI Improvements
- `glyph init` - Interactive setup wizard
- `glyph theme` - Theme management
- `glyph add` - Add components/templates
- `glyph deploy` - One-command deploy

---

## Implementation Plan

### Phase 1: Landing Page (This Session)
1. ✅ Create theme system architecture
2. ✅ Build 3 theme presets (Minimal, Pixel, Glass)
3. ✅ Create new Hero with theme switcher
4. ✅ Add live preview section
5. ✅ Update landing.md with better copy

### Phase 2: Docs Restructure (Next)
1. Reorganize docs folder structure
2. Rewrite all content for framework context
3. Add component documentation
4. Add theme documentation

### Phase 3: Polish (Later)
1. Add more themes
2. Add animation library
3. Improve CLI
4. Add examples showcase

---

## Key Differentiators from Mintlify

| Feature | Glyph | Mintlify |
|---------|-------|----------|
| **Theme Variety** | 5+ built-in + custom | 1 default |
| **Animation** | Rich preset library | Basic |
| **Self-hosted** | ✅ Always free | ❌ Paid |
| **Source Access** | ✅ Full React source | ❌ Closed |
| **Custom Components** | ✅ Any React component | ⚠️ Limited |
| **Bundle Size** | ~50KB | Cloud-hosted |

**Tagline Ideas:**
- "Documentation with personality"
- "Your docs, your way"
- "The documentation framework that doesn't look like everyone else's"
- "Beautiful docs, uniquely yours"
