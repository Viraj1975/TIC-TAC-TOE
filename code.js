const Obtn = document.querySelector('.O');
const Xbtn = document.querySelector('.X');
const game = document.querySelector('.game');
const start = document.querySelector('.start');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');
const boxes = document.querySelectorAll('.box');
let currentPlayer = document.querySelector('#curr');
const resetBtn = document.querySelector('.resetBtn');
const newGameBtn = document.querySelector('.newGameBtn');

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turnO){
            turnO = false;
            currentPlayer.innerText = 'X';
            box.innerText = 'O';
        }
        else{
            turnO = true;
            currentPlayer.innerText = 'O';
            box.innerText = 'X';
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    })
})

function resetGame(){
    count = 0;
    enableBoxes();
    start.classList.remove('hide');
    game.classList.add('hide');
    msgContainer.classList.add('hide');
}

function enableBoxes(){
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

function disableBoxes(){
    for(let box of boxes){
        box.disabled = true;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    start.classList.add('hide');
    game.classList.add('hide');
    disableBoxes();
}

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    start.classList.add('hide');
    game.classList.add('hide');
    disableBoxes();
};

Obtn.addEventListener('click',()=>{
    turnO = true;
    currentPlayer.innerText = 'O';
    game.classList.remove('hide');
    start.classList.add('hide');
})

Xbtn.addEventListener('click',()=>{
    turnO = false;
    currentPlayer.innerText = 'X';
    game.classList.remove('hide');
    start.classList.add('hide');
})

const checkWinner = () =>{
    for(let pt of winPatterns){
        let val1 = boxes[pt[0]].innerText;
        let val2 = boxes[pt[1]].innerText;
        let val3 = boxes[pt[2]].innerText;

        if(val1 != "" && val2 != "" && val3!=""){
            if(val1==val2 && val2==val3){
                showWinner(val1);
                return true;
            }
        }
    }
}

resetBtn.addEventListener('click',resetGame);
newGameBtn.addEventListener('click',resetGame);

