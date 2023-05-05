import { GAME } from "./variables.js";

export function Profile(){
    GAME.selectedProfile.forEach(img => {
       img.addEventListener("click", e => {
           let target = e.target.dataset.id;
           removeImgSelection(GAME.selectedProfile);
           document.querySelector(`[data-id='${target}']`).classList.add("selected");

        if (target == 'x2' || target == 'y2'){
            GAME.X_CLASS = "x2",
            GAME.Y_CLASS = "y2";
        }

        
        GAME.turn = target == 'y' || target == 'y2' ? true : false;

       });
    });
}
function removeImgSelection(img){
    [].forEach.call(img, function(el){
        el.classList.remove("selected");
    })
}

export function setHoverEffect(){
    GAME.boardElement.classList.remove(GAME.X_CLASS);
    GAME.boardElement.classList.remove(GAME.Y_CLASS);
    if (GAME.turn){
        GAME.boardElement.classList.add(GAME.Y_CLASS);
    }else{
        GAME.boardElement.classList.add(GAME.X_CLASS);
    }
}

export function markCell(cell, currentClass){
    cell.classList.add(currentClass)
}

export function swapTurns(turn){
    return turn =! turn;
}

export function endGame(draw, winEl, drawEl){
    if (!draw){
        winEl.classList.add("show");
    }else{
        drawEl.classList.add("show");
    }
}
export function isDraw(flag){
    if (flag.length) return;
    return [...GAME.blockElements].every(cell => {
        return cell.classList.contains(GAME.X_CLASS) ||
        cell.classList.contains(GAME.Y_CLASS)
    })
}