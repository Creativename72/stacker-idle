//controls variables
import {controls} from "./script.js";
import {currentPiece} from "./script.js";
import {nextPiece,holdPiece,clearColumn} from "./script.js";
var direction = "";
export class Controls {
  constructor() {
    this.das = 120;
    this.arr = 0;
    this.dasController = null;
    this.arrController = null;
    this.arrActive = false;
    this.autoRepeatDisabler = false;
  }

  
  
  addKeyDownListener() {
    document.addEventListener("keydown", function(event) {
      switch (event.keyCode) {
        case 37:
          if (direction == "l") {
            clearRepeats()
          }
          addRepeats("r")
          break;
        case 39:
          if (direction == "r") {
            clearRepeats()
          }
          addRepeats("l")
          break;
        case 38:
          currentPiece.rotateCW();
          break;
        case 40:
           currentPiece.hardDrop()
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
          clearRepeats()
          break;
        case 39:
          clearRepeats()
          break;
      }
    });
  }
  
}

function addRepeats(directionParameter) {
  var movementFunction = []
  if (controls.das != 0) {
    if (directionParameter == "r") {
      movementFunction[0] = function() {
        currentPiece.moveRight()
      }
    } else if (directionParameter == "l") {
      movementFunction[0] = function() {
        currentPiece.moveLeft()
      }
    }
    if (!controls.autoRepeatDisabler) {
      movementFunction[0]();
      controls.dasController = setTimeout(function() {
      controls.arrController = setInterval(function() {
      movementFunction[0]()
      },controls.arr)
      },controls.das)
      controls.autoRepeatDisabler = true;
    }
  } else {
    if (directionParameter == "r") {
      movementFunction[0] = function() {
        currentPiece.snapRight();
      }
    } else if (directionParameter == "l") {
      movementFunction[0] = function() {
        currentPiece.snapLeft();
      }
    }
    if (!controls.autoRepeatDisabler) {
      movementFunction[0]();
      controls.dasController = setTimeout(function() {
      movementFunction[0]();
      },controls.das)
      controls.autoRepeatDisabler = true;
    }
  }
  direction = directionParameter;
}

function clearRepeats() {
  clearInterval(controls.arrController)
  clearTimeout(controls.dasController)
  controls.autoRepeatDisabler = false;
}