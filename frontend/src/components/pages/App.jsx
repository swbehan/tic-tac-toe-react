import { useState, useEffect, useCallback } from "react";
import Board from "../Board";
import VotingList from "../VotingList.jsx";
import ReviewsList from "../ReviewsList.jsx";
import CreateReviewForm from "../CreateReviewForm.jsx";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}`;
    } else {
      description = `Go to game start`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState("");


  //use callback will remember the function that is given as function parameter and will only call the function if the second paramter, which in this case is query, changes
  const reloadReviews = useCallback(async () => {
    const res = await fetch(`/api/reviews?q=${query}`);
    if (!res.ok) {
      console.error("Failed to fetch reviews:", res.status, res.statusText);
      return;
    }
    const data = await res.json();
    setReviews(data);
  }, [query]);

  // cannot just use setReviews here and pass
  // in the data like this (setReviews(data)) since you will get stuck in an infinite render loop
  // need to use useEffect, takes a function as the first paramter that will be the function callback for the cleanup
  // the second paramter will be an array that will take the paramters that you want to retrigger the effect (so the conditions you want the effect to run again in)
  // use effect is used to sync the frontend and the backend
  useEffect(() => {

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
  }, [reloadReviews, query]);

  return (
    <>
      <Container>
        <h1>Tic-Tac-Toe Bro</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
          velit harum molestiae iste maiores iusto dicta ullam error ducimus
          rerum, omnis fuga esse ipsum aliquam expedita alias optio saepe.
          Eveniet.
        </p>
        <br />
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
        <br />
        <br />
        <br />
        <section>
          <Row>
            <Col>
              <ReviewsList
                reviews={reviews}
                query={query}
                setQuery={setQuery}
              />
            </Col>
            <Col>
              <CreateReviewForm reloadReviews={reloadReviews}/>
            </Col>
          </Row>
        </section>
        <section>
          <h2>Voting</h2>
          <VotingList />
        </section>
      </Container>
    </>
  );
}
