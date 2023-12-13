let time = 0;
let wave = [];
let path = [];

let slider;

function setup() {
    canvas = createCanvas(0.8 * screen.width, 0.8 * screen.height).center(
        "horizontal"
    );
    slider = createSlider(1, 10, 1);
    slider.position(0.1 * screen.width, -0.05 * canvas.height, "relative");
}

function epiCycles(x, y, rotation, fourier) {
    for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2);
        stroke(255);
        line(prevx, prevy, x, y);
    }
    return createVector(x, y);
}

function linspace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / cardinality;
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + step * i);
    }
    return arr;
}

function sumofsins(n) {
    // returns fourier transform of sin(1*t) + sin(2*t) + ... + sin(n*t)
    let t = 0;
    let scale = 0;
    if (n < 5) {
        t = linspace(0, 2 * Math.PI, 100 * n);
        scale = 200;
    } else {
        t = linspace(0, 2 * Math.PI, 50 * n);
        scale = 400;
    }
    let inp = [];
    for (let i = 0; i < t.length; i++) {
        inp[i] = 0;
        for (let j = 1; j <= n; j++) {
            inp[i] += (scale / n) * sin(j * t[i]);
        }
    }
    return discreteFourierTransform(inp);
}

function draw() {
    html_slider = document.getElementById("slider-value");
    html_slider.innerHTML = "n = " + slider.value();
    html_slider.style.position = "relative";
    html_slider.style.left = -0.35 * canvas.width + "px";

    background(50);
    const x_translate = canvas.position().x + canvas.width / 5;
    const y_translate = canvas.position().y + canvas.height / 2.5;

    translate(x_translate, y_translate);

    let x = 0;
    let y = 0;

    fourier = sumofsins(slider.value());
    for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;
        let freq = i;
        let radius = fourier[i].magnitude();
        let phase = fourier[i].phase();
        noFill();
        stroke(255);
        ellipse(x, y, radius * 2); // draw the circle
        x += radius * cos(freq * time + phase + HALF_PI);
        y += radius * sin(freq * time + phase + HALF_PI);

        fill(255);
        stroke(255);
        line(prevx, prevy, x, y);
    }
    wave.unshift(y);
    translate(200, 0);
    line(x - 200, y, 0, wave[0]);
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();
    if (wave.length > 690) {
        wave.pop();
    }
    const dt = TWO_PI / fourier.length;
    time += dt;
}
