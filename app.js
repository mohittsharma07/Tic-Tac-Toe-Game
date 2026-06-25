let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let pvpBtn = document.querySelector("#pvp-btn");
let aiBtn = document.querySelector("#ai-btn");

let turnO = true;
let count = 0;
let vsComputer = false;

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
];

const resetGame = () => {
  turnO = true;
  count = 0;

  boxes.forEach((box)=>{
    box.disabled = false;
    box.innerText = "";
    box.style.color = "";
  });

  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach((box)=>{
    box.disabled = true;
  });
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {

  for(let pattern of winPatterns){

    let p1 = boxes[pattern[0]].innerText;
    let p2 = boxes[pattern[1]].innerText;
    let p3 = boxes[pattern[2]].innerText;

    if(p1 !== "" && p2 !== "" && p3 !== ""){

      if(p1 === p2 && p2 === p3){
        showWinner(p1);
        return true;
      }
    }
  }

  return false;
};

function computerMove(){

  let emptyBoxes = [];

  boxes.forEach((box,index)=>{
    if(box.innerText === ""){
      emptyBoxes.push(index);
    }
  });

  if(emptyBoxes.length === 0) return;

  let randomIndex =
    emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)];

  setTimeout(()=>{

    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].style.color = "#3a86ff";
    boxes[randomIndex].disabled = true;

    count++;

    let winner = checkWinner();

    if(!winner && count === 9){
      msg.innerText = "🤝 It's a Tie!";
      msgContainer.classList.remove("hide");
      disableBoxes();
    }

    turnO = true;

  },500);
}

boxes.forEach((box)=>{

  box.addEventListener("click",()=>{

    if(box.innerText !== "") return;

    if(turnO){

      box.innerText = "O";
      box.style.color = "#ff006e";
      turnO = false;

    }else{

      if(!vsComputer){
        box.innerText = "X";
        box.style.color = "#3a86ff";
        turnO = true;
      }
    }

    box.disabled = true;
    count++;

    let winner = checkWinner();

    if(winner) return;

    if(count === 9){
      msg.innerText = "🤝 It's a Tie!";
      msgContainer.classList.remove("hide");
      disableBoxes();
      return;
    }

    if(vsComputer && !turnO){
      computerMove();
    }

  });

});

pvpBtn.addEventListener("click",()=>{
  vsComputer = false;
  resetGame();
});

aiBtn.addEventListener("click",()=>{
  vsComputer = true;
  resetGame();
});

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
