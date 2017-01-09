const express = require('express')
const isUrl = require('is-url-superb')
const toIco = require('png-to-ico')

const app = express()

app.get('/*', (req, res) => {
  let url = req.params[0]
  if (isUrl(url)) {
    url = url.replace(/\.ico$/, '')
    toIco(url).then(buf => {
      res.type('ico')
      res.end(buf)
    }).catch(err => {
      res.status(403)
      res.end(err.message)
    })
  } else if (url) {
    res.status(403)
    res.end(`invalid url: ${url}`)
  } else {
    res.type('html')
    res.end(`
<meta chartset="utf-8">
<title>pico - convert png to ico</title>
<style>
body, code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
code {
  color: #bd10e0;
  font-size: 16px;
}
code:before, code:after {
  content: "\`";
}
</style>
<p style="font-weight: bold">
## Usage
</p>

<p>
https://pico.now.sh/URL.ico

<p style="font-weight: bold">
## Examples
</p>

<p>
To convert <code>https://vuejs.org/images/logo.png</code> to <code>.ico</code> file:
</p>

<p>
Just visit → <a href="https://pico.now.sh/https://vuejs.org/images/logo.png.ico">https://pico.now.sh/https://vuejs.org/images/logo.png.ico</a>
</p>

<p>
---
</p>

<p>
<a style="color: #333;" href="https://github.com/egoist/pico">made by egoist with no love</a>
</p>
`.trim())
  }
})

app.listen(4000)
console.log('http://localhost:4000')
