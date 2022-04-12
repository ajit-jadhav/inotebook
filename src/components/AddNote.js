import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
        console.log("Submit")
        e.preventDefault();
        addNote(note.title,note.description, note.tag);
        setnote({title:"",description:"",tag:""});
        props.showAlert("New Note Added successfully!", "success")
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Note </h2>
                <form className="my-3">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
