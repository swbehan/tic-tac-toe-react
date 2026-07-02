import { Router } from "express";

const reviewsRouter = Router();

// simple tic tac toe reviews
const reviews = [
  {
    reviewerName: "John",
    reviewRating: "8/10",
    reasoning: "Very solid tic-tac-toe implementation",
  },
  {
    reviewerName: "Lisa",
    reviewRating: "6/10",
    reasoning: "Pretty typical, nothing special",
  },
  {
    reviewerName: "Bob",
    reviewRating: "2/10",
    reasoning: "Just Bad",
  },
];

reviewsRouter.get("/reviews", (req, res) => {
  console.log(req.query);
  let query = req.query.q;
  if (query) {
    query = query.toString().toLocaleLowerCase();
    return res.json(
      reviews.filter((review) =>
        review.reviewerName.toLocaleLowerCase().includes(query)
      )
    );
  } else {
    res.json(reviews);
  }
});

export default reviewsRouter;
