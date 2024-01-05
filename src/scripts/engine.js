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
  playerSides: {
    player: "player-cards",
    playerBox: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBox: document.querySelector("#computer-cards"),
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
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(IdCard);
    });
  
    cardImage.addEventListener("click", () => {
    setCardsField(cardImage.getAttribute("data-id"));
    
    });
  }
  return cardImage;
}

async function setCardsField(IdCard) {
  await removeAllCardsImages();
  let computerCardId = await getRandomCardId();
  await ShowHiddenCardFieldsImages(true);
  await hiddenCardsDetails();
  await drawCardsInField(IdCard, computerCardId);

  let duelResults = await checkDuelResults(IdCard, computerCardId);

  await updateScore();
  await drawButton(duelResults);

}

async function drawCardsInField(IdCard, computerCardId) {
  state.fieldCards.player.src = cardData[IdCard].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;
}


async function ShowHiddenCardFieldsImages(value) {
  if (value === true) {
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  }

  if (value === false) {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function hiddenCardsDetails() {
  state.cardSprites.avatar.src = "";
  state.cardSprites.name.textContent = "";
  state.cardSprites.type.textContent = "";
}

async function drawButton(text) {
  state.action.button.textContent = text.toUpperCase();
  state.action.button.style.display = "block";
}

async function updateScore() {
  state.score.scoreBox.textContent = `Win:${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "draw";
  let playerCard = cardData[playerCardId];
  
  if (playerCard.WinOf.includes(computerCardId)) {
    duelResults = "win";
    state.score.playerScore++;
  }

  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResults = "lose";
    state.score.computerScore++;
  }
  await playAudio(duelResults);

  return duelResults;
}

async function removeAllCardsImages() {
  let { computerBox, playerBox } = state.playerSides;
  let imgElements = computerBox.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
  
  imgElements = playerBox.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
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

async function resetDuel() {
  state.cardSprites.avatar.src = "";
  state.action.button.style.containerName.display = "none";
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  init();
}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`)
  audio.play().catch(()=>{});
  //audio.play();
}

function init() {
  ShowHiddenCardFieldsImages(false);
  drawCards(5, playerSides.player);
  drawCards(5, playerSides.computer);
  const bgm = document.getElementById("bgm");
  bgm.play();
}

init();