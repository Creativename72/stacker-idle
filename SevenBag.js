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
    var oColor = "yellow";
    var sShape = ["011",
              "110",
              "000"];
    var sColor = "green";
    var zShape = ["110",
              "011",
              "000"];
    var zColor = "red";
    var lShape = ["001",
              "111",
              "000"];
    var lColor = "orange";
    var jShape = ["100",
              "111",
              "000"];
    var jColor = "blue";
    var tShape = ["010",
              "111",
              "000"];
    var tColor = "purple";
    var iShape = ["0000",
              "1111",
              "0000",
              "0000"]
    var iColor = "cyan";
    this.piecesLeft = [new Tetromino(oShape,oColor),
                       new Tetromino(sShape,sColor),
                       new Tetromino(zShape,zColor),
                       new Tetromino(lShape,lColor),
                       new Tetromino(jShape,jColor),
                       new Tetromino(tShape,tColor),
                       new Tetromino(iShape,iColor),]
  }
}