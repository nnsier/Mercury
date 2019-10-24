import { fetchJogs, insertJog } from '../../helpers/db';

export const ADD_JOG = "ADD_JOG";
export const SET_JOGS = "SET_JOGS";

export const addJog = (duration, date, distance) => {
  return async dispatch => {
    try {
        const dbResult = await insertJog(duration, date, distance);
        console.log(dbResult);
        dispatch({ type: ADD_JOG, jogData: {id: dbResult.insertId, duration, date, distance}})
        loadJogs();
    } catch (err) {
        throw err
    }
  };
};

//Something is probably incorrect with how we're grabbing the dbResult

export const loadJogs = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchJogs();
            console.log(dbResult);
            dispatch({ type: SET_JOGS, jogs: dbResult.rows._array })
        } catch (err) {
            throw err;
        }
    }
}