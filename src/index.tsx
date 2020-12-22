import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './01-main/App'
import { Provider } from 'react-redux'
import { store } from './04-store/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </BrowserRouter>
   </Provider>,
   document.getElementById('root'),
)
