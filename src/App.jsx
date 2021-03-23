import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const apiData = await axios.get('/api/questions');
    console.log(apiData.data);
    setQuestions(apiData.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>覚えるンゴ</h1>
      </header>
      <body>
        <navigator>
          <ul>
            {questions.map((questions) => (
              <ul key={questions.id || questions.question}>
                <h5>{questions.question}</h5>
                <p>{questions.desc || 'no desc'}</p>
                <button onClick={(e) => console.log(e.target)}>console</button>
              </ul>
            ))}
          </ul>
        </navigator>
      </body>
    </div>
  );
}

export default App;
