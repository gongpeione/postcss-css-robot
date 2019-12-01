let postcss = require('postcss')

// 华为手机 overflow:  hiden 时会有文字头部被截断的问题
// Huawei cellphone cut 1px top of the text when using overflow: hidden
function checkTextCropIssue (rule) {
  let hasOverflowHidden = false
  let hasPadding = false
  rule.walkDecls(decls => {
    if (decls.prop === 'overflow' && decls.value === 'hidden') {
      hasOverflowHidden = true
    }
    if (/padding(-top)?$/.test(decls.prop)) {
      hasPadding = true
    }
  })

  if (hasOverflowHidden && !hasPadding) {
    rule.append({ prop: 'padding-top', value: '1px' })
  }
}

module.exports = postcss.plugin('postcss-css-robot', () => {
  return root => {
    root.walkRules(rule => {
      checkTextCropIssue(rule)
    })
  }
})
