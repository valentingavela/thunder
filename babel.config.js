function config(api) {
  // jest set NODE_ENV to 'test'
  const isTestEnv = api.env('test');
  if (isTestEnv) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    };
  }

  return {};
}

module.exports = config;
