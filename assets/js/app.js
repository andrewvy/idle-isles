import 'phoenix_html'
import React from 'react'

import { render } from 'react-dom'
import '../css/app.css'

const App = () => (
  <div>
    <h1>Idle Strike</h1>
    <div className='container'>Start</div>
  </div>
)

const wrapper = document.getElementById('app')

if (wrapper) {
  render(<App />, wrapper)
}
