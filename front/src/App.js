import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Task } from './pages/board';
import { Login } from './pages/login';
import { useAuth } from "./components/authContext/AuthContext";
function App() {
  const {user} = useAuth();

  return (
    <>
      
        {user?
          <>
          <Header/>
          <Routes> 
            <Route path="/board" element={<Task/>}/>
            <Route path="/*" element={<Task/>}/>
          </Routes>
          </>:
            <Routes>
                <Route path="*" element={<Login/>}/>
            </Routes>
        }
    </>
  );
}

export default App;
