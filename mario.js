const mario = document.createElement("img");
mario.src = "marioo.gif"; 
mario.style.position = "fixed";
mario.style.zIndex = "9999";
mario.style.pointerEvents = "none";
mario.style.transition = "top 0.05s, left 0.05s"; 
document.body.appendChild(mario);

document.body.style.cursor = "none";

let marioOffsetX = 0;
let marioOffsetY = 0;

mario.onload = () => {
  marioOffsetX = mario.width / 2;
  marioOffsetY = mario.height / 2;
};


const jumpStyle = document.createElement("style");
jumpStyle.innerHTML = `
  @keyframes marioJump {
    0% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
  }

  .jump {
    animation: marioJump 0.3s ease;
  }
`;
document.head.appendChild(jumpStyle);


const coinSound = new Audio("sounds/coin.mp3");
let audioEnabled = false;


window.addEventListener("click", () => {
  audioEnabled = true;
}, { once: true });


document.addEventListener("mousemove", (e) => {
  mario.style.left = e.clientX - marioOffsetX + "px";
  mario.style.top = e.clientY - marioOffsetY + "px";
});


document.addEventListener("click", () => {
  mario.classList.add("jump");

  if (audioEnabled) {
    coinSound.currentTime = 0;
    coinSound.play().catch((e) => {
      console.log("Audio play failed:", e);
    });
  }

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 300);
});


