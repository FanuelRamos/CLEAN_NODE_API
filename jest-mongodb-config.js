module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '5.0.9',
      skipMD5: true
    },
    autoStart: false,
    instance: {
      dbName: 'jest'
    }
  }
}
