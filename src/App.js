
import Routes from './routes/index' 
import { useSelector } from 'react-redux'
import './index.css'
function App() {
  const loading = useSelector(state=>state.global.loading)
  return (
    <div className={`App ${loading? 'loading': ''}`}>
        <Routes></Routes>  
    </div>
  );
}

export default App;
