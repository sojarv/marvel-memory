const Endgame = (props) => {
  // Passes data back to parent
  const workPlease = (e) => {
    props.isNew(false);
  };

  return props.end ? (
    <div className="end">
      <p>You found every superhero there is!</p>
      <button onClick={workPlease}>Start again</button>
    </div>
  ) : (
    <div className="end">
      <p>You lost</p>
      <button onClick={workPlease}>Start again</button>
    </div>
  );
};

export default Endgame;
