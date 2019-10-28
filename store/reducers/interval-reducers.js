import { ADD_INTERVAL, SET_INTERVALS } from "../actions/interval-actions";

import Interval from '../../models/interval';

const initialState = {
  intervals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INTERVAL:
        // look at jogReducers, will probably have to change action.id into action.intervaldata.Id or something

        const newInterval = new Interval(action.intervalData.id, action.intervalData.latitude, action.intervalData.longitude, action.intervalData.timestamp, action.intervalData.jogs_referenceId);
        console.log(newInterval);
        return {
            intervals: state.intervals.concat(newInterval)
        }
    case SET_INTERVALS:
      return {
        intervals: action.intervals.map(
          int => new Interval(int.id, int.latitude, int.longitude, int.timestamp, int.jogs_referenceId)
        )
      };
    default:
      return state;
  }
};
