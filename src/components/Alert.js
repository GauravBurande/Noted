import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const Alert = () => {
    const context = useContext(noteContext)
    const { alert } = context;
    return (
        <div style={{height: '100px'}}>
        {alert && <div className={`alert alert-success alert-dismissible fade show`} role="alert">
            {alert}
        </div>}
        </div>
    )
}

export default Alert
