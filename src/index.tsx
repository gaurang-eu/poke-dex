import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import { store } from './pokedex-redux/store'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import Main from './Main'

const client = new ApolloClient({
  uri: 'https://dex-server.herokuapp.com/graphql/',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
