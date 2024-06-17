import '../assets/styles/pages/login.css'
import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'

function Login () {
  return (
    <section>
      <h1>SIGN IN</h1>
      <form>
        <Input label='Username' type='text'/>
        <Input label='Password' type='password'/>
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