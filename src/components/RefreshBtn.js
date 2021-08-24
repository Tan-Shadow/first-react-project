const RefreshBtn = (props) => {
  return (
    <button className="btn btn-primary m-2" onClick={props.refreshClick}>
      Reload the game
    </button>
  );
};

export default RefreshBtn;
