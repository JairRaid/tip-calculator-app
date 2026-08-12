export const calculateTip = (data) => {
  const bill = parseFloat(data.bill) || 0;
  const people = Number(data.peopleCount);
  const tipPercent = parseFloat(data.tipPercent || data.customTip) || 0;

  // Reject non-integer, zero, negative, or invalid numbers of people
  if (bill <= 0 || !Number.isInteger(people) || people <= 0) {
    return {
      tipAmountPerPerson: "0.00",
      totalPerPerson: "0.00",
      isResetDisabled:
        !data.bill && !data.peopleCount && !data.tipPercent && !data.customTip,
    };
  }

  const totalTip = bill * (tipPercent / 100);
  const tipAmountPerPerson = totalTip / people;
  const totalPerPerson = (bill + totalTip) / people;

  return {
    tipAmountPerPerson: tipAmountPerPerson.toFixed(2),
    totalPerPerson: totalPerPerson.toFixed(2),
    isResetDisabled: false,
  };
};
