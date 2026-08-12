import "./App.css";
import { ACTIONS, initialState, TIP_OPTIONS } from "./data/calculatorData";
import TipButton from "./components/TipButton/TipButton";
import { useReducer } from "react";
import { calculateTip } from "./utils/calculate";
import { tipCalculatorReducer } from "./reducers/tipCalculatorReducer";

const App = () => {
  const [state, dispatch] = useReducer(tipCalculatorReducer, initialState);
  const { bill, tipPercent, customTip, peopleCount, errors } = state;

  const { tipAmountPerPerson, totalPerPerson, isResetDisabled } =
    calculateTip(state);

  const handleChange = (e, actionType) => {
    dispatch({ type: actionType, payload: { value: e.target.value } });
  };

  const handleClick = (e, actionType) => {
    if (actionType === ACTIONS.SET_TIP_PERCENT)
      dispatch({ type: actionType, payload: { value: e.target.value } });

    if (actionType === ACTIONS.RESET) dispatch({ type: ACTIONS.RESET });
  };

  return (
    <main className="app-main">
      <header className="app-header">
        <h1 className="logo" aria-label="Splitter">
          <img src="./logo.svg" alt="" />
        </h1>
      </header>

      <section className="calculator-card" aria-label="Tip Calculator">
        <form className="calculator-form" onSubmit={(e) => e.preventDefault()}>
          {/* Bill Section */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="bill" className="form-label">
                Bill
              </label>
              <span
                id="bill-error"
                className={`error-message ${errors.bill ? "" : "hidden"}`}
                aria-live="polite"
              >
                {errors.bill ? "Can't be zero" : ""}
              </span>
            </div>
            <div className="input-wrapper">
              <span className="input-prefix currency-symbol">
                <img src="./icon-dollar.svg" alt="" />
              </span>
              <input
                id="bill"
                className={`form-input ${errors.bill ? "input-error" : ""}`}
                type="number"
                name="bill"
                placeholder="0"
                min="0"
                step="0.01"
                inputMode="decimal"
                aria-invalid={errors.bill}
                aria-describedby="bill-error"
                value={bill}
                onChange={(e) => handleChange(e, ACTIONS.SET_BILL)}
              />
            </div>
          </div>

          {/* Select Tip Section */}
          <fieldset className="tip-fieldset">
            <legend className="form-label">Select Tip %</legend>

            <div className="tip-grid">
              {TIP_OPTIONS.map((option) => (
                <TipButton
                  key={option.id}
                  id={option.id}
                  value={option.value}
                  isChecked={option.value === tipPercent ? true : false}
                  onClick={handleClick}
                />
              ))}

              <div className="tip-option-custom">
                <label htmlFor="custom-tip" className="sr-only">
                  Custom tip percentage
                </label>
                <input
                  id="custom-tip"
                  className="form-input custom-tip-input"
                  type="number"
                  name="custom-tip"
                  placeholder="Custom"
                  min="0"
                  max="100"
                  value={customTip}
                  onChange={(e) => handleChange(e, ACTIONS.SET_CUSTOM_TIP)}
                />
              </div>
            </div>
          </fieldset>

          {/* Number of People Section */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="people-count" className="form-label">
                Number of People
              </label>
              <span
                id="people-error"
                className={`error-message ${errors.peopleCount ? "" : "invisible"}`}
                aria-live="polite"
              >
                {errors.peopleCount ? "Can't be zero" : ""}
              </span>
            </div>
            <div className="input-wrapper">
              <span className="input-prefix person-icon">
                <img src="./icon-person.svg" alt="" />
              </span>
              <input
                id="people-count"
                className={`form-input ${errors.peopleCount ? "input-error" : ""}`}
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                placeholder="0"
                aria-invalid={errors.peopleCount}
                aria-describedby="people-error"
                value={peopleCount}
                onChange={(e) => handleChange(e, ACTIONS.SET_PEOPLE_COUNT)}
              />
            </div>
          </div>
        </form>

        {/* Calculation Results Container */}
        <div className="result-container">
          <div className="result-group">
            {/* Tip Amount Result */}
            <div className="result-row">
              <div className="result-label-group">
                <h2 className="result-title">Tip Amount</h2>
                <p className="result-subtitle">/ person</p>
              </div>
              <p className="result-value" aria-live="polite">
                $<span id="tip-amount-display">{tipAmountPerPerson}</span>
              </p>
            </div>

            {/* Total Amount Result */}
            <div className="result-row">
              <div className="result-label-group">
                <h2 className="result-title">Total</h2>
                <p className="result-subtitle">/ person</p>
              </div>
              <p className="result-value" aria-live="polite">
                $<span id="total-amount-display">{totalPerPerson}</span>
              </p>
            </div>
          </div>
          {/* Action button */}
          <button
            type="reset"
            id="reset-btn"
            className="reset-btn"
            onClick={(e) => handleClick(e, ACTIONS.RESET)}
            disabled={isResetDisabled}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
