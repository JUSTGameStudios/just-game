# Just - The Line Game

A sophisticated Progressive Web App (PWA) implementation of a two-player line-drawing game with retro pixel art aesthetic and series gameplay.

**Copyright © 2020-2025 Taylor Hanlon & Cesar Guzman. All Rights Reserved.**

## Project Overview

Just is a strategic two-player game where players draw vertical lines at the same x-coordinate and compete based on line positioning. The game features best-of series gameplay, PWA capabilities, and mobile-optimized touch controls.

## Project Structure

```
just/
├── index.html         # Complete game client (760+ lines - HTML + CSS + JavaScript)
├── server.js          # HTTP development server (27 lines)
├── https-server.js    # HTTPS server for PWA testing (45 lines)
├── sw.js              # Service worker for PWA caching (78 lines)
├── manifest.json      # PWA manifest with icons and metadata
├── start.sh           # Bash script to start HTTP server
├── LICENSE            # Custom restrictive license
├── README.md          # Project documentation
└── CLAUDE.md          # This file - comprehensive project context
```

## Technology Stack

- **Frontend**: Pure HTML5 Canvas + Vanilla JavaScript (no dependencies)
- **Backend**: Node.js HTTP server (no external packages)
- **PWA**: Service Worker with cache-first strategy
- **Styling**: CSS with retro pixel art aesthetic
- **Platform**: Cross-platform (Termux on Android, all modern browsers)
- **Deployment**: GitHub Pages with HTTPS

## Game Mechanics

### Core Rules (`index.html:494-539`)
1. **Line Drawing**: Both players draw vertical lines at the same x-coordinate (center)
2. **Secrecy**: Player 1 draws first (hidden), then Player 2 draws
3. **Victory Conditions**:
   - If one line fits entirely within the other → **smaller line wins**
   - If lines don't overlap → **longer line wins**
   - If lines partially overlap → **"JUST" (draw)** with red divider

### Series Gameplay (`index.html:445-493`)
- **Best of 1, 3, or 5**: Players choose series length at start
- **Score Tracking**: Games won (not individual rounds)
- **Divider Behavior**: Clear between games, persist during JUST rounds
- **Series Winner**: First to win majority of games

### Red Dividers (`index.html:290-299, 455-465`)
- **Appear on JUST**: Horizontal lines mark overlap areas
- **Block Future Lines**: Lines cannot cross existing dividers
- **Cumulative**: Multiple dividers can exist simultaneously
- **Reset on Win**: Clear when a player wins a game

## Key Components

### Game State Management (`index.html:412-424`)
```javascript
gameState = {
    currentPlayer: 1,           // 1 or 2
    phase: 'drawing',          // 'drawing', 'evaluating', 'showing_result'
    lines: [],                 // Current round's lines
    horizontalDividers: [],    // Red blocking lines
    scores: { player1: 0, player2: 0 }, // Games won in series
    rounds: 0,                 // Rounds within current game
    bestOf: 1,                 // Series length (1, 3, or 5)
    seriesStarted: false,      // Whether series has begun
    hasWinner: false           // Whether current series has winner
}
```

### Canvas System (`index.html:426-481`)
- **Responsive Sizing**: Auto-adjusts to container (`resizeCanvas()`)
- **Drawing Functions**: Line rendering with colors (Player 1: green, Player 2: blue)
- **Coordinate System**: Uses canvas pixel coordinates
- **Redraw Logic**: Complete canvas refresh on state changes

### Input Handling (`index.html:657-729`)
- **Touch & Mouse**: Unified event handling
- **Drawing Prevention**: Blocks input when modals open
- **Line Validation**: Minimum 10px length requirement
- **Divider Collision**: Stops drawing at red dividers

### UI Components

#### Header (`index.html:49-64, 78-86`)
- **Game Title**: "JUST" always visible
- **Player Info**: Current player turn (hidden during modal)
- **Instructions**: Context-sensitive help text
- **Compact Design**: 40px height for mobile optimization

#### Buttons (`index.html:132-175`)
- **Retro Style**: Pixel art aesthetic with black borders
- **Rules Button**: Opens game instructions modal
- **New Game Button**: Resets scores and starts series selection
- **Responsive**: Smaller on mobile devices

#### Scoreboard (`index.html:94-105`)
- **Series Progress**: Shows "Best of X" and current game number
- **Score Display**: Games won by each player
- **Compact Layout**: Optimized for mobile screens

### Modal System

#### Series Selection (`index.html:254-290`)
- **Game Mode Choice**: Best of 1, 3, or 5
- **Retro Buttons**: Consistent pixel art styling
- **Auto-show**: Appears on game start and series completion

#### Rules Modal (`index.html:233-253`)
- **Game Instructions**: Complete rule explanation
- **Attribution**: Credits game creators
- **Mobile Responsive**: Scales for different screen sizes

#### Result Modal (`index.html:228-232`)
- **Side-positioned**: Located on right side to keep lines visible
- **Win Announcement**: Player victory or JUST notification
- **Dynamic Buttons**: "Continue", "Next Game", or "New Series"
- **Responsive Design**: Scales from 180px to 110px width based on screen size
- **Non-obstructive**: Players can view drawn lines while modal is open

### Progressive Web App Features

#### Service Worker (`sw.js:1-78`)
- **Cache Strategy**: Cache-first with network fallback
- **Versioned Caching**: `just-game-v27` for cache busting
- **Offline Support**: Full game playable offline
- **Asset Caching**: HTML, manifest, and all resources

#### Manifest (`manifest.json:1-42`)
- **App Metadata**: Name, description, theme colors
- **Icon Suite**: 192px and 512px SVG icons with maskable support
- **Display Mode**: Standalone for app-like experience
- **Scope**: GitHub Pages compatible (`/just-game/`)

#### Installation
- **Add to Home Screen**: Available on mobile browsers
- **Offline Capability**: Works without internet after install
- **App Shell**: Cached for instant loading

## Mobile Optimization

### Viewport Handling (`index.html:28-42`)
- **Browser Bar Fix**: `-webkit-fill-available` for iOS Safari
- **Touch Optimization**: `touch-action: none` prevents scrolling
- **Responsive Canvas**: Maximum play area while preserving UI

### Layout System (`index.html:45-48`)
- **Flexbox**: Vertical layout with proper scaling
- **Compact Headers**: Minimal space usage (40px header)
- **Fixed Elements**: Prevent content overflow on small screens

## Development & Deployment

### Local Development
```bash
# HTTP Server (development)
node server.js                    # Runs on http://localhost:8080

# HTTPS Server (PWA testing)
node https-server.js              # Runs on https://localhost:8443

# Quick Start
./start.sh                        # Alias for HTTP server
```

### Production Deployment
- **GitHub Pages**: https://JUSTGameStudios.github.io/just-game/
- **HTTPS Required**: For PWA functionality on mobile
- **Cache Versioning**: **CRITICAL** - Update `sw.js` cache name for deployments

### PWA Cache Busting (IMPORTANT)
**Every time you make changes to the game**, you MUST:
1. Update the cache version in `sw.js` (e.g., `just-game-v27` → `just-game-v28`)
2. Commit and push the service worker change
3. This forces PWA users to download the updated version
4. Without this, users will see the old cached version indefinitely

**Current Version**: `just-game-v27` (as of latest update)

### Testing
- **No Build Process**: Direct file deployment
- **Browser DevTools**: Use F12 for debugging
- **Mobile Testing**: Use device emulation or real devices
- **PWA Testing**: Chrome DevTools > Application > Service Workers

## Important Code Locations

### Core Game Logic
- **Line Evaluation**: `index.html:494-539` - Victory condition algorithm
- **Game State Updates**: `index.html:445-493` - Result processing and series logic
- **Draw Functions**: `index.html:347-385` - Canvas rendering system

### Input & Interaction
- **Touch Handling**: `index.html:657-729` - Mouse and touch event processing
- **Modal Logic**: `index.html:730-780` - UI state management
- **Button Events**: `index.html:730-770` - User interaction handling

### UI Updates
- **Dynamic Text**: `index.html:642-656` - Player turn and instruction updates
- **Scoreboard**: `index.html:579-587` - Series progress display
- **Responsive Layout**: `index.html:426-443` - Canvas resizing

### PWA Implementation
- **Service Worker Registration**: `index.html:795-809`
- **Cache Management**: `sw.js:8-34` - Install and activate events
- **Network Strategy**: `sw.js:37-78` - Fetch event handling

## Styling & Aesthetic

### Retro Pixel Art Theme
- **Monospace Font**: Terminal/console appearance
- **Black Borders**: Sharp, blocky button design
- **Drop Shadows**: 8px for modals, 4px for buttons
- **Color Palette**: Dark theme with green/blue player colors

### Mobile-First Design
- **Touch Targets**: Large enough for finger interaction
- **Compact Layout**: Maximizes play area
- **Readable Text**: Sufficient contrast and sizing

## License & Usage

### Restrictions (LICENSE:1-46)
- **Personal Use**: ✅ Free for non-commercial use
- **Educational Use**: ✅ Study and learning permitted
- **Commercial Use**: ❌ Prohibited without written permission
- **Distribution**: ❌ App stores/platforms require permission
- **Attribution**: Required - "Game concept by Taylor Hanlon & Cesar Guzman"

### Contact
- **Commercial Licensing**: JustGameStudios@outlook.com
- **Repository**: https://github.com/JUSTGameStudios/just-game

## Development Notes

### Code Quality
- **Defensive Programming**: Handles edge cases and invalid input
- **No Dependencies**: Pure vanilla implementation for reliability
- **Cross-Platform**: Works in Termux on Android and all modern browsers
- **Self-Contained**: All assets embedded in HTML (no external files)

### Performance
- **Efficient Rendering**: Only redraws when necessary
- **Touch Optimized**: Minimal input lag
- **Small Bundle**: ~50KB total (including PWA assets)
- **Fast Loading**: Service worker enables instant subsequent loads

### Maintenance
- **Version Control**: Git with GitHub hosting
- **Cache Busting**: **ESSENTIAL** - Manual service worker version updates for every deployment
- **Mobile Testing**: Regular testing on various devices
- **PWA Compliance**: Follows web app manifest standards

### Recent Changes & Lessons Learned

#### Modal Design Evolution
- **Problem**: Original result modal covered drawn lines, preventing players from viewing results
- **Solution**: Repositioned modal to right side of screen using available space
- **Benefit**: Players can simultaneously view game results and drawn lines
- **Implementation**: CSS positioning with responsive breakpoints for different screen sizes

#### Service Worker Cache Management
- **Critical Issue**: Forgetting to update cache version leaves users with old versions
- **Solution**: Always increment cache version number in `sw.js` after any changes
- **Best Practice**: Make cache version updates part of standard commit workflow
- **Verification**: Check Network tab in DevTools to confirm new version loaded

## Common Tasks

### Adding Features
1. Update game logic in `index.html`
2. **CRITICAL**: Increment service worker cache version in `sw.js`
3. Test locally with both HTTP and HTTPS servers
4. Commit and push changes to GitHub
5. Test PWA functionality on mobile devices
6. Verify cache busting worked by checking network requests in DevTools

### Debugging
- **Game Logic**: Use browser console and breakpoints
- **Canvas Issues**: Check canvas sizing and coordinate systems
- **PWA Problems**: Inspect service worker in DevTools
- **Mobile Issues**: Use device emulation or real device testing

### Performance Optimization
- **Canvas**: Minimize redraws and use efficient rendering
- **Touch**: Ensure responsive input handling
- **Caching**: Update service worker for optimal caching strategy
- **Mobile**: Test on various devices and screen sizes

This codebase represents a complete, production-ready game with modern web standards, mobile optimization, and PWA capabilities while maintaining a simple, dependency-free architecture.

---

## Quick Reference for Claude Code

### Essential Commands
```bash
# Start development server
node server.js

# Test PWA with HTTPS
node https-server.js

# Standard deployment workflow
git add -A
git commit -m "Description of changes"
git push origin main
```

### PWA Update Checklist
- [ ] Update cache version in `sw.js`
- [ ] Commit and push changes
- [ ] Test on mobile device
- [ ] Verify cache busting in DevTools

### File Priorities for Changes
1. **`index.html`** - Main game implementation (all logic, UI, styling)
2. **`sw.js`** - Service worker (update version after every change)
3. **`manifest.json`** - PWA configuration (rarely changed)
4. **`CLAUDE.md`** - Documentation (update for significant changes)