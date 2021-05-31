import { Button, IconButton } from '@material-ui/core'
import CloseIcon from "@material-ui/icons/Close";
import React from 'react'
import "./DeleteForm.css"
import axios from "axios"

function DeleteForm({FormOpen,setFormOpen,Values}) {
    const handleDelete = (e) => 
    {
        e.preventDefault();
        axios.delete('http://localhost:4000/Empolyee/' +Values.id)
        setFormOpen(!FormOpen)
    }
    return (
        <>
        {
            FormOpen ? 
            (<div className = "Delete">
                <div className = "Delete_Card">
                    <div className="Delete_Header">
                        <h2> Deleting a Empolyee</h2>
                        <IconButton>
                        <CloseIcon onClick={() => setFormOpen(false)} />
                        </IconButton>
                    </div>
                    <h1>{Values.firstname + Values.lastname} </h1>
                    <span>Want to delete the Entry of Empolyee</span>
                    <div className="Delete_Button">
                        <Button
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: "red" }}
                            onClick = {handleDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            type="reset"
                            variant="contained"
                            color="secondary"
                            onClick = {() => setFormOpen(!FormOpen)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div> ) : null
        }
        </>
        
    )
}

export default DeleteForm
