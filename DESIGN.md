---
name: "Lucas Martinez — Beyond the Interface"
description: "Cinematic futurism grounded in verified software, automation, AI and visualization work."
colors:
  electric-blue: "#508aff"
  cyan: "#9adcf2"
  ground: "#060a12"
  ink: "#eff4fa"
  body: "#c0cada"
  muted: "#a8b7ce"
  raised: "#0b1423"
  boundary: "#293344"
  focus: "#a5e5ff"
  chip-selected: "#dce9ff"
  action-ink: "#081123"
  summary-action: "#183762"
  case-ground: "#070c15"
  case-ink: "#eef4fb"
  case-muted: "#b2c2d9"
  control-accent: "#85b5ff"
  gas-accent: "#8cdbce"
  forno-accent: "#ffc19a"
typography:
  display:
    fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif"
    fontSize: "clamp(80px, 13.2vw, 202px)"
    fontWeight: 700
    lineHeight: 0.84
    letterSpacing: "-.04em"
  headline:
    fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif"
    fontSize: "clamp(40px, 6.6vw, 92px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-.04em"
  project-title:
    fontFamily: "'Space Grotesk', 'Chakra Petch', sans-serif"
    fontSize: "clamp(26px, 3.1vw, 43px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-.035em"
  case-display:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(49px, 8.2vw, 116px)"
    fontWeight: 700
    lineHeight: 0.99
    letterSpacing: "-.04em"
  body:
    fontFamily: "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  hero-body:
    fontFamily: "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  project-body:
    fontFamily: "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: ".035em"
  button:
    fontFamily: "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.2
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  flat: "0"
  chip: "2px"
  small-control: "3px"
  control: "4px"
  mobile-media: "5px"
  terminal: "6px"
  media: "8px"
spacing:
  compact: "8px"
  control: "14px"
  small: "16px"
  mobile-gutter: "20px"
  body-top: "24px"
  desktop-gutter: "32px"
  spread: "48px"
  gallery-row: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.action-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "#c3dcff"
  button-outline:
    backgroundColor: "rgba(10, 24, 42, .6)"
    textColor: "#dcecff"
    typography: "{typography.button}"
    rounded: "{rounded.media}"
    padding: "14px 22px"
  button-summary:
    backgroundColor: "{colors.summary-action}"
    textColor: "#ffffff"
    rounded: "{rounded.small-control}"
    padding: "11px 18px"
  button-summary-ghost:
    backgroundColor: "transparent"
    textColor: "#dceeff"
    rounded: "{rounded.small-control}"
    padding: "11px 18px"
  link-text:
    backgroundColor: "transparent"
    padding: "12px 0"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "#a9bdd8"
    rounded: "{rounded.chip}"
    padding: "10px 15px"
  filter-chip-selected:
    backgroundColor: "{colors.chip-selected}"
    textColor: "#0d182b"
  project-card:
    backgroundColor: "transparent"
    rounded: "{rounded.flat}"
    padding: "24px 0 0"
  navigation-link:
    textColor: "#9db0c9"
    padding: "10px"
  practice-terminal:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.terminal}"
    typography: "{typography.mono}"
---

# Design System: Lucas Martinez — Beyond the Interface

## Overview

**Creative North Star: "BEYOND THE INTERFACE"**

BEYOND THE INTERFACE is cinematic futurism expressed through a navy-black ground, electric blue and pale cyan light, monumental typography, and dimensional identity. Spacious editorial composition gives original project images priority. The atmosphere is premium and minimal, while headings and interactive material carry the dramatic weight.

The signature is an original six-beam LM mesh with beveled faces, camera perspective and directional shading, projected through Canvas 2D without a WebGL or package dependency. A flat CSS LM remains the honest fallback. Motion is a finite enhancement: content is visible immediately, native scrolling remains intact, and reduced-motion preferences and the session pause control govern new choreography.

**Key Characteristics:**

- Monumental name and self-hosted Space Grotesk display typography.
- Dark editorial surfaces with blue and cyan material light.
- Original protected screenshots displayed without cropping important evidence.
- Finite, interruptible depth and native navigation.
- The original credential retains its code, assets, photo, cord physics and GitHub QR.

This record merges the task's approved direction with the implemented V7 layer. Source of truth: `index.html`, `wow-v7.css`, `wow-v7.js`, `wow-monogram.js`, `wow-case.css`, `wow-case.js`, and the inherited styles that these layers extend. The baseline remains V6 commit `5ea41bf0a757c51c0b44d6905e3c36643d0bbb12`; the release scope remains the V7 branch and preview only. Production release and merging require Lucas's approval, as recorded in PRODUCT.md.

## Colors

The palette combines a near-black navy ground with icy reading text and restrained blue/cyan light. Frontmatter values are normative; color metadata and display-only tonal ramps live in the sidecar.

### Primary

- **Electric Blue:** the name's period and identity lighting.
- **Pale Cyan:** link arrows, terminal prompts and inherited active navigation accents.

### Secondary

- **Control Blue, Gás Mint and Forno Peach:** local case-study accents. Their ambient fields are project-specific: Control uses `#122644`, Gás `#122d30`, and Forno `#38251f`. These are not global replacement themes.

### Neutral

- **Ground / Case Ground:** continuous page canvases.
- **Ink / Case Ink:** display and prominent reading text.
- **Body / Muted / Case Muted:** readable prose and supporting copy.
- **Raised:** the terminal and retained academic surface.
- **Boundary:** restrained structural dividers.
- **Focus:** the visible homepage keyboard outline.
- **Chip Selected / Action Ink:** high-contrast selection and primary action pairing.
- **Summary Action:** the compact professional-summary action background.

**The Material Light Rule.** Use blue and cyan for identity, interaction and spatial light; keep reading surfaces quiet and dark. Project-specific case accents stay local to their studies.

## Typography

**Display Font:** self-hosted Space Grotesk, weight 700, with Chakra Petch and sans-serif fallback on the homepage. Case-study display stacks use Space Grotesk and sans-serif. The bundled font retains its SIL Open Font License.

**Body Font:** IBM Plex Sans with the existing platform fallbacks. **Label/Mono Font:** JetBrains Mono is retained for the terminal and technical tags; ordinary category metadata uses the body face.

The geometric display face provides scale and compression; the body face carries calm reading. Tight tracking belongs to the display hierarchy, not to paragraph text. Frontmatter records the actual desktop roles rather than imposing a synthetic ratio.

### Hierarchy

- **Display:** the two-line name. At widths of at least 1600px it reaches 208px. At 760px and below it changes to `clamp(50px, 12.3vw, 92px)` with .94 line height.
- **Headline:** section titles; the main gallery title becomes 42px at 760px and below.
- **Project Title:** project names; 30px on mobile. Subtitles use regular body type, 15px desktop and 14px mobile.
- **Case Display:** project-specific headings; below 560px, `clamp(42px, 11.8vw, 64px)` with 1.04 line height.
- **Body:** 16px base prose. Hero prose is 15px with a 55ch measure, becoming 14px/1.8 and 48ch on mobile. Project descriptions are 14px/1.75 with a 59ch measure. Case paragraphs use 16px/1.85, becoming 15px on small screens.
- **Label:** supporting metadata uses the final 11px legibility override. Technical tags retain mono styling and separators.

**The Content First Rule.** Titles lead. Verified categories and providers follow as supporting metadata; they do not become decorative headings above the title.

## Layout

The homepage container is capped at 1360px with 32px side gutters, changing to 20px gutters at 760px and below. Case pages cap at 1320px, use 20px gutters normally, and 18px below 560px. Homepage section spacing is `clamp(74px, 10vw, 150px)` on desktop and 72px on mobile; case sections use 90px top spacing, reduced to 64px on small screens.

The hero places the sculptural identity behind and beside the name, followed by a two-column introduction and concept block. Desktop header height is 80px, 70px below 1100px, and 64px below 760px. The desktop navigation gives way to the existing mobile menu below 1100px.

The gallery retains all seven projects. In the unfiltered view, the first three are full-width image/copy spreads with a 1.65:1 division and 48px gap; the second reverses the composition. Below 1100px these become 1.4:1 with a 30px gap. The remaining projects use two columns with 64px row and 38px column gaps. At 760px and below all cards stack into one column with 54px gaps. Filtering returns the visible set to the common grid. Images use `object-fit: contain`; aspect ratios provide framing without replacing or cropping their content.

The practice section and professional summary use paired columns, collapsing to one column on mobile. Case pages use two-column content and gallery layouts, a four-step workflow, and a three-cell architecture strip. At 850px the workflow becomes two columns and architecture stacks; at 560px content, gallery and workflow stack. Native chapter links remain horizontally scrollable where needed.

## Elevation & Depth

Depth comes from the projected mesh, ambient radial fields, image framing and restrained diffuse shadows. Card bodies, section panels and editorial links are flat and open. The homepage header alone retains a subtle translucent blur; case header and lightbox backdrop overrides remove blur. Existing credential and technology-map effects remain isolated assets of the prior system.

### Shadow Vocabulary

- **Project media:** `0 24px 54px #0004` supports large evidence images.
- **Practice terminal:** `0 24px 60px #0004` separates the terminal from its dark field.
- **Case hero image:** `0 30px 80px #0005` gives the principal screenshot presence.
- **Media hover boundary:** `inset 0 0 0 1px #9cceff` marks the image affordance without adding an outer glow.

**The Finite Depth Rule.** Depth supports identity and evidence. New animation ends or sleeps at rest, and a flat, readable composition remains available without motion.

The opening control completes after 1550ms; the mesh assembly itself uses 1450ms, or 950ms in economy mode. Name entry runs 1100ms, one-shot editorial reveal 900ms, and native route entry 400ms on the homepage or 450ms on cases. The main easing is `cubic-bezier(.16,1,.3,1)`. Rendering sleeps at rest and stops offscreen or when the document is hidden. Canvas pixel ratio is capped at 1.5, or 1 in economy mode. Pointer attraction is bounded to 4px horizontally and 3px vertically. Homepage text scroll depth is desktop-only; mobile card tilt is disabled. Case image pitch is capped at 3 degrees and disabled at 850px and below. The OS reduced-motion preference and session control remove the new choreography; skip, Escape, hash links and restored pages bypass the opening.

## Shapes

Open editorial regions use square corners with hairline divisions. Filter chips use the smallest radius; compact controls, primary actions, terminals and image frames use the restrained radius steps in frontmatter. Desktop project images use the media radius, reduced to the mobile-media radius on small screens. Case hero images use the terminal radius and gallery images the control radius. The mesh is the only newly modeled sculptural object: six beveled rectangular beams, quiet projected rectangular planes, and finite convergence strokes. The fallback is plain untransformed LM lettering with no text shadow.

## Components

### Buttons and text links

The primary hero action is pale ink on dark action text with a small corner radius, no shadow, a 54px minimum height and an inline SVG down-arrow. It becomes 52px tall with 13px type and 13px 18px padding on mobile. Hover changes its fill; the inherited 2px lift and bounded magnetic translation remain available for a fine pointer. Pressed actions scale slightly.

Professional-summary actions use a blue filled variant and transparent alternative, both 44px minimum height and 11px 18px padding. The retained certificate outline action uses the incumbent translucent navy fill, outline border and 8px radius. Ordinary hero links remain underlined by a quiet bottom border with an inline SVG arrow. The homepage keyboard focus ring is 2px with 5px offset. Case controls retain their 3px accent outline and 4px offset.

### Filters and tags

Filters are 44px minimum-height rectangular chips. Active state reverses to pale fill and dark text, with `aria-pressed` kept in sync. The native button interaction and live result announcement remain. Tags are compact mono text separated by rules, without enclosing filled pills in project cards.

### Project cards

Project cards have an unboxed body, contained original image, title, subtitle, description, then verified category metadata and technical tags. The three featured projects use the spread layout in the unfiltered gallery. A ruled case-study link and accessible detail disclosure remain separate actions. Image hover is a restrained 1.015 scale and inset border; the image button opens the existing accessible lightbox. Hidden filtered cards leave the layout.

### Navigation

The sticky homepage navigation is quiet body type with a cyan current-section indicator. The existing mobile toggle retains its expanded state and native buttons. Case pages use sticky chapter navigation, a two-pixel reading-progress line, current-chapter accent, and normal anchor navigation; route transitions are progressive enhancement only.

### Practice terminal

The retained terminal uses its mono screen, compact tabs and raised dark field as an interactive narrative. A restrained frame, 6px corners and diffuse shadow replace the prior stronger presentation. Tabs retain their native button and pressed states. This is an existing project-specific component, not a generic console template for unrelated sections.

### Identity sculpture and credential

The LM sculpture is decorative and hidden from assistive technology. Canvas renders actual projected geometry; missing Canvas support leaves the flat CSS identity visible. The original interactive credential remains a separate preserved component: only its surrounding section and placement adapt. Do not regenerate its image, photo, QR, cord or physics.

### Case studies and image viewer

Case headings and local accent colors distinguish each project while sharing typography and structural rules. Architecture cells and workflow markers clarify the verified technical narrative. The existing native dialog preserves keyboard controls, clear close/previous/next actions and image containment; horizontal touch swipes supplement the buttons on case pages. No input-field or contact-form design is introduced because the portfolio contains no working submission form.

## Do's and Don'ts

### Do:

- **Do** preserve the BEYOND THE INTERFACE identity and the navy, electric blue, cyan and white palette.
- **Do** keep project images, verified case facts and existing privacy protections intact.
- **Do** use inline SVG arrows and keep functional metadata legible at the implemented 11px floor.
- **Do** retain native scrolling, keyboard access, immediately visible content and reduced-motion behavior.
- **Do** preserve the original credential as an isolated interactive identity asset.

### Don't:

- **Don't** replace protected screenshots or fabricate project results, statistics or integrations.
- **Don't** add a mandatory loader, fullscreen intro gate or scroll hijacking.
- **Don't** promote inherited tiny metadata, decorative kickers or glyph icons into the reusable system.
- **Don't** add new ambient effects merely to fill whitespace or use the flat fallback to imply a real 3D render.

**Not canonized or repaired here:** inherited small metadata and visual effects in the preserved credential/technology map remain scoped legacy differences. Mechanical detector flags for negative display tracking, chosen typography, blue ambient fields and the closed lightbox's initially empty image source are contextual findings, not evidence of a clean scan. The image source is populated when the viewer opens; the decorative fallback is aria-hidden. This documentation does not turn scanner findings into reusable design rules or change protected code.
