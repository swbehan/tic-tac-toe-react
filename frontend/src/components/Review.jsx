export default function Review({ name, rating, reasoning }) {
  return (
    <>
      <h5>{name}</h5>
      <strong>Rating: {rating}</strong>
      <p>Explaination: {reasoning}</p>
    </>
  );
}
