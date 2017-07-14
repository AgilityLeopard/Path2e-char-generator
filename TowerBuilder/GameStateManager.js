var states = {"play" : 0};

var phases = {"selectBuilder" : 0,
              "moveBuilder": 1,
              "buildBuilding": 2};

var maxPhase = 2;
var turns;
var mouseHandler;
var drawer;

class GameStateManager{
    constructor(drawer){
        turns = players;
        this.turn = players[0];
        this.phase = phases.selectBuilder;
        mouseHandler = new BuilderSelector(this.turn);
        this.drawer = drawer;
        drawer.setPhase(this.turn, this.phase);
    }
    
    onMouseMove(){
        c.style.cursor = "defualt";
        mouseHandler.onMouseMove(); 
        this.checkRotLeftHover();
        this.checkRotRightHover()
    }
    
    checkRotLeftHover(){
        if (mouseY > drawer.rotLeftYMargin && mouseY < drawer.rotLeftYMargin + 80 &&
            mouseX > drawer.rotLeftXMargin && mouseX < drawer.rotLeftXMargin + 80){
            drawer.rotLeftHovered = true;
            c.style.cursor = "pointer";
        }
        else{
            drawer.rotLeftHovered = false;
        }
    }
    
    checkRotRightHover(){
        if (mouseY > drawer.rotRightYMargin && mouseY < drawer.rotRightYMargin + 80 &&
            mouseX > drawer.rotRightXMargin && mouseX < drawer.rotRightXMargin + 80){
            drawer.rotRightHovered = true;
            c.style.cursor = "pointer";
        }
        else{
            drawer.rotRightHovered = false;
        }
    }
    
    
    onClick(){
        mouseHandler.onClick(); 
        this.checkRotLeftClick();
        this.checkRotRightClick();
    }
    
    checkRotLeftClick(){
        if (drawer.rotLeftHovered){
            board.rotateClockwise();
        }
    }
    
    checkRotRightClick(){
        if (drawer.rotRightHovered){
            board.rotateClockwise();
            board.rotateClockwise();
            board.rotateClockwise();
        }
    }
    
    advancePhase(){
        c.style.cursor = "default";
        this.phase++;
        if (this.phase > maxPhase){
            this.phase = 0;
            this.turn = this.turn == players[0] ? players[1] : players[0];
        }
        this.resetPhase();
    }
    
    resetPhase(){
        //updateMouseHandler
        if (this.phase == phases.selectBuilder){
            mouseHandler = new BuilderSelector(this.turn);
        }
        else if (this.phase == phases.moveBuilder){
            mouseHandler = new BuilderMover(this.turn);
        }
        else if (this.phase == phases.buildBuilding){
            mouseHandler = new BuildingBuilder(this.turn);
        }

        drawer.setPhase(this.turn, this.phase);
    }
}

function cellClicked(x,y){
        var dx = Math.abs(mouseX - drawer.getCenterCoordinates(x,y).x);
        var dy = Math.abs(mouseY - drawer.getCenterCoordinates(x,y).y);
        if (dx / (drawer.gridWidth * 0.5) + dy / (drawer.gridHeight * 0.5) <= 1){
            return true;
        }
        return false;
    }