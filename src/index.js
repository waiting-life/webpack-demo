import _ from 'lodash'
import { test } from './test'
import myImage from './assets/xmn.webp'
import mySvg from './assets/hsjc.svg'
import exampleTxt from './assets/example.txt'
import myPng2 from './assets/2.png'
import './style.css'
import './style.less'
import './async-module.js'

test()
console.log(_.join(['index', 'module', 'loaded!'], ' '))
const rElement = document.querySelector('.root')
const img1 = document.createElement('img')
const img2 = document.createElement('img')
const png2 = document.createElement('img')
const title = document.createElement('div')
const container = document.createElement('div')
const btn1 = document.createElement('button')
const btn2 = document.createElement('button')
const btn3 = document.createElement('button')
img1.src = myImage
img2.src = mySvg
png2.src = myPng2
img1.style = "width: 400px;"
img2.style = "width: 400px"
png2.style = "width: 400px"
title.textContent = exampleTxt
title.style = "color: pink; font-size: 20px; width: 200px; height: 200px; background: lightblue"

btn1.textContent = "点击相加"
btn2.textContent = "点击相减"
btn3.textContent = "添加元素"
container.classList.add('container')

btn1.addEventListener('click', () => {
  import(/* webpackChunkName: 'math', webpackPreload: true */'./math.js').then(({add}) => {
    const sum = add(2, 2)
    console.log('2+2', sum)
  })
})
btn2.addEventListener('click', () => {
  // 修该懒加载打包后的名称
  //  webpackPrefetch: true设置为prefetch  会提前下载打包后的math.js
  //  webpackPreload: true设置为preload  不会提前下载打包后的math.js
  import(/* webpackChunkName: 'math', webpackPreload: true */'./math').then(({minus}) => {
    const result = minus(10, 2)
    console.log('10-2', result)
  })
})
btn3.addEventListener('click', () => {
  const myDiv = document.createElement('div')
  myDiv.classList.add('circle')
  container.appendChild(myDiv)
  rElement.appendChild(container)
})

rElement.appendChild(img2)
rElement.appendChild(png2)
rElement.appendChild(title)
rElement.appendChild(btn1)
rElement.appendChild(btn2)
rElement.appendChild(btn3)
