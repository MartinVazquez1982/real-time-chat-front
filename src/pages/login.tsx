import '../assets/styles/pages/login.css'
import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'
import { LoginType } from '../type/userSystem'
import { useState, ChangeEvent, FormEvent } from 'react'
import { UserSystem } from '../services/userSystem'

function Login () {

  const [ user, setUser ] = useState<LoginType>({ username:"", password:"" })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserSystem.login(user)
    .then( data => {
      if (data.status !== 200){
        console.error('error')
      } else {
        console.log(data)
      }
    }) // Ver temas de errores
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
    </section>
  )
}

export default Login