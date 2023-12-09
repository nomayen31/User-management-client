import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [ users , setUsers]= useState([])

  const handleAddUser = (e) =>{
    e.preventDefault();
    const form = e.target;
    const name =form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const newUsers = [...users , data];
      setUsers(newUsers);
      form.reset();
    })
   
  }
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])
  return (
    <>
     <h1>Users Management System </h1>
     <h3>Numbers of User : {users.length}</h3>
     <form onSubmit={handleAddUser}>
      <input type="text" name='name' id='' placeholder='enter your name '/>
      <br />
      <input type="email" name='email' placeholder='enter your email' id=''/>
      <br />
      <input type="submit" name='add user' id=''/>
     </form>
     <div>
      {
        users.map(user => <p key={user.id}>{user.id} Name: {user.name} <br /> {user.email}</p>)
      }
     </div>
    </>
  )
}

export default App
