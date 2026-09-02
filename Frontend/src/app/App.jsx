import { Provider } from "react-redux"
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { store } from './app.store'
import './App.css'

const App = () => {
  return (
      <Provider store={store}>
        <RouterProvider router={routes}/>
      </Provider>
  )
}

export default App
