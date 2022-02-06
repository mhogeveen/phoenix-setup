import quakeApp from './utils/quake.js'
import { TERMINAL_BOTTOM } from './utils/constants.js'

// Create Quake Apps
quakeApp({
  key: "space",
  modifiers: ["alt"],
  appName: "kitty",
  position: TERMINAL_BOTTOM,
  followsMouse: true,
  hideOnBlur: true,
})
