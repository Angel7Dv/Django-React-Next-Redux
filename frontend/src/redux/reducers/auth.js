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
        case types.REGISTER_SUCCESS:
            return { ...state, register_success: true }

        case types.REGISTER_FAIL:
            return { ...state}

        case types.SET_AUTH_LOADING:
            return { ...state, loading: true }

        case types.REMOVE_AUTH_LOADING:
            return { ...state, loading: false }
        default:
            return state;
    }

}

export default authReducer