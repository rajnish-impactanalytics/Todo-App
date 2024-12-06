export const DEFAULT_MODAL_DATA = {
  title: "",
  description: "",
  dueDate: null,
  priority: "None",
};

export const TAB_MAPPING = ["todo", "completed", "all"];

export const BLACKLISTED_DOM_TARGETS = ["TEXTAREA", "INPUT"];

export const MODIFIER_MAP = {
  ShiftLeft: "Shift",
  ShiftRight: "Shift",
  ControlLeft: "Control",
  ControlRight: "Control",
  AltLeft: "Alt",
  AltRight: "Alt",
  MetaLeft: "Meta",
  MetaRight: "Meta",
};

export const KEYBOARD_SHORTCUT_CONFIGURATION = {
  overrideSystemShorcut: true,
  ignoreInputFields: true,
  repeatOnHold: false,
};

export const WINDOWS_KEYBOARD_SHORTCUTS = {
  search: ["Control", "Shift", "F"],
  createTask: ["Control", "Shift", "C"],
  toggleGridColor: ["Control", "Shift", "I"],
};

export const MAC_KEYBOARD_SHORTCUTS = {
  search: ["Meta", "Shift", "F"],
  createTask: ["Meta", "Shift", "C"],
  toggleGridColor: ["Meta", "Shift", "I"],
};

export const MODIFIER_SYMBOL_MAPPING = {
  Control: "⌃",
  Meta: "⌘",
  Option: "⌥",
  Alt: "⎇",
  Shift: "⇧",
};
