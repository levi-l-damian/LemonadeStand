module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest-setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-redux" +
      "|@react-navigation" +
      "|@react-native-async-storage/async-storage" +
      "|expo(nent)?" +
      "|@expo(nent)?/.*" +
      "|expo-.*" +
      "|@expo/.*" +
      "|react-native-svg" +
      ")/)",
  ],
};
