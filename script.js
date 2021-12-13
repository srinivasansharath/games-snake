/*  constants  */
const scl = 20;
const width = 900;
const height = 500;

/*  variables */
var s;
var food;

function setup() {
    createCanvas(width, height);
    s = new Snake();
    frameRate(8);
    food = pickLocation();
}

function draw() {
    background(50);
    s.update();
    s.show();

    //draw food
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);

    if(s.eat(food)) food = pickLocation();
}

function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
    return food;
}

function keyPressed() {
    switch(keyCode){
        case UP_ARROW: s.dir(0, -1); break;
        case DOWN_ARROW: s.dir(0, 1); break;
        case RIGHT_ARROW: s.dir(1, 0); break;
        case LEFT_ARROW: s.dir(-1, 0); break;
    }
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 1;
    this.tail = [];

    this.update = function() {
        for(var i=0; i < this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }

    this.show = function() {
        fill(255);
        for(var i=0; i < this.total; i++)
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(food) {
        var d = dist (this.x, this.y, food.x, food.y);
        if(d < 1) {
            this.total ++;
            return true;
        }
            else return false;
    }
}