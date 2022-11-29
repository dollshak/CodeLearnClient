import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import {
  Routes ,
  Route,
  Link
} from "react-router-dom";
import LobbyPage from './pages/LobbyPage/LobbyPage';
import CodeBlockPage from './pages/CodeBlockPage/CodeBlockPage';
import SocketTry from './pages/SocketTry/SocketTry';


function App() {
  return (
    <div className="App">
      
          {/* <Link to="/">Home</Link>
          <Link to="/login">Login</Link> */}
        <Routes >
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" />
          <Route path="/lobby" element={<LobbyPage/>}/>
          <Route path="/codeBlock:uuid:student_login" element={<CodeBlockPage/>}/>
          <Route path="/codeBlock" element={<CodeBlockPage/>}/>
          <Route path="/socketTry" element={<SocketTry/>}/>



        </Routes >
    
    </div>
  );
}

export default App;
