module.exports = function (api) {
  let resProduction = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'babel-plugin-styled-components',
      'tailwind-rn',
      'transform-remove-console',
      [
        'module-resolver',
        {
          root: './src',
          alias: {
            '~': './src',
            '~screens': './src/components/screens',
            '~shared': './src/components/shared',
            '~stores': './src/components/stores',
            '~styles': './src/components/styles',
            '~ui': './src/components/ui',
            '~utils': './src/utils',
            '~assets': './src/assets',
          },
        },
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      // [
      //   '@babel/plugin-proposal-class-properties',
      //   {
      //     loose: true,
      //   },
      // ],
    ],
  };

  if (api.env('production')) {
    return resProduction;
  }

  resProduction.plugins.splice(
    resProduction.plugins.indexOf('transform-remove-console'),
    1,
  );

  return resProduction;
};
