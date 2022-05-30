import {board} from "./script.js"
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d")
import {boardScaler,xShift} from "./graphics.js";

export class Mino {
  
  constructor(color) {
    this.color = color;
  }
  
  render(x,y,context) {
    //this is the bug because its rendering based off x,y stuff i think maybe
    var oldFillStyle = context.fillStyle;
    context.fillStyle = this.color;
    var size = ((c.width * (boardScaler))/10);
    context.fillRect((x * size) + context.lineWidth + xShift,(y * size) + context.lineWidth,(size - context.lineWidth * 2),size - context.lineWidth * 2);
    context.fillStyle = oldFillStyle
  }

  intersect(x,y) {
    if (x < 0 || x >= 10) {
      return true;
    }
    if (y >= 20) {
      return true;
    }
    if (board[x][y]) {
      return true;
    }
    return false
  }
}

export class Tetromino {
  constructor(shape,color) {
    this.board = []
    this.color = color
    for (var i = 0; i < shape.length; i++) {
      this.board.push([]);
      for (var j = 0; j < shape.length; j++) {
        if (shape[i][j] == 1) {
          this.board[i].push(new Mino(color));  
        } else {
          this.board[i].push(null);
        }        
      }
    }
    if (this.board.length != 4) {
      this.x = 3 + (3-this.board.length);
      this.y = 0;
    } else {
      this.y = -1
      this.x = 3
    }
    this.rotation = 0;
  }
  
  render() {
    var context = ctx;
    for (var y in this.board) {
      for (var x in this.board[y]) {
        if (this.board[y][x]) {
          this.board[y][x].render(this.x + parseInt(x), this.y + parseInt(y),context);
        }
      }
    }
  }

  reset() {
    if (this.board.length != 4) {
      this.x = 3 + (3-this.board.length);
      this.y = 0;
    } else {
      this.y = -1
      this.x = 3
    }
    while (this.rotation != 0) {
      this.rotateCW()
    }
  }
  softDrop() {
    this.y += 1;
    if (this.intersect()) {
      this.y -= 1;
    }
  }
  hardDrop() {
    while(!this.intersect()) {
      this.y += 1;
    }
    this.y -= 1;
  }
  intersect() {
    for (var y in this.board) {
      for (var x in this.board[y]) {
        y = parseInt(y)
        x = parseInt(x)
        if (this.board[y][x] && this.board[y][x].intersect(x + this.x,y + this.y)) {
          return true;
        }
      }
    }
    return false;
  }
  
  moveRight() {
    this.x -= 1;
    if (this.intersect()) {
      this.x += 1;
    }
  }

  moveLeft() {
    this.x += 1;
    if (this.intersect()) {
      this.x -= 1;
    }
  }
  rotateCW() {
    this.rotation += 1;
    this.rotation %= 4;
    var nBoard = [];
    for (var i = 0; i < this.board.length;i++) {
      nBoard.push([])
      for (var j = 0; j < this.board.length;j++) {
        nBoard[i].push(null);
      }
    }

    for (var i = 0; i < this.board.length;i++) {
      for (var j = 0; j < this.board.length;j++) {
        nBoard[j][this.board.length-i-1] = this.board[i][j]
      }
    }
    var nTetromino = new Tetromino(nBoard,this.color)
    if (!nTetromino.intersect()) {
      this.board = nBoard;
    }
    
    
  }
  rotateCCW() {
    this.rotation -= 1;
    this.rotation %= 4;
    var nBoard = [];
    for (var i = 0; i < this.board.length;i++) {
      nBoard.push([])
      for (var j = 0; j < this.board.length;j++) {
        nBoard[i].push(null);
      }
    }

    for (var i = 0; i < this.board.length;i++) {
      for (var j = 0; j < this.board.length;j++) {
        nBoard[this.board.length-j-1][i] = this.board[i][j]
      }
    }
    var nTetromino = new Tetromino(nBoard,this.color)
    if (!nTetromino.intersect()) {
      this.board = nBoard;
    }
  }
}