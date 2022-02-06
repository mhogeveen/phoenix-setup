import startApp from "./start.js";
import moveAppToActiveSpace from "./move.js";
import setAppPosition from "./position.js";

/**
 * Create a keyboard event listener which implements a quake app
 * @param {string} key the key which triggers the app
 * @param {string[]} modifiers the modifiers which must be used in combination with the key (["alt", "ctrl"])
 * @param {string} appName the name of the app
 * @param {{left: number, top: number, right: number, bottom: number}} relativeFrame the margins to place the application in.
 * @param {followsMouse} boolean whether the app should open in the screen containing the mouse
 * @param {hideOnBlur} boolean whether the window should hide when it loses focus
 */
export default function quakeApp({
  key,
  modifiers,
  appName,
  position,
  followsMouse,
  hideOnBlur,
}) {
  Key.on(key, modifiers, async function (_, repeat) {
    // ignore keyboard repeats
    if (repeat) {
      return;
    }
    let [app, opened] = await startApp(appName, { focus: false });

    // if the app started
    if (app !== undefined) {
      // move the app to the currently active space
      const { moved, space } = moveAppToActiveSpace(app, followsMouse);

      // set the app position
      setAppPosition(app, position, space);

      // hide the app if it is active and wasn't just opened or moved to
      // a new space
      if (app.isActive() && !opened && !moved) {
        app.hide();
      } else {
        app.focus();
      }

      if (hideOnBlur) {
        const identifier = Event.on("appDidActivate", (activatedApp) => {
          if (app.name() !== activatedApp.name()) {
            app.hide();
            Event.off(identifier);
          }
        });
      }
    }
  });
}
