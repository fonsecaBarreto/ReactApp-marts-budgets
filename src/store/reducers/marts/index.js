
const INITIAL_STATE = {
  latestOrders: [],
}

export const MartReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_LATEST_ORDERS": return { ...state, latestOrders: action.payload};
    case "PUSH_LATEST_ORDERS": return { ...state, latestOrders : [action.payload, ...state.latestOrders ]}
    default: return state
  }
}