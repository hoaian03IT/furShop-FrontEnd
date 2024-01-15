
import './App.css';
import { Route, Routes } from 'react-router-dom';

function Hello() {
  return ( <h1>hi</h1> );
}



function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/h" element={<Hello />} />

        </Routes>
    </div>
  );
}

export default App;
