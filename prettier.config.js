module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',

  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  pluginSearchDirs: false,
};
