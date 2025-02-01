import NavigationBar from './components/navigation/NavigationBar';
import { Navigate, Outlet } from 'react-router-dom'
import { useSettings } from './hooks/useContexts';
import { useMeetingHubConnect } from './hooks/HooksIndex';
import { MouseEvent, useEffect, useState } from 'react';
import { Notification as Notification } from './data/notifications/Notification';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Button } from './components/ComponentsIndex';
import { Role, Size, Style } from './components/common/button/ButtonProps';




function App() {
  const {settings, setSettings} = useSettings()
  const meetingHubConnection = useMeetingHubConnect()
  const [toasts, setToasts] = useState<Notification[]>([]);


  useEffect(() => {
    meetingHubConnection.on("IncomingMeeting", (message, guid) => {
      console.log("IncomingMeeting", message);
      
      setToasts(prevToasts => [...prevToasts, {message: message, guid: guid, title: "Meeting"}]);
    });
  }, [meetingHubConnection]);
  
  
  const token = localStorage.getItem("token");

  const handleUserClose = (index: number) => {
    
    setToasts(toasts.filter((_, i) => i !== index));
  };

  const handleToastClose = (index: number, notification: Notification) => {
    setSettings({...settings, notifications: [...settings.notifications, notification]});
    setToasts(toasts.filter((_, i) => i !== index));
  };
  
  
  return token ? (
    <div className="d-flex flex-column w-100 h-100 z-0 position-relative" id='main-div'>
      {settings.showNavbar && <NavigationBar />}
      <Outlet />
      <ToastContainer className="toast-container">
        {
        toasts.map((toast, index) => (
          <Toast
            key={index}
            onClose={() => handleToastClose(index, toast)}
            delay={5000}
            autohide
            className="m-1 fade-in-toast"
          >
            <Toast.Header closeButton={false} className='ps-2 pe-0 pb-0 pt-0'>
              <strong className="me-auto">{toast.title}</strong>

              <Button
                icon='bi-x-lg'
                size={Size.Large}
                className='pe-1 me-1'
                style={Style.Borderless}
                role={Role.Cancel}
                onClick={() => handleUserClose(index)} />
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))
        
        }
      </ToastContainer>
    </div>
  ) : <Navigate to="/" />;
}

export default App;
