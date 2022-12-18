import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const Login = () => {

    const context = useContext(noteContext)
    const { showAlert } = context;
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [btnText, setBtntext] = useState('Submit')
    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('https://noted-backend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json()
        if (json.success) {
            // save the authtoken and redirect the user to home page
            localStorage.setItem('token', json.authToken)
            navigate('/')
            showAlert('Logged in Successfully!')
        }
        else {
            alert('Invalid credentials')
        }
    }

    const loginPage = localStorage.getItem('token') ? "You're already logged in, please check your memory!" :
        <div className="d-flex justify-content-center">
            <div className="d-flex w-100 mt-50">
                <h2 className='w-25'>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email"
                            name='email' aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange}
                            id="password" name='password' />
                    </div>
                    <button onClick={() => { setBtntext('Please wait....') }} type="submit" className="btn btn-primary">{btnText}</button>
                </form>
            </div>
        </div>

    return (
        <div>
            {loginPage}
        </div>
    )
}

export default Login
