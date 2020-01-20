import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
    Vue.filter('relTime', relTime)
  }
}

function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// 转化时间到相对时间
function relTime (date) {
  return dayjs().locale('zh-cn').from(date)
}
