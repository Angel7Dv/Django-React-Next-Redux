import { useState } from "react"
import Layout from "./components/Layout"
import { useSelector, useDispatch } from 'react-redux'
// import {} from ''
import { useRouter } from 'next/router'
import { login } from '../redux/actions/auth'

export default function Login2() {

    const [formData, setFormData] = useState({
        username: "",
        password: ""

    })
    const stateInit = useSelector(e => e.auth)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        if (dispatch && dispatch !== undefined && dispatch !== null) {
            dispatch(login(formData.username, formData.password,))
        }

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <Layout>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="card card-body m-5 p-5">
                    {/* {Object.keys(formData).map(e =>
                    <div className="my-2">
                        <input 
                        type="text" 
                        placeholder={e} 
                        className="form-control"
                        value={formData.e}                         
                        />

                    </div>
                    )} */}

                    <div className="my-2">
                        <input
                            type="text"
                            placeholder={"username"}
                            className="form-control my-3"
                            name={"username"}
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder={"password"}
                            className="form-control my-3"
                            name={"password"}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">Login</button>

                </div>


            </form>
        </Layout>
    )
}
