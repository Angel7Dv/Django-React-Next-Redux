import {REGISTER_SUCCESS, REGISTER_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING} from './types'


export default register = ( first_name, last_name, username, password, re_password) => async dispatch =>{
    const const_body = JSON.stringify({first_name, last_name, username, password, re_password})

    try {
        const res = await fetch("api/account/register", {
            method:"POST",
            headers: {
                "Action": "application/json",
                "Content-Type": "application/json"
            },
            body: const_body

        })

        // ACCIONES

        // set a const of modification
        dispatch({
            type:SET_AUTH_LOADING
        })

        // resultado exitoso o fail
        if(res.status === 201){
            dispatch({
                type:REGISTER_SUCCESS
            })

        }else{  
            dispatch({
                type:REGISTER_FAIL
            })

        }

        // elimina el estado de modificacion
        dispatch({
            type:REMOVE_AUTH_LOADING
        })

    } catch (error) {
        dispatch({
            type:REGISTER_FAIL
        })

        
    }
}
