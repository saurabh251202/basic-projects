// js logic
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

// operators
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// calculate function
const calculate = (btnValue) => {
    const lastChar = output.slice(-1);

    if (btnValue === "=" && output !== "") {
        try {
            output = new Function("return " + output.replace(/%/g, "/100"))();
            output = output.toString(); // ✅ Convert result back to string
        } catch {
            output = "Error";
        }
    } else if (btnValue === "C") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else {
        if (specialChars.includes(btnValue)) {
            if (output === "" && btnValue !== "-") return;

            if (specialChars.includes(lastChar)) {
                output = output.slice(0, -1);
            }
        }

        output += btnValue;
    }

    display.value = output;
};

// buttons logic for event
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;

// theme toggle logic
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    toggleIcon.classList.toggle("active");
    isDark = !isDark;
};