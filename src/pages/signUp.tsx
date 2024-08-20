import ButtonForm from '../components/forms/buttonForm'
import ErrorMsg from '../components/forms/errorMsg'
import Input from '../components/forms/input'
import Snackbar from '../components/forms/snackbar'
import '../assets/styles/pages/login.css'
import { RegisterType, RegisterConfirmType } from '../type/userSystem'
import { useState, ChangeEvent, FormEvent  } from 'react'
import { UserSystem } from '../services/userSystem'

function SignUp () {

  const [ newUser, setNewUser ] = useState<RegisterConfirmType>({username:'', email:'',password:'', confirmPassword:''})

  const [ msgError, setMsgError ] = useState('')
  const [ showError, setShowError ] = useState(false)

  const [ showSnack, setShowSnack ] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const chekNewUser = () => {
    const fields = {
      username: 'Complete username',
      email: 'Complete email',
      password: 'Complete password',
      confirmPassword: 'Confirm Password',
    };

    for (const [field, message] of Object.entries(fields)) {
      if (newUser[field as keyof RegisterConfirmType] === '') {
        setMsgError(message)
        setShowError(true)
        return false
      }
    }

    if (newUser.password !== newUser.confirmPassword) {
      setMsgError('Passwords do not match')
      setShowError(true)
      return false
    }

    return true
  }

  const handleButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, password, email } = newUser
    if ( chekNewUser() ) {
      const api: RegisterType = { username, password, email }
      UserSystem.register(api)
      .then( () => {
        setNewUser({username:'', password:'', confirmPassword:'', email:''})
        setShowSnack(true)
        setShowError(false)
      }).catch( err => {
        setMsgError(err.message)
        setShowError(true)
      })
    }
  }


  return (
    <>
      <section>
        <h1>SIGN UP</h1>
        <form onSubmit={handleButton}>
          <Input label='Username' type='text' name='username' value={newUser.username} hangle={handleChange} disable={showSnack}/>
          <Input label='Email' type='email' name='email' value={newUser.email} hangle={handleChange} disable={showSnack}/>
          <Input label='Password' type='password' name='password' value={newUser.password} hangle={handleChange} disable={showSnack}/>
          <Input label='Confirm Password' type='password' name='confirmPassword' value={newUser.confirmPassword} hangle={handleChange} disable={showSnack}/>
          <div className='links'>
            <p id='forgot-password'>Already have an account?</p>
            <a 
              id='signup' 
              href="/"
              onClick={e => showSnack && e.preventDefault()}
            >Sign in</a>
          </div>
          <ButtonForm text='SIGN UP' disable={showSnack}/>
        </form>
          <ErrorMsg show={showError} message={msgError}/>
      </section>
      <Snackbar 
        show={showSnack} 
        message='User created'
        noShowWindow={ () => {
          setShowSnack(false)
        }}
      />
    </>
  )
}

export default SignUp