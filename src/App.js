
import React, { useEffect } from 'react'
import './index.css'
import Routes from './routes/index' 
import { useSelector, useDispatch } from 'react-redux'
import WarningDialog from './components/utils/WarningDialog'
import { closeDialogState} from './store/reducers/dialog/actions'


function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.global.loading)
  const dialogState = useSelector(state=>state.dialog)
  return (
    <div className={`App ${loading? 'loading': ''}`}>
        <Routes></Routes>  
        <WarningDialog config={dialogState} onClose={ () =>{ dispatch(closeDialogState()) } }></WarningDialog> 
    </div>
  );
}

export default App;
