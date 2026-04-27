import fs from 'fs';

// Helper to write comments in specific files
function replaceInFile(filePath, search, replacement) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    if (!content.includes(replacement)) {
      content = content.replace(search, replacement);
      fs.writeFileSync(filePath, content);
    }
  }
}

// 1. src/utils/audio.js
replaceInFile('src/utils/audio.js', 
`export const playSelectSound = () => {`, 
`/**
 * Plays the menu selection sound effect.
 * Creates a new Audio instance each time to allow for overlapping sounds,
 * mimicking the rapid UI feedback found in Persona 5.
 */
export const playSelectSound = () => {`);

// 2. src/App.jsx
replaceInFile('src/App.jsx',
`function BackgroundMusic() {`,
`/**
 * Global Background Music (BGM) player component.
 * Handles fading in/out, volume control, and auto-play logic with local storage persistence.
 */
function BackgroundMusic() {`);

replaceInFile('src/App.jsx',
`function MenuScreen() {`,
`/**
 * Home screen containing the main Persona 5 styled menu.
 */
function MenuScreen() {`);

replaceInFile('src/App.jsx',
`function AnimatedRoutes() {`,
`/**
 * Wraps routes in Framer Motion's AnimatePresence to enable page exit/enter animations.
 */
function AnimatedRoutes() {`);

// 3. src/P5Menu.jsx
replaceInFile('src/P5Menu.jsx',
`const activate = (idx) => {`,
`  // Sets the new active menu item and triggers the animation key to restart the wiggle effect
  const activate = (idx) => {`);

replaceInFile('src/P5Menu.jsx',
`export default function P5Menu({ onNavigate }) {`,
`/**
 * P5Menu: The core Persona 5 style animated menu.
 * Features a polygon clip-path that wiggles when active, custom fonts, and keyboard navigation.
 */
export default function P5Menu({ onNavigate }) {`);

// 4. src/PageTransition.jsx
replaceInFile('src/PageTransition.jsx',
`function DefaultTransition() {`,
`/**
 * Renders the default multi-stripe Persona 5 transition overlay.
 * Stripes slide in from the right to obscure the screen before changing routes.
 */
function DefaultTransition() {`);

// 5. src/AboutMe.jsx
replaceInFile('src/AboutMe.jsx',
`export default function AboutMe() {`,
`/**
 * About Me page displaying a persona/character stylistic view.
 * It uses layout sections mapped to array data (ITEMS, REVEAL_CONTENT).
 */
export default function AboutMe() {`);

// 6. src/ResumePage.jsx
replaceInFile('src/ResumePage.jsx',
`export default function ResumePage() {`,
`/**
 * Resume page highlighting skills and education.
 * Displays a list of cards with detailed inner rows on the right.
 */
export default function ResumePage() {`);


