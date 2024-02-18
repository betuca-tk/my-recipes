module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["tsconfig.json"],
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        tsx: true,
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "airbnb-typescript",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "prettier",
    ],
    plugins: ["react", "react-hooks", "import", "jsx-a11y", "prettier"],
    rules: {
      "prettier/prettier": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    root: false,
    
  };