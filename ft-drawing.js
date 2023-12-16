var sketch_sawtooth = function (sketch) {
    let time = 0;
    let path = { x: [], y: [] };
    let slider, canvas;
    sketch.setup = function () {
        canvas = sketch.createCanvas(
            0.69 * sketch.windowWidth,
            0.69 * sketch.windowHeight
        );
        slider = sketch.createSlider(1, 10, 1);
        html_slider_value = document.getElementById("slider-value");
        html_slider_value.style.position = "relative";
        html_slider_value.style.left = 0.4 * canvas.width + "px";
        html_slider_value.style.top = -0.1 * canvas.height + "px";
        html_slider = document.getElementById("slider");
        html_slider.style.position = "relative";
        html_slider.style.left = 0.2 * canvas.width + "px";
        html_slider.style.top = -0.1 * canvas.height + "px";

        // attach to DOM with id=sawtooth
        canvas.parent("sawtooth");
        slider.parent("slider");
    };

    sketch.sawtooth = function (n) {
        // returns fourier transform of (1/1)*sin(1*t) + (1/2)*sin(2*t) + ... + (1/n)*sin(n*t)
        let t = 0;
        let scale = 100;
        if (n < 5) {
            t = linspace(0, 2 * Math.PI, 100);
        } else {
            t = linspace(0, 2 * Math.PI, 25 * n);
        }
        let inp = [];
        for (let i = 0; i < t.length; i++) {
            inp[i] = new ComplexNumber(0, 0);
            for (let j = 1; j <= n; j++) {
                inp[i] = inp[i].add(
                    new ComplexNumber((scale / j) * Math.sin(j * t[i]), 0)
                );
            }
        }
        return discreteFourierTransform(inp);
    };

    sketch.draw = function () {
        html_slider_value.innerHTML = "N = " + slider.value();
        sketch.background(28, 28, 29);
        const x_translate = canvas.width / 3;
        const y_translate = canvas.height / 2;

        sketch.translate(x_translate, y_translate);

        let x = 0;
        let y = 0;

        let fourier = sketch.sawtooth(slider.value());
        let V = epiCycles(x, y, Math.PI / 2, fourier, time, sketch);
        path.x.unshift(V.x);
        path.y.unshift(V.y);

        sketch.translate(canvas.width / 4, 0);
        sketch.beginShape();
        sketch.noFill();
        sketch.stroke(255);
        for (let i = 0; i < path.y.length; i++) {
            sketch.vertex(i, path.y[i]);
        }
        sketch.line(V.x - canvas.width / 4, V.y, 0, V.y);
        sketch.endShape();

        const dt = (2 * Math.PI) / fourier.length;
        time += dt;

        slider.changed(() => {
            time = 0;
            path = { x: [], y: [] };
        });

        if (path.x.length > 500) {
            path.x.pop();
            path.y.pop();
        }
    };

    sketch.windowResized = function () {
        sketch.resizeCanvas(
            0.69 * sketch.windowWidth,
            0.69 * sketch.windowHeight
        );
        html_slider_value = document.getElementById("slider-value");
        html_slider_value.style.position = "relative";
        html_slider_value.style.left = 0.2 * canvas.width + "px";
    };
};

var sketch_batman = function (sketch) {
    let time = 0;
    let path = { x: [], y: [] };
    let x_vals = [];
    let y_vals = [];
    let fourierX, fourierY, canvas;
    sketch.setup = function () {
        canvas = sketch.createCanvas(
            0.69 * sketch.windowWidth,
            0.69 * sketch.windowHeight
        );
        // attach to DOM with id=batman
        canvas.parent("batman");
        for (let i = 0; i < batman.length; i += 10) {
            x_vals.push(new ComplexNumber(batman[i].x, 0));
            y_vals.push(new ComplexNumber(batman[i].y, 0));
        }
        fourierX = discreteFourierTransform(x_vals);
        fourierY = discreteFourierTransform(y_vals);
    };

    sketch.draw = function () {
        sketch.background(28, 28, 29);
        const x_translate = canvas.width / 3;
        const y_translate = canvas.height / 2;

        sketch.translate(x_translate, y_translate);

        let Vx = epiCycles(
            canvas.width / 10,
            canvas.height / 5,
            0,
            fourierX,
            time,
            sketch
        );
        let Vy = epiCycles(
            canvas.width / 2,
            -canvas.height / 5,
            Math.PI / 2,
            fourierY,
            time,
            sketch
        );
        path.x.unshift(Vx.x);
        path.y.unshift(Vy.y);
        sketch.line(Vx.x, Vx.y, Vx.x, Vy.y);
        sketch.line(Vy.x, Vy.y, Vx.x, Vy.y);

        sketch.beginShape();
        sketch.noFill();
        sketch.stroke(255);
        for (let i = 0; i < path.x.length; i++) {
            sketch.vertex(path.x[i], path.y[i]);
        }
        sketch.endShape();

        const dt = (2 * Math.PI) / fourierX.length;
        time += dt;

        if (path.x.length > 500) {
            path.x.pop();
            path.y.pop();
        }
    };
    sketch.windowResized = function () {
        sketch.resizeCanvas(
            0.69 * sketch.windowWidth,
            0.69 * sketch.windowHeight
        );
    };
};

var sketch_user = function (sketch) {
    let USERINPUT = [];
    let FOURIER = false;
    let path = { x: [], y: [] };
    let time = 0;
    let fourier, canvas;

    sketch.validMouse = function () {
        if (
            sketch.mouseX > 0 &&
            sketch.mouseX < canvas.width &&
            sketch.mouseY > 0 &&
            sketch.mouseY < canvas.height
        ) {
            return true;
        }
        return false;
    };

    sketch.setup = function () {
        canvas = sketch.createCanvas(
            0.69 * sketch.windowWidth,
            0.69 * sketch.windowHeight
        );
        sketch.background(28, 28, 29);
        sketch.textAlign(sketch.CENTER);
        sketch.textSize(64);
        sketch.fill(255);
        sketch.textFont("inherit");
        sketch.text("draw something", canvas.width / 2, canvas.height / 2);
        // attach to DOM with id=user
        canvas.parent("user");
    };

    sketch.draw = function () {
        if (sketch.mouseIsPressed == true && sketch.validMouse()) {
            sketch.background(28, 28, 29);
            path = { x: [], y: [] };
            time = 0;
            USERINPUT.push(
                new ComplexNumber(
                    sketch.mouseX - canvas.width / 2,
                    sketch.mouseY - canvas.height / 2
                )
            );
            FOURIER = true;
            sketch.stroke(255, 0, 255);
            sketch.noFill();
            sketch.beginShape();
            for (let i = 0; i < USERINPUT.length; i++) {
                sketch.vertex(
                    USERINPUT[i].real + canvas.width / 2,
                    USERINPUT[i].imaginary + canvas.height / 2
                );
            }
            sketch.endShape();
            fourier = discreteFourierTransform(USERINPUT);
        }

        if (FOURIER == true && sketch.mouseIsPressed == false) {
            sketch.background(28, 28, 29);
            USERINPUT = [];
            let V = epiCycles(
                canvas.width / 2,
                canvas.height / 2,
                0,
                fourier,
                time,
                sketch
            );
            path.x.unshift(V.x);
            path.y.unshift(V.y);
            sketch.beginShape();
            sketch.stroke(255);
            sketch.noFill();
            for (let i = 0; i < path.x.length; i++) {
                sketch.vertex(path.x[i], path.y[i]);
            }
            sketch.endShape();
            const dt = (2 * Math.PI) / fourier.length;
            time += dt;
            if (path.x.length > 1000) {
                path.x.pop();
                path.y.pop();
            }
        }
    };
    sketch.windowResized = function () {
        sketch.resizeCanvas(
            0.69 * sketch.windowWidth,
            0.69 * sketch.windowHeight
        );
    };
};

new p5(sketch_sawtooth, "sawtooth");
new p5(sketch_batman, "batman");
new p5(sketch_user, "user");
