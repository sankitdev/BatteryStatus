const batteryBody = document.querySelector(".battery-body");
const batteryLiquid = document.querySelector(".battery-liquid");
const batteryPercentage = document.querySelector("#battery-perc");
const p = document.querySelector("p");
const h3 = document.querySelector("h3");

if ("getBattery" in navigator) {
  batteryUpdate().then((battery) => {
    chargingStatus(battery);
    batteryUi(battery);
  });
  setInterval(() => {
    batteryUpdate().then((battery) => {
      chargingStatus(battery);
      batteryUi(battery);
    });
  }, 9000);
} else {
  h3.textContent = "Battery Status API not supported on thia device";
}

function batteryUpdate() {
  return navigator.getBattery().then((battery) => {
    batteryPercentage.textContent = `${Math.floor(battery.level * 100)}%`;
    let hour = Math.floor(battery.dischargingTime / 3600);
    let min = hour % 60;
    p.textContent = `${hour}hr ${min}min`;
    return battery;
  });
}

function chargingStatus(battery) {
  let state = battery.charging;
  if (state) {
    h3.textContent = "Charging";
  } else {
    h3.textContent = "Not Charging";
  }
}

function batteryUi(battery) {
  let num = battery.level * 100;
  if (num >= 0 && num <= 20) {
    batteryLiquid.style.background = "var( --gradient-color-red)";
    batteryLiquid.style.height = `${num}px`;
  } else if (num >= 20 && num <= 40) {
    batteryLiquid.style.background = "var( --gradient-color-orange)";
    batteryLiquid.style.height = `${num}px`;
  } else if (num >= 40 && num <= 70) {
    batteryLiquid.style.background = "var( --gradient-color-yellow)";
    batteryLiquid.style.height = `${num}px`;
  } else {
    batteryLiquid.style.background = "var( --gradient-color-green)";
    batteryLiquid.style.height = `${num}px`;
  }
}
