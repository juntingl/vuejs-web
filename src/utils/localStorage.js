/**
 * localStorage 工具函数
 * @fileOverview
 * @author pycoder.Junting
 * @email: 342766475@qq.com
 * @Date: 2018-10-31 22:33:30
 * @Last Modified by: pycoder.Junting
 * @Last Modified time: 2018-10-31 22:36:40
 */

const ls = localStorage;

export default {
  setItem(name, value) {
    ls.setItem(name, JSON.stringify(value));
  },
  getItem(name) {
    try {
      return JSON.parse(ls.getItem(name));
    } catch (e) {
      return null;
    }
  },
  removeItem(name) {
    ls.removeItem(name)
  }
};
