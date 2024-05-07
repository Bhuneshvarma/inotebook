/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    // eslint-disable-next-line no-unused-vars
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edecription: "", etag: "" });
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            history("/login")
        }

    }, [])
    const updatedNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edecription: currentNote.decription, etag: currentNote.tag })
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        refClose.current.click();
        editNote(note.id, note.etitle, note.edecription, note.etag)
        props.showAlert("Updated Successfully", "success")

    };
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none " data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-4 ">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="decription" className="form-label">decription</label>
                                <input type="text" className="form-control" id="edecription" name="edecription" value={note.edecription} onChange={handleChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                            </div>

                        </form>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" disabled={note.etitle.length < 5 || note.edecription.length < 5} onClick={handleSubmit} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Yours Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} updatedNote={updatedNote} showAlert={props.showAlert} key={note._id} />;
                })}
            </div>
        </>

    )
}
Notes.propTypes = {
    showAlert: PropTypes.func
}
export default Notes
