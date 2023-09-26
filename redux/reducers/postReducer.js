import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../actions/postActions'

const initState = {
    posts: {}
};
  

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST_SUCCESS:
            console.log('created post', action)
            return state;
        case ADD_POST_FAILURE:
            console.log('creat post error', action.err)
            return state;
        default:
            return state;
    }
}

export default postReducer