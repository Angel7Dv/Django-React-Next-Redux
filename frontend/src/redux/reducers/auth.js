import * as types from '../actions/types'

const initial_state = {
    user: null,
    isauthenticated: false,
    loading: false,
    register_success: false,
}

const authReducer = (state = initial_state, actions) => {
    const { type, payload } = actions
    switch (type) {

        // register
        case types.REGISTER_SUCCESS:
            return { ...state, register_success: true }

        case types.RESET_REGISTER_SUCCESS:
            return { ...state, register_success: false }

        case types.REGISTER_FAIL:
            return { ...state }

        // set

        case types.SET_AUTH_LOADING:
            return { ...state, loading: true }

        case types.REMOVE_AUTH_LOADING:
            return { ...state, loading: false }

        // login

        case types.LOGIN_FAIL:
            return { ...state }

        case types.LOGIN_SUCCESS:
            return { ...state, isauthenticated: true }

        // Logout

        case types.LOGOUT_FAIL:
            return { ...state }

        case types.LOGOUT_SUCCESS:
            return { ...state, isauthenticated: false, user: null }


        // LOAD USER
        case types.GET_USER_FAIL:
            return { ...state }

        case types.GET_USER_SUCCESS:
            return { ...state, isauthenticated: true, user: payload }

        // CHECK USER
        case types.VERIFY_FAIL:
            return { ...state, isauthenticated: false, user: null }

        case types.VERIFY_SUCCESS:
            return { ...state, isauthenticated: true }

        // CHECK USER REFRESH
        case types.REFRESH_FAIL:
            return { ...state, isauthenticated: false, user: null }

        case types.REFRESH_SUCCESS:
            return { ...state }





        default:
            return state;
    }
}

export default authReducer