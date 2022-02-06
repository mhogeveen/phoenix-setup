import osascript from "./osa.js";

/**
 * Get or launch the application with the passed in name.
 * Returns the app and a boolean for if the app was opened. app is undefined if the application fails to start.
 * @param {string} appName the name of the application to start
 * @param {{focus: boolean}} options focus determines whether or not to focus the app on launch
 */
export default async function startApp(appName) {
  // https://github.com/kasper/phoenix/issues/209
  // basically a hack to get around this bug

  // get the app if it is open
  let app = App.get(appName);
  let opened = false;

  // if app is open
  if (app !== undefined) {
    // make sure it has an open window
    if (app.windows().length === 0) {
      // if not open a new window
      await osascript(`tell application "${appName}"
        try
            reopen
        on error
          log "can not reopen the app"
          activate
        end
          end tell
        `);
      opened = true;
    }
  } else {
    // if app is not open activate it
    await osascript(`tell application "${appName}"
            activate
          end tell
        `);

    app = App.get(appName);
    opened = true;
  }

  return [app, opened];
}
