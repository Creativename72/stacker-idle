import {Tetromino,Mino} from "./Tetromino.js"
export class SevenBag {
  constructor() {
    this.refreshBag();
  }
  getNextPiece() {
    if (this.piecesLeft.length == 0) {
      this.refreshBag()
    }
    var index = parseInt(Math.random() * this.piecesLeft.length);
    return this.piecesLeft.splice(index,1)[0];
  }
  refreshBag() {
    var oShape = ["11",
              "11"];
    var oColor = "rgb(255, 255, 0)";
    var sShape = ["011",
              "110",
              "000"];
    var sColor = "rgb(0, 128, 0)";
    var zShape = ["110",
              "011",
              "000"];
    var zColor = "rgb(255, 0, 0)";
    var lShape = ["001",
              "111",
              "000"];
    var lColor = "rgb(255, 165, 0)";
    var jShape = ["100",
              "111",
              "000"];
    var jColor = "rgb(0, 0, 255)";
    var tShape = ["010",
              "111",
              "000"];
    var tColor = "rgb(128, 0, 128)";
    var iShape = ["0000",
              "1111",
              "0000",
              "0000"]
    var iColor = "rgb(0, 255, 255)";
    this.piecesLeft = [new Tetromino(oShape,oColor),
                       new Tetromino(sShape,sColor),
                       new Tetromino(zShape,zColor),
                       new Tetromino(lShape,lColor),
                       new Tetromino(jShape,jColor),
                       new Tetromino(tShape,tColor),
                       new Tetromino(iShape,iColor)]
  }
}