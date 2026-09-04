// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Workaround: Metro's "package exports" resolution currently breaks the
// relative imports inside @react-navigation/routers (e.g. "./types.js"
// can't be resolved), causing a 500 "UnableToResolveError" when opening
// the app. Disabling it falls back to classic Node resolution, which
// resolves these imports correctly.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
