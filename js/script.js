let cells = document.getElementsByClassName('cell');
cells = [...cells];
let points;
let player, opponent, playerSign, compSign, lastingGame = 1, movesMatrix = [], clickNum = 0, canMove = 0;
let plColor;
let compColor;
let pointsComp, pointsPlayer;

function wy() {
    cells.forEach((v) => {
        v.addEventListener('click', sign);
    });
}

function checkPlayer(x) {
    player = x;
    if (player === 1) {
        {
            opponent = 2;
            plColor = "#92cbd8"
            compColor = "#da7878"
        }
    } else {
        opponent = 1
        plColor = "#da7878"
        compColor = "#92cbd8"
    }
    document.getElementsByClassName('checkPlayer-cont')[0].style.display = 'none';
    document.getElementsByClassName('table')[0].style.display = 'grid';
    startGame();
}

function startGame() {
    points = 0;
    movesMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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

    checkDraw(pl);

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

    document.getElementById('skres').style.background = 'black';

    if (document.getElementById('skres').style.width != 0) {
        win(pl);
        return 1
    } else {
        return 0
    }
}

function win(winner) {
    console.log("Gratulacje, wygrał gracz", winner);
    endGame(winner);
}

function checkDraw(pl) {

    let temp = 0;
    for (let i = 0; i < movesMatrix.length; i++) {
        if (movesMatrix[i] !== 0)
            temp++;
    }
    if (temp == movesMatrix.length)
        endGame('Draw')

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
                    movesMatrix[i] = opponent;
                    let temp = 'c' + (i + 1);
                    // document.getElementById(temp).innerText = compSign;
                    document.getElementById(temp).style.background = compColor;
                    console.log(movesMatrix)
                    break;
                }
            }


            if (checkWin(opponent)) {
                endGame();
            } else {
                canMove = 1;
            }
        }, 2
    )


}

function sign() {
    if (canMove == 1) {
        let current = this;
        if (movesMatrix[parseInt((current.id).replace('c', '')) - 1] === 0) {
            current.style.background = plColor;
            movesMatrix[parseInt((current.id).replace('c', '')) - 1] = player;
            if (checkWin(player)) {
                endGame();
            } else {
                computersMove();
                clickNum++;
            }
            canMove = 1;
        } else
            return
    }
}

function endGame(value) {
    if (value == 'Draw') {
        console.log("remisik");
    }
    if (value == 1 || value == 2) {

    }


    console.log("Czy chcesz zagrać jeszcze raz?");
    document.getElementsByClassName('table')[0].style.pointerEvents = 'none'
    document.getElementsByClassName('playMore')[0].style.display = 'flex';

    const promise = new Promise((resolve, reject) => {
        console.log('promise');

        setTimeout(function () {
            document.getElementsByClassName('playMore')[0].animate([
                {opacity: '0'},
                {opacity: '1'}

            ], {
                duration: 1000,
            });

            resolve('');
        }, 2000);
    }

    );

    promise.then(result => {
        document.getElementsByClassName('playMore')[0].style.opacity = '1';
    }).catch((err) => { alert(err); });
}

wy();

