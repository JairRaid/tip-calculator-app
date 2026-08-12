import { ACTIONS } from "../../data/calculatorData";

const TipButton = ({ id, value, isChecked, onClick }) => {
  return (
    <div className="tip-option">
      <input
        id={id}
        className="sr-only tip-radio"
        type="radio"
        name="tip-percent"
        value={value}
        checked={isChecked}
        onChange={(e) => onClick(e, ACTIONS.SET_TIP_PERCENT)}
      />
      <label htmlFor={id} className="tip-btn">
        {value}%
      </label>
    </div>
  );
};

export default TipButton;
