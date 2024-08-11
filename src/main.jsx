import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from '../store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import AllJournal from './pages/AllJournal.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import EditJournal from './pages/EditJournal.jsx'
import AddJournal from './pages/AddJournal.jsx'
import Journal from './pages/Journal.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children:  [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element:  (
              <AuthLayout authentication={false}>
                <LoginPage/>
              </AuthLayout>
            )
    },
    {
      path: "/signup",
      element: (
              <AuthLayout authentication={false}>
                <SignUpPage/>
              </AuthLayout>
              )
    },
    {
      path:"/all-journals",
      element: (
              <AuthLayout authentication>
                <AllJournal/>
              </AuthLayout>
              )
    },
    {
      path:"/add-journal",
      element: (
              <AuthLayout authentication>
                <AddJournal/>
              </AuthLayout>
              )
    },
    {
      path:"/edit-journal/:slug",
      element: (
              <AuthLayout authentication>
                <EditJournal/>
              </AuthLayout>
              )
    },
    {
      path: "/journal/:slug",
      element: <Journal/>,
  },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
