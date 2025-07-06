# Just - The Line Game

A simple two-player game where players draw vertical lines and compete based on line positioning.

**Copyright © 2024 Taylor Hanlon & Cesar Guzman. All Rights Reserved.**

## How to Play

1. Player 1 draws a vertical line of any length
2. The line is hidden and Player 2 draws their line
3. Winner is determined by:
   - If one line fits entirely within the other, the smaller line wins
   - If lines don't overlap, the longer line wins
   - If lines partially overlap, it's a "JUST" (draw) and a red divider appears

## Running the Game

1. Start the server:
   ```bash
   node server.js
   ```

2. Open your browser to:
   ```
   http://localhost:8080
   ```

## Game Features

- Touch/mouse support for drawing lines
- Score tracking for both players
- Round counter
- Red divider lines appear after JUST results
- New game/reset functionality

## Technical Details

- Built with HTML5 Canvas
- Pure JavaScript (no dependencies)
- Responsive design for mobile devices
- Works in Termux on Android
- Progressive Web App (PWA) support

## License

This game is protected under a custom restrictive license. See the [LICENSE](LICENSE) file for details.

**Key points:**
- ✅ Free for personal, non-commercial use
- ✅ Educational use allowed
- ❌ Commercial use prohibited without permission
- ❌ Distribution on app stores prohibited without permission
- ❌ Creating commercial derivatives prohibited

For commercial licensing inquiries, contact: JustGameStudios@outlook.com

## Credits

Game concept by Taylor Hanlon & Cesar Guzman