import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19';
import { UserProvider } from './screens/UserContext.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>

  </StrictMode>,
)
