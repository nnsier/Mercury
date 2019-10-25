import { fetchJogs, insertJog, insertInterval } from '../../helpers/db';

export const ADD_JOG = "ADD_JOG";
export const SET_JOGS = "SET_JOGS";

export const addJog = (duration, date, distance, locations) => {
  return async dispatch => {
    try {
        const dbResult = await insertJog(duration, date, distance);
        const jogId = dbResult.insertId;
        console.log(`this is the jogId ${jogId}`);
        console.log(locations);
        locations.forEach(location => insertInterval(location.latitude, location.longitude, location.timestamp, jogId))
        dispatch({ type: ADD_JOG, jogData: {id: jogId, duration, date, distance}})
        
        console.log('nothing?')
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
            console.log(`We're in loadJogs`);
            console.log('look how much loadjogs were at')
            if(dbResult.rows._array.length > 0){
                dispatch({ type: SET_JOGS, jogs: dbResult.rows._array })
            }
            
        } catch (err) {
            throw err;
        }
    }
}