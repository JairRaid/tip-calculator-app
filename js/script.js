const peopleNumberEl = document.getElementById("people-input");
const errorMsgEl = document.querySelector(".error-msg");
const dataEls = document.getElementsByTagName("data");
const inputEls = document.getElementsByTagName("input");
const btnReset = document.getElementById("reset");
const containerEl = document.querySelector(".container");
const btnContainer = document.querySelector(".btn-container");
const customEl = document.getElementById("custom-input");
const dataEl = document.querySelectorAll("data");

let billAmount;
let tipAmount;
let peopleNumber;
let canCalculate = false;

function initialisation() {
    for (const data of dataEls) {
        data.innerHTML = "$0.00";
    }
}

function calculate() {
    console.log("bill: " + billAmount + " tip: " + (tipAmount / 100) + " people numb: " + peopleNumber);
    const tipPerson = (billAmount * (tipAmount / 100)) / peopleNumber;
    const total = (billAmount / peopleNumber) + tipPerson;
    addDataToEl(dataEl, roundNumber(tipPerson), roundNumber(total));
}

function roundNumber(val) {
    return Math.round(val * 100) / 100;
}

function addDataToEl(data, tipPersonVal, totalVal) {
    for (const [key, element] of Object.entries(data)) {
        if (key === '0')
            element.innerHTML = `$${tipPersonVal}`;
        if (key === '1')
            element.innerHTML = `$${totalVal}`;
    }
}

function removeDataToEl(data) {
    for (const [key, element] of Object.entries(data)) {
        element.innerHTML = "$0";
    }
}

function checkPeopleNumber(val) {
    if (val.length > 0 && Number(val) === 0) return false;
    else return true;
}

function checkInputs() {
    const [bill, custom, people] = inputEls;
    if (!bill.value || (!custom.value && !tipAmount) || !people.value || !checkPeopleNumber(peopleNumberEl.value)) {
        btnReset.disabled = true;
        canCalculate = false;
    } else {
        btnReset.disabled = false;
        billAmount = Number(bill.value);
        peopleNumber = Number(people.value);
        canCalculate = true;
    }
}

function addError() {
    peopleNumberEl.style.borderColor = "#E17052";
    errorMsgEl.style.visibility = "visible";
}

function removeError() {
    peopleNumberEl.style.borderColor = "#26C2AE";
    errorMsgEl.style.visibility = "hidden";
}

function setStyleBtnSelected(element) {
    let children = btnContainer.children;
    for (const child of children) {
        child.classList.remove("selected");
    }
    element.classList.add("selected");
}

function unselectBtn() {
    let children = btnContainer.children;

    for (const child of children) {
        console.log(child);
        child.classList.remove("selected");
    }
}

peopleNumberEl.addEventListener("input", () => {
    if (!checkPeopleNumber(peopleNumberEl.value)) {
        addError();
    } else {
        removeError();
    }
});

containerEl.addEventListener("input", () => {
    checkInputs();
    if (canCalculate) {
        calculate();
    }else{
        removeDataToEl(dataEl);
    }
});

btnContainer.addEventListener("click", (event) => {
    const tipsTab = ["5%", "10%", "15%", "25%", "50%"];
    const selected = tipsTab.find((val) => val === event.target.innerHTML);
    if (selected) {
        setStyleBtnSelected(event.target);
        console.log(selected.length);
        tipAmount = selected.length < 3 ? Number(selected.slice(0, 1)) : Number(selected.slice(0, 2));
        customEl.value = "";
    }else{
        remeveDataToEl(dataEl);
    }
});

customEl.addEventListener("input", (event) => {
    if (event.target.value.length > 0) {
        unselectBtn();
        tipAmount = Number(customEl.value);
    }
});

btnReset.addEventListener("click", () => {
    location.reload();
});

initialisation();
