import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState } from "react";

export default function CreateReviewForm({reloadReviews}) {
  const [review, setReview] = useState({
    reviewerName: "",
    reviewRating: 0,
    reasoning: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("onSubmit", review);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if(!res.ok) {
        console.error("failed to create review", res.statusText);
        return;
    } else {
        const data = await res.json();
        console.log("Listing created successfully", data);
        // reset the form after submission
        setReview({reviewerName: "", reviewRating: 0, reasoning: ""})

        reloadReviews();
    }
  };

  return (
    <>
      <h2>Create Game Review</h2>
      <Form onSubmit={onSubmit}>
        <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
          <Form.Control
            type="text"
            value={review.reviewerName}
            onChange={(event) =>
              setReview({ ...review, reviewerName: event.target.value })
            }
            placeholder="Enter name"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Rating"
          className="mb-3"
        >
          <Form.Control
            type="number"
            value={review.reviewRating}
            onChange={(event) =>
              setReview({ ...review, reviewRating: +event.target.value })
            }
            placeholder="Enter rating"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Reasoning"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={review.reasoning}
            onChange={(event) =>
              setReview({ ...review, reasoning: event.target.value })
            }
            placeholder="Enter reasoning"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
