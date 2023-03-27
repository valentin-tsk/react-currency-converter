import {useState} from "react"
import {AuthService} from "../../services/AuthService"

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })

    function handleSubmit(e) {
        e.preventDefault()
        AuthService.signup(formData);
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>Signup</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Username' value={formData.username} name='username'
                       onChange={e => handleChange(e)}></input>
                <input type='text' placeholder='Email' value={formData.email} name='email'
                       onChange={e => handleChange(e)}></input>
                <input type='text' placeholder='Password' value={formData.password} name='password'
                       onChange={e => handleChange(e)}></input>
                <button className='login-btn' type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Signup