let cells = document.getElementsByClassName('cell');
cells = [...cells];
let points;
let player, playerSign, compSign;
let clickNum = 0;
let movesMatrix = [];

function wy() {
    cells.forEach((v) => {
        v.addEventListener('click', sign);
    });
}

function checkPlayer(x) {
    player = x;
    document.getElementsByClassName('checkPlayer')[0].style.display = 'none';
    document.getElementsByClassName('table')[0].style.display = 'grid';
    startGame();
}

function startGame() {
    points = 0;
    movesMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (player === 1) {
        playerSign = 'x';
        compSign = 'o'
    } else {
        playerSign = 'o';
        compSign = 'x'
    }
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
        setStyle('11.5vh', 'inherit', '15px', '45vw')
    } else if ((movesMatrix[3] === pl) && (movesMatrix[4] === pl) && (movesMatrix[5] === pl)) {
        setStyle('35.5vh', 'inherit', '15px', '45vw')
        win(player);
    } else if ((movesMatrix[6] === pl) && (movesMatrix[7] === pl) && (movesMatrix[8] === pl)) {
        setStyle('59.5vh', 'inherit', '15px', '45vw')
        win(player);
    } else if ((movesMatrix[2] === pl) && (movesMatrix[4] === pl) && (movesMatrix[6] === pl)) {
        setStyle('-7vh', '22vw', '80vh', '15px')
        document.getElementById('skres').style.transform = 'rotate(45deg)';
        win(player);
    } else if ((movesMatrix[0] === pl) && (movesMatrix[4] === pl) && (movesMatrix[8] === pl)) {
        setStyle('-7vh', '22vw', '80vh', '15px')
        document.getElementById('skres').style.transform = 'rotate(135deg)';
        win(player);
    } else if ((movesMatrix[0] === pl) && (movesMatrix[3] === pl) && (movesMatrix[6] === pl)) {
        setStyle('0', '6.5vw', '45vw', '15px')
        win(player);
    } else if ((movesMatrix[1] === pl) && (movesMatrix[4] === pl) && (movesMatrix[7] === pl)) {
        setStyle('0', '22vw', '45vw', '15px')
        win(player);
    } else if ((movesMatrix[2] === pl) && (movesMatrix[5] === pl) && (movesMatrix[8] === pl)) {
        setStyle('0', '37vw', '45vw', '15px')
        win(player);
    }
}

function computersMove() {

    let zeros = 0;
    for (let i = 0; i < movesMatrix.length; i++) {
        if (movesMatrix[i] === 0)
            zeros++;
    }

    let rand = Math.floor(Math.random() * (zeros)) + 1

    zeros = 0;

    for (let i = 0; i < movesMatrix.length; i++) {
        if (movesMatrix[i] === 0)
            zeros++;

        if (movesMatrix[i] === 0 && zeros === rand) {
            movesMatrix[i] = 2;
            let temp = 'c' + (i + 1);
            document.getElementById(temp).innerText = compSign;
            return;
        }
    }
    checkWin(player);
}



function sign() {
    let current = this;
    if (movesMatrix[parseInt((current.id).replace('c', '')) - 1] === 0) {
        if (player === 1)
            current.innerText = playerSign;
        else
            current.innerText = playerSign;

        movesMatrix[parseInt((current.id).replace('c', '')) - 1] = 1;
        checkWin(player);
        computersMove();
        clickNum++;
    }
}

wy();
console.log(playerSign)
console.log(compSign)