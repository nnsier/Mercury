export const ADD_INTERVAL = "ADD_INTERVAL";

export const addInterval = (latitude, longitude, time, jogs_referenceId) => {
  return {
    type: ADD_INTERVAL,
    intervalData: {
      latitude,
      longitude,
      time,
      jogs_referenceId
    }
  };
};
