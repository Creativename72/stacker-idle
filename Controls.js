//controls variables
import {controls} from "./script.js"
import {currentPiece} from "./script.js"
import {nextPiece,holdPiece,clearColumn} from "./script.js"
var direction = ""
export class Controls {
  constructor() {
    this.das = 170;
    this.arr = 50;
    this.dasController = null;
    this.arrController = null;
    this.arrActive = false;
    this.autoRepeatDisabler = false;
  }
  
  addKeyDownListener() {
    document.addEventListener("keydown", function(event) {
      switch (event.keyCode) {
        case 37:
          if (!controls.autoRepeatDisabler) {
            currentPiece.moveRight();
            controls.dasController = setTimeout(function() {
              controls.arrController = setInterval(function() {
                  currentPiece.moveRight()
                },controls.arr)
            },controls.das)
            controls.autoRepeatDisabler = true;
          }
          direction = "r"
          break;
        case 38:
          currentPiece.rotateCW();
          break;
        case 39:
          if (!controls.autoRepeatDisabler) {
            currentPiece.moveLeft();
            controls.dasController = setTimeout(function() {
              controls.arrController = setInterval(function() {
                currentPiece.moveLeft()
              },controls.arr)
            },controls.das)
            controls.autoRepeatDisabler = true;
          }
          direction = "l"
          break;
        case 40:
           currentPiece.softDrop()
           break;
        case 32:
          currentPiece.hardDrop();
          nextPiece();
          break;
        case 90:
          currentPiece.rotateCCW();
          break;
        case 67:
          holdPiece();
          break;
        case 88:
          currentPiece.rotateCW();
          currentPiece.rotateCW();
          break;
        case event.keyCode:
          console.log(event.keyCode)
          break;
      }});
  }
  
  addKeyUpListener() {
    document.addEventListener("keyup", function(event) {
      switch (event.keyCode) {
        case 37:
          clearInterval(controls.arrController)
          clearTimeout(controls.dasController)
          controls.autoRepeatDisabler = false;
          break;
        case 39:
          clearInterval(controls.arrController)
          clearTimeout(controls.dasController)
          controls.autoRepeatDisabler = false;
          break;
      }
    });
  }
  
}



