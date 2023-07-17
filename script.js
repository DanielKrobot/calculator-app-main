const toggle = document.querySelector("#toggle");
const body = document.querySelector("body");
const result = document.querySelector("#result");
const nums = document.querySelectorAll(".num");
const del = document.querySelector(".del");
const reset = document.querySelector(".reset");
const eaquals = document.querySelector(".eaquals");
const operators = document.querySelectorAll(".operator");
const dot = document.querySelector(".dot");

let hasDot = false;
let hasOperator = false;


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.classList = ["theme2"];
};

toggle.addEventListener("click", () => {
    if (body.classList[0] === "theme1") {
        body.classList = ["theme2"];
    } else if (body.classList[0] === "theme2") {
        body.classList = ["theme3"];
    } else if (body.classList[0] === "theme3") {
        body.classList = ["theme1"];
    };
});

function addNum() {
    if(result.innerHTML === "0") {
        result.innerHTML = "";
    }
    result.innerHTML = result.innerHTML + this.innerHTML; 
};

function calculate() {
    const removeX = result.innerHTML.replace("x", "*");
    result.innerHTML = Math.round(eval(removeX) * 100000000) / 100000000;
    hasOperator = false;
    if (/\./g.test(result.innerHTML)) {
        hasDot = true;
    };
}

function deleteLast() {
    let deleted = result.innerHTML.slice(-1);
    if (deleted === ".") {
        hasDot = false;
    } else if (/[+\-x/]/.test(deleted)) {
        hasOperator = false;
    }
    result.innerHTML = result.innerHTML.slice(0, -1);
    if (result.innerHTML.length === 0) {
        result.innerHTML = "0";
    }
};

nums.forEach(num => num.addEventListener("click", addNum));

operators.forEach(operator => operator.addEventListener("click", () => {
    if (hasOperator) return;
    result.innerHTML = result.innerHTML + operator.innerHTML;
    hasOperator = true;
    hasDot = false;
}));

dot.addEventListener("click", () => {
    if (hasDot) return;
    result.innerHTML = result.innerHTML + ".";
    hasDot = true; 
});

reset.addEventListener("click", () => {
    result.innerHTML = "0";
    hasDot = false;
    hasOperator = false;
});

eaquals.addEventListener("click", calculate);

del.addEventListener("click", deleteLast);
