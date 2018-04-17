import React from 'react'

import App from '~/components/app'
import { render } from 'react-dom'

const wrapper = document.getElementById('app')

if (wrapper) {
  render(<App />, wrapper)
}
