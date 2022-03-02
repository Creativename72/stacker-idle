const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
import {board,currentPiece} from "./script.js"
export function line(x1,y1,x2,y2) {
  ctx.strokeStyle = "white";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

export function clearMatrix() {
  ctx.clearRect(0,0,c.width,c.height)
  ctx.beginPath()
}

export function drawMatrix() {
  clearMatrix();
  drawMatrixBG();
  drawMinoes();
  currentPiece.render(ctx)
}

export function drawMatrixBG() {
  ctx.fillRect(0, 0, c.width, c.height);
  
  var sizeIncrement = c.width / 10;
  for (var i = -1; i < 11; i++) {
    line(sizeIncrement * i, 0, sizeIncrement * i, c.height);
  }
  for (var i = -1; i < 20; i++) {
    line(0, sizeIncrement * i, c.height, sizeIncrement * i);
  }
  for (var i = 0; i < 10; i++) {
    ctx.stroke()
  }
}

export function drawMinoes() {
  for (var i in board) {
    for (var j in board[i]) {
      if (board[i][j]) {
        board[i][j].render(i,j);
      }
    }
  }
}