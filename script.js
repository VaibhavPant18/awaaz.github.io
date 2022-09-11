const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const upload = document.getElementById("image");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const addBtn = document.getElementById("add");
const toggleBtn = document.getElementById("toggle");
const AddBtn = document.getElementById("Addtoggle");
const closeBtn = document.getElementById("close");
const closeBtn1 = document.getElementById("close1");
const TextArea = document.getElementById("text-1");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];
//save text
upload.addEventListener("change", () => {
  const a = URL.createObjectURL(event.target.files[0]);
  document.getElementById("upload1").value = a;
});
addBtn.addEventListener("click", () => {
  const text2 = TextArea.value;
  const Image = document.getElementById("upload1").value;

  const data2 = { image: Image, text: text2 };
  createBox(data2);
  document.getElementById("add-text-box").classList.remove("show");
});

//function call and loop through boxes
data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  main.appendChild(box);

  //event listener to box
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Add toggle box
AddBtn.addEventListener("click", () => {
  document.getElementById("add-text-box").classList.toggle("show");
});

// Close button
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();

let themeToggler = document.getElementById("theme-toggler");
themeToggler.onclick = () => {
  themeToggler.classList.toggle("fa-moon");

  if (themeToggler.classList.contains("fa-moon")) {
    document.body.classList.add("active");
  } else {
    document.body.classList.remove("active");
  }
};
