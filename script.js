function calculateCalories() {
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    
    if (!gender || !age || !height || !weight) {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `<p class="text-center mt-3">Please enter all required information!</p>`;
        return;
    }

    let bmr;

    if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `<p class="text-center mt-3">Your estimated daily calorie needs: <strong>${bmr.toFixed(2)}</strong> calories</p>`;
}

const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const registerlink = document.querySelector('.register-link');

registerlink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginlink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});


const form = document.querySelector('form');
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

const registerForm = document.querySelector('.register form');
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