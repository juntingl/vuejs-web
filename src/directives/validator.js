/**
 * 表单验证函数，具体的验证逻辑
 * @param {Object} el DOM
 * @param {Object} modifiers
 * @param {Object} bindingValue
 */
function validate(el, modifiers, bindingValue) {
  // 定义相关变量信息
  bindingValue = bindingValue && typeof bindingValue === 'object' ? bindingValue : {};
  const value = typeof el.value === 'string' ? el.value.trim() : '';
  const { title = '该项', error } = bindingValue;
  let defaultError = '';

  if (modifiers.required && value === '') {
    defaultError = `${title}不能为空`;
  } else if (bindingValue.target) {
    const target = document.querySelector(bindingValue.target);
    const targetValue = target ? target.value : null;

    if (targetValue !== value) {
      defaultError = `输入${title}不匹配`
    }
  } else if (bindingValue.regex) {
    try {
      if (!bindingValue.regex.test(value)) {
        defaultError = `输入的${title}不匹配`
      }
    } catch (e) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error('自定义正则 error:', e);
    }
  }

  if (defaultError) {
    if (error === undefined) {
      showError(el, defaultError)
    } else {
      showError(el, error)
    }
  } else {
    showError(el)
  }
}

/**
 * 显示或隐藏错误提示元素
 * @param {Object} el DOM
 * @param {String} error 错误提示文本
 */
function showError(el, error) {
  const parentElement = el.parentElement;
  const errorElement = getErrorElement(el);

  if (error === undefined) {
    errorElement.style.display = 'none';
    parentElement.classList.remove('has-error');
  } else {
    errorElement.textContent = error;
    errorElement.style.display = 'block';
    parentElement.classList.add('has-error');
  }
}

/**
 * 创建或者返回一个错误提示元素
 * @param {Object} el DOM
 */
function getErrorElement(el) {
  const parentElement = el.parentElement;
  let errorElement = parentElement.querySelector('.help-block')

  if (!errorElement) {
    const tpl = `<span class="help-block"></span>`;
    const fragment = document.createRange().createContextualFragment(tpl);

    parentElement.appendChild(fragment);
    errorElement = parentElement.querySelector('.help-block');
  }
  return errorElement
}

export default {
  bind(el, binding, vnode) {
    const { value, arg, modifiers } = binding;
    // 如果没传对应的事件名称参数，就默认使用 change 事件
    // ~indexOf() => indexOf() !== -1
    const eventType = ~['change', 'blur', 'input'].indexOf(arg) ? arg : 'change';
    // 默认处理器，当用户开始输入时，移除错误提示
    const defaultHandler = () => {
      showError(el)
    };
    // 验证处理器，当用户触发对应的事件时，验证用户输入的信息
    const handler = () => {
      validate(el, modifiers, value)
    };

    // 在 el 元素上的添加 input 事件监听
    el.addEventListener('input', defaultHandler, false);
    // 在 el 元素上的添加用户指定的事件监听
    el.addEventListener(eventType, handler, false);
    // 移除 el 元素上事件监听和数据绑定的方法
    // 并销毁对象，内存中删除
    el.destroy = () => {
      el.removeEventListener('input', defaultHandler, false);
      el.removeEventListener(eventType, handler, false);
      el.destroy = null;
    }
  },
  /**
   * 被绑定元素插入父节点时调用
   * 这里保证了父节点的存在，可以访问到父节点
   * @param {Object} el   DOM
   * @param {Object} binding
   * @param {Object} vnode
   */
  inserted(el, binding, vnode) {
    const { value, modifiers } = binding;
    // 指定当前一系列验证项的父级，我们这里指定为含 data-validator-form 的元素
    const form = el.closest('[data-validator-form]');
    // 指定一个按钮来检查所有验证项，我们这里指定为含 type=submit 的元素
    const submitBtn = form ? form.querySelector('[type=submit]') : null;

    if (submitBtn) {
      // 提交处理器
      const submitHandler = () => {
        // 验证所有项
        validate(el, modifiers, value);
        // 获取错误信息
        const errors = form.querySelector('.has-error');

        if (!errors.length) {
          // 没有错误信息时，在按钮上添加一个 canSubmit 属性，并指定为 true
          submitBtn.canSubmit = true;
        } else {
          // 有错误信息时，在按钮上添加一个 canSubmit 属性，并指定为 false
          submitBtn.canSubmit = false;
        }
      }

      submitBtn.addEventListener('click', submitHandler, false);

      // 移除按钮上事件监听和数据绑定的方法
      el.destroySubmitBtn = () => {
        submitBtn.removeEventListener('click', submitHandler, false)
        el.destroySubmitBtn = null;
      }
    }
  },
  unbind(el) {
    // 移除事件监听和数据绑定
    el.destroy();
    if (el.destroySubmitBtn) el.destroySubmitBtn()
  }
}
