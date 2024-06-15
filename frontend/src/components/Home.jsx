import React, { useState } from "react";
import todo from "../assets/checklist.png";
import dlt from "../assets/del.png";
import pencil from "../assets/pencil.png";
import { Link } from "react-router-dom";
import useGetTodo from "../hooks/useGetTodo";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../Slices/todoSlice";
function Home() {
  useGetTodo()
  const dispatch = useDispatch();
const {todos} = useSelector(state=> state.todo)
const {token} = useSelector(state=> state.user)
const[inputVal, setInputVal] = useState('')


  const handleAddTodo = async()=>{
    console.log(inputVal)
    if(!inputVal) return;
    try {
      const response = await fetch('http://localhost:8000/api/todo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({
         text: inputVal,
        }),
      })
      const data = await response.json()
      console.log(data)
      setInputVal('')
      dispatch(addTodo(data.todo))
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className=" w-screen min-h-screen h-fit flex flex-col ">
      <div className="tooltip tooltip-right absolute top-3 left-4 z-50" data-tip="Logout">
      <Link to='/layout' className="bx bx-log-out-circle text-3xl text-info cursor-pointer" ></Link>
      </div>
      <div className=" w-full h-[180px] bg-black flex justify-center items-center gap-3 text-3xl sm:text-5xl font-bold text-[#4ea8de] relative">
        <h1>Todo App</h1>
        <img className="mask mask-square w-20 h-16" src={todo} />
        <div class="flex w-[90%] items-center justify-between space-x-2 px-4 md:w-1/3 absolute bottom-[-22px] left-[50%] translate-x-[-50%]">
          <input
            type="text"
            placeholder="Enter Your To-Do List Task"
            value={inputVal}
            className=" flex-1 input input-bordered  bg-[#393939] font-medium text-sm  border border-slate-600"
            onChange={(e)=> setInputVal(e.target.value)}
          />
          <button type="button" class="btn btn-info text-white font-bold" onClick={handleAddTodo}>
            ADD
            <i className="bx bx-plus-circle"></i>
          </button>
        </div>
      </div>
      <div className=" flex-1 bg-[#191919] p-[20px] flex justify-center">
        <ul className=" box flex-1 sm:flex-[0.8] p-2" >
          <h1 className="text-info p-2">Your To-Do List - {todos? todos.length : 0}</h1>
          <div className=" mt-3 p-5 min-h-[85%] border border-slate-700 rounded-lg ">
            {todos?.length == 0 && <div className=" w-fit h-fit m-auto mt-[50px] text-slate-500 flex flex-col gap-2 justify-center items-center">
              <img src={todo} className=" w-14" alt="" />
              <p>You have no to do as of now</p>
            </div> }
           {
            todos && todos.map((todo) =>(
              <Row key={todo?._id} todo={todo} />
            ))
           }
           
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Home;

const Row = ({todo})=>{
  const {token} = useSelector(state=> state.user)
  const dispatch = useDispatch();

  const handleTodoAction = (e)=>{
    console.log('container clicked')
    if(e.target.tagName === 'P')
    {
      e.target.closest('li').classList.toggle("checked");
    }


  }

  const handleDelete = async(id)=>{
    try {
      const response = await fetch(`http://localhost:8000/api/todo/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
      })
      const data = await response.json()
      console.log(data)
    dispatch(deleteTodo(id))
      
    } catch (error) {
      console.log(error.message)
    }
  }
  return(
    <li className=" max-w-full w-fit py-2 ps-[40px] pr-3 border border-slate-600 text-slate-300 rounded-lg relative flex gap-4 mb-3">
      <p className=" flex-1 text-justify cursor-pointer" onClick={ handleTodoAction}>{todo?.text}</p>

    <img src={pencil} className=" w-5 h-5 mt-1 cursor-pointer" alt=""  />
     <img src={dlt} className=" dlt w-7 h-7 cursor-pointer" alt="" onClick={()=>handleDelete(todo?._id)} />
 
    </li>
  )
}
