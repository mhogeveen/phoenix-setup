/**
 * Return a promise containing the Task handler used to run the osascript.
 * The promise is resolved or rejected with the handler based on the status.
 * @param {string} script the osascript script to run
 */
export default function osascript(script) {
  return new Promise((resolve, reject) =>
    Task.run("/usr/bin/osascript", ["-e", script], (handler) => {
      if (handler.status === 0) {
        return resolve(handler);
      } else {
        return reject(handler);
      }
    })
  );
}
