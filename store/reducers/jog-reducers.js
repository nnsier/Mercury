import {
    ADD_JOG,
    SET_JOGS
} from '../actions/jog-actions';

import Jog from '../../models/jog';


const initialState = {
    jogs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case ADD_JOG:
        //     return {
                
        //     }
        case SET_JOGS:
            return {
                jogs: action.jogs.map(jg => new Jog(jg.id.toString(), jg.distance, jg.duration, jg.date))
            }
        default:
            return state;
    }
};