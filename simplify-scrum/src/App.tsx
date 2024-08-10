import './App.css';
import NavigationBar from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom'


function App() {
  return (
      <div className="d-flex flex-column w-100 h-100">
          <NavigationBar/>
          <Outlet/>
      </div>
  );
}

export default App;
