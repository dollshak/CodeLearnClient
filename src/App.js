import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import {
  Routes ,
  Route,
  Link
} from "react-router-dom";
import LobbyPage from './pages/LobbyPage/LobbyPage';
import CodeBlockPage from './pages/CodeBlockPage/CodeBlockPage';
import DataFetching from './pages/DataFetching/DataFetching';


function App() {
  return (
    <div className="App">
      
          {/* <Link to="/">Home</Link>
          <Link to="/login">Login</Link> */}
        <Routes >
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" />
          <Route path="/lobby" element={<LobbyPage/>}/>
          <Route path="/codeBlock" element={<CodeBlockPage/>}/>
          <Route path="/Data" element={<DataFetching/>}/>

        </Routes >
    
    </div>
  );
}

export default App;
