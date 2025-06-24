// ✅ CALORIE CALCULATOR (BMR)
function calculateCalories() {
  const gender = document.getElementById("gender")?.value;
  const age = parseInt(document.getElementById("age")?.value);
  const height = parseInt(document.getElementById("height")?.value);
  const weight = parseInt(document.getElementById("weight")?.value);
  const resultElement = document.getElementById("result");

  if (!gender || !age || !height || !weight) {
    resultElement.innerHTML = `<p class="text-center mt-3">Please enter all required information!</p>`;
    return;
  }

  const bmr = gender === "male"
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

  resultElement.innerHTML = `<p class="text-center mt-3">Your estimated daily calorie needs: <strong>${bmr.toFixed(2)}</strong> calories</p>`;

  const user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection("calorie_results").add({
      uid: user.uid,
      email: user.email,
      gender,
      age,
      height,
      weight,
      calories: bmr.toFixed(2),
      timestamp: new Date()
    }).then(() => {
      console.log("✅ BMR data saved to Firestore.");
    }).catch(error => {
      console.error("❌ Error saving BMR:", error);
    });
  } else {
    console.warn("❌ No user logged in. Cannot save BMR.");
  }
}

// ✅ RECOMMENDED CALORIE GOAL TOOL
function recCalories() {
  const gender = document.getElementById("gender")?.value;
  const age = parseInt(document.getElementById("age")?.value);
  const height = parseInt(document.getElementById("height")?.value);
  const weight = parseInt(document.getElementById("weight")?.value);
  const goal = document.getElementById("goal")?.value;
  const work = document.getElementById("work")?.value;
  const resultElement = document.getElementById("result");

  if (!gender || !age || !height || !weight || !goal || !work) {
    resultElement.innerHTML = `<p class="text-center mt-3">Please enter all required information!</p>`;
    return;
  }

  const container = document.getElementById('rec-container');
  if (container) {
    container.style.width = '550px';
    container.style.height = '730px';
  }

  const bmr = gender === "male"
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

  const activityFactor = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.465,
    active: 1.55,
    very_active: 1.725
  }[work];

  const dailyCalories = bmr * activityFactor;
  const adjustedCalories = goal === "lose" ? dailyCalories - 500 : dailyCalories + 500;

  resultElement.innerHTML = `
    <p class="text-center mt-3">
      Your recommended daily calorie intake to ${goal} weight is:
      <strong><span style="color: #FF9800; font-weight: bold;">${adjustedCalories.toFixed(2)}</span></strong> calories/day.
    </p>`;

  const user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection("recommended_calories").add({
      uid: user.uid,
      email: user.email,
      gender,
      age,
      height,
      weight,
      goal,
      activityLevel: work,
      recommendedCalories: adjustedCalories.toFixed(2),
      timestamp: new Date()
    }).then(() => {
      console.log("✅ Goal calories saved to Firestore.");
    }).catch(error => {
      console.error("❌ Error saving goal calories:", error);
    });
  }
}

// ✅ BMI CALCULATOR
function calculateBMI() {
  const btn = document.getElementById("calculate");
  if (!btn) return;

  btn.addEventListener("click", function () {
    let height = parseFloat(document.querySelector("#height")?.value);
    let weight = parseFloat(document.querySelector("#weight")?.value);

    if (!height || !weight) {
      alert("Please fill out the input fields!");
      return;
    }

    let originalHeight = height;
    height = height / 100;
    let BMI = (weight / (height * height)).toFixed(2);

    document.querySelector("#result").innerHTML = BMI;

    let status =
      BMI < 18.5 ? "Underweight" :
      BMI < 25 ? "Healthy" :
      BMI < 30 ? "Overweight" : "Obese";

    document.querySelector(".comment").innerHTML = `Comment: you are <span id="comment">${status}</span>`;

    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection("bmi_results").add({
        uid: user.uid,
        email: user.email,
        height: originalHeight,
        weight,
        bmi: BMI,
        category: status,
        timestamp: new Date()
      }).then(() => {
        console.log("✅ BMI saved to Firestore.");
      }).catch(err => {
        console.error("❌ Error saving BMI:", err);
      });
    }
  });
}

// ✅ Redirect Spinner
function showSpinnerAndRedirect() {
  const spinnerContainer = document.getElementById('spinner-container');
  if (spinnerContainer) spinnerContainer.style.display = 'flex';
  setTimeout(() => window.location.href = 'login.html', 2000);
}

// ✅ Parallax Effect
const parallax = document.querySelector('.parallax');
if (parallax) {
  window.addEventListener('mousemove', e => {
    const moveX = (e.clientX / window.innerWidth) * 100;
    const moveY = (e.clientY / window.innerHeight) * 100;
    parallax.style.transform = `translate(-${moveX / 10}%, -${moveY / 10}%)`;
  });
}

// ✅ Contact Form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert('Your response has been sent successfully!');
    setTimeout(() => window.location.href = 'index.html', 2000);
  });
}

// ✅ Auth Form Handling

document.addEventListener("DOMContentLoaded", () => {
  calculateBMI();

  const wrapper = document.querySelector('.wrapper');
  document.querySelector('.register-link')?.addEventListener('click', () => wrapper?.classList.add('active'));
  document.querySelector('.login-link')?.addEventListener('click', () => wrapper?.classList.remove('active'));

  // LOGIN FORM
  document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          location.href = 'home.html';
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
        });
    } else {
      alert('Please enter valid email and password');
    }
  });

  // REGISTER FORM
  document.querySelector('.register form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('.register input[type="text"]').value;
    const email = document.querySelector('.register input[type="email"]').value;
    const password = document.querySelector('.register input[type="password"]').value;

    if (username && email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          location.href = 'home.html';
        })
        .catch((error) => {
          alert("Registration failed: " + error.message);
        });
    } else {
      alert('Please enter valid username, email, and password');
    }
  });
});