
const INITIAL_STATE = {
  mart: null,
  admin: null,
  menu: false,
  loading: false
}

export const globalReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_MART": return { ...state, mart: action.payload};
    case "SET_ADMIN": return { ...state, admin: action.payload};
    case "SET_MENU": return { ...state, menu: action.payload }
    case "SET_LOADING": return { ...state, loading: action.payload };
    default: return state
  }
}