const userContainer = document.getElementById("user-container");
const reloadBtn = document.getElementById("reloadBtn");
const darkModeBtn = document.getElementById("toggleDarkMode");

const cars = [
  { brand: "Tata", model: "Nexon" },
  { brand: "Mahindra", model: "XUV700" },
  { brand: "Maruti", model: "Swift" },
  { brand: "Hyundai", model: "Creta" },
  { brand: "Honda", model: "City" },
  { brand: "Toyota", model: "Fortuner" },
  { brand: "Kia", model: "Seltos" },
  { brand: "BMW", model: "X5" }
];

function getRandomCar() {
  return cars[Math.floor(Math.random() * cars.length)];
}

function fetchCarOwners() {
  userContainer.innerHTML = "Loading...";

  fetch("https://randomuser.me/api/?nat=in&results=8")
    .then(res => {
      if (!res.ok) throw new Error("Network issue.");
      return res.json();
    })
    .then(data => {
      userContainer.innerHTML = "";

      data.results.forEach(user => {
        const car = getRandomCar();
        const userCard = document.createElement("div");
        userCard.className = "user-card";

        userCard.innerHTML = `
          <h3>${user.name.first} ${user.name.last}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>City:</strong> ${user.location.city}</p>
          <p><strong>Car:</strong> ${car.brand} ${car.model}</p>
        `;

        userContainer.appendChild(userCard);
      });
    })
    .catch(err => {
      userContainer.innerHTML = `<p class="error">Failed to load users. Check connection.</p>`;
      console.error("Error:", err);
    });
}

reloadBtn.addEventListener("click", fetchCarOwners);

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

fetchCarOwners();
