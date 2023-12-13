let time = 0;
let path = [];

let slider;

function setup() {
    canvas = createCanvas(0.8 * screen.width, 0.8 * screen.height).center(
        "horizontal"
    );
    slider = createSlider(1, 10, 1);
    slider.position(0.1 * screen.width, -0.07 * canvas.height, "relative");
    html_slider = document.getElementById("slider-value");
    html_slider.style.position = "relative";
    html_slider.style.left = -0.35 * canvas.width + "px";
    html_slider.style.top = -0.02 * canvas.height + "px";
}

function draw() {
    html_slider.innerHTML = "n = " + slider.value();
    background(28, 28, 29);
    const x_translate = canvas.width / 3;
    const y_translate = canvas.height / 2;

    translate(x_translate, y_translate);

    let x = 0;
    let y = 0;

    let fourier = sumofsins(slider.value());
    let v = epiCycles(x, y, HALF_PI, fourier, time);
    path.unshift(v);

    translate(canvas.width / 4, 0);
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(i, path[i].y);
    }
    line(v.x - canvas.width / 4, v.y, 0, v.y);
    endShape();

    const dt = TWO_PI / fourier.length;
    time += dt;

    slider.changed(() => {
        time = 0;
        path = [];
    });

    if (time > 10 * TWO_PI) {
        time = 0;
        path = [];
    }
}
