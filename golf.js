let golf = function(sketch) {
    let speedX;
    let speedY;
    let score = 0;
    const scoreEl = document.getElementById("scoreSpan");
    let particles = []
    let course;
    let ball;
    
    sketch.preload = () => {
        course = sketch.loadImage('assets/golf-course.jpg');
        // golf_sound = sketch.loadSound('assets/golf.mp3'); 
        golf_ball = sketch.loadImage('assets/ball.png')
        club = sketch.loadImage('assets/club.png')
        flag = sketch.loadImage('assets/flag.png')
    }
    
    
    sketch.setup = () => {
        const canvas = sketch.createCanvas(600, 400);
        canvas.id("golf");
        sketch.image(course, 0, 0, sketch.width, sketch.height);
        radius = 15;
        ball_x = Math.random() * (sketch.width+2*radius) - 2*radius;
        ball_y = sketch.height - 50;
        radius = 15;
        ball = new Ball(ball_x, ball_y, radius, {x: 0, y:0}, 0.97)
        hole = new Hole(sketch.width/2 - 17, sketch.height/2 - 80, 25)
        scoreEl.innerHTML = score;
    }
    
    
    sketch.draw = () => {
        //background
        sketch.image(course, 0, 0, sketch.width, sketch.height);
    
        // flag
        sketch.image(flag, sketch.width/2 - 50, sketch.height/2 - 200, 100, 100)
    
        // hole
        hole.update()
    
        // ball hit by club
        const dist = Math.hypot(ball.x - sketch.mouseX, ball.y - sketch.mouseY)
        if (dist < 20) {
            speedX = sketch.winMouseX - sketch.pwinMouseX;
            speedY = sketch.winMouseY - sketch.pwinMouseY;
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
        sketch.image(club, sketch.mouseX-45, sketch.mouseY-85, 100, 100)
    
        // check if ball entered hole
        const hole_center_x = hole.x;
        const hole_center_y = hole.y;
        const ball_center_x = ball.x + ball.radius;
        const ball_center_y = ball.y + ball.radius;
    
        const dist_to_hole = Math.hypot(hole_center_x - ball_center_x, hole_center_y - ball_center_y)
        if (dist_to_hole <= (ball.radius)*2){
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(ball_center_x,
                    ball_center_y,
                    radius = Math.random() * 10,
                    velocity = { x: (Math.random() - 0.5) * (Math.random() * 8), y: (Math.random() - 0.5) * (Math.random() * 8)})
                )}
    
            score +=1;
            // setup();
        }
    
        //particles
        particles.forEach((particle) => {
            particle.update();
        })
    }
    
    
    class Ball {
        constructor(x, y, radius, velocity, friction) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.velocity = velocity;
            this.friction = friction;
        }
        draw() {
            sketch.image(golf_ball,this.x,this.y,this.radius*2,this.radius*2);
        }
        update() {
            this.draw()
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }
    
    class Hole {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
        draw() {
            sketch.fill(0);
            sketch.ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
        }
        update() {
            this.draw()
        }
    }
    
    class Particle {
        constructor(x, y, radius, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.velocity = velocity;
        }
        draw() {
            sketch.fill(100);
            sketch.ellipse(this.x, this.y, this.radius *2, this.radius*2)
        }
        update() {
            this.draw()
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }

}

let vacuum = (sketch) => {
    let tube;
    let floor;
    let turnOn;
    let turnOff;
    let poop;
    
    sketch.preload = () => {
        tube = sketch.loadImage('assets/tube.png');
        floor = sketch.loadImage('assets/floor.jpg')
        // turnOn = sketch.loadSound('assets/turn-on.mp3'); 
        // turnOff = sketch.loadSound('assets/turn-off.mp3');
        poop = sketch.loadImage('assets/poop.png')
    }
    
    
    sketch.setup = () => {
    
        const canvas = sketch.createCanvas(600, 400);
        canvas.id("vacuum");
    
        sketch.image(floor, 0, 0, sketch.width, sketch.height);
    
        for (i=0; i<10; i++){
            enemy_x = Math.random() * sketch.width;
            enemy_y = Math.random() * sketch.height;
            radius = Math.random() * (20-4) +4;
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
            enemies.push(new Enemy(enemy_x, enemy_y, radius, color));
        }
    
    }
    
    
    sketch.draw = () => {
        sketch.image(floor, 0, 0, sketch.width, sketch.height);
    
        // dirt
        enemies.forEach( (enemy) => {
            enemy.draw();
        })
        
        // vacuum tube
        sketch.image(tube, sketch.mouseX-30, sketch.mouseY-30, sketch.width*1.2, sketch.height*1.2);
    
    
        // turn vacuum on when mouse pressed
        if (sketch.mouseIsPressed) {
            sketch.fill(0);
            enemies.forEach( (enemy, index) => {        
                const dist = Math.hypot(enemy.x - sketch.mouseX, enemy.y - sketch.mouseY)
                if (dist < 30) {
                    enemies.splice(index, 1);
                }
            })
            sketch.ellipse(sketch.mouseX, sketch.mouseY,120,120);
    
            // turnOn.play();
            // turnOff.stop();
    
    
    
        } else{
            sketch.fill(255);
            sketch.ellipse(sketch.mouseX, sketch.mouseY,120,120);
    
            // turnOff.play();
            // turnOn.stop();
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
            sketch.fill(211);
            sketch.image(poop, this.x, this.y, 2*this.radius, 2*this.radius);
    
        }
        update() {
            this.draw()
        }
    }
    
    enemies = []    
}

let hockey = (sketch) => {
    let speedX;
    let speedY;
    let score = 0;
    const scoreEl = document.getElementById("scoreSpan");
    
    sketch.preload = () => {
        course = sketch.loadImage('assets/hockey.jpg', () => console.log("success"),(event) => console.log("error") );
        puck = sketch.loadImage('assets/puck.png')
        stick = sketch.loadImage('assets/hockeystick.png')
        // flag = sketch.loadImage('assets/flag.png')
    }
    
    
    sketch.setup = () => {
        const canvas = sketch.createCanvas(600, 400);
        canvas.id("hockey");
        sketch.image(course, 0, 0, sketch.width, sketch.height);
        radius = 15;
        ball_x = Math.random() * (sketch.width+2*radius) - 2*radius;
        ball_y = sketch.height - 50;
        radius = 15;
        ball = new Puck(ball_x, ball_y, radius, {x: 0, y:0}, 0.97)
        goal = new Goal(sketch.width/2 +10, sketch.height/2 - 170, 25)
        scoreEl.innerHTML = score;
    }
    
    
    sketch.draw = () => {
        //background
        sketch.image(course, 0, 0, sketch.width, sketch.height);
    
        // hole
        goal.update()
    
        // ball hit by club
        const dist = Math.hypot(ball.x - sketch.mouseX, ball.y - sketch.mouseY)
        if (dist < 20) {
            speedX = sketch.winMouseX - sketch.pwinMouseX;
            speedY = sketch.winMouseY - sketch.pwinMouseY;
            ball.velocity.x = speedX;
            ball.velocity.y = speedY;
        }
    
        //ball moves
        ball.velocity.x *=ball.friction;
        ball.velocity.y *=ball.friction;
        ball.update()
    
        //club
        sketch.image(stick, sketch.mouseX-45, sketch.mouseY-85, 100, 100)
    
        // check if ball entered hole
        const goal_center_x = goal.x;
        const goal_center_y = goal.y;
        const ball_center_x = ball.x + ball.radius;
        const ball_center_y = ball.y + ball.radius;
    
        let gameover = false
    
    
        const dist_to_goal = Math.hypot(goal_center_x - ball_center_x, goal_center_y - ball_center_y)
        if (dist_to_goal <= (ball.radius)*2 && gameover === false){        
            score =1;
            gameover = true;
            scoreEl.innerHTML= score;
            // setup();
        }
    
    
    }
    
    
    class Puck {
        constructor(x, y, radius, velocity, friction) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.velocity = velocity;
            this.friction = friction;
        }
        draw() {
            sketch.image(puck,this.x,this.y,this.radius*2,this.radius*2);
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
        }
        draw() {
            sketch.fill(0);
            sketch.ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
        }
        update() {
           // this.draw()
        }
    }
}

let popcorn = (sketch) => {
    let gym;
    let currentImage;
    let current =0;
    
    
    var img = new Array();
    img[0] = new Image();
    img[0].src = 'assets/ezgif.com-gif-maker (6).png';
    
    img[1] = new Image();
    img[1].src = 'assets/ezgif.com-gif-maker (7).png';
    
    img[2] = new Image();
    img[2].src = 'assets/ezgif.com-gif-maker (8).png';
    
    img[3] = new Image();
    img[3].src = 'assets/ezgif.com-gif-maker (9).png';
    
    img[4] = new Image();
    img[4].src = 'assets/ezgif.com-gif-maker (11).png';
    
    img[5] = new Image();
    img[5].src = 'assets/ezgif.com-gif-maker (12).png';
    
    img[6] = new Image();
    img[6].src = 'assets/ezgif.com-gif-maker (13).png';
    
    img[7] = new Image();
    img[7].src = 'assets/ezgif.com-gif-maker (14).png';
    
    img[8] = new Image();
    img[8].src = 'assets/ezgif.com-gif-maker (15).png';
    
    sketch.preload = () => {
        gym = sketch.loadImage('assets/background.jpg');
        chipsBag = sketch.loadImage('assets/chips.jpg');
        eatingSound = sketch.loadSound('assets/chips.mp3');
        currentImage = sketch.loadImage(img[0].src);
        console.log("preloaded!")
    }
    
    sketch.setup = () => {
        canvas = sketch.createCanvas(600, 400);
        canvas.id="popcorn";
        console.log("setup!");
    }
    
    sketch.draw = () => {
        sketch.image(gym, 0, 0, sketch.width, sketch.height); // show background image
        sketch.image(currentImage,400,200,100,200); // show updated image
    }
    
    sketch.mousePressed = () => {
        eatingSound.play();
        current+=1;
        if(current < 9){
        console.log("Change image");
        currentImage = sketch.loadImage(img[current].src);
        console.log(current);
        }
    
    }    

}






document.addEventListener('DOMContentLoaded', () => {

    const width = 28
    const grid = document.querySelector('.grid')

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
        0,4,4,4,4,4,0,1,1,0,1,2,2,2,2,2,2,1,0,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    ]
  
    const squares = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
  
        //add layout to the board
        if (layout[i] === 1) {
          squares[i].classList.add('wall')
        }
      }
    }
    createBoard()

    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }

    //starting position of pac-man
    //let pacmanCurrentIndex = 729
    let pacmanCurrentIndex = 29
    squares[pacmanCurrentIndex].classList.add('pac-man')

    //move pac-man
    function movePacman(e){

        squares[pacmanCurrentIndex].classList.remove('pac-man')
        squares[pacmanCurrentIndex].classList.remove('manWater')

        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall')) 
                pacmanCurrentIndex -=1
                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall')) 
                pacmanCurrentIndex -=width
                break
            case 39:
                if(pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains('wall')) 
                pacmanCurrentIndex +=1
                break;
            case 40:
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall')) 
                pacmanCurrentIndex +=width
                break
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')

        var audio = new Audio("assets/Water_Ch.mp3")

        if(pacmanCurrentIndex === 349){
            squares[pacmanCurrentIndex].classList.add('manWater')
            audio.play();

        }
    }
    document.addEventListener('keyup', movePacman)

    let plantIndex = 377

    squares[plantIndex].classList.add('plant')
    
})


let milk = (sketch) => {
        // suppl vars
    let arm;
    let shelf;

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

    sketch.preload = () => {
        //supple
        arm = sketch.loadImage('assets/arm.png');
        shelf = sketch.loadImage('assets/grocery.jpg');

        //audio
        grocery = sketch.loadSound('assets/grocery.mp3');
        cash = sketch.loadSound('assets/cash.mp3');
        wrong = sketch.loadSound('assets/buzzerWrong.mp3');

        //grocery items
        milk = sketch.loadImage('assets/milk.png');
        eggs = sketch.loadImage('assets/eggs.png');
        pasta = sketch.loadImage('assets/pasta.png');
        grapes = sketch.loadImage('assets/grapes.png');
        oreo = sketch.loadImage('assets/oreo.png');
    }

    sketch.setup = () => {
        canvas = sketch.createCanvas(600, 400);
        canvas.id("milk");
        sketch.image(shelf, 0, 0, width, height);

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

    sketch.draw = () => {
        sketch.image(shelf, 0, 0, sketch.width, sketch.height);


        // dirt
        enemies.forEach( (enemy) => {
            // console.log(Object.values(enemy)[0])
            Object.values(enemy)[0].draw();
        })
        
        // arm
        sketch.image(arm, sketch.mouseX-30, sketch.mouseY-30, sketch.width, sketch.height);

        // cha-ching when mouse pressed on grocery item
        if (sketch.mouseIsPressed) {
            sketch.fill(0);
            enemies.forEach( (enemy, index) => {        
                const dist = Math.hypot(Object.values(enemy)[0].x - sketch.mouseX, Object.values(enemy)[0].y - sketch.mouseY)
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
            sketch.fill(255);
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
            sketch.fill(211);
            // ellipse(this.x,this.y,2*this.radius,2*this.radius);
            sketch.image(milk, this.x, this.y, 2*this.radius, 2*this.radius);

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
            sketch.fill(211);
            // ellipse(this.x,this.y,2*this.radius,2*this.radius);
            sketch.image(eggs, this.x, this.y, 3*this.radius, 2*this.radius);

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
            sketch.fill(211);
            sketch.image(grapes, this.x, this.y, 3*this.radius, 2*this.radius);

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
            sketch.fill(211);
            sketch.image(pasta, this.x, this.y, 3*this.radius, 2*this.radius);

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
            sketch.fill(211);
            sketch.image(oreo, this.x, this.y, 2*this.radius, 2*this.radius);

        }
        update() {
            this.draw()
        }
    }

    enemies = []

}




let myp5_golf = new p5(golf);
let myp5_vacuum = new p5(vacuum);
let myp5_hockey = new p5(hockey);
let myp5_popcorn = new p5(popcorn);
let myp5_milk = new p5(milk);



// myp5_golf.style.display = "none"
// const water_canvas = window.getElementById("grid")
// water_canvas.canvas.style.display= "none";


// const golf_canvas = window.getElementById("golf")
// console.log(golf_canvas);

// golf_canvas.canvas.style.display= "none";
// golf.canvas.style.dsplay= "fixed";
