---
name: Mona Crossing
description: An original candy-pastel pixel neighborhood with tactile arcade controls.
colors:
  cream: "#fff7df"
  paper: "#fffdf4"
  plum: "#34313e"
  plum-soft: "#61556c"
  coral: "#ffb7a5"
  pink: "#ed9eb7"
  mint: "#c5e7b1"
  mint-edge: "#86bda0"
  lavender: "#ded4f1"
  aqua: "#96dce2"
  focus: "#8a2257"
  grass: "#a7d59e"
  dark-leaf: "#568773"
  purple: "#a58cbf"
  deep-water: "#74bdce"
  wood: "#e7b3b0"
typography:
  display:
    fontFamily: 'Silkscreen, "Courier New", monospace'
    fontSize: "clamp(20px, 3.8vw, 30px)"
    fontWeight: 400
    lineHeight: 1.2
  headline:
    fontFamily: 'Silkscreen, "Courier New", monospace'
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: 'Silkscreen, "Courier New", monospace'
    fontSize: "12px"
    fontWeight: 400
  label:
    fontFamily: 'Silkscreen, "Courier New", monospace'
    fontSize: "10px"
    fontWeight: 400
  score:
    fontFamily: 'Silkscreen, "Courier New", monospace'
    fontSize: "18px"
    fontWeight: 400
rounded:
  button: "3px"
spacing:
  "5": "5px"
  "8": "8px"
  "10": "10px"
  "12": "12px"
  "14": "14px"
  "16": "16px"
  "20": "20px"
components:
  button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.plum}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "9px 14px"
  button-hover:
    backgroundColor: "{colors.lavender}"
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.plum}"
    rounded: "{rounded.button}"
    padding: "9px 22px"
  button-sound:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.plum}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "9px 14px"
  button-direction:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.plum}"
    rounded: "{rounded.button}"
    padding: "0"
    width: "44px"
    height: "36px"
  hud:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.plum}"
    padding: "12px 8px"
  overlay:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.plum}"
    padding: "20px"
    width: "min(88%, 400px)"
---

# Design System: Mona Crossing

## Overview

**Creative North Star: "The Candy-Pastel Commit Neighborhood"**

An original pixel town combines cream sidewalks, coral and pink roads, mint
gardens, an aqua river and lavender neighborhood details. Graphite-plum outlines
give the sweet palette a clear, sturdy edge. The cabinet-approved pixel Octocat
silhouette and locally hosted Silkscreen are binding identity assets, not
interchangeable decoration.

The interface is compact and tactile: small pixel labels, readable supporting
prose, hard-edged frames and pressable controls. Illustrated houses, trees,
benches and Git-themed signs belong to the world; the surrounding interface
supports play rather than competing with it. This documents the current
implementation in `index.html`, `styles.css` and `src/renderer.js`, not a proposed
replacement.

**Key Characteristics:**
- Original candy-pastel pixel scenery with graphite-plum definition.
- Local Silkscreen identity paired with system-ui explanatory text.
- Square playfield frames and subtly rounded, hard-shadowed controls.
- Compact status displays and reachable keyboard/touch actions.
- Visible focus and reduced ornamental motion without removing gameplay.

## Colors

Pastel terrain fills carry the neighborhood's character; dark plum supplies
structure and readable text. Frontmatter is the normative palette.

### Primary
- **Coral Peach** (`coral`): the start action, lower roads, benches and warm
  architectural details. This is CSS `--coral` and renderer `peach`.
- **Candy Pink** (`pink`): upper roads, flowers and ferry accents.

### Secondary
- **Garden Mint** (`mint`): safe median, lawns, trees and the sound control.
- **Leaf Edge** (`mint-edge`): garden boundaries, foliage texture and the help
  divider; renderer `leaf` shares this value.
- **Lime Grass** (`grass`): repeated lawn texture, tree fill and garden interiors.
- **Deep Leaf** (`dark-leaf`): stems and shaded foliage details.

### Tertiary
- **Neighborhood Lavender** (`lavender`): button hover, directional controls,
  windows, signs and occupied gardens.
- **Pixel Purple** (`purple`): alternate trees, vehicle fills and hard scene
  shadows.
- **River Aqua** (`aqua`): the river, windows and small neighborhood fixtures;
  renderer `water` shares this value.
- **Deep River** (`deep-water`): river-edge definition and recurring wave detail.
- **Rose Wood** (`wood`): commit logs, trunks and sidewalk detail.

### Neutral
- **Sidewalk Cream** (`cream`): page ground, safe sidewalks and pixel highlights.
- **Warm Paper** (`paper`): controls, HUD, overlays, ferry bodies and sprite faces.
- **Graphite Plum** (`plum`): text, borders, outlines and control ledges; renderer
  `ink` shares this value.
- **Soft Plum** (`plum-soft`): secondary labels, instructions-adjacent feedback
  and credits.
- **Berry Focus** (`focus`): focus outlines, heart count and the countdown strip.

### Named Rules

**The Terrain Color Rule.** Preserve the implemented distinction between warm
roads, aqua water and cream/mint safe ground; graphite-plum outlines keep their
boundaries explicit.

The sidecar's eight-step tonal strips are synthesized display metadata, not
additional approved gameplay or interface colors. Canvas-only colors do not
imply new CSS custom properties.

## Typography

**Display Font:** Silkscreen, with Courier New and monospace fallbacks.
**Body Font:** system-ui, sans-serif.
**Label Font:** Silkscreen, with the display fallbacks.

**Character:** Pixel type establishes the arcade identity; conventional system
type makes explanatory sentences and feedback easy to read. The local
Silkscreen face is regular (400), loaded with `font-display: swap`; there is no
display-weight ladder or tracking scale.

### Hierarchy
- **Display:** the fluid title uses the frontmatter clamp and tight line height.
  It becomes (18px) at the narrow breakpoint and (16px) below the smallest one.
- **Headline:** regular pixel overlay headings use the recorded headline role,
  becoming (15px) on narrow screens.
- **Body:** overlay explanations and expanded help share the recorded body
  role; help is limited to (72ch). Strong text marks keyboard commands in help.
  Overlay body becomes (12px / 1.5) on narrow screens.
- **Control:** standard actions and the help disclosure use the control role.
  The primary action is (14px) on desktop and (12px) on narrow screens.
- **Label:** HUD labels and key hints use the label role; HUD labels become
  (9px) on narrow screens.
- **Score:** the HUD's larger numbers use tabular numerals and become (13px)
  on narrow screens.
- **Supporting text:** feedback uses system-ui (14px / 1.4), becoming (12px);
  credits use system-ui (11px / 1.5). These are component treatments, not
  additional global type scales.

### Named Rules

**The Two Voices Rule.** Use local Silkscreen for identity, short controls and
status; keep explanatory prose and feedback in the implemented system-ui voice.

Canvas signs use the renderer's small hand-built bitmap glyphs rather than
substituting a new web font.

## Layout

The current game surface is a centered single-column cabinet: compact title,
five-column HUD, dominant playfield, then actions alongside a directional pad.
Help and credits follow below. The game composition is evidence for this
surface, not a mandatory template for unrelated future screens.

The shell uses `min(100% - 32px, 800px)`, with (20px) top and (16px) bottom
margins. The (640 × 512) canvas scales to the available width with automatic
height and pixelated rendering. Its artwork is drawn on integer coordinates;
the HUD and canvas meet as a continuous framed unit.

Repeated spacing is a small observed set, not a uniform invented base grid:
the frontmatter records the recurring (5–20px) steps. Controls use compact
padding; major groups separate by (12–20px). The action deck remains a
side-by-side flex row, with a three-column directional grid.

- **Short desktop:** at width at least (900px) and height at most (850px),
  the shell caps at (680px) and reduces top/header spacing to (12px).
- **Narrow:** at width at most (540px), outer gutters become (8px), typography
  and HUD padding tighten, overlay padding becomes (12px), and its decorative
  Octocat is hidden. The directional pad changes from (44 × 36px) cells to
  (44 × 44px) cells. The deck gap reduces to (8px), key-hint decoration hides
  and credits can wrap.
- **Smallest:** at width at most (350px), the title icon hides and action
  spacing tightens without removing the movement controls.

## Elevation & Depth

Depth is structural and pixel-hard, not diffuse. The town uses solid purple
offsets and plum silhouettes; interface controls use an opaque plum ledge.
Only the overlay uses a translucent plum offset, still with no blur.

### Shadow Vocabulary
- **Control ledge** (`0 3px 0 var(--plum)`): standard resting buttons.
- **Pressed ledge** (`0 1px 0 var(--plum)`): buttons translate downward (2px)
  while active.
- **Overlay offset** (`6px 6px 0 var(--shadow)`): paper state panel;
  `--shadow` is the existing translucent plum (`#34313e26`).

### Named Rules

**The Pixel Depth Rule.** Use hard offsets and tonal pixel layering for depth;
do not replace the implemented ledges with soft atmospheric shadows.

Interaction is immediate: there are no CSS easing or transition-duration
tokens. Reduced motion removes the active-button translation, river ornament
and event bursts; moving gameplay remains necessary. The renderer's brief
event burst lasts (0.65s), with no full-screen flicker.

## Shapes

The environment is made from integer-aligned rectangles and stepped
silhouettes. The approved Octocat path remains recognizable through its ears,
face and tentacle silhouette. Canvas smoothing is disabled, and both canvas
and identity images use pixelated rendering.

Paper panels and the playfield retain square corners. Buttons alone have the
small recorded radius; their borders are (2px) plum. The playfield and overlay
use (3px) plum borders; the HUD uses (2px) with no bottom border at its join.
The page's faint grid is an existing linear-gradient texture, not a license
to replace pixel artwork with glossy gradient surfaces.

## Components

### Buttons

Tactile little arcade keys with clear outlines and a hard lower ledge.

- **Standard:** paper ground, plum text, recorded button radius and padding;
  minimum height (44px).
- **Primary:** coral ground, (14px) pixel text and the wider recorded padding.
  On narrow screens its current minimum height is (40px).
- **Sound:** mint ground, no wrapping; narrow padding is (6px 8px).
- **Hover:** standard and primary buttons turn lavender. Sound stays mint and
  directional keys stay lavender because their specific fill rules override
  the generic hover rule; do not invent a color-change variant.
- **Focus:** buttons, links, disclosure and canvas receive a (3px) berry outline
  offset by (4px). Preserve it independently of hover.
- **Active:** the hard ledge compresses as described above.
- **Disabled:** opacity (.55) and a not-allowed cursor; retain the established
  control identity rather than inventing a new disabled palette.

### Movement Navigation

A compact cross-shaped arcade pad, not a menu or a row of pills.

The three-by-three grid uses lavender arrow keys around a soft-plum plus sign,
with (3px) gaps. Direction labels are explicit accessible names; the visible
arrows use system-ui (18px). Pad keys have no padding, disable text selection
and use `touch-action: none`; other buttons use manipulation behavior.

### Status Strip

Five equally spaced paper cells keep game state easy to scan.

Small soft-plum labels sit above larger plum values, except berry-colored
hearts. The strip's square border joins the playfield, not five independent
cards. Its desktop padding and score typography are recorded in frontmatter.

### State Overlay

A square paper sign inside the town, reused for game states.

The recorded overlay width and padding sit within a plum frame and hard
offset shadow. A pixel Octocat, regular pixel heading, system-ui explanation,
coral action and small hint establish hierarchy. Narrow screens compact the
same pattern instead of scaling up a separate modal system.

### Playfield and Countdown

The original illustrated canvas is the signature component.

Maintain pixelated scaling, the approved Octocat silhouette and the existing
terrain distinction. The bottom countdown strip is paper with a berry fill
and height (5px); it is supplementary to the visible time output. The focusable
canvas has a descriptive label and is associated with the help disclosure.

### Help, Feedback and Notices

Utility copy stays quiet but readable.

Help is a native disclosure with a mint-edge top divider and a short pixel
summary, followed by system-ui prose. Feedback and exceptional notices use
status semantics; notices use lavender fill and a thin plum border. Source
links retain underlines and the shared visible-focus treatment. There is no
input-field, chip or conventional site-navigation system to extrapolate.

## Do's and Don'ts

### Do:
- **Do** preserve terrain color meaning and graphite-plum boundaries.
- **Do** use the local Silkscreen face and approved pixel Octocat silhouette.
- **Do** pair pixel labels with system-ui explanations.
- **Do** keep keyboard focus visible and movement controls reachable when the layout tightens.
- **Do** use hard control ledges and respect reduced ornamental motion.

### Don't:
- **Don't** replace the original pixel town with copied maps or reference-image assets.
- **Don't** substitute a generic mascot or remotely fetched typeface for the inherited identity.
- **Don't** blur pixel art or exchange hard ledges for diffuse shadows.
- **Don't** treat the sidecar's synthesized tonal strips as new approved tokens.
- **Don't** infer inputs, chips, easing curves or a global layout template that the build does not establish.
