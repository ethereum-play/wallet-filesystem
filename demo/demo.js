const fileexplorer = require('../src/node_modules/file-explorer')

;(async () => {
  const filesystem = require('../')
  const a = 'dat://c610858d82e4c9bc9585bb26fedb260c080ed24c6a05bcf3da9ad73a6917ac82'
  // orchid
  // limegreen

  // darkturquoise
  // blueviolet
  // aqua
  // lime
  // fuchsia

  // mediumorchid
  // mediumpurple
  // mediumseagreen
  // mediumslateblue

  // mediumspringgreen
  // mediumturquoise
  // rebeccapurple
  document.body.innerHTML = `
  <style>
    body               {
      display          : flex;
      margin           : 0;
      color            : white;
    }
    p                  {
      display          : flex;
      justify-content  : space-between;
      padding          : 5px;
    }
    .input             {
      font-family      : monospace;
      width            : 85%;
      font-size        : 10px;
      color            : white;
      background-color : black;
      border           : 0;
    }
    button             {
      font-family      : monospace;
      background-color : black;
      color            : lime;
      border           : 0;
      border-left      : 5px solid fuchsia;
    }
    h1                 {
      font-family      : monospace;
    }
    .container         {
      display          : flex;
      flex-direction   : column;
      height           : 100vh;
      width            : 100vw;
      background-color : fuchsia;
    }
  </style>
  <div class="container">
    <h1> filesystem </h1>
    <p><input class="input" value="${a}">
    <button>mount</button></p>
    <div class="list"></div>
  </div>`
  const button = document.body.querySelector('button')
  const input = document.body.querySelector('input')
  var list = document.body.querySelector('.list')
  button.onclick = async event => {
    const mount_url = input.value
    const fs = filesystem('example', mount_url)
    const { el, api } = fileexplorer(fs)
    list.replaceWith(el)
    list = el
  }
})()
