function calculateCalories() {
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);

    let bmr;

    if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `<p class="text-center mt-3">Your estimated daily calorie needs: <strong>${bmr.toFixed(2)}</strong> calories</p>`;
}