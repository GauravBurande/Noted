import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const {focusRef} = props;

    const handleAddNote = async (e) => {
        e.preventDefault();
        await addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value })
    }

    const validateLength = note.title.length < 3 || note.description.length < 8
    return (
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" ref={focusRef} className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={8} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} minLength={3} required/>
                    </div>

                    <button type="submit" disabled={validateLength} className="btn btn-primary" onClick={handleAddNote}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
