# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sentiment Analyzer** - A real-time face and emotion detection web application powered by face-api.js and TensorFlow.js. Detects and analyzes human emotions through webcam with high accuracy and beautiful visualizations.

**GitHub Repository**: https://github.com/yourusername/SentimentAnalyzer

## Tech Stack

- **face-api.js** - Face detection and emotion recognition
- **TensorFlow.js** - Machine learning in the browser
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS3** - Glassmorphism and animations
- **HTML5 Canvas** - Real-time overlay rendering

## UI Design System

### Style Guide Reference
This project follows the **Monochromatic UI Style Guide** located at `mono-ui-style-guide.md`. When making any UI changes or additions, please refer to this guide for:

- **Color System**: Pure monochromatic palette (#000000 to #FFFFFF)
- **Typography**: JetBrains Mono font stack with defined type scale
- **Spacing**: 4px base unit system
- **Shadows**: 5-level elevation system using black-only shadows
- **Components**: Button, card, input, and navigation patterns
- **Animations**: Timing functions (0.15s-0.3s transitions)
- **Accessibility**: WCAG 2.1 AA compliance requirements

### Key UI Principles
- Radical minimalism through monochromatic design
- Every element serves a purpose
- Generous use of white space
- Consistent spacing using 4px base unit
- Keyboard navigation support
- High contrast ratios for accessibility

## Project Structure

```
SentimentAnalyzer/
├── index.html          # Main HTML structure
├── styles.css          # CSS styles (follows mono-ui-style-guide)
├── app.js             # Core application logic
├── mono-ui-style-guide.md  # Comprehensive UI style guide
├── README.md          # Project documentation
└── LICENSE           # MIT license
```

## Development Guidelines

### When Making UI Changes
1. **Always consult** `mono-ui-style-guide.md` first
2. **Use defined color palette** - Only use colors from the monochromatic system
3. **Follow spacing system** - Use Space 1-9 (4px base unit)
4. **Apply correct shadows** - Use Elevation 0-5 as defined
5. **Maintain typography scale** - Use predefined font sizes and weights
6. **Test accessibility** - Ensure contrast ratios meet WCAG standards

### Code Style
- Use semantic HTML elements
- Follow BEM naming convention for CSS classes
- Prefix custom classes with `mono-` when implementing style guide patterns
- Keep animations subtle (max 0.3s duration)
- Test on multiple screen sizes (mobile, tablet, desktop)

### Component Implementation
When creating new UI components:
1. Reference the component patterns in Section 5 of the style guide
2. Use the defined CSS variables from the Appendix
3. Follow the interaction states from Section 7
4. Implement proper keyboard navigation (Section 9)

## Common Commands

```bash
# Run locally (no build required)
open index.html

# Or serve with any static server
python -m http.server 8000
# Then navigate to localhost:8000

# Git operations
git status
git add .
git commit -m "Your message"
git push
```

## Features

### Current Capabilities
- Real-time webcam emotion detection
- 7 emotion categories (happy, sad, angry, surprised, neutral, fearful, disgusted)
- Confidence visualization with live emotion bars
- Snapshot analysis
- Performance monitoring (FPS counter)
- Model selection (Tiny/SSD)

### Privacy
- Runs entirely in browser
- No server communication
- No data storage
- Complete user privacy

## Best Practices

### Do's
✓ Follow the monochromatic UI style guide for all UI changes
✓ Maintain consistent spacing using the 4px grid
✓ Test emotion detection with various lighting conditions
✓ Ensure smooth animations (use style guide timings)
✓ Keep the UI minimal and focused on functionality

### Don'ts
× Don't add colors outside the monochromatic palette
× Avoid custom shadows - use the 5 defined elevation levels
× Don't create custom fonts - use JetBrains Mono stack
× Never compromise accessibility for aesthetics
× Don't send image data to external servers

## Testing

- Test webcam permissions on different browsers
- Verify emotion detection accuracy in various lighting
- Check responsive design on mobile devices
- Validate accessibility with screen readers
- Ensure smooth performance (target 30+ FPS)

## Future Enhancements

When implementing new features, ensure they:
1. Follow the mono-ui-style-guide design patterns
2. Maintain the minimalist aesthetic
3. Don't compromise performance
4. Preserve user privacy
5. Enhance the core emotion detection functionality