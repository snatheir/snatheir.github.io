let tube;
let floor;
let turnOn;
let turnOff;
let poop;

function preload() {
    tube = loadImage('assets/tube.png');
    floor = loadImage('assets/floor.jpg')
    turnOn = loadSound('assets/turn-on.mp3'); 
    turnOff = loadSound('assets/turn-off.mp3');
    poop = loadImage('assets/poop.png')
}


function setup() {

    createCanvas(600, 400);
    image(floor, 0, 0, width, height);

    for (i=0; i<10; i++){
        enemy_x = Math.random() * width;
        enemy_y = Math.random() * height;
        radius = Math.random() * (20-4) +4;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        enemies.push(new Enemy(enemy_x, enemy_y, radius, color));
    }

}


function draw() {
    image(floor, 0, 0, width, height);

    // dirt
    enemies.forEach( (enemy) => {
        enemy.draw();
    })
    
    // vacuum tube
    image(tube, mouseX-30, mouseY-30, width*1.2, height*1.2);


    // turn vacuum on when mouse pressed
    if (mouseIsPressed) {
        fill(0);
        enemies.forEach( (enemy, index) => {        
            const dist = Math.hypot(enemy.x - mouseX, enemy.y - mouseY)
            if (dist < 30) {
                enemies.splice(index, 1);
            }
        })
        ellipse(mouseX,mouseY,120,120);

        turnOn.play();
        turnOff.stop();



    } else{
        fill(255);
        ellipse(mouseX,mouseY,120,120);

        turnOff.play();
        turnOn.stop();
    }
}


class Enemy {
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
        image(poop, this.x, this.y, 2*this.radius, 2*this.radius);

    }
    update() {
        this.draw()
    }
}

enemies = []