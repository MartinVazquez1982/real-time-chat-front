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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, confirmPassword } = newUser
    if ( password === confirmPassword ) {
      const api: RegisterType = { username, password }
      UserSystem.register(api)
      .then( res => {
        console.log(res)
        if (res.status !== 200) {
          console.error('Error')
        } else {
          setNewUser({username:'', password:'', confirmPassword:''})
        }
      }).catch( err => {
        console.error(err)
        console.log('pase')
      }
      ) // Ver tema de errores
    }
  }


  return (
    <section>
      <h1>SIGN UP</h1>
      <form onSubmit={handleButton}>
        <Input label='Username' type='text' name='username' value={newUser.username} hangle={handleChange}/>
        <Input label='Password' type='password' name='password' value={newUser.password} hangle={handleChange}/>
        <Input label='Confirm Password' type='password' name='confirmPassword' value={newUser.confirmPassword} hangle={handleChange}/>
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