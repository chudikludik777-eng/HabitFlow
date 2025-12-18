const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");

const allHabits = document.getElementById("allHabits");
const doneHabits = document.getElementById("doneHabits");
const pendingHabits = document.getElementById("pendingHabits");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
    allHabits.innerHTML = "";
    doneHabits.innerHTML = "";
    pendingHabits.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${habit.text}</span>
        <input type="checkbox" ${habit.done ? "checked" : ""}>
    `;

        const checkbox = li.querySelector("input");
        checkbox.addEventListener("change", () => {
            habits[index].done = checkbox.checked;
            saveHabits();
            renderHabits();
        });

        allHabits.appendChild(li.cloneNode(true));

        if (habit.done) {
            doneHabits.appendChild(li);
        } else {
            pendingHabits.appendChild(li);
        }
    });
}

addHabitBtn.addEventListener("click", () => {
    const text = habitInput.value.trim();
    if (!text) return;

    habits.push({ text, done: false });
    habitInput.value = "";

    saveHabits();
    renderHabits();
});

renderHabits();
