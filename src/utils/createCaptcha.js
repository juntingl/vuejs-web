/**
 * 生成验证码
 * @Author: twitch.liu
 * @Date: 2018-10-29 13:52:18
 * @Last Modified by: twitch.liu
 * @Last Modified time: 2018-10-30 10:03:04
 */
export default function (num = 6, letters = "QWERTYUIOPLKJHGFDSAZXCVBNM123456789") {
  let tpl = '';
  let captcha = [];

  try {
    captcha = [...Array(num)].map(() => letters[Math.floor(Math.random() * letters.length)]);
  } catch (e) {
    //
  }

  captcha.forEach(item => {
    tpl += `<span class="flex1 hcenter">${item}</span>`
  })

  captcha = captcha.join('');

  return {
    tpl,
    captcha
  }
}
