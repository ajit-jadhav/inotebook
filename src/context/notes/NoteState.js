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

        console.log(json)
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
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json();

        console.log("Adding new note: ")
        const note = {
            "_id": "624d05wer529fc567926457e8b9wer04f2d",
            "user": "624027ed128a21fc8cbe41ad",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-04-06T03:13:22.685Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }
    //Delete Note
    const deleteNote = (id) => {
        console.log("deleting note with id" + id)
        const newNotes = notes.filter((note) => (note._id !== id))
        setnotes(newNotes)
    }
    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/note/updatenote/6240660ce55d64f95df318e5`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0MDI3ZWQxMjhhMjFmYzhjYmU0MWFkIn0sImlhdCI6MTY0ODM3ODExOX0.aURshCZZDCfFRvC67SfWuJcY4ereFj-TIf5xBK72AlU'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();


        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index]
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;