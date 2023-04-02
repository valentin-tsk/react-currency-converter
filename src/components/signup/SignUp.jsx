import {useState} from 'react';
import AuthService from '../../services/AuthService';
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        baseCurrency: 'usd'
    })

    const sendRegister = async () => {
        const res = await AuthService.signup(formData);
        return res.json();
    }

    const mutation = useMutation({
        mutationFn: sendRegister,
        onSuccess: (data) => {
            console.log(data.user);
            if (typeof data.user === 'object') {
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                setError(data);
            }
        },
        onError: (err) => {
            setError(err)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>Signup</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' value={formData.username} name='username' required={true}
                       onChange={handleChange}></input>
                <input placeholder='Email' value={formData.email} name='email' type='email' required={true}
                       onChange={handleChange}></input>
                <input placeholder='Password' value={formData.password} name='password' type='password' required={true}
                       onChange={handleChange}></input>
                <button className='login-btn' type='submit'>Send</button>
                {error !== '' && (
                    <p className='error'>{error}</p>
                )}
            </form>
        </div>
    )
}

export default Signup