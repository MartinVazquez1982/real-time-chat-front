import '../assets/styles/pages/login.css'
import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'
import { ChangeEvent } from 'react'


function ForgotPassword () {
  return (
    <section>
      <h1>Reset your Password</h1>
      <p>Enter your email below to reset your password</p>
      <form>
        <Input label='Email' type='email' name='Email' value='' hangle={(e: ChangeEvent<HTMLInputElement>) => { console.log(e)}}/>
        <div className='links'>
          <a id='forgot-password' href="/sign-up">Sign up</a>
          <a id='signup' href="/">Sign in</a>
        </div>
        <ButtonForm text='RECOVER PASSWORD'/>
      </form>
    </section>
  )
}

export default ForgotPassword