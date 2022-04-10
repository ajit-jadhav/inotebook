import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setnotes] = useState(notesInitial)


    //Get all  Note
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDI3ZWQxMjhhMjFmYzhjYmU0MWFkIn0sImlhdCI6MTY0ODM3ODExOX0.aURshCZZDCfFRvC67SfWuJcY4ereFj-TIf5xBK72AlU'
            },  
            body: JSON.stringify()
        });
        const json = await response.json();
        setnotes(json)

    }

    //Add Note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDI3ZWQxMjhhMjFmYzhjYmU0MWFkIn0sImlhdCI6MTY0ODM3ODExOX0.aURshCZZDCfFRvC67SfWuJcY4ereFj-TIf5xBK72AlU'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note))

    }
    //Delete Note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDI3ZWQxMjhhMjFmYzhjYmU0MWFkIn0sImlhdCI6MTY0ODM3ODExOX0.aURshCZZDCfFRvC67SfWuJcY4ereFj-TIf5xBK72AlU'
            },
            body: JSON.stringify()
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => (note._id !== id))
        setnotes(newNotes)
    }
    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDI3ZWQxMjhhMjFmYzhjYmU0MWFkIn0sImlhdCI6MTY0ODM3ODExOX0.aURshCZZDCfFRvC67SfWuJcY4ereFj-TIf5xBK72AlU'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();


        let newNotes = JSON.parse(JSON.stringify(notes))

        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index]
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setnotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;