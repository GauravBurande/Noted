import React, { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const Login = () => {

    const context = useContext(noteContext)
    const {showAlert} = context;
    const [credentials, setCredentials] = useState({email: '', password: ''})
    let navigate = useNavigate()

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5500/api/auth/login', {
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
    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
