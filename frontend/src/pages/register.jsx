import React, { useState } from 'react'
import Layout from './components/Layout'

import {useSelector, useDispatch} from 'react-redux'
import {register} from '../redux/actions/auth'
import { useRouter } from 'next/router'

import Loader from 'react-loader-spinner'

export default function Register() {
  const initStatus = useSelector(e => e.auth)

  // evita que usuarios logeados se puedan volver a registar

  const router = useRouter()
  if(typeof window !== 'undefined' && initStatus.isauthenticated){
    router.push("/")
  }




  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    re_password: ""
  })
  const {first_name, last_name, username, password, re_password} = formData // destructuring

  const dispatch = useDispatch()

  const sumbmit = (e)=>{
    e.preventDefault()
    if(dispatch && dispatch !== null && dispatch !== undefined  ){
      dispatch(register(first_name, last_name, username, password, re_password)) // action register
    }
  }

  return (
    <Layout
    title={"register"}
    description={"register user from next to django api"}
    
    >
      <h1 className='display-5'>
        Register


      </h1>

      <div className="card p-5 mx-5 mt-4 rounded">


        <form
        onSubmit={sumbmit}
          className='p-4'
          autoComplete='off'

        >
          <div className="mb-3">
            <label className="form-label">first name</label>
            <input
              value={formData.first_name}
              name='first_name'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">last name</label>
            <input
              value={formData.last_name}
              name='last_name'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              value={formData.username}
              name='username'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" className="form-control" />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
            value={formData.first_name}
            type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div> */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={formData.password}
              name='password'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="password" className="form-control"/>
          </div>
          <div className="mb-3">
            <label className="form-label">confirm password</label>
            <input
              name='re_password'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              value={formData.re_password}

              type="password" className="form-control"/>
          </div>


          <button type="submit" className="btn btn-primary">Register</button>
        </form>

      </div>

    </Layout>
  )
}
