import "../css/style.scss";

// @everyone ZIE DAT JE DE TEXTWAARDE UIT EEN TEXTVELD KAN LEZEN !!!!! (onchange vs oninput)

// oef2

// Plaats een knop centraal op het scherm. Als je over de knop hovert wijzigt de achtergrondkleur van de body naar een random color.
// Ga je met de muiscursor weer weg van de knop dan wijzigt de achtergrond kleur terug naar een andere randomkleur.
// Enz… Als je op de knop klikt wordt er 1 maal een tekstveld onder de knop getoond.
// En is de knop niet meer aanklikbaar (disabled) als je dan in het tekstveld de volgende tekst typt “nsfw”
// wijzigt de kleur van de body-bg om de 100 milliseconden in een andere kleur… (dit gebeurt van zodra de w in het veld staat).
// Na 5 seconden stopt de animatie en wordt alles op het scherm gewist. Log dan alle kleuren dat de bg ooit heeft gehad in de console…
//
// Het enige in je html mag een div-id-root zijn
//
// In css mag zoveel staan als je wil
const getRandomColor = () => {
  const randomNumber = (min, max) =>
    Math.round(Math.random() * (max - min) + min);
  return `rgb(
    ${randomNumber(0, 255)},
    ${randomNumber(0, 255)},
    ${randomNumber(0, 255)}
  )`;
};

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const holder = document.querySelector("#root");
holder.style.width = window.innerWidth;
holder.style.height = window.innerHeight;

holder.insertAdjacentHTML(
  "beforeend",
  `<button class="nsfw">Click here for fun</button>`
);
const btn = document.querySelector(".nsfw");
btn.style.position = "absolute";
btn.style.width = "200px";
btn.style.height = "100px";
btn.style.top = window.innerHeight / 2 - parseInt(btn.style.height) / 2 + "px";
btn.style.left = window.innerWidth / 2 - parseInt(btn.style.width) / 2 + "px";
btn.style.borderRadius = "5px";
btn.style.backgroundColor = getRandomColor();
btn.style.border = "2px solid";
btn.style.borderColor = getRandomColor();
btn.style.fontSize = "20px";
btn.style.color = "#fff";
btn.style.fontWeight = "bold";
btn.style.cursor = "pointer";

const colorArr = [];

btn.addEventListener("mouseover", () => {
  document.body.style.backgroundColor = getRandomColor();
  const bgColor = document.body.style.backgroundColor;
  colorArr.push(bgColor);
});

btn.addEventListener("mouseout", () => {
  document.body.style.backgroundColor = getRandomColor();
  const bgColorOut = document.body.style.backgroundColor;
  colorArr.push(bgColorOut);
});

const changeClass = () => {
  btn.classList.add("--active");
  if (btn.className === "nsfw --active") {
    btn.setAttribute("disabled", "disabled");
  }
};

btn.addEventListener("click", () => {
  changeClass();
  holder.insertAdjacentHTML(
    "beforeend",
    `<input type="text" class="nsfw__input" placeholder="type here nsfw">`
  );
  const input = document.querySelector(".nsfw__input");
  input.style.position = "absolute";
  input.style.width = "200px";
  input.style.top =
    window.innerHeight / 2 + parseInt(btn.style.height) / 2 + "px";
  input.style.left =
    window.innerWidth / 2 - parseInt(btn.style.width) / 2 + "px";
  function changeBgColor() {
    document.body.style.backgroundColor = getRandomColor();
    const bgColorInt = document.body.style.backgroundColor;
    colorArr.push(bgColorInt);
  }
  if (input) {
    input.addEventListener("keyup", () => {
      if (input.value === "nsfw") {
        let interval = setInterval(changeBgColor, 100);
        setTimeout(function () {
          clearInterval(interval);
          btn.remove();
          input.remove();
          holder.remove();
          document.body.style.backgroundColor = "white";
          console.log(colorArr);
        }, 5000);
      }
    });
  }
});
