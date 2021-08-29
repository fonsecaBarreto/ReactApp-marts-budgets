
const INITIAL_STATE = {
  metrics: null,
  suggestions: [],
  rating: []
}

export const AdminReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_METRICS": return { ...state, metrics: action.payload};
    case "SET_SUGGESTIONS": return { ...state, suggestions: action.payload};
    case "SET_RATING": return { ...state, rating: action.payload};
    default: return state
  }
}