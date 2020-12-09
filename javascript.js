var cardList = [
    "images/ahri.jpg",
    "images/ashe.jpg",
    "images/blitzcrank.jpg",
    "images/jinx.jpg",
    "images/leesin.jpg",
    "images/nidalee.jpg"
]

showList()
var cardListShow = []

var listItem = document.querySelectorAll(".list-item")
var cardFront = document.querySelectorAll(".card.front")
var cardBack = document.querySelectorAll(".card.back")

for (let i = 0; i < listItem.length; i++) {
    let cardItem = {
        front: "",
        back: ""
    }
    cardItem.front = cardFront[i]
    cardItem.back = cardBack[i]
    cardListShow.push(cardItem)
}

var rotateCount = 0
var validateCard = []

// ====================================================================
function startGame() {

}

function showList() {
    var cardList1 = shuffle(cardList)
    var cardList2 = shuffle(cardList)
    cardList = cardList1.concat(cardList2)
    cardList = shuffle(cardList)
    var cardImg = document.querySelectorAll(".card.front")

    for (let i = 0; i < cardList.length; i++) {
        cardImg[i].setAttribute("style", "background-image:url(" + cardList[i] + ")")
    }
}

function rotateCard(index) {
    if (rotateCount < 2) {
        rotateCount++
        revealCard(index)
        validateCard.push(cardListShow[index])
    } else {
        if (checkCard(validateCard[0].front, validateCard[1].front) == true) {
            for (let i = 0; i < validateCard.length; i++) {
                validateCard[i].front.classList.add("fade")
                validateCard[i].back.classList.add("fade")
                validateCard[i].front.setAttribute("disabled", "disabled")
                validateCard[i].back.setAttribute("disabled", "disabled")
            }
        } else {
            reserveCard()
        }
        revealCard(index)
        rotateCount = 1
        validateCard = []
        validateCard.push(cardListShow[index])
    }

}

function revealCard(index) {
    cardListShow[index].front.classList.add("rotate")
    cardListShow[index].front.style.zIndex = 2
    cardListShow[index].back.classList.add("rotate")
    cardListShow[index].back.style.zIndex = 1
}

function reserveCard() {
    for (let i = 0; i < cardListShow.length; i++) {
        cardListShow[i].front.classList.remove("rotate")
        cardListShow[i].front.style.zIndex = 1
        cardListShow[i].back.classList.remove("rotate")
        cardListShow[i].back.style.zIndex = 2
    }
}

function checkCard(img1, img2) {
    if (img1.style.backgroundImage === img2.style.backgroundImage) {
        return true
    } else return false
}

// ====================================================================
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}