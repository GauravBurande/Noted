import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, editNote, fetchNotes } = context;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })

    let navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            fetchNotes()
        }
        else{
            navigate('/login')
        }
        //eslint-disable-next-line
    },[])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const ref = useRef(null)
    const focusRef = useRef(null)

    const handleEditNote = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value })
    }

    const validateLength = note.etitle.length < 3 || note.edescription.length < 8
    return (
        <div>
            <AddNote focusRef={focusRef}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={8} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onChange} minLength={3} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" disabled={validateLength} className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your notes</h2>
                {notes.length===0 && <p><span style={{color:'blue', cursor:"pointer"}} onClick={()=>{focusRef.current.focus()}}>Add notes</span> to display your notes here.</p>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes