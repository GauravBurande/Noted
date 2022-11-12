import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext)
    const {deleteNote} = context;

    const { note, updateNote } = props;
    return (
        <div className='my-2 col-md-4'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <span>
                        <i className="fa-solid fa-trash-can px-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-sharp fa-solid fa-pen px-2" onClick={()=>{updateNote(note)}}></i>
                        </span>
                    </div>
                        <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
