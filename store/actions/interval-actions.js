import { fetchIntervals, insertInterval, getIntervals } from '../../helpers/db';

export const ADD_INTERVAL = "ADD_INTERVAL";
export const SET_INTERVALS = "SET_INTERVALS"

export const addInterval = (latitude, longitude, timestamp, jogs_referenceId) => {
  return async dispatch => {
    try {
      const dbResult = await insertInterval(latitude, longitude, timestamp, jogs_referenceId)
      const intervalId = dbResult.insertId;
      dispatch({ type: ADD_INTERVAL, intervalData: {id: intervalId, latitude, longitude, timestamp, jogs_referenceId}})
    } catch(err) {
      throw err
    }
  };
};

export const loadIntervals = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchIntervals();
      dispatch({ type: SET_INTERVALS, intervals: dbResult.rows._array})
    } catch (err) {
      throw err;
    }
  }
}
