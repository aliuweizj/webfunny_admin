const envUrls = {
  local: {
    apiServerUrl: "http://localhost:8011",
    nodeApiServerUrl: "http://localhost:8011",
    uri: "http://172.16.48.57"
  },
  dev: {
    apiServerUrl: "https://live.webfunny.com",
    nodeApiServerUrl: "https://live.webfunny.com",
    assetsUrl: "https://local.webfunny.cn",
    uri: "https://local.webfunny.cn:9100"
  },
  qa: {
    apiServerUrl: "https://live.webfunny.com",
    assetsUrl: "https://live.webfunny.com",
    nodeApiServerUrl: "https://live.webfunny.com",
    uri: "https://live.webfunny.com"
  },
  staging: {
    apiServerUrl: "https://live.webfunny.com",
    assetsUrl: "https://live.webfunny.com",
    nodeApiServerUrl: "https://live.webfunny.com",
    uri: "https://live.webfunny.com"
  },
  prod: {
    apiServerUrl: "//live.webfunny.com",
    assetsUrl: "//live.webfunny.com",
    nodeApiServerUrl: "//live.webfunny.com",
    uri: "//live.webfunny.com"
  }
}

const getApiHost = () => {
  return envUrls[BUILD_ENV].apiServerUrl
}

const getNodeApiHost = () => {
  return envUrls[BUILD_ENV].nodeApiServerUrl
}
//  relativePath   eg: "/ltvfe/cl/"
const getAssetsUrl = (env = BUILD_ENV, relativePath) => {
  const assetsUrl = envUrls[env].assetsUrl || ""
  const suffix = env === "local" ? "/webfunny/" : relativePath
  return assetsUrl + suffix
}

const getUri = () => {
  return envUrls[BUILD_ENV].uri
}

module.exports = {
  getApiHost,
  getNodeApiHost,
  getAssetsUrl,
  getUri
}
