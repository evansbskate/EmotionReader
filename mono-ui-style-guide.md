# Monochromatic UI Style Guide
*A minimalist design system based on Shadcn principles*

---

## Core Philosophy

This style guide embraces radical minimalism through monochromatic design, combining Shadcn's modern aesthetic principles with the timeless elegance of black and white. Every element serves a purpose, every shadow has meaning, and every space breathes intention.

---

## 1. Color System

### Primary Palette
```
Pure Black    #000000    Primary text, critical actions
Near Black    #0A0A0A    Headings, emphasis
Dark Gray     #1A1A1A    Secondary elements
Medium Gray   #404040    Borders, dividers
Light Gray    #A0A0A0    Muted text, placeholders
Near White    #F5F5F5    Backgrounds, cards
Pure White    #FFFFFF    Primary background, contrast
```

### Functional Colors
```
Error State   #000000    100% opacity with underline
Warning       #000000    75% opacity with dashed underline
Success       #000000    With checkmark icon
Information   #000000    50% opacity with info icon
```

---

## 2. Typography

### Font Stack
```css
font-family: 'JetBrains Mono', 'SF Mono', 'Roboto Mono', 
             'Courier New', monospace;
```

### Type Scale
```
Display       48px    Line: 56px    Weight: 700    Tracking: -0.02em
Heading 1     32px    Line: 40px    Weight: 600    Tracking: -0.01em
Heading 2     24px    Line: 32px    Weight: 600    Tracking: 0
Heading 3     20px    Line: 28px    Weight: 500    Tracking: 0
Body Large    16px    Line: 24px    Weight: 400    Tracking: 0
Body          14px    Line: 20px    Weight: 400    Tracking: 0.01em
Small         12px    Line: 16px    Weight: 400    Tracking: 0.02em
Caption       10px    Line: 14px    Weight: 500    Tracking: 0.03em
```

### Text Principles
- Maximum line length: 65-75 characters
- Paragraph spacing: 1.5x line height
- Letter spacing increases as size decreases
- Bold (600-700) for emphasis, never italic in mono

---

## 3. Spacing System

### Base Unit: 4px
```
Space 1    4px     Tight spacing, inline elements
Space 2    8px     Default component padding
Space 3    12px    Related element grouping
Space 4    16px    Standard margins
Space 5    24px    Section spacing
Space 6    32px    Large section breaks
Space 7    48px    Major section dividers
Space 8    64px    Page sections
Space 9    96px    Hero sections
```

### Component Spacing Rules
- Internal padding: Use Space 2-4
- Between related items: Space 3
- Between sections: Space 6-8
- Minimum touch target: 44x44px

---

## 4. Shadow & Elevation

### Shadow Scale (Black only)
```css
/* Elevation 0 - Flat */
box-shadow: none;

/* Elevation 1 - Subtle */
box-shadow: 0 1px 2px rgba(0,0,0,0.05);

/* Elevation 2 - Default */
box-shadow: 0 2px 4px rgba(0,0,0,0.08);

/* Elevation 3 - Raised */
box-shadow: 0 4px 8px rgba(0,0,0,0.12);

/* Elevation 4 - Overlay */
box-shadow: 0 8px 16px rgba(0,0,0,0.16);

/* Elevation 5 - Modal */
box-shadow: 0 16px 32px rgba(0,0,0,0.24);
```

### Interactive Shadow States
```css
/* Default */
box-shadow: 0 2px 4px rgba(0,0,0,0.08);

/* Hover */
box-shadow: 0 4px 8px rgba(0,0,0,0.12);

/* Active/Pressed */
box-shadow: 0 1px 2px rgba(0,0,0,0.05);

/* Focus */
box-shadow: 0 0 0 2px #000000;
```

---

## 5. Components

### Buttons

**Primary Button**
```css
background: #000000;
color: #FFFFFF;
padding: 12px 24px;
border: none;
border-radius: 0;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
text-transform: uppercase;
transition: all 0.2s ease;
```

**Secondary Button**
```css
background: #FFFFFF;
color: #000000;
border: 2px solid #000000;
/* Other properties same as primary */
```

**Ghost Button**
```css
background: transparent;
color: #000000;
border: 1px solid #A0A0A0;
/* Hover: border-color: #000000 */
```

### Cards
```css
background: #FFFFFF;
border: 1px solid #F5F5F5;
padding: 24px;
box-shadow: 0 2px 4px rgba(0,0,0,0.08);
transition: box-shadow 0.2s ease;
```

### Input Fields
```css
background: #FFFFFF;
border: 1px solid #A0A0A0;
padding: 12px 16px;
font-size: 14px;
line-height: 20px;
/* Focus: border-color: #000000 */
/* Focus: box-shadow: 0 0 0 1px #000000 */
```

### Navigation
```css
/* Nav Bar */
background: #FFFFFF;
border-bottom: 1px solid #F5F5F5;
height: 64px;
padding: 0 32px;

/* Nav Item */
color: #404040;
padding: 8px 16px;
transition: color 0.2s ease;
/* Hover: color: #000000 */
/* Active: color: #000000, border-bottom: 2px solid #000000 */
```

---

## 6. Layout Principles

### Grid System
```
Container Max Width: 1280px
Columns: 12
Gutter: 24px
Margin (Desktop): 32px
Margin (Mobile): 16px
```

### Breakpoints
```css
Mobile       0-639px      Single column, stack all
Tablet       640-1023px   Two column, hybrid layouts
Desktop      1024-1279px  Full grid, optimal viewing
Wide         1280px+      Constrained max-width
```

### Component Sizing
```
Minimum Button Width:     120px
Maximum Button Width:     320px
Minimum Input Width:      200px
Maximum Input Width:      480px
Card Minimum Height:      120px
Modal Maximum Width:      640px
Dropdown Maximum Height:  400px
```

---

## 7. Interaction States

### State Definitions
```
Default     Base state, no interaction
Hover       Cursor over element
Active      Currently pressed/clicked
Focus       Keyboard navigation selected
Disabled    Non-interactive, 40% opacity
Loading     In progress, animated dots
Error       Validation failed, black underline
Success     Action completed, checkmark icon
```

### Animation Timing
```css
/* Micro-interactions */
transition-duration: 0.15s;
transition-timing-function: ease-out;

/* State changes */
transition-duration: 0.2s;
transition-timing-function: ease-in-out;

/* Page transitions */
transition-duration: 0.3s;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 8. Iconography

### Icon Specifications
```
Size Scale:   16px, 20px, 24px, 32px
Stroke Width: 1.5px (small), 2px (standard)
Style:        Outline only, no fills
Corner Radius: Sharp or 2px maximum
```

### Common Icons (ASCII/Unicode)
```
Arrow Right   →    \u2192
Arrow Left    ←    \u2190
Arrow Up      ↑    \u2191
Arrow Down    ↓    \u2193
Close         ×    \u00D7
Menu          ≡    \u2261
Check         ✓    \u2713
Plus          +    \u002B
Minus         −    \u2212
Search        ⌕    \u2315
Settings      ⚙    \u2699
Info          ⓘ    \u24D8
Warning       ⚠    \u26A0
```

---

## 9. Accessibility

### Contrast Requirements
- Normal text: 7:1 ratio minimum
- Large text: 4.5:1 ratio minimum
- UI components: 3:1 ratio minimum
- Always test with WCAG 2.1 AA standards

### Keyboard Navigation
```
Tab         Navigate forward
Shift+Tab   Navigate backward
Enter       Activate button/link
Space       Toggle checkbox/button
Arrow Keys  Navigate within components
Escape      Close modal/dropdown
```

### Focus Indicators
```css
/* Visible focus */
outline: 2px solid #000000;
outline-offset: 2px;

/* High contrast mode */
@media (prefers-contrast: high) {
  outline-width: 3px;
}
```

### Screen Reader Support
- Use semantic HTML elements
- Provide descriptive aria-labels
- Include skip navigation links
- Announce dynamic content changes
- Test with NVDA/JAWS/VoiceOver

---

## 10. Design Patterns

### Form Validation
```
- Inline validation on blur
- Clear error messages below fields
- Black underline for errors
- Checkmark icon for valid fields
- Summary at form top for submission errors
```

### Loading States
```css
/* Three dots animation */
@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}
```

### Empty States
```
- Centered in container
- Simple icon or illustration
- Clear heading (20px)
- Descriptive text (14px, #404040)
- Single action button if applicable
```

### Data Tables
```
- Zebra striping with #F5F5F5
- Sticky header with #FFFFFF background
- 1px solid #A0A0A0 borders
- 16px padding in cells
- Monospace for numerical data
- Right-align numbers, left-align text
```

---

## 11. Code Examples

### HTML Structure
```html
<div class="container">
  <header class="header">
    <h1 class="heading-1">Title</h1>
  </header>
  
  <main class="content">
    <section class="card">
      <h2 class="heading-2">Section Title</h2>
      <p class="body">Content goes here.</p>
      <button class="btn btn-primary">Action</button>
    </section>
  </main>
</div>
```

### CSS Classes
```css
.mono-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

.mono-text-primary {
  color: #000000;
  font-weight: 400;
}

.mono-shadow-sm {
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.mono-border {
  border: 1px solid #A0A0A0;
}
```

---

## 12. Best Practices

### Do's
✓ Maintain consistent spacing throughout
✓ Use shadows to establish hierarchy
✓ Ensure all text is readable (contrast)
✓ Keep animations subtle and purposeful
✓ Test on multiple screen sizes
✓ Prioritize content over decoration
✓ Use white space generously
✓ Keep interaction patterns predictable

### Don'ts
× Don't use more than 3 elevation levels per view
× Avoid mixing border styles
× Don't center-align body text
× Never use pure black on pure black
× Avoid animations longer than 0.3s
× Don't break the monospace grid
× Never sacrifice usability for aesthetics
× Don't override system accessibility settings

---

## Appendix: Quick Reference

### CSS Variables
```css
:root {
  --mono-black: #000000;
  --mono-gray-900: #0A0A0A;
  --mono-gray-800: #1A1A1A;
  --mono-gray-600: #404040;
  --mono-gray-400: #A0A0A0;
  --mono-gray-100: #F5F5F5;
  --mono-white: #FFFFFF;
  
  --mono-font: 'JetBrains Mono', monospace;
  --mono-radius: 0px;
  --mono-transition: 0.2s ease;
}
```

---