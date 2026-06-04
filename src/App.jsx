import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card.jsx";
function App() {
  // const [data, setData] = useState([]);
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState([false]);

  function shuffleList(listOfChar) {
    return [...listOfChar].sort(() => Math.random() - 0.5);
  }
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dattebayo-api.onrender.com/characters/1344,1307,437,374,376,259,739,1293,1303,1280,928,861,1365,444,1216",
        );
        const data = await response.json();
        console.log(data);
        setCharList(shuffleList(data));
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <div>...Loading</div>
      </>
    );
  }

  return (
    <>
      {charList.map((char) => (
        <Card
          key={char.id}
          name={char.name}
          imgURL={char.images[0]}
          onClick={() => setCharList(shuffleList(charList))}
        />
      ))}
    </>
  );
}

export default App;
