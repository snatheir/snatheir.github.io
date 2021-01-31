let chipsBag;
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


function preload(){
    gym = loadImage('assets/background.jpg');
    chipsBag = loadImage('assets/chips.jpg');
    eatingSound = loadSound('assets/chips.mp3');
    currentImage = loadImage(img[0].src);
}

function setup() {
    createCanvas(600, 400);
}

function draw(){
    clear(); // hide the images
    image(gym, 50, 50, width, height); // show background image
    image(currentImage,400,200,100,200); // show updated image
}

function mousePressed() {
    eatingSound.play();
    current+=1;
    if(current < 9){
    console.log("Change image");
    currentImage = loadImage(img[current].src);
    console.log(current);
    }

}
