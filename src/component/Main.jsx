import React, { useState } from 'react';
import axios from 'axios';

export const Main = () => {
  const [todo, setTodo] = useState("");

  const onChange = (e) => {
    setTodo(e.target.value);
  }

  const onSubmit = async (e) => {
        e.preventDefault() 
    await axios.post('/create', { 
      content: todo 
    }).then((res) => { 
      window.location.reload(); 
    }).catch((err) => { 
      console.log(err); 
    })
  }

  return (
    <> 
      <p className = "todotitle">To Do List</p>
    <form className="write" onSubmit={onSubmit}>
      <input className="todo_input" type="text" value={todo} name="todo" onChange={onChange} required />
      <button type="submit" className="submit_btn">ADD</button>
    </form>
    </>
    
  )
}