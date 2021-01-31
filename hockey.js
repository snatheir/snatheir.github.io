let tube;
let floor;
let turnOn;
let turnOff;
let poop;
let speedX;
let speedY;
let score = 0;
const scoreEl = document.getElementById("scoreSpan");

function preload() {
    course = loadImage('assets/hockey.jpg', () => console.log("success"),(event) => console.log("error") );
    golf_sound = loadSound('assets/golf.mp3'); 
    puck = loadImage('assets/puck.png')
    stick = loadImage('assets/hockeystick.png')
    flag = loadImage('assets/flag.png')
}


function setup() {
    const canvas = createCanvas(600, 400);
    canvas.id("golf");
    console.log("hello world");
    image(course, 0, 0, width, height);
    radius = 15;
    ball_x = Math.random() * (width+2*radius) - 2*radius;
    ball_y = height - 50;
    radius = 15;
    ball = new Ball(ball_x, ball_y, radius, {x: 0, y:0}, 0.97)
    goal = new Goal(width/2 +10, height/2 - 170, 25)
    scoreEl.innerHTML = score;
}


function draw() {
    //background
    image(course, 0, 0, width, height);

    // flag
    //image(flag, width/2 - 50, height/2 - 200, 100, 100)

    // hole
    goal.update()

    // ball hit by club
    const dist = Math.hypot(ball.x - mouseX, ball.y - mouseY)
    if (dist < 20) {
        speedX = winMouseX - pwinMouseX;
        speedY = winMouseY - pwinMouseY;
        ball.velocity.x = speedX;
        ball.velocity.y = speedY;
        // if (!golf_sound.isPlaying()) {
        //     golf_sound.play();
        // }
    }

    //ball moves
    ball.velocity.x *=ball.friction;
    ball.velocity.y *=ball.friction;
    ball.update()

    //club
    image(stick, mouseX-45, mouseY-85, 100, 100)

    // check if ball entered hole
    const goal_center_x = goal.x;
    const goal_center_y = goal.y;
    const ball_center_x = ball.x + ball.radius;
    const ball_center_y = ball.y + ball.radius;

    let gameover = false


    const dist_to_goal = Math.hypot(goal_center_x - ball_center_x, goal_center_y - ball_center_y)
    if (dist_to_goal <= (ball.radius)*2 && gameover === false){

        console.log("HERE");
    
        score =1;
        gameover = true;
        scoreEl.innerHTML= score;
        console.log(score);
        // setup();
    }


}


class Ball {
    constructor(x, y, radius, velocity, friction) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.friction = friction;
    }
    draw() {
        image(puck,this.x,this.y,this.radius*2,this.radius*2);
    }
    update() {
        this.draw()
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Goal {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        fill(0);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    }
    update() {
       // this.draw()
    }
}

