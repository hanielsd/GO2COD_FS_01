import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'
import './styles/scrollbar.css'

import { store } from './store/store'
import { Provider } from 'react-redux'
import httpInit from './services/http/httpInit'

httpInit()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
