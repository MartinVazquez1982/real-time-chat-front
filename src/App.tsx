import './App.css'
import Background from './components/background/background'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import ForgotPassword from './pages/forgotPassword';



function App() {

  return (
    <>
      <Background/>
      <BrowserRouter>
        <div className='routes'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
