import * as types from '../actions/types'

const initial_state = {
    user: null,
    isauthenticated: false,
    loading: false,
    register_success: false,
}

const authReducer = (state= initial_state, actions)=>{
    const {type, payload} = actions
    switch(type){
        default:
            return state;
    }

}

export default authReducer