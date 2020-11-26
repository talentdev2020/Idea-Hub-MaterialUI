/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

export const firebaseConfig = {
  apiKey: "AIzaSyDZHd-IVZVPMKt1O594nY11tU8IXhkc9FE",
  authDomain: "idea-hub-56602.firebaseapp.com",
  databaseURL: "https://idea-hub-56602.firebaseio.com",
  projectId: "idea-hub-56602",
  storageBucket: "idea-hub-56602.appspot.com",
  messagingSenderId: "466151177261",
  appId: "1:466151177261:web:53ecbe21a4ddcb9e3fcca4",
  measurementId: "G-ZJ5RBDED83"
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = true;
export const defaultColor = "light.purple";
export const defaultDirection = "ltr";
export const isDarkSwitchActive = true;
export const themeColorStorageKey = "__theme_color";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = false;
