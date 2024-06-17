import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'
import '../assets/styles/pages/login.css'

function SignUp () {
  return (
    <section>
      <h1>SIGN UP</h1>
      <form>
        <Input label='Fullname' type='text'/>
        <Input label='Username' type='text'/>
        <Input label='Email' type='email'/>
        <Input label='Password' type='password'/>
        <Input label='Confirm Password' type='password'/>
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