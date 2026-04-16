# Cinematic Mode Guide

Cinematic mode adds scroll animations, parallax effects, and premium visual polish to the site. This guide explains what it does and how to turn it off if needed.

---

## What Cinematic Mode Adds

| Feature | What it does |
|---|---|
| Scroll animations | Sections fade in as you scroll down the page |
| Cinematic hero | Animated background on the homepage |
| Timeline path | Visual journey path with animated active states |
| Typography upgrade | Playfair Display for headings, Inter for body |
| Micro-interactions | Hover lifts, glows, and transitions on cards and buttons |
| Navbar blur | Navbar is transparent at top, blurs when you scroll |
| Grain overlay | Subtle film-grain texture over the whole page |
| Section glows | Warm colour tints for different timeline sections |

---

## How to Turn It Off

### Full off (one step)

Open `src/main.tsx` and delete this line:

```typescript
import './cinematic.css';
```

Save the file. All cinematic effects are instantly removed. The site works exactly as before — just without the visual layer.

### Turn off specific features

**Remove the grain texture only**
1. Delete `.grain-overlay { ... }` from `src/cinematic.css`
2. Remove `<div className="grain-overlay" />` from `src/App.tsx`

**Remove scroll animations only**
In `src/cinematic.css`, delete or comment out:
- `.fade-in` and related classes
- All `@keyframes` blocks

**Remove the navbar blur**
In `src/App.tsx`, remove the `isScrolled` state variable and the `navbar-cinematic` class from the nav element.

**Remove the hero section**
In `src/pages/Home.tsx`, replace the hero block with a plain heading and paragraph.

**Remove the timeline path**
In `src/pages/Timeline.tsx`, delete the `.timeline-path` div and the scroll detection logic above it.

---

## Files Involved

### Added by cinematic mode
- `src/cinematic.css` — all visual styles and keyframe animations
- `src/hooks/useScrollAnimation.ts` — scroll detection hook

### Modified by cinematic mode
- `src/main.tsx` — imports `cinematic.css`
- `src/App.tsx` — grain overlay div, scroll detection, cinematic nav class
- `src/pages/Home.tsx` — hero section
- `src/pages/Timeline.tsx` — timeline path and scroll animations
- `src/components/NavigationMenu.tsx` — scroll detection and hover effects

---

## Adjusting the Effects

Edit these CSS variables near the top of `src/cinematic.css`:

```css
:root {
  --cinematic-spacing: 12rem;                    /* Gap between major page sections */
  --section-spacing: 8rem;                       /* Gap between content sections */
  --warm-glow: rgba(255, 223, 186, 0.15);        /* Colour of section glow effects */
  --transition-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);  /* Animation curve */
}
```

---

## Performance Notes

All animations run on the GPU using CSS transforms. The impact on page speed is minimal on any modern device. The scroll detection uses `IntersectionObserver`, which is efficient and does not block the main thread.
