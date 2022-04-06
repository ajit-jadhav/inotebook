import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"

export const Home = () => {
    const context = useContext(noteContext)
    const {notes,setnotes} = context;
    return (
        <div>
            <div className="container my-3">
                <h2>Add Note </h2>
                <form className="my-3">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <div className="container my-3">
                <h2>Your Notes </h2>
                {notes.map((note)=>{
                    return note.title;
                })}
            </div>
        </div>
    )
}
