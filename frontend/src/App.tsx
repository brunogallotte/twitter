import { GlobalCss } from "./styles"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from "./pages/login"
import Home from "./pages/home"

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <Home />
  }
])

function App() {
  return (
    <>
      <GlobalCss/>
      <RouterProvider router={rotas} />
    </>
  )
}

export default App
