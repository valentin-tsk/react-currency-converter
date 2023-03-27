import {useState} from "react"
import {AuthService} from "../../services/AuthService";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        AuthService.login(formData);
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>Login Form</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Email' value={formData.email} name='email'
                       onChange={e => handleChange(e)}></input>
                <input type='text' placeholder='Password' value={formData.password} name='password'
                       onChange={e => handleChange(e)}></input>
                <button className='login-btn' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login