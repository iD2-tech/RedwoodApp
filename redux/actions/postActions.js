
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {

        const firestore = getFirestore();

        firestore.collection('Test').add({
            ...post,
            name: 'David Hyun',
            id: '1234',
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: ADD_POST_SUCCESS });
        }).catch((err) => {
            dispatch({ type: ADD_POST_FAILURE, err });
        })
       
    }
}