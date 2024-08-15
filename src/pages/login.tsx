import '../assets/styles/pages/login.css'
import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'
import ErrorMsg from '../components/forms/errorMsg'
import { LoginType } from '../type/userSystem'
import { useState, ChangeEvent, FormEvent } from 'react'
import { UserSystem } from '../services/userSystem'
import { useNavigate } from 'react-router-dom'

function Login () {

  const [ user, setUser ] = useState<LoginType>({ username:"", password:"" })
  const navigate = useNavigate()

  const [ msgError, setMsgError ] = useState('')
  const [ showMsgError, setShowMsgError ] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const verifyUser = () => {
    const result = user.username !== '' && user.password !== ''
    if (user.username === '') {
      setMsgError('Complete username')
      setShowMsgError(true)
    } else if (user.password === '') {
      setMsgError('Complete password')
      setShowMsgError(true)
    }
    return result
  }

  const handleButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (verifyUser()) {
      UserSystem.login(user)
      .then( data => {
        navigate(`/chat/${data.user.username}`)
      })
      .catch ( error => {
        setMsgError(error.message)
        setShowMsgError(true)
      })
    }
  }

  return (
    <section>
      <h1>SIGN IN</h1>
      <form onSubmit={handleButton}>
        <Input label='Username' type='text' name='username' value={user.username} hangle={handleChange}/>
        <Input label='Password' type='password' name='password' value={user.password} hangle={handleChange}/>
        <div className='links'>
          <a id='forgot-password' href="/forgot-password">Forgot Password</a>
          <a id='signup' href="/sign-up">Sign up</a>
        </div>
        <ButtonForm text='LOGIN'/>
      </form>
      <ErrorMsg show={showMsgError} message={msgError}/>
    </section>
  )
}

export default Login