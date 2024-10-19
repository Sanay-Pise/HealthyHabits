// Function to calculate maintenance calories
function calculateCalories() {
  const gender = document.getElementById("gender") ? document.getElementById("gender").value : null;
  const age = parseInt(document.getElementById("age") ? document.getElementById("age").value : null);
  const height = parseInt(document.getElementById("height") ? document.getElementById("height").value : null);
  const weight = parseInt(document.getElementById("weight") ? document.getElementById("weight").value : null);

  if (!gender || !age || !height || !weight) {
      const resultElement = document.getElementById("result");
      if (resultElement) {
          resultElement.innerHTML = `<p class="text-center mt-3">Please enter all required information!</p>`;
      }
      return;
  }

  let bmr;
  if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  const resultElement = document.getElementById("result");
  if (resultElement) {
      resultElement.innerHTML = `<p class="text-center mt-3">Your estimated daily calorie needs: <strong>${bmr.toFixed(2)}</strong> calories</p>`;
  }
}
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script is loaded");

  // Function to calculate maintenance calories

 function calculateCalories() {
    const gender = document.getElementById("gender") ? document.getElementById("gender").value : null;
    const age = parseInt(document.getElementById("age") ? document.getElementById("age").value : null);
    const height = parseInt(document.getElementById("height") ? document.getElementById("height").value : null);
    const weight = parseInt(document.getElementById("weight") ? document.getElementById("weight").value : null);

    if (!gender || !age || !height || !weight) {
      const resultElement = document.getElementById("result");
      if (resultElement) {
        resultElement.innerHTML = `<p class="text-center mt-3">Please enter all required information!</p>`;
      }
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const resultElement = document.getElementById("result");
    if (resultElement) {
      resultElement.innerHTML = `<p class="text-center mt-3">Your estimated daily calorie needs: <strong>${bmr.toFixed(2)}</strong> calories</p>`;
    }
}


  // Function to calculate BMI
  function calculateBMI() {
    const btn = document.getElementById("calculate");
    if (btn) {
      btn.addEventListener("click", function () {
        console.log("BMI Calculation button clicked");

        let height = document.querySelector("#height").value;
        let weight = document.querySelector("#weight").value;

        if (height === "" || weight === "") {
          alert("Please fill out the input fields!");
          return;
        }

        // BMI = weight in KG / (height in m * height in m)
        height = height / 100; // Convert cm to m
        let BMI = weight / (height * height);
        BMI = BMI.toFixed(2);

        document.querySelector("#result").innerHTML = BMI;

        let status = "";
        if (BMI < 18.5) {
          status = "Underweight";
        } else if (BMI >= 18.5 && BMI < 25) {
          status = "Healthy";
        } else if (BMI >= 25 && BMI < 30) {
          status = "Overweight";
        } else {
          status = "Obese";
        }

        document.querySelector(".comment").innerHTML = `Comment: you are <span id="comment">${status}</span>`;
      });
    } else {
      console.error("Calculate BMI button not found!");
    }
  }

  // Login/Register handling
  const wrapper = document.querySelector('.wrapper');
  const loginlink = document.querySelector('.login-link');
  const registerlink = document.querySelector('.register-link');
  
  if (registerlink) {
    registerlink.addEventListener('click', () => {
      wrapper.classList.add('active');
    });
  }
  
  if (loginlink) {
    loginlink.addEventListener('click', () => {
      wrapper.classList.remove('active');
    });
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;
      if (email && password) {
        location.href = 'home.html';
      } else {
        alert('Please enter valid email and password');
      }
    });
  }

  const registerForm = document.querySelector('.register form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('.register input[type="text"]').value;
      const email = document.querySelector('.register input[type="email"]').value;
      const password = document.querySelector('.register input[type="password"]').value;
      if (username && email && password) {
        location.href = 'home.html';
      } else {
        alert('Please enter valid username, email, and password');
      }
    });
  }

  // Call the functions to initiate
  calculateBMI();
  // If you need to calculate calories, call calculateCalories() where appropriate
});
