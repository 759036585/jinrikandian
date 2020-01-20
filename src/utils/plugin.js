export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
  }
}

function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
