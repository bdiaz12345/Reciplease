import { FETCH_SAVED_RECIPES, FETCH_USER } from '../actions/index'

const initialState = {
    username: '',
    email: '',
    savedRecipes: []
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_USER:
            console.log('here')
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email
            }
        default:
            return state
    }
}

export default rootReducer