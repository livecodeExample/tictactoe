const startBox = document.querySelector(".start-box"),
    startXbtn = startBox.querySelector(".playerX"),
    startObtn = startBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".play-board .players"),
    allbox = playBoard.querySelectorAll("section span"),
    resultBox = document.querySelector(".result"),
    wonText = resultBox.querySelector("header p"),
    replay = resultBox.querySelector(".option button");


let userChoise;
let playerXIcon = "fa-solid fa-xmark";
let playerOIcon = "fa-regular fa-circle";
let playerSign = "";
let botStatus = false;
let filledBoxes = [];
let conditionVerifyStatus = false;
let botStep = 0;

let rowCombo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

let connerCombo = [1, 3, 7, 9];

let connerPair = [
    [1, 9],
    [3, 7]
]

window.addEventListener("load", () => {
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].setAttribute("onclick", "clickedBox(this)")
    }

    startXbtn.addEventListener("click", () => {
        startBox.classList.add("hide");
        playBoard.classList.add("show");
        userChoise = "X";
    })
    startObtn.addEventListener("click", () => {
        startBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
        userChoise = "O";
    })
})

function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i>O</i>`;
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id", "O");
        if (checkplace(parseInt(element.getAttribute("data-box-num")), filledBoxes)) filledBoxes.push(parseInt(element.getAttribute("data-box-num")));
        element.style.pointerEvents = "none";
        selectWinner(playerSign);
        selectWinner(userChoise);
    } else {
        element.innerHTML = `<i>X</i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", "X");
        if (checkplace(parseInt(element.getAttribute("data-box-num")), filledBoxes)) filledBoxes.push(parseInt(element.getAttribute("data-box-num")));
        element.style.pointerEvents = "none";
        selectWinner(playerSign);
        selectWinner(userChoise);
    }
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(function () {
        botStatus = true;
        bot(botStatus);
    }, randomDelayTime)
}

function arrayValue() {
    let array = [];
    for (let i = 1; i <= allbox.length; i++) {
        if (allbox[i - 1].id == "X" || allbox[i - 1].id == "O") {
            array.push(i);
        }
    }
    return array;
}

function checkplace(randomBox, array) {
    if (randomBox == 0) randomBox + 1;
    array = arrayValue();
    for (let i = 0; i < array.length; i++) {
        if (array[i] == randomBox) {
            return false;
        }
    }
    return true;
}

function getId(idname) {
    return document.querySelector(".box" + idname).id;
}

function bot(botStatus) {
    if (botStatus == false) return;
    firstStepConditon(filledBoxes);

}

function firstStepConditon(filledBoxes) {
    if (botStep == 0) {
        if (checkplace(5, filledBoxes)) {
            botput(playerSign, 5);
        } else {
            let conditonStatus3 = false;
            let randomBox = Math.floor(Math.random() * 4) + 1;
            if (checkplace(connerCombo[randomBox - 1], filledBoxes)) {
                conditonStatus3 = true;
                botput(playerSign, connerCombo[randomBox - 1]);
            }
            if (!conditonStatus3) thirdStepCondition();
        }
    } else {
        let call = botPair();
        if (!call) {
            secondStepCondition()
        }
    }
    botStep++;
}

function botPair() {
    filledBoxes = arrayValue();
    let conditonStatus = false;
    rowCombo.forEach(i => {
        if (getId(i[0]) == playerSign && getId(i[1]) == playerSign && checkplace(i[2], filledBoxes) && conditonStatus == false) {
            conditonStatus = true
            botput(playerSign, i[2])
        }
        if (getId(i[1]) == playerSign && getId(i[2]) == playerSign && checkplace(i[0], filledBoxes) && conditonStatus == false) {
            conditonStatus = true
            botput(playerSign, i[0])
        }
        if (getId(i[0]) == playerSign && getId(i[2]) == playerSign && checkplace(i[1], filledBoxes) && conditonStatus == false) {
            conditonStatus = true
            botput(playerSign, i[1])
        }
    })
    if (conditonStatus == false) {
        return false;
    }
    return true;
}

function secondStepCondition() {
    filledBoxes = arrayValue();
    let conditonStatus = false;
    rowCombo.forEach(i => {
        if (getId(i[0]) == userChoise && getId(i[1]) == userChoise && checkplace(i[2], filledBoxes) && conditonStatus == false) {
            conditonStatus = true
            botput(playerSign, i[2])
        }
        if (getId(i[1]) == userChoise && getId(i[2]) == userChoise && checkplace(i[0], filledBoxes) && conditonStatus == false) {
            conditonStatus = true
            botput(playerSign, i[0])
        }
        if (getId(i[0]) == userChoise && getId(i[2]) == userChoise && checkplace(i[1], filledBoxes) && conditonStatus == false) {
            conditonStatus = true
            botput(playerSign, i[1])
        }
    })
    if (conditonStatus == false) {
        let call = thirdStepCondition(filledBoxes);
        if (!call) {
            let conditonStatus2 = false;
            rowCombo.forEach(i => {
                if (checkplace(i[0], filledBoxes) && conditonStatus2 == false) {
                    botput(playerSign, i[0])
                    conditonStatus2 = true;
                }
                if (checkplace(i[1], filledBoxes) && conditonStatus2 == false) {
                    botput(playerSign, i[1])
                    conditonStatus2 = true;
                }
                if (checkplace(i[2], filledBoxes) && conditonStatus2 == false) {
                    botput(playerSign, i[2])
                    conditonStatus2 = true;
                }
            })
            if (conditonStatus2 == false) {
                selectWinner(playerSign);
                selectWinner(userChoise);
            }
        }
    }
}
function thirdStepCondition(filledBoxes) {
    let conditonStatus;
    conditonStatus = false;
    if (allbox[0].id == userChoise && allbox[4].id == userChoise && conditonStatus == false) {
        connerCombo.forEach(i => {
            if (checkplace(i, filledBoxes) && conditonStatus == false) {
                conditonStatus = true;
                botput(playerSign, i);
            }
        })
    } else if (allbox[2].id == userChoise && allbox[4].id == userChoise && conditonStatus == false) {
        connerCombo.forEach(i => {
            if (checkplace(i, filledBoxes) && conditonStatus == false) {
                conditonStatus = true;
                botput(playerSign, i);
            }
        })
    } else if (allbox[6].id == userChoise && allbox[4].id == userChoise && conditonStatus == false) {
        connerCombo.forEach(i => {
            if (checkplace(i, filledBoxes) && conditonStatus == false) {
                conditonStatus = true;
                botput(playerSign, i);
            }
        })
    } else if (allbox[8].id == userChoise && allbox[4].id == userChoise && conditonStatus == false) {
        connerCombo.forEach(i => {
            if (checkplace(i, filledBoxes) && conditonStatus == false) {
                conditonStatus = true;
                botput(playerSign, i);
            }
        })
    } else {
    connerPair.forEach(i => {
        if (allbox[i[0] - 1].childElementCount > 0 && allbox[i[1] - 1].childElementCount > 0) {
            if (i[1] == 9) {
                randomBox = 8;
                if (!checkplace(randomBox - 1, filledBoxes)) return false;
                botput(playerSign, randomBox);
            } else {
                randomBox = 8;
                if (!checkplace(randomBox, filledBoxes)) return false;
                botput(playerSign, randomBox);
            }
            conditonStatus = true;
        }
    })
    if (!conditonStatus) {
            let randomBox = Math.floor(Math.random() * 9) + 1; // getting random position for bot to play
            connerCombo.forEach(i => {
                if (allbox[i - 1].childElementCount <= 0) {
                    randomBox = i;
                }
            })
            if (!checkplace(randomBox, filledBoxes)) return false;
            botput(playerSign, randomBox);
        }
    }
    return true;
}

function botput(playerSign, box) {
    box--;
    if (playerSign != userChoise && players.classList.contains("player")) {
        players.classList.add("active");
    }

    if (playerSign == "X") {
        if (checkplace(box + 1, filledBoxes)) filledBoxes.push(box + 1);
        allbox[box].innerHTML = `<i>X</i>`;
        players.classList.remove("active");
        allbox[box].setAttribute("id", "X");
        allbox[box].style.pointerEvents = "none";
    } else {
        if (checkplace(box + 1, filledBoxes)) filledBoxes.push(box + 1);
        // allbox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        allbox[box].innerHTML = `<i>O</i>`;
        players.classList.remove("active");
        allbox[box].setAttribute("id", "O");
        allbox[box].style.pointerEvents = "none";
    }
    playBoard.style.pointerEvents = "auto";
    botStatus = false;
    selectWinner(playerSign);
    selectWinner(userChoise);
}

function checkThreeId(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner(playerSign) {
    if (checkThreeId(1, 2, 3, playerSign) || checkThreeId(4, 5, 6, playerSign) || checkThreeId(7, 8, 9, playerSign) || checkThreeId(1, 4, 7, playerSign) || checkThreeId(2, 5, 8, playerSign) || checkThreeId(3, 6, 9, playerSign) || checkThreeId(1, 5, 9, playerSign) || checkThreeId(3, 5, 7, playerSign)) {
        botStatus = false;
        bot(botStatus);
        rowCombo.forEach(i => {
            if (checkThreeId(i[0], i[1], i[2], playerSign)) {
                allbox[i[0] - 1].classList.add("active");
                allbox[i[1] - 1].classList.add("active");
                allbox[i[2] - 1].classList.add("active");
            }
        })
        setTimeout(function () {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 1000)
        if (userChoise == playerSign) {
            wonText.innerHTML = `<b>You</b> won the match`;
            playBoard.style.pointerEvents = "none";
            botStatus = false;
        } else {
            wonText.innerHTML = `<b>Bot</b> won the match`;
            playBoard.style.pointerEvents = "none";
            botStatus = false;
        }
    } else {
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            wonText.innerHTML = `Match get draw`;
            setTimeout(function () {
                playBoard.classList.remove("shsow");
                resultBox.classList.add("show");
            }, 700)
            playBoard.style.pointerEvents = "none";
            botStatus = false;
        }
    }

    replay.addEventListener("click", () => {
        window.location.reload();
    })
} 
