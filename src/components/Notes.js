import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes } = context;

    const [note, setnote] = useState({etitle:"",edescription:"",etag:"default"})

    useEffect(() => {
        getNotes();
    }, [])
    const ref = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({etitle: currentNote.title, edescription: currentNote.description,etag: currentNote.tag});
    }

    const handleClick = (e)=>{
        console.log("Updating note...", note)
        e.preventDefault();
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }


    return (
        <>
            <AddNote></AddNote>
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div style={{ opacity: 1 }} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes </h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note}></NoteItem>
                })}
            </div>
        </>
    )
}

export default Notes
