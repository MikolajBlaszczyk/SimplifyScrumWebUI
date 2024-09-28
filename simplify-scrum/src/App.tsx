import './assets/App.scss';
import NavigationBar from './components/NavigationBar';
import { Outlet } from 'react-router-dom'


function App() {
  return (
      <div className="d-flex flex-column w-100 h-100 z-0" id='main-div'>
          <NavigationBar/>
          <Outlet/>
      </div>
  );
}

export default App;
