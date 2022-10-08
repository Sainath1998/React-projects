import React, {useState, useReducer} from "react";
import Todo from "./Todo";
export const ACTIONS =  {
    ADD_TODO : "add-todo",
    REMOVE_TODO : "remove-todo",
    TOGGLE_TODO : "toggle-todo"
}



function reducer(todo, action) {
  switch(action.type) {
    case ACTIONS.ADD_TODO : 
      return [...todo, newTodo(action.payload.name)]

    case ACTIONS.TOGGLE_TODO : 
      return todo.map(todo => {
        if(todo.id === action.payload.id){
          return {...todo, complete : !todo.complete}
        }
        return todo
      })
    case ACTIONS.REMOVE_TODO : 
      return todo.filter(todo => todo.id !== action.payload.id)
      
  }
}

function newTodo (name){
  return {
    id : Date.now(), name : name , complete : false
  }
}


function App() {
  
  const [todo, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState("")

 function handleSubmit(e) {
  e.preventDefault()
  dispatch({type : ACTIONS.ADD_TODO, payload : {name : name}});
  setName("")
 }
 console.log(todo)
  return (
    <>
    
   <form onSubmit={handleSubmit}>
    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
   </form>
    {todo.map(todo => {
      return <Todo key={todo.id} todo = {todo} dispatch = {dispatch}></Todo>
    })}
    </>
  );
}

export default App
