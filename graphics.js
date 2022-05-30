const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
import {board,currentPiece,hold} from "./script.js"
export const boardScaler = (2/3);
export const xShift = 100;

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
  currentPiece.render()
  if (hold) {
    var xChange = 7;
    if (hold.board.length % 2 == 0) {
      xChange += 0.5;
    }
    
    hold.x -= xChange
    hold.y += 2
    hold.render()
    hold.x += xChange
    hold.y -= 2
    
  }
}

export function drawMatrixBG() {
  var w = c.width * boardScaler
  var h = c.height * boardScaler
  ctx.fillRect(0+xShift, 0, w+xShift, h);
  
  var sizeIncrement = w / 10;
  for (var i = -1; i < 11; i++) {
    line((sizeIncrement * i)+xShift, 0, (sizeIncrement * i)+xShift, h);
  }
  for (var i = -1; i < 20; i++) {
    line(0+xShift, sizeIncrement * i, h+xShift, sizeIncrement * i);
  }
  for (var i = 0; i < 10; i++) {
    ctx.stroke()
  }
}

export function drawMinoes() {
  for (var i in board) {
    for (var j in board[i]) {
      if (board[i][j]) {
        board[i][j].render(i,j,ctx);
      }
    }
  }
}