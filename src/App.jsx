import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card.jsx";
function App() {
  // const [data, setData] = useState([]);
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

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
        const cards = data.map((item) => ({ ...item, isClicked: false }));
        setCharList(shuffleList(cards));
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    }
    getData();
  }, []);

  if(currentScore ==15){
    return(
      <div className="appContainer">
        <h1>YOU WIN</h1>
        <h1>YOU WIN</h1>
        <h1>YOU WIN</h1>
        <h1>YOU WIN</h1>
        </div>
      
    )
  }

  if (loading) {
    return (
      <div className="appContainer">
        <div>...Loading</div>
      </div>
    );
  }

  return (
    <div className="appContainer">
      <h2>Current: {currentScore}</h2>
      <h2>Best: {bestScore}</h2>
      <div className="cardContainer">
        {charList.map((char) => (
          <Card
            key={char.id}
            name={char.name}
            imgURL={char.images[0]}
            onClick={() => {
              setCharList(shuffleList(charList));
              if (char.isClicked) {
                setCharList((prev) =>
                  prev.map((char) => ({ ...char, isClicked: false })),
                );
                if (currentScore > bestScore) {
                  setBestScore(currentScore);
                }
                setCurrentScore(0);
                return;
              }
              char.isClicked = true;
              setCurrentScore(currentScore + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
