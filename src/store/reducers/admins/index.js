
const INITIAL_STATE = {
  metrics: null
}

export const AdminReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_METRICS": return { ...state, metrics: action.payload};
    default: return state
  }
}