let USERINPUT = [];
let FOURIER = false;
let path = { x: [], y: [] };
let time = 0;
let fourier;

function setup() {
    canvas = createCanvas(0.8 * screen.width, 0.8 * screen.height).center(
        "horizontal"
    );
}

function draw() {
    background(28, 28, 29);
    if (mouseIsPressed == true) {
        path = { x: [], y: [] };
        time = 0;
        USERINPUT.push(
            new ComplexNumber(
                mouseX - canvas.width / 2,
                mouseY - canvas.height / 2
            )
        );
        console.log("mouse pressed");
        FOURIER = true;
        stroke(150);
        noFill();
        beginShape();
        for (let i = 0; i < USERINPUT.length; i++) {
            vertex(
                USERINPUT[i].real + canvas.width / 2,
                USERINPUT[i].imaginary + canvas.height / 2
            );
        }
        endShape();
        fourier = discreteFourierTransform(USERINPUT);
    }
    if (FOURIER == true && mouseIsPressed == false) {
        USERINPUT = [];
        let V = epiCycles(
            canvas.width / 2,
            canvas.height / 2,
            0,
            fourier,
            time
        );
        path.x.unshift(V.x);
        path.y.unshift(V.y);
        beginShape();
        noFill();
        stroke(253, 253, 150);
        for (let i = 0; i < path.x.length; i++) {
            vertex(path.x[i], path.y[i]);
        }
        endShape();
        const dt = TWO_PI / fourier.length;
        time += dt;
        if (path.x.length > 1000) {
            path.x.pop();
            path.y.pop();
        }
    }
}
