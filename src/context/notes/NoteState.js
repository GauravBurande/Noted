import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5500'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [alert, setAlert] = useState('')

  // set alert
  const showAlert = (message)=>{
    setAlert(message)
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  // Get all notes
  const fetchNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    setNotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    showAlert('Your note has been added!')
    fetchNotes()
    console.log(json)
  }

  // Delete a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    showAlert('Your note has been deleted!')
    fetchNotes()
    console.log(json)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {

    //API call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json()
    showAlert('Your note has been edited!')
    fetchNotes()
    console.log(json)

    // Logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
      // const element = notes[index];
      // if (element._id === id) {
        // element.title = title
        // element.description = description
        // element.tag = tag
      // }
    // }
  }

  return (
    <NoteContext.Provider value={{ notes, alert, fetchNotes, addNote, deleteNote, editNote, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;