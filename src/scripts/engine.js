const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  action: {
    button:document.getElementById("next-duel"),
  },
};

const playerSides = {
  player: "player-cards",
  computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";

const cardData = [
  {
    Id: 0,
    name: "Blue eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    WinOf:[1],
    LoseOf: [2],
  },
  {
    Id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages}magician.png`,
    WinOf:[2],
    LoseOf: [0],
  },
  {
    Id: 2,
    name: "Exodia",
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    WinOf:[0],
    LoseOf: [1],
  },
];

// const players = {
//   player1: "player-cards",
// }
async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length)
  return cardData[randomIndex].Id;
}

async function createCardImage(IdCard, fieldSide) { 
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", IdCard);
  cardImage.classList.add("card");

  if(fieldSide === playerSides.player) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });
  }
  
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(IdCard);
    });

  return cardImage;
}


async function drawSelectCard(index) {
  state.cardSprites.avatar.src = cardData[index].img;
  state.cardSprites.name.textContent = cardData[index].name;
  state.cardSprites.type.textContent = "Attribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);
    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

function init() {
  drawCards(5, playerSides.player);
  drawCards(5, playerSides.computer);
}

init();