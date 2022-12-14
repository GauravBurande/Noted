import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation()

    let navigate = useNavigate()

    const handleLogOut = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NOTED</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <p style={{color:"white", marginTop:"8px"}}>Made with &#128151; by <a href="https://twitter.com/gauravvan">@gauravvan</a></p>
                        { localStorage.getItem('token')? <button className="btn btn-primary mx-2" onClick={handleLogOut}>Log Out</button> :<form className='d-flex'>
                            <Link to="/login" className="btn btn-primary mx-2" role="button">Log In</Link>
                            <Link to="/signup" className="btn btn-primary mx-2" role="button">Sign Up</Link>
                        </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
