import './assets/App.scss';
import NavigationBar from './components/navigation/NavigationBar';
import { Navigate, Outlet } from 'react-router-dom'



function App() {
  const token = localStorage.getItem("token");

  return token ? (
    
      <div className="d-flex flex-column w-100 h-100 z-0" id='main-div'>
          <NavigationBar/>
          <Outlet/>
      </div>
  ) : <Navigate to="/" />;
}

export default App;
