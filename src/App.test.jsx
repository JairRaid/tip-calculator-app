import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

const setup = () => {
  const user = userEvent.setup();
  const utils = render(<App />);

  const getBillInput = () => screen.getByLabelText(/bill/i);
  const getCustomTipInput = () =>
    screen.getByLabelText(/custom tip percentage/i);
  const getPeopleInput = () => screen.getByLabelText(/number of people/i);
  const getTipAmount = () => document.querySelector("#tip-amount-display");
  const getTotalAmount = () => document.querySelector("#total-amount-display");
  const getRadioOptions = () => document.querySelectorAll(".tip-radio");
  const getResetButton = () => document.querySelector(".reset-btn");

  return {
    user,
    ...utils,
    getBillInput,
    getCustomTipInput,
    getPeopleInput,
    getTipAmount,
    getTotalAmount,
    getRadioOptions,
    getResetButton,
  };
};

describe("Tipcalculator component", () => {
  it("renders default state correctly", () => {
    const {
      getBillInput,
      getCustomTipInput,
      getPeopleInput,
      getRadioOptions,
      getTipAmount,
      getTotalAmount,
    } = setup();

    const billInput = getBillInput();
    const customTipInput = getCustomTipInput();
    const radioOptions = getRadioOptions();
    const peopleInput = getPeopleInput();
    const tipAmount = getTipAmount();
    const total = getTotalAmount();

    expect(billInput.value).toHaveLength(0);
    expect(radioOptions.length).toEqual(5);
    expect(customTipInput.value).toHaveLength(0);
    expect(peopleInput.value).toHaveLength(0);
    expect(tipAmount).toBeInTheDocument();
    expect(tipAmount).toHaveTextContent("0.00");
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent("0.00");
  });

  it("calculates tip amount and total correctly for standard percentage", async () => {
    const {
      user,
      getBillInput,
      getPeopleInput,
      getRadioOptions,
      getTipAmount,
      getTotalAmount,
    } = setup();

    const billInput = getBillInput();
    const radioOptions = getRadioOptions();
    const peopleInput = getPeopleInput();
    const tipAmount = getTipAmount();
    const total = getTotalAmount();

    await user.type(billInput, "142.55");
    await user.click(radioOptions[2]);
    await user.type(peopleInput, "5");

    expect(tipAmount).toHaveTextContent("4.28");
    expect(total).toHaveTextContent("32.79");
  });

  it("calculates correctly using a custom tip percentage", async () => {
    const {
      user,
      getBillInput,
      getCustomTipInput,
      getPeopleInput,
      getTipAmount,
      getTotalAmount,
    } = setup();

    const billInput = getBillInput();
    const customTipInput = getCustomTipInput();
    const peopleInput = getPeopleInput();
    const tipAmount = getTipAmount();
    const total = getTotalAmount();

    await user.type(billInput, "142.55");
    await user.type(customTipInput, "15");
    await user.type(peopleInput, "5");

    expect(tipAmount).toHaveTextContent("4.28");
    expect(total).toHaveTextContent("32.79");
  });

  it("resets all inputs and calculated values when clicking the reset button", async () => {
    const {
      user,
      getBillInput,
      getCustomTipInput,
      getPeopleInput,
      getTipAmount,
      getTotalAmount,
      getResetButton,
    } = setup();

    const billInput = getBillInput();
    const customTipInput = getCustomTipInput();
    const peopleInput = getPeopleInput();
    const tipAmount = getTipAmount();
    const total = getTotalAmount();
    const reset = getResetButton();

    await user.type(billInput, "142.55");
    await user.type(customTipInput, "15");
    await user.type(peopleInput, "5");

    await user.click(reset);

    expect(billInput.value).toHaveLength(0);
    expect(customTipInput.value).toHaveLength(0);
    expect(peopleInput.value).toHaveLength(0);
    expect(tipAmount).toHaveTextContent("0.00");
    expect(total).toHaveTextContent("0.00");
    expect(reset).toBeDisabled();
  });
});
