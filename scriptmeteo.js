document.addEventListener("DOMContentLoaded", function () {
  const circuits = document.querySelectorAll(".models-circuits");

  function fetchWeather(lat, lon, circuitElement) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation&timezone=Europe/Paris`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              const temp = data.current.temperature_2m;
              const wind = data.current.wind_speed_10m;
              const precipitation = data.current.precipitation || 0; // Si pas de précipitation, afficher 0

              circuitElement.querySelector(".temperature").textContent = temp;
              circuitElement.querySelector(".wind-speed").textContent = wind;
              circuitElement.querySelector(".precipitation").textContent = precipitation;
          })
          .catch(error => console.error("Erreur lors de la récupération de la météo :", error));
  }

  // Charger la météo pour chaque circuit
  circuits.forEach(circuit => {
      const lat = circuit.getAttribute("data-lat");
      const lon = circuit.getAttribute("data-lon");
      fetchWeather(lat, lon, circuit);
  });
});
