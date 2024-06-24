import './App.css'
import Login from "./pages/login/Login.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import Home from "./pages/home/Home.tsx";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import {useAuthContext} from "./context/AuthContext.tsx";

function App() {
    // @ts-ignore
    const {authUser} = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to="/"/> : <SignUp/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
