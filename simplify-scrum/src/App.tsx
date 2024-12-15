import NavigationBar from './components/navigation/NavigationBar';
import { Navigate, Outlet } from 'react-router-dom'
import { useSettings } from './hooks/useContexts';
import { useMeetingHubConnect } from './hooks/HooksIndex';
import { useEffect } from 'react';


function App() {
  const meetingHubConnection = useMeetingHubConnect()
  meetingHubConnection.on("IncomingMeeting", (message) => {
    console.log("IncomingMeeting", message)
  })



  const {settings} = useSettings()
  const token = localStorage.getItem("token");

  
  return token ? (
    
      <div className="d-flex flex-column w-100 h-100 z-0" id='main-div'>
          {settings.showNavbar == true && <NavigationBar/>}
          <Outlet/>
      </div>
  ) : <Navigate to="/" />;
}

export default App;
