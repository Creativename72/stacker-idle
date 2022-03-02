//imports
import {SevenBag} from "./SevenBag.js"
import {Controls} from "./Controls.js"
import {line,clearMatrix,drawMatrix,drawMinoes} from "./graphics.js"
//variable declaration
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
export const board = [];
export var currentPiece = null;
var hold = null;
const bag = new SevenBag();
export var controls = new Controls();
controls.addKeyDownListener();
controls.addKeyUpListener();

//functions
export function nextPiece() {
  for (var y in currentPiece.board) {
    for (var x in currentPiece.board[y]) {
      if (currentPiece.board[y][x]) {
        board[currentPiece.x + parseInt(x)][currentPiece.y + parseInt(y)] = currentPiece.board[y][x];
      }
    }
  }
  
  currentPiece = bag.getNextPiece()
  //line clears
  for (var line = 0; line < 20; line++) {
    var lineFull = true;
    for (var mino = 0; mino < 10; mino++) {
      if (!board[mino][line]) {
        lineFull = false;
      }
    }
    if (lineFull) {
      for (var mino = 0; mino < 10; mino++) {
        for (var i = 0; i < line; i++) {
          board[mino][line] = board[mino][line - 1]
        }
      }
      for (var mino = 0; mino < 10; mino++) {
        board[mino][0] = null;
      }
    }
  }
}

export function holdPiece() {
  if (hold == null) {
    hold = currentPiece;
    currentPiece = bag.getNextPiece();
  } else {
    var switcher = null;
    switcher = hold;
    hold = currentPiece;
    currentPiece = switcher;
  }
  currentPiece.reset()
}

function main() {
  ctx.lineWidth = 1;
  currentPiece = bag.getNextPiece();
  for (var i = 0; i < 10; i++) {
    board.push([]);
    for (var j = 0; j < 10; j++) {
      board[i].push(null);
    }  
  }
  setInterval(drawMatrix,100)
}

main()