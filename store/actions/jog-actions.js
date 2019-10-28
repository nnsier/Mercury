import { fetchJogs, insertJog} from '../../helpers/db';
import * as intervalActions from '../actions/interval-actions';


export const ADD_JOG = "ADD_JOG";
export const SET_JOGS = "SET_JOGS";

export const addJog = (duration, date, distance, locations) => {
  return async dispatch => {
    try {
        const dbResult = await insertJog(duration, date, distance);
        const jogId = dbResult.insertId;
        console.log(jogId);
        await locations.forEach(location => dispatch(intervalActions.addInterval(location.latitude, location.longitude, location.timestamp, dbResult.insertId)))
        dispatch({ type: ADD_JOG, jogData: {id: jogId, duration, date, distance}})
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
            if(dbResult.rows._array.length > 0){
                dispatch({ type: SET_JOGS, jogs: dbResult.rows._array })
            }
            
        } catch (err) {
            throw err;
        }
    }
}