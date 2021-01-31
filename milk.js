// suppl vars
let arm;
let shelf;
let list;

// grocery item vars
let milk;
let eggs;
let grapes;
let pasta;
let oreo;

// audio vars
let cash;
let wrong;
let grocery

// score element
let score = 0;
const scoreEl = document.getElementById("scoreSpan");

// grocery item counters
let milkCounter = 0;
let oreoCounter = 0;
let eggCounter = 0;
let grapesCounter = 0;
let pastaCounter = 0;

function preload() {
    //supple
    arm = loadImage('assets/arm.png');
    shelf = loadImage('assets/grocery.jpg');
    list = loadImage('assets/List.png');

    //audio
    grocery = loadSound('assets/grocery.mp3');
    cash = loadSound('assets/cash.mp3');
    wrong = loadSound('assets/buzzerWrong.mp3');

    //grocery items
    milk = loadImage('assets/milk.png');
    eggs = loadImage('assets/eggs.png');
    pasta = loadImage('assets/pasta.png');
    grapes = loadImage('assets/grapes.png');
    oreo = loadImage('assets/oreo.png');
}

function setup() {
    createCanvas(600, 400);
    image(shelf, 0, 0, width, height);

    // milk range 20 -> 220 ;; 300 -> 500 
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    enemies.push({"milk": new milkEnemy((Math.random()*200)+20, 75, 32, color)});
    enemies.push({"eggs": new eggsEnemy((Math.random()*200)+300, 80, 30, color)});

    // eggs range 40 -> 160 ;; 320 -> 450
    enemies.push({"oreo": new oreoEnemy((Math.random()*120)+40, 165, 35, color)});
    enemies.push({"pasta": new pastaEnemy((Math.random()*130)+320, 155, 40, color)});

    // eggs range 40 -> 160 ;; 320 -> 450
    enemies.push({"grapes": new grapesEnemy((Math.random()*120)+40, 250, 32, color)});
    enemies.push({"milk": new milkEnemy((Math.random()*130)+320, 250, 32, color)});
    
    grocery.play();

    // scoreEl.innerHTML = score;
}

function draw() {
    image(shelf, 0, 0, width, height);


    // dirt
    enemies.forEach( (enemy) => {
        // console.log(Object.values(enemy)[0])
        Object.values(enemy)[0].draw();
    })
    
    // arm
    image(arm, mouseX-30, mouseY-30, width, height);

    // cha-ching when mouse pressed on grocery item
    if (mouseIsPressed) {
        fill(0);
        enemies.forEach( (enemy, index) => {        
            const dist = Math.hypot(Object.values(enemy)[0].x - mouseX, Object.values(enemy)[0].y - mouseY)
            if (dist < 30) {
                enemies.splice(index, 1);
                console.log(Object.keys(enemy)[0]);
                if (Object.keys(enemy)[0] == 'milk'){
                    milkCounter++;
                    if (milkCounter == 1){
                        score++;
                    } else {
                        score--;
                    }
                    cash.play();
                } else if (Object.keys(enemy)[0] == 'oreo'){
                    oreoCounter++;
                    score--;
                    wrong.play();
                } else if (Object.keys(enemy)[0] == 'eggs'){
                    eggCounter++;
                    score++;
                    cash.play();
                } else if (Object.keys(enemy)[0] == 'pasta'){
                    pastaCounter++;
                    score--;
                    wrong.play();
                } else if (Object.keys(enemy)[0] == 'grapes'){
                    grapesCounter++;
                    score++;
                    cash.play();
                }
                scoreEl.innerHTML= score;
            }
        })
        // ellipse(mouseX,mouseY,120,120);
    } else{
        fill(255);
        // ellipse(mouseX,mouseY,120,120);
    }
}


class milkEnemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        // fillStyle = this.color;
        fill(211);
        // ellipse(this.x,this.y,2*this.radius,2*this.radius);
        image(milk, this.x, this.y, 2*this.radius, 2*this.radius);

    }
    update() {
        this.draw()
    }
}

class eggsEnemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        // fillStyle = this.color;
        fill(211);
        // ellipse(this.x,this.y,2*this.radius,2*this.radius);
        image(eggs, this.x, this.y, 3*this.radius, 2*this.radius);

    }
    update() {
        this.draw()
    }
}

class grapesEnemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        fill(211);
        image(grapes, this.x, this.y, 3*this.radius, 2*this.radius);

    }
    update() {
        this.draw()
    }
}

class pastaEnemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        fill(211);
        image(pasta, this.x, this.y, 3*this.radius, 2*this.radius);

    }
    update() {
        this.draw()
    }
}

class oreoEnemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        fill(211);
        image(oreo, this.x, this.y, 2*this.radius, 2*this.radius);

    }
    update() {
        this.draw()
    }
}

enemies = []