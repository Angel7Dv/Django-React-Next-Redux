import React from 'react'
import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/actions/auth'

export default function Navbar() {
    const initStatus = useSelector(e => e.auth)
    const dispatch = useDispatch()
    const handleSubmit = (e)=>{
        if(dispatch && dispatch !== undefined && dispatch !== null ){
            dispatch(logout())
        }

    }


    return (
        <nav className=" navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid mx-5">
                <Link href="/">
                    <a className="navbar-brand" href="#">home</a>
                </Link>

                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {initStatus.isauthenticated ?
                            <li className="nav-item">
                                    <a onClick={handleSubmit} className="nav-link " aria-current="page" >logout</a>
                            </li>

                            :
                            <>
                                <li className="nav-item">
                                    <Link href="/register">
                                        <a className="nav-link " aria-current="page" >Register</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/login">
                                        <a className="nav-link " aria-current="page" >Login</a>
                                    </Link>
                                </li>
                            </>

                        }



                    </ul>
                </div>
            </div>
        </nav >
    )
}
