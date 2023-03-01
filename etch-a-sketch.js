// Select the elements on the page - canvas, shake button
const canvas = document.querySelector("#etch-a-sketch");
const context = canvas.getContext("2d");
const shakebutton = document.querySelector(".shake");
const MOVE_AMOUNT = 20;
// Setup our canvas for drawing
// make a variable called height and width from the same properties on our canvas.
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
// create random x and y starting points on the canvas

context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = MOVE_AMOUNT;

let hue = 0;
context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
context.beginPath(); // start the drawing
context.moveTo(x, y);
context.lineTo(x, y);
context.stroke();

// write a draw function
function draw({ key }) {
  // increment the hue
  hue += 1;
  console.log(hue);
  context.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  console.log(key);
  // start the path
  context.beginPath();
  context.moveTo(x, y);
  // move our x and y values depending on what the user did
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  context.lineTo(x, y);
  context.stroke();
}

// write a handler for the keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}
// clear /shke function
function clearCanvas() {
  canvas.classList.add("shake");
  context.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    function () {
      console.log("Done the shake!");
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener("keydown", handleKey);
shakebutton.addEventListener("click", clearCanvas);
