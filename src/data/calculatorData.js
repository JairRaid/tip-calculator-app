export const TIP_OPTIONS = [
  {
    id: "tip-5",
    value: "5",
  },
  {
    id: "tip-10",
    value: "10",
  },
  {
    id: "tip-15",
    value: "15",
  },
  {
    id: "tip-25",
    value: "25",
  },
  {
    id: "tip-50",
    value: "50",
  },
];

export const initialState = {
  bill: "",
  tipPercent: null, // number (e.g. 15) or null
  customTip: "",
  peopleCount: "",
  errors: {
    bill: false,
    peopleCount: false,
  },
};

export const ACTIONS = {
  SET_BILL: "SET_BILL",
  SET_TIP_PERCENT: "SET_TIP_PERCENT",
  SET_CUSTOM_TIP: "SET_CUSTOM_TIP",
  SET_PEOPLE_COUNT: "SET_PEOPLE_COUNT",
  RESET: "RESET",
};
