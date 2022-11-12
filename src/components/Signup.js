import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cPassword: '' })
  let navigate = useNavigate()

  const context = useContext(noteContext)
  const {showAlert} = context;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault()
    const response = await fetch('http://localhost:5500/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    if (json.success) {
      // save the authtoken and redirect the user to home page
      localStorage.setItem('token', json.authToken)
      navigate('/')
      showAlert('Signed in Successfully!')
    }
    else {
      alert('Invalid credentials')
    }
  }

  const validatePassword = credentials.cPassword !== credentials.password
  return (
    <div>
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name"
            name='name' minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email'
            aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password"
            name='password' minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Confirm Password</label>
          <input type="Password" className="form-control" value={credentials.cPassword} onChange={onChange} id="cPassword"
            name='cPassword' minLength={8} required />
          <div style={{ height: '30px' }}>
            {validatePassword && <p className='py-2' style={{ color: 'blue' }}>
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i> password doesn't match!
            </p>}
          </div>
        </div>
        <button type="submit" disabled={validatePassword} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
