# Cinematic Mode - Easy Revert Guide

This document explains the cinematic enhancements added to the website and how to easily revert back to the original version if needed.

## What Was Added

The website now features a cinematic, story-driven experience with:

1. **Smooth scroll animations** - Sections fade in as you scroll
2. **Cinematic hero section** - Animated background with parallax effects on the homepage
3. **Timeline path experience** - Visual journey path with active state animations
4. **Elegant typography** - Playfair Display for headings, Inter for body text
5. **Micro-interactions** - Hover effects, button glows, card lifts
6. **Navbar blur effect** - Transparent at top, blurs on scroll
7. **Grain texture overlay** - Subtle film-like texture
8. **Section color themes** - Warm glows for different timeline sections
9. **Generous spacing** - More breathing room between sections

## Files Modified

### New Files Created:
- `src/cinematic.css` - All cinematic styles and animations
- `src/hooks/useScrollAnimation.ts` - Scroll animation hooks
- `CINEMATIC-MODE.md` - This file

### Modified Files:
- `src/main.tsx` - Added `import './cinematic.css'`
- `src/App.tsx` - Added grain overlay, navbar scroll detection, cinematic button classes
- `src/pages/Home.tsx` - Added cinematic hero section
- `src/pages/Timeline.tsx` - Added timeline path and scroll animations
- `src/components/NavigationMenu.tsx` - Added scroll detection and micro-interactions

## How to Revert to Original

### Complete Revert (Easiest)

1. **Remove the cinematic CSS import**
   - Open `src/main.tsx`
   - Delete the line: `import './cinematic.css';`
   - Save the file

This will disable ALL cinematic features instantly while keeping the functionality intact.

### Partial Revert Options

If you want to keep some features but remove others:

#### Option 1: Keep Typography, Remove Animations
In `src/cinematic.css`, comment out or delete these sections:
- `.fade-in` and related animations
- `.cinematic-hero-bg` animations
- `.timeline-path` animations
- `.grain-overlay`

#### Option 2: Keep Layout, Remove Effects
In `src/cinematic.css`, comment out or delete:
- All `@keyframes` animations
- `.btn-cinematic`, `.card-cinematic` hover effects
- `.grain-overlay`
- `.parallax` transforms

#### Option 3: Remove Individual Features

**Remove Grain Texture:**
- Delete `.grain-overlay` from `src/cinematic.css`
- Remove `<div className="grain-overlay" />` from `src/App.tsx`

**Remove Hero Section:**
- In `src/pages/Home.tsx`, replace the new hero section with the original simpler layout

**Remove Timeline Path:**
- In `src/pages/Timeline.tsx`, remove the `.timeline-path` div and scroll detection logic

**Remove Navbar Blur:**
- In `src/App.tsx`, remove the `isScrolled` state and `navbar-cinematic` class

## Design Philosophy

The cinematic mode was designed to:
- Make scrolling feel like moving through a story
- Create a premium, high-end aesthetic
- Add depth without clutter
- Use subtle, intentional animations
- Maintain calm, immersive experience

## Performance Notes

All animations use:
- CSS transforms (hardware accelerated)
- `will-change` hints for smooth performance
- Efficient intersection observers
- Throttled scroll events

The overhead is minimal and should not impact performance on modern devices.

## Customization

Want to adjust the cinematic experience? Edit these CSS variables in `src/cinematic.css`:

```css
:root {
  --cinematic-spacing: 12rem;      /* Space between major sections */
  --section-spacing: 8rem;          /* Space between content sections */
  --warm-glow: rgba(255, 223, 186, 0.15);  /* Glow color */
  --transition-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);  /* Animation curve */
}
```

## Support

If you need help reverting or customizing the cinematic mode, all the code is clearly commented and organized for easy modification.
