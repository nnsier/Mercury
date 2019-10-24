import { ADD_JOG, SET_JOGS } from "../actions/jog-actions";

import Jog from "../../models/jog";

const initialState = {
  jogs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOG:
        const newJog = new Jog(action.id, action.distance, action.duration, action.date);
        return{
            jogs: state.jogs.concat(newJog)
        }
    case SET_JOGS:
      return {
        jogs: action.jogs.map(
          jg => new Jog(jg.id.toString(), jg.distance, jg.duration, jg.date)
        )
      };
    default:
      return state;
  }
};
