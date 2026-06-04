import "../styling/Card.css";
export default function Card({ name, imgURL, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imgURL} alt={name}></img>
      <h1>{name}</h1>
    </div>
  );
}
