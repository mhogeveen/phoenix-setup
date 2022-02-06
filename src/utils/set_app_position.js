import { DISPLAYS_HAVE_SEPARATE_SPACES } from "./constants.js";

/**
 * Positions an application using margins which are a percentage of the width and height.
 * left: 0 positions the left side of the app on the left side of the screen.
 * left: .5 positions the left side of the app half the width from the left side of the screen.
 * {left: 0, right: 0, top: 0, bottom: 0} would be full screen
 * {left: .25, right: .25, top: .25, bottom: .25} would be centered with half the screen height
 * {left: 0, right: .5, top: 0, bottom: .5} would be the top left quadrant
 * @param {App} app the application to set the position of
 * @param {{left: number, top: number, right: number, bottom: number}} relativeFrame the margins to place the application in.
 * @param {Space} space the space to position the app in
 */
export default function setAppPosition(app, relativeFrame, space) {
  const mainWindow = app.mainWindow(); // get app window
  if (space.screens().length > 1) {
    // check one space per screen
    throw new Error(DISPLAYS_HAVE_SEPARATE_SPACES);
  } else if (space.screens().length > 0) {
    // set the position of the app
    const activeScreen = space.screens()[0];
    const screen = activeScreen.flippedVisibleFrame();
    const left = screen.x + relativeFrame.left * screen.width;
    const top = screen.y + relativeFrame.top * screen.height;
    const right = screen.x + screen.width - relativeFrame.right * screen.width;
    const bottom =
      screen.y + screen.height - relativeFrame.bottom * screen.height;
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    }
    mainWindow.setTopLeft({
      x: left,
      y: top,
    });
    mainWindow.setSize({
      width: right - left,
      height: bottom - top,
    });
  }
}
