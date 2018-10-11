function showTitle(el, title) {
  // 弹出窗口
  const popover = getPopover();
  const popoverStyle = popover.style;

  if (title === undefined) {
    popoverStyle.display = 'none';
  } else {
    const elRect = el.getBoundingClientRect(); // 获取元素的大小及其相对于视口的位置
    const elComputedStyle = window.getComputedStyle(el, null); // 获取元素 css 值
  }
}
