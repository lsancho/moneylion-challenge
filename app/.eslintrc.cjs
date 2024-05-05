
/** @type {import("eslint").Linter.BaseConfig} */
const config = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', "next/core-web-vitals", "plugin:tailwindcss/recommended"],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['tailwindcss'],
  rules: {
    "tailwindcss/no-custom-classname": "off"
  },
  settings: {
    tailwindcss: {
      "callees": ["cn"],
      "config": "tailwind.config.js"
    },
    next: {
      "rootDir": ["./"]
    }
  },
}


module.exports = config
