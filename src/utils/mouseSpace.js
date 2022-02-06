import screenContainsPoint from "./pointOnScreen.js";

/**
 * Get the space which contains the mouse
 */
export default function mouseSpace() {
  const mouseLocation = Mouse.location();
  const screen = Screen.all().find((s) =>
    screenContainsPoint(s, mouseLocation)
  );
  if (screen !== undefined) {
    return screen.currentSpace();
  }
}
