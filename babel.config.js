module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }
        // targets: "defaults"
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@helpers': './src/helpers',
        '@interfaces': './src/interfaces',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts',
    '**/dev.ts'
  ]
}