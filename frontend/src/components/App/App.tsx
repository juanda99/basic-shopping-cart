import React from 'react'
import { AppStyles } from './AppStyles'
// import Counter from '../../containers/Counter'
import Products from '../../containers/Products'

function App() {
  return (
    <AppStyles className="App">
      <header className="App-header">
        <h1>Product List</h1>
      </header>
      <Products />
    </AppStyles>
  )
}

export default App
