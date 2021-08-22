
const INITIAL_STATE = {
  title:"",
  content:"",
  show:false, 
  onResult: () => console.log("okok")
}

export const dialogReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_DIALOG_STATE": return { ...state, ...action.payload };
    case "CLOSE_DIALOG": return  { ...INITIAL_STATE };
    default: return state
  }
}