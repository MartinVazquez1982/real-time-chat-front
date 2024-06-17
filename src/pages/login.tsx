import '../assets/styles/pages/login.css'
import ButtonForm from '../components/forms/buttonForm'
import Input from '../components/forms/input'

function Login () {
    return (
        <section>
            <h1>SIGN IN</h1>
            <form>
                <Input label='Username'/>
                <Input label='Password'/>
                <div className='links'>
                    <a id='forgot-password' href="">Forgot Password</a>
                    <a id='signup' href="">Signup</a>
                </div>
                <ButtonForm text='LOGIN'/>
            </form>
        </section>
    )
}

export default Login