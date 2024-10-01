import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { getCountries } from './services/countryService';
import Quiz from './components/Quiz';

function App() {
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div className="App">
      <h1>Country Capital Quiz</h1>
      <Quiz />
    </div>
  );
}

export default App;
