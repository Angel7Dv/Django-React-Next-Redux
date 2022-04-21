import * as types from './types'


export const register = (first_name, last_name, username, password, re_password) => async dispatch => {
    const const_body = JSON.stringify({ first_name, last_name, username, password, re_password })

    try {
        const res = await fetch("api/account/register", {
            method: "POST",
            headers: {
                "Action": "application/json",
                "Content-Type": "application/json"
            },
            body: const_body

        })
        // ACCIONES
        // set a const of modification
        dispatch({
            type: types.SET_AUTH_LOADING
        })

        // resultado exitoso o fail
        if (res.status === 201) {
            dispatch({
                type: types.REGISTER_SUCCESS
            })

        } else {
            dispatch({
                type: types.REGISTER_FAIL
            })

        }

        // elimina el estado de modificacion
        dispatch({
            type: types.REMOVE_AUTH_LOADING
        })

    } catch (error) {
        dispatch({
            type: types.REGISTER_FAIL
        })


    }
}

export const reset_register_success = () => dispatch => {
    dispatch({
        type: types.RESET_REGISTER_SUCCESS
    })

}

export const login = (username, password) => async dispatch => {
    const formData = JSON.stringify({ username, password })

    // init set auth
    dispatch({
        type: types.SET_AUTH_LOADING
    })

    try {
        const resApi = await fetch('/api/account/login/', {
            method: 'POST',
            headers: {
                'Access': 'application/json',
                'Content-type': 'application/json',
            },
            body: formData
        })


        if (resApi.status === 200) { // succes login
            dispatch({
                type: types.LOGIN_SUCCESS,
                user: await resApi.json() //apuesto
            })

        } else { // fallo del login
            dispatch({
                type: types.LOGIN_FAIL
            })

        }
        // del set auth
        dispatch({
            type: types.REMOVE_AUTH_LOADING
        })



    } catch (error) {
        dispatch({
            type: types.LOGIN_FAIL
        })

    }
    // init set auth
    dispatch({
        type: types.REMOVE_AUTH_LOADING
    })

}

export const logout = () => async dispatch => {
    try {
        const res = await fetch("/api/account/logout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })
        if (res.status === 200) {
            dispatch({
                type: types.LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: types.LOGOUT_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: types.LOGOUT_FAIL
        })


    }
}

export const get_user = () => async dispatch => {
    try {
        const res = await fetch('/api/account/user/',{
            method: 'GET',
            headers:{
                'Accept': 'applications/json'
            }
        })
        const data  = await res.json()

        if(res.status===200){
            dispatch({
                type: types.GET_USER_SUCCESS,
                payload: data.success
            })
        }else{
            dispatch({
                type: types.GET_USER_FAIL,
            })
        }
    } catch (error) {
        dispatch({
            type: types.VERIFY_FAIL,
        })

    }
}


export const check_auth_status = () => async dispatch => {
    try {
        const res = await fetch('/api/account/verify/',{
            method: 'GET',
            headers:{
                'Accept': 'applications/json'
            }
        })
        const data  = await res.json()

        if(res.status===200){
            dispatch({
                type: types.VERIFY_SUCCESS,
            })
            dispatch(get_user()) // finalmente si el token es valido volvemos a logearnos

        }else{
            dispatch({
                type: types.VERIFY_FAIL,
            })


        }
    } catch (error) {
        dispatch({
            type: types.VERIFY_FAIL,
        })
    
    }
}

