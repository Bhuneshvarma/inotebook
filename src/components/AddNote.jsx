// AddNote.jsx
import { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext'; // Assuming NoteContext is exported from this path
import PropTypes from 'prop-types'

const AddNote = (props) => {
    const { addNote } = useContext(NoteContext);

    const [note, setNote] = useState({ title: "", decription: "", tag: "" });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.decription, note.tag);
        setNote({ title: "", decription: "", tag: "" });
        // Optionally, you can clear the form after submission
        props.showAlert("Added Note Successfully","success")
    };

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="decription" className="form-label">decription</label>
                    <input type="text" className="form-control" id="decription" name="decription" value={note.decription} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} />
                </div>

                <button type="submit" disabled={note.title.length < 5 || note.decription.length < 5} className="btn btn-primary" onClick={handleSubmit} >Add Note</button>
            </form>
        </div>
    );
};
AddNote.propTypes = {
    showAlert: PropTypes.func
}

export default AddNote;
