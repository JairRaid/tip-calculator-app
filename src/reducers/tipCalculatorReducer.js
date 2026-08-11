import { ACTIONS, initialState } from "../data/calculatorData";

export const tipCalculatorReducer = (state, action) => {
  const { type, payload } = action;

  if (type === ACTIONS.SET_BILL) {
    const value = payload.value;
    return {
      ...state,
      bill: value,
      errors: {
        ...state.errors,
        bill: value === "0" ? true : false,
      },
    };
  }

  if (type === ACTIONS.SET_TIP_PERCENT) {
    const value = payload.value;
    return {
      ...state,
      tipPercent: value,
      customTip: "",
    };
  }

  if (type === ACTIONS.SET_CUSTOM_TIP) {
    const value = payload.value;
    const floatValue = parseFloat(value);
    if (floatValue) if (floatValue > 100) return state;
    return {
      ...state,
      customTip: value,
      tipPercent: null,
    };
  }

  if (type === ACTIONS.SET_PEOPLE_COUNT) {
    const value = payload.value;
    return {
      ...state,
      peopleCount: value,
      errors: { ...state.errors, peopleCount: value === "0" ? true : false },
    };
  }

  if (type === ACTIONS.RESET) {
    return { ...initialState };
  }

  return state;
};
