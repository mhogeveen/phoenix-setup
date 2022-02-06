import { DISPLAYS_HAVE_SEPARATE_SPACES } from './constants.js'
import mouseSpace from './mouse_space.js'

/**
 * Move the passed in App to the currently active space
 * Returns whether the app was moved and the space the app is now in.
 * @param {App} app the application to move to the active space
 * @param {boolean} followsMouse whether the app should open in the screen containing the mouse or the key with keyboard focus
 */
 export default function moveAppToActiveSpace(app, followsMouse) {
  const activeSpace = followsMouse ? mouseSpace() : Space.active();
  const mainWindow = app.mainWindow(); // get app window
  let moved = false; // boolean if the app was moved to a new space
  if (mainWindow.spaces().length > 1) {
    // check one space per screen
    throw new Error(DISPLAYS_HAVE_SEPARATE_SPACES);
  }
  if (activeSpace !== undefined) {
    // check if the main window was moved
    moved = !!!(
      mainWindow.spaces().length > 0 &&
      mainWindow.spaces()[0].isEqual(activeSpace)
    );
    if (moved) {
      // otherwise remove the main window from the spaces it is in
      mainWindow.spaces().forEach((space) => {
        space.removeWindows([mainWindow]);
      });
      // add window to active space
      activeSpace.addWindows([mainWindow]);
    }
  }
  return { moved, space: activeSpace };
}