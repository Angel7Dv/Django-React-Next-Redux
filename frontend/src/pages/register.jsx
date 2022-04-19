import React, { useState } from 'react'
import Layout from './components/Layout'



export default function Register() {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    re_password: ""
  })

  const sumbmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    e.target.reset()

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
          <div class="mb-3">
            <label class="form-label">first name</label>
            <input
              value={formData.first_name}
              name='first_name'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">last name</label>
            <input
              value={formData.last_name}
              name='last_name'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input
              value={formData.username}
              name='username'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" class="form-control" />
          </div>

          {/* <div class="mb-3">
            <label class="form-label">Email address</label>
            <input 
            value={formData.first_name}
            type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div> */}
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              value={formData.password}
              name='password'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="mb-3">
            <label class="form-label">confirm password</label>
            <input
              name='re_password'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              value={formData.re_password}

              type="password" class="form-control" id="exampleInputPassword1" />
          </div>


          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>

    </Layout>
  )
}
