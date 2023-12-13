// function epiCycles(x, y, rotation, fourier, time) {
//     for (let i = 0; i < fourier.length; i++) {
//         let prevx = x;
//         let prevy = y;
//         let freq = i;
//         let radius = fourier[i].magnitude();
//         let phase = fourier[i].phase();
//         x += radius * cos(freq * time + phase + rotation);
//         y += radius * sin(freq * time + phase + rotation);

//         stroke(255, 100);
//         noFill();
//         ellipse(prevx, prevy, radius * 2);
//         stroke(255);
//         line(prevx, prevy, x, y);
//     }
//     return createVector(x, y);
// }

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
