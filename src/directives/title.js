/**
 * 指令触发，显示提示框
 * 控制显示提示框位置样式
 * @param {Object} el Document Object
 * @param {String} title 显示 title
 */
function showTitle(el, title) {
  // 提示框
  const popover = getPopover();
  const popoverStyle = popover.style;

  if (title === undefined) {
    popoverStyle.display = 'none';
  } else {
    const elRect = el.getBoundingClientRect(); // 获取元素的大小及其相对于视口的位置
    const elComputedStyle = window.getComputedStyle(el, null); // 获取元素 css 值，返回 CSSStyleDeclaration 对象
    const rightOffset = parseInt(elComputedStyle.getPropertyValue('padding-right')) || 0; // 右偏移量
    const topOffset = parseInt(elComputedStyle.getPropertyValue('padding-top')) || 0; // 顶部偏移量

    popoverStyle.visibility = 'hidden';
    popoverStyle.display = 'block';
    popover.querySelector('.popover-content').textContent = title;
    // 提示框是 fixed 定位，是根据 el 元素来进行，所以其提示框的 left 和 top 极限值就是 el 元素 left 和 top 距离。画个图就清晰了
    popoverStyle.left = elRect.left - popover.offsetWidth / 2 + (el.offsetWidth - rightOffset) / 2 + 'px';
    popoverStyle.top = elRect.top - popover.offsetHeight + topOffset + 'px';
    popoverStyle.display = 'block';
    popoverStyle.visibility = 'visible';
  }
}

/**
 * 获取提示框 DOM
 */
function getPopover() {
  let popover = document.querySelector('.title-popover');

  if (!popover) {
    const tpl = `
      <div class="popover title-popover top fade in" style="position:fixed;">
        <div class="arrow"></div>
        <div class="popover-content"></div>
      </div>
    `;
    // 创建一个 Range 对象,为这个对象塞入一个 HTML 文档片段
    const fragment = document.createRange().createContextualFragment(tpl);

    document.body.appendChild(fragment);
    popover = document.querySelector('.title-popover');
  }

  return popover;
}


export default {
  bind(el, binding) {
    const events = ['mouseenter', 'mouseleave', 'click'];
    const handler = (event) => {
      if (event.type === 'mouseenter') {
        showTitle(el, binding.value);
      } else {
        showTitle();
      }
    };

    events.forEach((event) => {
      el.addEventListener(event, handler, false);
    })

    el.destroy = () => {
      events.forEach((event) => {
        el.removeEventListener(event, handler, false);
      })

      el.destroy = null;
    }
  },
  unbind(el) {
    el.destroy();
  }
}
