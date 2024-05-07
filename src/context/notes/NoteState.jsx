
// NoteState.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Add note
    const addNote = async (title, decription, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({ title, decription, tag })
        })
        const note = await response.json();
        setNotes(notes.concat(note)); // Ensure immutability
    };

    // Delete note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => note._id !== id); // Ensure immutability
        setNotes(newNotes)
    };

    // Edit note
    const editNote = async (id, title, decription, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({ title, decription, tag })
        })
        const json = await response.json();
        console.log(json)
        //logic to edit  in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].decription = decription;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes) // Ensure immutability
    }


    // Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
        })
        const json = await response.json()
        setNotes(json)

    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
};


NoteState.propTypes = {
    children: PropTypes.node.isRequired
};

export default NoteState;
