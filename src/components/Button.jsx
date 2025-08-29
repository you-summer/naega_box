import "./Button.css";

const Button = ({ type, text, onClick, url, submit }) => {
  const click = () => {
    if (url) {
      window.location.href = url;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={click}
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};
export default Button;
