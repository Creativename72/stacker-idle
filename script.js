//imports
import {NextQueue} from "./NextQueue.js"
import {Controls} from "./Controls.js"
import {line,clearMatrix,drawMatrix,drawMinoes} from "./graphics.js"
//variable declaration
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
export const board = [];
export var currentPiece = null;
export var hold = null;
const nextQueue = new NextQueue();
export var controls = new Controls();
controls.addKeyDownListener();
controls.addKeyUpListener();

//functions
export function nextPiece() {
  //writes current piece to board
  for (var y in currentPiece.board) {
    for (var x in currentPiece.board[y]) {
      if (currentPiece.board[y][x]) {
        board[currentPiece.x + parseInt(x)][currentPiece.y + parseInt(y)] = currentPiece.board[y][x];
      }
    }
  }
  
  currentPiece = nextQueue.getNextPiece()
  //line clears
  for (var line = 0; line < 20; line++) {
    var lineFull = true;
    for (var mino = 0; mino < 10; mino++) {
      if (!board[mino][line]) {
        lineFull = false;
      }
    }
    if (lineFull) {
      for (var x = 0; x < 10;x++) {
        clearColumn(x,line);
      }
    }
  }
}

export function clearColumn(x,y) {
  for (var i = y; i > 0; i--) {
    board[x][i] = board[x][i-1];
  }
  board[x][0] = null;
}

export function holdPiece() {
  if (hold == null) {
    hold = currentPiece;
    currentPiece = nextQueue.getNextPiece();
  } else {
    var switcher = null;
    switcher = hold;
    hold = currentPiece;
    currentPiece = switcher;
  }
  hold.reset()
  currentPiece.reset()
}

function main() {
  ctx.lineWidth = 1;
  currentPiece = nextQueue.getNextPiece();
  for (var i = 0; i < 10; i++) {
    board.push([]);
    for (var j = 0; j < 10; j++) {
      board[i].push(null);
    }  
  }
  setInterval(drawMatrix,50)
}

main()