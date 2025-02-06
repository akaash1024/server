import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import './App.css';

function App() {
  return (
    <div>
      <h1>My Notes App</h1>
      <Outlet /> 
    </div>
  );
}

export default App;
