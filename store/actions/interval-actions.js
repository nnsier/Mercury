import { fetchIntervals } from '../../helpers/db';

export const ADD_INTERVAL = "ADD_INTERVAL";
export const SET_INTERVALS = "SET_INTERVALS"

export const addInterval = (latitude, longitude, timestamp, jogs_referenceId) => {
  return {
    type: ADD_INTERVAL,
    intervalData: {
      latitude,
      longitude,
      timestamp,
      jogs_referenceId
    }
  };
};

export const loadIntervals = (jogId) => {
  return async dispatch => {
    try {
      const dbResult = await fetchIntervals(jogId);
      console.log(dbResult);
      dispatch({ type: SET_INTERVALS, intervals: dbResult.rows._array})
    } catch (err) {
      throw err;
    }
  }
}
