import axios from "axios";
import React, { useState } from 'react';
import './todoItem.css';

const TodoItem = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [textEdit, setTextEdit] = useState("")
    const { todo ,renderComponent } = props
    const { text, _id } = todo
    
    const editTodo = () => {
        setIsEdit(prevState => !prevState.isEdit)
        setTextEdit(text)
    }

    const handleTextInput = (event) => {
        setTextEdit(event.target.value)
    }

    const handelSave = async (req, res) => {
        try {
            const data = { text: textEdit }
            await axios.put(`http://localhost:5000/update-todo/${_id}`,  data)
            setIsEdit(prevState => !prevState)
            renderComponent()
            
        }
        catch (error) {
            console.log(error)
            setIsEdit(prevState => !prevState.isEdit)
        }

    }

    const handelDelete = async (req, res) => {
        try {
            await axios.delete(`http://localhost:5000/delete-todo/${_id}`)
            renderComponent()
            
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <li className='todo-item' id={_id}>
            {isEdit ? <input type="text" value= {textEdit} onChange={handleTextInput}/> :<p>{text}</p>}
            <div>
                {isEdit ? <button onClick={handelSave}> save</button> :<button onClick={editTodo}>Edit</button>}
                <button onClick={handelDelete}>Delete</button>
            </div>
        
        </li>
    )
}

export default TodoItem
