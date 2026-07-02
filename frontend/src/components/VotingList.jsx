import { useState } from "react";

function Voter({ name, numberOfVotes, onVote }) {
  return (
    <div>
      Vote for <strong>{name} </strong>
      <span>Voted {numberOfVotes} times </span>
      <button onClick={onVote}>👍</button>
    </div>
  );
}

export default function VotingList() {
  const [voters, setVoters] = useState([
    { name: "Sean", votes: 0 },
    { name: "Kyle", votes: 0 },
    { name: "Ryan", votes: 0 },
    { name: "Malachi", votes: 0 },
  ]);

  function handleClick(index) {
    console.log("Clicked user at index", index)
    setVoters(
      voters.map(
        (voter, i) =>
          i === index ? { 
            ...voter, votes: voter.votes + 1
        } : voter,
      )
    );
  }

  return (
    <>
      <div>
        <h6>Voting List</h6>
        {voters.map((voter, index) => (
          <Voter
            key={index}
            name={voter.name}
            numberOfVotes={voter.votes}
            onVote={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}
