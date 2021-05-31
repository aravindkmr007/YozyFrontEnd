import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import EmpolyeeForm from './EmpolyeeForm'
import './FormButton.css'

function FormButton() {
    const [FormOpen, setFormOpen] = useState(false)
    const OpenForm = () =>
    {
        setFormOpen(prev => !prev)
    }
    return (
        <div className='Form_Button'>
            <Button onClick={OpenForm} variant="contained" color="primary">Add a Employee</Button>
            <EmpolyeeForm FormOpen = {FormOpen} setFormOpen = {setFormOpen} />
        </div>
    )
}

export default FormButton
