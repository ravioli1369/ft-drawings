let time = 0;
let path = { x: [], y: [] };
let x_vals = [];
let y_vals = [];
let fourierX;
let fourierY;

function setup() {
    canvas = createCanvas(0.8 * screen.width, 0.8 * screen.height).center(
        "horizontal"
    );

    for (let i = 0; i < batman.length; i += 10) {
        x_vals.push(batman[i].x);
        y_vals.push(batman[i].y);
    }
    fourierX = discreteFourierTransform(x_vals);
    fourierY = discreteFourierTransform(y_vals);
}

function draw() {
    background(28, 28, 29);
    const x_translate = canvas.width / 3;
    const y_translate = canvas.height / 2;

    translate(x_translate, y_translate);

    let Vx = epiCycles(canvas.width / 4, -canvas.height / 5, 0, fourierX, time);
    let Vy = epiCycles(
        -canvas.height / 4,
        canvas.height / 5,
        HALF_PI,
        fourierY,
        time
    );
    path.x.unshift(Vx.x);
    path.y.unshift(Vy.y);
    line(Vx.x, Vx.y, Vx.x, Vy.y);
    line(Vy.x, Vy.y, Vx.x, Vy.y);

    beginShape();
    noFill();
    for (let i = 0; i < path.x.length; i++) {
        vertex(path.x[i], path.y[i]);
        console.log(path.x[i], path.y[i]);
    }
    endShape();

    const dt = TWO_PI / fourierX.length;
    time += dt;

    if (time > 10 * TWO_PI) {
        time = 0;
        path = [];
    }
}
