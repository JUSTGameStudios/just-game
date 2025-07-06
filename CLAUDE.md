# Just - The Line Game

A simple two-player browser-based game where players draw vertical lines and compete based on line positioning.

## Project Structure

```
just/
├── README.md          # Game documentation and instructions
├── index.html         # Complete game client (HTML + CSS + JavaScript)
├── server.js          # Simple HTTP server for serving the game
├── start.sh           # Bash script to start the server
└── CLAUDE.md          # This file - project context for Claude Code
```

## Technology Stack

- **Backend**: Node.js HTTP server (no dependencies)
- **Frontend**: Vanilla HTML5 Canvas + JavaScript
- **Styling**: CSS with responsive design
- **Platform**: Cross-platform (works in Termux on Android)

## Key Components

### Server (`server.js:1-27`)
- Simple HTTP server on port 8080
- Serves static `index.html` file
- No external dependencies

### Game Client (`index.html:1-438`)
- Complete self-contained game implementation
- HTML5 Canvas for drawing
- Touch and mouse input support
- Real-time game state management
- Score tracking and round system

## Running the Game

### Start Server
```bash
# Option 1: Direct node command
node server.js

# Option 2: Using the start script
chmod +x start.sh
./start.sh
```

### Access Game
Open http://localhost:8080 in any modern web browser

## Game Rules

1. Player 1 draws a vertical line (any length)
2. Line is hidden while Player 2 draws their line
3. Winner determined by:
   - If one line fits entirely within the other → smaller line wins
   - If lines don't overlap → longer line wins  
   - If lines partially overlap → "JUST" (draw) with red divider

## Development Notes

- No build process required
- No package.json or dependencies
- Pure JavaScript implementation
- Mobile-optimized touch controls
- Responsive canvas resizing
- Game state persisted in memory only

## File Details

- `server.js:24`: Server starts on port 8080
- `index.html:158-436`: Complete game logic in JavaScript
- `index.html:170-179`: Main game state object
- `index.html:249-293`: Core game evaluation algorithm
- `start.sh:5`: Launches server with node command

## Common Tasks

- **Start development server**: `node server.js`
- **Test on mobile**: Open http://localhost:8080 on mobile browser
- **Reset game**: Click "New Game" button in UI
- **Debug**: Use browser developer tools (F12)

## Notes for Claude Code

- This is a complete, working game with no external dependencies
- No build/test/lint commands - pure vanilla JavaScript
- Server is minimal - just serves static files
- All game logic is client-side in the HTML file
- Code is defensive and handles edge cases
- Mobile-first responsive design