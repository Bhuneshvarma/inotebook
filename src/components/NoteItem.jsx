import { useContext } from 'react'
import PropTypes from 'prop-types';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    // eslint-disable-next-line no-unused-vars
    const { deleteNote } = context;
    const { note, updatedNote } = props;
    return (
        <div className="col-md-4">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.decription}</p>
                    <i className="far fa-trash-alt mx-2 " onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                    <i className="far fa-edit mx-2" onClick={() => { updatedNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    updatedNote: PropTypes.func.isRequired,// Change from object to func
    showAlert: PropTypes.func
};

export default NoteItem


