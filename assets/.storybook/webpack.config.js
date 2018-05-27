const path = require("path")

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.context = path.resolve(__dirname, 'js')
  defaultConfig.resolve.alias = {
    '~': path.resolve('js')
  }
  return defaultConfig;
}
