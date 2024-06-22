import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'
import '../assets/styles/pages/login.css'
import { RegisterType, RegisterConfirmType } from '../type/userSystem'
import { useState, ChangeEvent, FormEvent  } from 'react'
import { UserSystem } from '../services/userSystem'

function SignUp () {
  /*
    <Input label='Email' type='email'/>
    <Input label='Fullname' type='text'/>

    Agregar esos al tipo tambien
  */

  const [ newUser, setNewUser ] = useState<RegisterConfirmType>({username:'', password:'', confirmPassword:''})
  const [ userApi, setuserApi ] = useState<RegisterType>({username:'', password:''})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newUser.username)
    if ( newUser.password === newUser.confirmPassword ) {
      setuserApi({
        username: newUser.username,
        password: newUser.password
      })
      UserSystem.register(userApi) // Ver tema de errores
    }
  }


  return (
    <section>
      <h1>SIGN UP</h1>
      <form onSubmit={handleButton}>
        <Input label='Username' type='text' name='username' hangle={handleChange}/>
        <Input label='Password' type='password' name='password' hangle={handleChange}/>
        <Input label='Confirm Password' type='password' name='confirmPassword' hangle={handleChange}/>
        <div className='links'>
          <p id='forgot-password'>Already have an account?</p>
          <a id='signup' href="/">Sign in</a>
        </div>
        <ButtonForm text='SIGN UP'/>
      </form>
    </section>
  )
}

export default SignUp