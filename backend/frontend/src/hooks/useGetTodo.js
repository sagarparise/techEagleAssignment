import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { getTodos } from '../Slices/todoSlice';

function useGetTodo() {
 const user = useSelector(state=> state.user)
 const navigate = useNavigate();
 const dispatch = useDispatch();
 //console.log(user)
 useEffect(()=>{
  const fetchTodo = async () => {
    if(!user.token)
    {
      console.log('token is required')
      navigate('/layout')
      return;
    }
  try {
    const response = await fetch(`${window.location.origin}/api/todo/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token,
      },
    })
    const data = await response.json()
 //   console.log(data.todos)
    dispatch(getTodos(data.todos))
    
  } catch (error) {
    console.log(error)
  }
  }

  fetchTodo()


 },[]);
}

export default useGetTodo