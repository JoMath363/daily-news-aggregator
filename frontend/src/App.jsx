import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Favorites from './Pages/Favorites'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/favorites',
    element: <Favorites/>
  }
])


function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
