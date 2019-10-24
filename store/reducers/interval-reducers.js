import { ADD_INTERVAL, SET_INTERVALS } from "../actions/interval-actions";

import Interval from '../../models/interval';

const initialState = {
  intervals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INTERVAL:
        const newInterval = new Interval(action.id, action.latitude, action.longitude, action.timestamp, action.jogs_reference);
        return {
            intervals: state.intervals.concat(newInterval)
        }
    case SET_INTERVALS:
      return {
        intervals: action.intervals
      };
    default:
      return state;
  }
};
