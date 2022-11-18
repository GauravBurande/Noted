import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext)
    const {deleteNote} = context;

    const { note, updateNote } = props;
    return (
        <div className='my-2 col-md-4 w-50'>
            <div className="card">
                <div className="card-body bg-info">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <span>
                        
                        <img style={{cursor:'pointer'}} className='px-1' width="30px" src="https://img.icons8.com/ios-filled/512/del-key.png" alt="delete" onClick={()=>{deleteNote(note._id)}} />
                        <img style={{cursor:'pointer'}} className='px-1' width="30px" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/2x/external-edit-web-flaticons-lineal-color-flat-icons-9.png" alt="edit" onClick={()=>{updateNote(note)}} />
                        </span>
                    </div>
                        <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
