let cells = document.getElementsByClassName('cell');
cells = [...cells];
let points;
let player, opponent, playerSign, compSign, lastingGame = 1, movesMatrix = [], clickNum = 0, canMove = 0;

function wy() {
    cells.forEach((v) => {
        v.addEventListener('click', sign);
    });
}

function checkPlayer(x) {
    player = x;
    if (player === 1) {
        opponent = 2
    } else
        opponent = 1
    document.getElementsByClassName('checkPlayer-cont')[0].style.display = 'none';
    document.getElementsByClassName('table')[0].style.display = 'grid';
    startGame();
}

function startGame() {
    points = 0;
    movesMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // if (player === 1) {
    //     playerSign = 'x';
    //     compSign = 'o'
    // } else {
    //     playerSign = 'o';
    //     compSign = 'x'
    // }
    let rand = Math.floor(Math.random() * (2)) + 1

    if (rand === player)
        canMove = 1;

    else
        computersMove()
}

function setStyle(top, left, hei, width) {
    let line = document.getElementById('skres');
    line.style.display = 'block';
    line.style.top = top;
    line.style.height = hei;
    line.style.width = width;
    line.style.left = left;
}

function checkWin(pl) {

    console.log(pl);
    if ((movesMatrix[0] === pl) && (movesMatrix[1] === pl) && (movesMatrix[2] === pl)) {
        setStyle('66px', 'inherit', '15px', '450px')
    }
    if ((movesMatrix[3] === pl) && (movesMatrix[4] === pl) && (movesMatrix[5] === pl)) {
        setStyle('219px', 'inherit', '15px', '450px')
    }
    if ((movesMatrix[6] === pl) && (movesMatrix[7] === pl) && (movesMatrix[8] === pl)) {
        setStyle('370px', 'inherit', '15px', '450px')
    }
    if ((movesMatrix[2] === pl) && (movesMatrix[4] === pl) && (movesMatrix[6] === pl)) {
        setStyle('-43px', '215px', '550px', '15px')
        document.getElementById('skres').style.transform = 'rotate(45deg)';
    }
    if ((movesMatrix[0] === pl) && (movesMatrix[4] === pl) && (movesMatrix[8] === pl)) {
        setStyle('-47px', '218px', '550px', '15px')
        document.getElementById('skres').style.transform = 'rotate(135deg)';
    }
    if ((movesMatrix[0] === pl) && (movesMatrix[3] === pl) && (movesMatrix[6] === pl)) {
        setStyle('3px', '66px', '450px', '15px')
    }
    if ((movesMatrix[1] === pl) && (movesMatrix[4] === pl) && (movesMatrix[7] === pl)) {
        setStyle('3px', '219px', '450px', '15px')
    }
    if ((movesMatrix[2] === pl) && (movesMatrix[5] === pl) && (movesMatrix[8] === pl)) {
        setStyle('3px', '370px', '450px', '15px')
    }

    if(pl == 1){
        document.getElementById('skres').style.background = '#53a292';
    }
    else{
        document.getElementById('skres').style.background = '#bf3434';
    }

    if (document.getElementById('skres').style.width != 0) {
        win(pl);
        return 1
    } else {
        return 0
    }
}

function win(winner) {

    console.log("Gratulacje, wygrał gracz", winner);
    endGame();
}

function computersMove() {
    let zeros = 0;
    for (let i = 0; i < movesMatrix.length; i++) {
        if (movesMatrix[i] === 0)
            zeros++;
    }

    let rand = Math.floor(Math.random() * (zeros)) + 1

    zeros = 0;
    setTimeout(function () {

            for (let i = 0; i < movesMatrix.length; i++) {
                if (movesMatrix[i] === 0)
                    zeros++;

                if (movesMatrix[i] === 0 && zeros === rand) {
                    movesMatrix[i] = 2;
                    let temp = 'c' + (i + 1);
                    // document.getElementById(temp).innerText = compSign;
                    document.getElementById(temp).style.background = '#da7878'
                    break;
                }
            }
        checkWin(opponent);
        canMove = 1;
        }, 2000
    )
}

window.setInterval(sign(), 100)

function sign() {
    if (canMove == 1) {
        let current = this;
        if (movesMatrix[parseInt((current.id).replace('c', '')) - 1] === 0) {
            // if (player === 1)
            //     current.innerText = playerSign;
            // else
            //     current.innerText = playerSign;

            current.style.background = "#92cbd8";

            movesMatrix[parseInt((current.id).replace('c', '')) - 1] = 1;
            if (checkWin(player)) {
                endGame();
            } else {
                computersMove();
                clickNum++;
            }
        }
        canMove = 0;
    }
}

function endGame() {
    console.log("Kończę grę, do widzenia");
    document.getElementsByClassName('table')[0].style.pointerEvents = 'none'
}

wy();
console.log(playerSign)
console.log(compSign)
