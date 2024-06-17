import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken, setUser } from '../Slices/userSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

function Login() {
  const url = window.location.origin;
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleForm = async(e)=>{
    e.preventDefault()
    console.log(formData)

    try {
      const res = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data);
      if (data.status === 200) {
  
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
  
        toast.success(data.message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
         })
         navigate('/')
      }
      else{
        throw new Error(data.message)
      }
      
     } catch (error) {
      toast.error(error.message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       })
     }

  }

  return (
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md w-[400px] p-7 signup rounded-lg shadow-md">
    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
    Login
    </h2>
    <p className="mt-2 text-sm text-gray-600">
      Don't have an account?{" "}
      <span
        onClick={()=> navigate('/layout')}
        className="font-semibold text-black transition-all duration-200 hover:underline"
      >
        Signup
      </span>
    </p>
    <form  className="mt-8" onSubmit={handleForm}>
      <div className="space-y-5">

        <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            {" "}
            Email address{" "}
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              name='email'
              placeholder="Email"
              onChange={(e)=> setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className="text-base font-medium text-gray-900">
            {" "}
            Password{" "}
          </label>

          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              name='password'
              placeholder="Password"
              onChange={(e)=> setFormData({...formData, password: e.target.value})}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
           Login{" "}
           <i className='bx bx-right-arrow-alt p-2'></i>
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default Login