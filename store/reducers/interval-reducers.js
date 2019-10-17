import {
    ADD_INTERVAL,
    SET_INTERVALS
} from '../actions/interval-actions';

const initialState = {
    intervals: []
};

//should probably create models to reference instead of this.

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_INTERVALS:
            return {
                intervals: action.intervals
            }
        default:
            return state;
    }
}