import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await axios.get("/api/jokes");
        setJokes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJokes();
  }, []);

  return (
    <>
      <h2>Hello Front React</h2>
      <p>{jokes.length}</p>
      {
        jokes.map((joke) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  );
}

export default App;
