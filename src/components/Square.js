import "./SquareStyle.css";

const Square = (props) => {
  return (
    // so one of the property is gonna have a onclick function that we want to execute
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
