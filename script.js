'use strict';

// Hero's start position
let hero = {
    top: 700,
    left: 575
}

// Enemy's start position
let enemies = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 },
    { left: 200, top: 175 },
    { left: 300, top: 175 },
    { left: 400, top: 175 },
    { left: 500, top: 175 },
    { left: 600, top: 175 },
    { left: 700, top: 175 },
    { left: 800, top: 175 },
    { left: 900, top: 175 }
];

// Missile's position

let missiles = [];


document.onkeydown = function (e) {

    if (e.key === 'ArrowLeft' && hero.left > 20) {
        hero.left -= 10
    }

    if (e.key === 'ArrowRight' && hero.left < 1120) {
        hero.left += 10;
    }

    if (e.key === ' ') {
        missiles.push({ left: hero.left + 20, top: hero.top - 30 })
    }

    drawHero()
    drawMissile();
}

function drawMissile() {
    document.querySelector('#missiles').innerHTML = '';

    for (let missile of missiles) {

        document.querySelector('#missiles').insertAdjacentHTML('beforeend', `
       <div class='missile1' style= 'top:${missile.top}; left:${missile.left}'>
       </div>
       `)

    }

}

function drawHero() {

    document.querySelector('#hero').style.left = hero.left;

}


function drawEnemy() {
    document.querySelector('#enemies').innerHTML = '';

    for (let enemy of enemies) {

        document.querySelector('#enemies').insertAdjacentHTML('beforeend', `
       <div class='enemy' style= 'top:${enemy.top}; left:${enemy.left}'>
       </div>
       `)

    }

}

drawEnemy();

function moveEnemy() {

    for (let enemy of enemies) {

        enemy.top += 2;

    }

    drawEnemy();

}

function moveMissile() {

    for (let missile of missiles) {

        missile.top -= 10;

    }

    drawMissile();

}

function collision() {
    for (let enemyIdx in enemies) {
        for (let missileIdx in missiles) {

            if (missiles[missileIdx].left >= enemies[enemyIdx].left &&
                missiles[missileIdx].left <= enemies[enemyIdx].left + 50 &&
                missiles[missileIdx].top >= enemies[enemyIdx].top &&
                missiles[missileIdx].top <= enemies[enemyIdx].top + 50) {

                enemies.splice(enemyIdx, 1);
                missiles.splice(missileIdx, 1)

            }
        }
    }
}

function enemyCheck() {
    return enemies.some(enemy => enemy.top >= hero.top - 50);
}



function endGame() {
    if (enemies.length === 0) {

        clearInterval(game);

        document.querySelector('#background').innerHTML = `<div class='result'>You Win</div>`;

    } else if (enemyCheck()) {

        clearInterval(game);

        document.querySelector('#background').innerHTML = `<div class='result'>You Lose</div>`;

    }
}



const game = setInterval(function gameLoop() {

    moveEnemy();

    moveMissile();

    collision();

    endGame();


}, 1000 / 40)
