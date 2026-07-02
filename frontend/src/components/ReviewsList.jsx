import Review from "./Review.jsx";

export default function ReviewsList({ reviews, query, setQuery }) {
  //creating a controlled component

  function renderReview(review, index) {
    return (
      <Review
        key={index}
        name={review.reviewerName}
        rating={review.reviewRating}
        reasoning={review.reasoning}
      />
    );
  }

  const onQuery = (event) => {
    console.log("onQuery Fired", event.target.value);
    setQuery(event.target.value);
  };
  // the input field below is a contolled component since the state of it is controlled by the parent component,
  // the input is treated as its own component even though it is HTML
  // need to have a value prop and an onChange prop to controlled components
  return (
    <>
      <h2>Reviews of Game</h2>
      <input value={query} onChange={onQuery} placeholder="Filter Reviews..." />
      {!reviews?.length ? (
        <div>Loading Reviews....</div>
      ) : (
        reviews.map((review, index) => renderReview(review, index))
      )}
    </>
  );
}
