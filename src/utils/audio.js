/**
 * Plays the menu selection sound effect.
 * Creates a new Audio instance each time to allow for overlapping sounds,
 * mimicking the rapid UI feedback found in Persona 5.
 */
export const playSelectSound = () => {
  const audio = new Audio('/audio/select.mp3');
  audio.volume = 0.5;
  audio.play().catch(() => {});
};
