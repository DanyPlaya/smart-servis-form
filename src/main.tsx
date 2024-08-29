import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { App } from './App'
import { Provider } from 'react-redux'
import { appStore } from './app/providers/store-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
)
