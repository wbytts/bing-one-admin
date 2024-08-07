import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

// https://blog.csdn.net/qq_74281670/article/details/140250726
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  // 成功或者失败的回调
  if (onResolve || onReject) {
      return originalPush.call(this, location, onResolve, onReject)
  }
  // 没有指定成功或者失败的回调，要用catch处理
  return originalPush.call(this, location).catch((err) => {
      // 如果是重复导航产生的错误，不再向外传递错误
      if (VueRouter.isNavigationFailure(err)) {
          return err
      }
      // 如果不是重复导航的错误，将错误向下传递
      return Promise.reject(err)
  })
}

VueRouter.prototype.replace = function (location, onResolve, onReject) {
  if (onResolve || onReject) {
      return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch((err) => {
      if (VueRouter.isNavigationFailure(err)) {
          return err
      }
      // 如果不是重复导航的错误，将错误向下传递
      return Promise.reject(err)
  })
}
