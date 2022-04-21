import React, { useEffect } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

import {useDispatch, useSelector} from 'react-redux'
import {check_auth_status} from '../../redux/actions/auth'

const Layout = ({ title, description, children }) => {
    const is_auth = useSelector(e=> e.auth.isauthenticated)
    const dispatch = useDispatch()
    
    const verify = ()=>{
        if(is_auth && dispatch && dispatch !== undefined && dispatch !== null){
            dispatch(check_auth_status())
        }
    }
    const load_user = ()=>{
        if(dispatch && dispatch !== undefined && dispatch !== null){
          dispatch(get_user())
        }
      }
    useEffect(()=>{
        verify()
    }, [dispatch])

    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={description} />
                <title>{title}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            </Head>
            <Navbar/>
            <div className='container mt-5'>
                {children}
            </div>


        </>
    )
}


Layout.defaultProps = {
    title: "next-django",
    description: "project react-django auth",
}


export default Layout