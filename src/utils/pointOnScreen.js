/**
 * Return whether the point is contained in the screen
 * @param {Screen} screen a screen object to check for a point
 * @param {Point} point a point using flipped coordinates (origin upper left)
 */
export default function screenContainsPoint(screen, point) {
  const frame = screen.flippedFrame();
  return (
    point.x >= frame.x &&
    point.x <= frame.x + frame.width &&
    point.y >= frame.y &&
    point.y <= frame.y + frame.height
  );
}
