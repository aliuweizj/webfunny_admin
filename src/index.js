import { initApp } from "./lib/entry"
import extraRoutes from "./router"
import reducers from "./reducers"

// 直接调用启动
initApp("/webfunny", reducers, extraRoutes)

// 注册service worker，service worker脚本文件为sw.js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./webfunny/sw.js").then(function() {
    console.log("Service Worker 注册成功")
  })
}