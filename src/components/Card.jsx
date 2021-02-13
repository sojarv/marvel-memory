const Card = (props) => {
  //Passes data back to parent (which element was selected)
  const workYourMagic = (e) => {
    var el = e.target;
    if (e.target.tagName !== 'div') {
      el = e.target.parentElement;
    }

    if (el.id !== '') {
      props.childData(el.id);
    }
  };
  return (
    <div className="card" onClick={workYourMagic} id={props.id}>
      <img src={props.image} alt={'Picture of ' + props.name + ' not found'} />
      <p>{props.name}</p>
    </div>
  );
};

export default Card;
