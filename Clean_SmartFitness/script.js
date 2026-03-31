let workouts = JSON.parse(localStorage.getItem('userWorkouts')) || [];

const updateWorkoutList = () => {
    const display = document.getElementById('workoutDisplay');
    if (!display) return;

    display.innerHTML = '';
    
    workouts.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${item.name}</h3><p>${item.time} mins</p>`;
        display.appendChild(div);
    });
};

const workoutForm = document.getElementById('workoutForm');
if (workoutForm) {
    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('exercise').value;
        const time = document.getElementById('duration').value;

        if (name.trim() === "" || time <= 0) {
            alert("Please enter valid details!");
            return;
        }

        const newEntry = { name, time };
        workouts.push(newEntry);

        localStorage.setItem('userWorkouts', JSON.stringify(workouts));
        
        updateWorkoutList();
        workoutForm.reset();
    });
}

function calculateBMI() {
    try {
        const w = parseFloat(document.getElementById('weight').value);
        const h = parseFloat(document.getElementById('height').value) / 100;

        if (isNaN(w) || isNaN(h)) throw "Invalid Input";

        const bmi = (w / (h * h)).toFixed(2);
        let msg = "";

        if (bmi < 18.5) msg = "Underweight";
        else if (bmi < 24.9) msg = "Healthy";
        else msg = "Overweight";

        document.getElementById('bmiResult').innerText = `BMI: ${bmi} (${msg})`;
    } catch (err) {
        alert("Error: " + err);
    }
}

const showWelcomeMessage = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Welcome to Smart Fitness Tracker!");
            resolve();
        }, 1000);
    });
};

window.onload = () => {
    updateWorkoutList();
    showWelcomeMessage();
};