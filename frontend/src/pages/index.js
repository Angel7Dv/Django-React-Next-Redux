import styles from '../styles/Home.module.css'
import Layout from './components/Layout'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {get_user} from '../redux/actions/auth'

const Home = () => {

  const reduxState = useSelector(e=>e.auth)
  const user = useSelector(e => e.auth.user)
  const dispatch = useDispatch()

  const load_user = ()=>{
    if(dispatch && dispatch !== undefined && dispatch !== null){
      dispatch(get_user())
    }
  }

  useEffect( () => {
    load_user()
  }, [])



  return (
    <Layout>
      <div className={styles.container}>

        <h1>hola mundo</h1>

        {user &&
        <div> welcome back user {user.username}</div>
        }




      </div>
    </Layout>
  )
}

export default Home
