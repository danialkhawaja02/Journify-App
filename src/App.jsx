import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import authService from "../appwrite/auth"
import Header from "./components/SectionComponents/Header";
import Footer from "./components/SectionComponents/Footer";
import { Outlet } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authService.getSession()
    .then((userdata) => {
      if(userdata) {
        dispatch(login({userdata}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <>
     <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
     </div>
    </>
  ) : null
}

export default App
