let time = 0;
let wave = [];
let path = [];

let slider;

function setup() {
    createCanvas(600, 400);
    slider = createSlider(1, 10, 1);
}

function draw() {
    background(0);
    translate(150, 200);

    let x = 0;
    let y = 0;
    for (let i = 0; i < slider.value(); i++) {
        let prevx = x;
        let prevy = y;
        let radius = 80 / (i + 1);
        noFill();
        stroke(255);
        ellipse(x, y, radius * 2); // draw the circle
        // draw the point
        x += radius * cos((i + 1) * time);
        y += radius * sin((i + 1) * time);
        fill(255);
        stroke(255);
        line(prevx, prevy, x, y);
    }
    time += 0.05;
}
