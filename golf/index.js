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

let myp5_golf = new p5(golf);
