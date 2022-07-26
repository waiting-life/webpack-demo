// 代码分离： 动态导入
// 1. 动态导入lodash 是会分离到一个单独的 bundle
// 2. 动态和静态都引入lodash的时候需要设置 splitChunks: { chunks: 'all' }
// 动态导入的应用： 1. 懒加载  2. 预获取/预加载
async function  getComponent() {
  const {default: _} = await import('lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'Webpack'], ' ')
  return element
}
getComponent().then((element) => {
  document.querySelector('.root').appendChild(element)
})
