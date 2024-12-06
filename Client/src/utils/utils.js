import { showSnackbar } from "../utils/redux/snackbarSlice";
import {
  MAC_KEYBOARD_SHORTCUTS,
  WINDOWS_KEYBOARD_SHORTCUTS,
  MODIFIER_SYMBOL_MAPPING,
} from "../constants/globalConstants";
export const delaySimulation = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const displaySnackMessage = (dispatch, message, type) => {
  dispatch(
    showSnackbar({
      message: message,
      type: type,
    })
  );
};

// This function is designed to override the default behavior of events in a browser,
//such as preventing the default action of a key press or stopping the event
//from propagating further up the DOM tree.
export const overrideSystemShortcut = (e) => {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true; // IE-specific way to stop propagation
    }
  }
};

export const isMac = () => {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  return (
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    userAgent.includes("macintosh") ||
    userAgent.includes("mac os x")
  );
};

export const getKeyboardShortcuts = () => {
  const isMacPlatform = isMac();
  return isMacPlatform ? MAC_KEYBOARD_SHORTCUTS : WINDOWS_KEYBOARD_SHORTCUTS;
};

export const getModifierSymbols = (keys) => {
  return keys.map((key) => MODIFIER_SYMBOL_MAPPING[key] || key); // If no symbol, return the key itself
};
