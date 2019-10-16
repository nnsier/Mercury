import { getJogs } from '../../helpers/db';

export const ADD_JOG = "ADD_JOG";

export const addJog = (duration, date, distance) => {
  return {
    type: ADD_JOG,
    jogData: {
      duration,
      date,
      distance
    }
  };
};

export const loadJogs = () => {
    return async dispatch => {
        try {
            const dbResult = await getJogs();
            console.log(dbResult);
        } catch (err) {
            throw err;
        }
    }
}