import {
    ADD_JOG,
    SET_JOGS
} from '../actions/jog-actions';


const initialState = {
    jogs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_JOGS:
            return {
                jogs: action.jogs
            }
        default:
            return state;
    }
};