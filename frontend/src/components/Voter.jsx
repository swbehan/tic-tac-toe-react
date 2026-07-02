export default function Voter({ name, numberOfVotes, onVote }) {
    return (
      <div>
        Vote for <strong>{name} </strong>
        <span>Voted {numberOfVotes} times </span>
        <button onClick={onVote}>👍</button>
      </div>
    );
  }