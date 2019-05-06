const envUrls = {
  local: {
    apiServerUrl: "http://localhost:8011",
    nodeApiServerUrl: "http://localhost:8011",
    uri: "http://172.16.48.57"
  },
  dev: {
    apiServerUrl: "https://live.webfunny.cn",
    nodeApiServerUrl: "https://live.webfunny.cn",
    assetsUrl: "https://local.webfunny.cn",
    uri: "https://local.webfunny.cn:9100"
  },
  qa: {
    apiServerUrl: "https://live.webfunny.cn",
    assetsUrl: "https://live.webfunny.cn",
    nodeApiServerUrl: "https://live.webfunny.cn",
    uri: "https://live.webfunny.cn"
  },
  staging: {
    apiServerUrl: "https://live.webfunny.cn",
    assetsUrl: "https://live.webfunny.cn",
    nodeApiServerUrl: "https://live.webfunny.cn",
    uri: "https://live.webfunny.cn"
  },
  prod: {
    apiServerUrl: "//live.webfunny.cn",
    assetsUrl: "//live.webfunny.cn",
    nodeApiServerUrl: "//live.webfunny.cn",
    uri: "//live.webfunny.cn"
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
