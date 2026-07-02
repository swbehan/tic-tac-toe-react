import { useState, useEffect } from "react";
import Review from "./Review.jsx";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  //creating a controlled component
  const [query, setQuery] = useState("");

  // cannot just use setReviews here and pass
  // in the data like this (setReviews(data)) since you will get stuck in an infinite render loop
  // need to use useEffect, takes a function as the first paramter that will be the function callback for the cleanup
  // the second paramter will be an array that will take the paramters that you want to retrigger the effect (so the conditions you want the effect to run again in)
  // use effect is used to sync the frontend and the backend
  useEffect(() => {
    const reloadReviews = async () => {
      const res = await fetch(`/api/reviews?q=${query}`);
      if (!res.ok) {
        console.error("Failed to fetch reviews:", res.status, res.statusText);
        return;
      }
      const data = await res.json();
      setReviews(data);
    };

    // you can use a setTimeout to debouncing the useEffect so that it does not fire an request to the backend after every search
    // so this says that we will wait 300 milliseconds to call the function reload reviews.
    // you will then pass this const into the clean up object of the useEffect
    const timeout = setTimeout(reloadReviews, 300);

    // Cleanup function to clear timeout if query changes before timeout completes
    // Will clear the previous call before going onto the next call if the next call is within the timeout window
    return () => {
      console.log("Fetching effect cleanup");
      clearTimeout(timeout);
    };
  }, [query]);

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
