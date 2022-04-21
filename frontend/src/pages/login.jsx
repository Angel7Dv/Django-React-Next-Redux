import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'

import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner'

import { login, reset_register_success } from '../redux/actions/auth'

export default function LoginView() {

  // login 
  const initStatus = useSelector(e => e.auth)
  const router = useRouter()
  if (initStatus.isauthenticated === true && typeof window !== 'undefined') {
    router.push("/")
  }


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const { username, password } = formData // destructuring
  const dispatch = useDispatch()

  const sumbmit = (e) => {
    e.preventDefault()
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(username, password))
    }

  }

  useEffect(() => {
    // if(dispatch && dispatch !== null && dispatch !== undefined){
    //   dispatch(reset_register_success())
    // }
  })

  return (
    <Layout
      title={"login"}
      description={"login user from next to django api using cookies and JWT"}

    >
      <h1 className='display-5'>
        Login User


      </h1>

      <div className="card p-5 mx-5 mt-4 rounded">


        <form
          onSubmit={sumbmit}
          className='p-4'
          autoComplete='off'

        >
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              value={formData.username}
              name='username'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={formData.password}
              name='password'
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>



        </form>

      </div>

    </Layout>
  )
}
