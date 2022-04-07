import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { useState } from 'react';

const AddNote = () => {
    const context = useContext(noteContext)
    const {  addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"})

    const handleClick = (e)=>{
        console.log("Submit")
        e.preventDefault();
        addNote(note.title,note.description, note.tag);
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
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote