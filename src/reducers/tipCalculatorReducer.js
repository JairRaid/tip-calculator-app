import { ACTIONS, initialState } from "../data/calculatorData";

export const tipCalculatorReducer = (state, action) => {
  const { type, payload } = action;

  if (type === ACTIONS.SET_BILL) {
    const value = payload.value;
    const parsed = parseFloat(value);

    if (value === "")
      return {
        ...state,
        bill: "",
        errors: { ...state.errors, bill: false },
      };

    if (!Number.isFinite(parsed) || parsed < 0) return state;
    if (parsed === 0)
      return {
        ...state,
        bill: value,
        errors: {
          ...state.errors,
          bill: true,
        },
      };

    return {
      ...state,
      bill: value,
      errors: {
        ...state.errors,
        bill: false,
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
    const parsed = parseFloat(value);

    if (value === "")
      return {
        ...state,
        customTip: "",
        tipPercent: null,
      };

    if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return state;
    if (parsed === 0)
      return {
        ...state,
        customTip: value,
        tipPercent: null,
      };

    return {
      ...state,
      customTip: value,
      tipPercent: null,
    };
  }

  if (type === ACTIONS.SET_PEOPLE_COUNT) {
    const value = payload.value;
    const parsed = parseInt(value);

    if (Number.isFinite(parseFloat(value))) return state;

    if (value === "")
      return {
        ...state,
        peopleCount: "",
        errors: { ...state.errors, peopleCount: false },
      };

    if (!Number.isInteger(parsed) || parsed < 0) return state;
    if (parsed === 0)
      return {
        ...state,
        peopleCount: value,
        errors: {
          ...state.errors,
          peopleCount: true,
        },
      };

    return {
      ...state,
      peopleCount: value,
      errors: {
        ...state.errors,
        peopleCount: false,
      },
    };
  }

  if (type === ACTIONS.RESET) {
    return { ...initialState };
  }

  return state;
};
