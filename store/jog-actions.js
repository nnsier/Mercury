export const ADD_JOG = 'ADD_JOG';

export const addJog = (duration, date, distance, intervalsArray) => {
    return { type: ADD_JOG, jogData: { duration, date, distance, intervalsArray}}
}