/**
 * DESC: filter 过滤器
 * 用于格式化文本，以管道符号 (|) 表示
 * 过滤器可以在双括号差值和 `v-bind` 表达式中使用
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-11-18 21:00:27
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-11-18 21:21:38
 */

import moment from 'moment';

// 设置语言为中文
moment.locale('zh-cn');

export default function(value, ...rest) {
  // 获取第一个日期参数
  const date = value;

  // 验证日期是否合法
  if (moment(date).isValid()) {
    // 获取第二个参数
    const key = rest.shift();

    if (typeof key === 'string') {
      switch(key) {
        case 'from':
          // 格式化日期为多久之前,与此时作为参考
          value = moment(date).from();
          // 获取第三个参数
          const otherOpts = rest.shift();

          // 如果参数对象有 startOf 属性，就使用 startOf 的值作为开始时间
          if (otherOpts && typeof otherOpts === 'object') {
            value = moment(date).startOf(otherOpts.startOf).from()
          }
          break
        default:
          // 直接使用第二个参数进行格式化
          value = moment(date).format(key)
      }
    }
  }

  return value;
}
