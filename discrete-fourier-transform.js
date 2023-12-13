/**
 * Discrete Fourier transform (DFT)
 * @class discreteFourierTransform
 * @param {number[]} input
 * @return {ComplexNumber[]}
 * @see https://en.wikipedia.org/wiki/Discrete_Fourier_transform
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/fourier-transform
 */

// import ComplexNumber from "./complex-number.js";

function discreteFourierTransform(input) {
    const N = input.length;
    let X = [];

    for (let k = 0; k < N; k++) {
        let sum = new ComplexNumber(0, 0);

        for (let n = 0; n < N; n++) {
            const phi = (2 * Math.PI * k * n) / N;
            const wn = new ComplexNumber(Math.cos(phi), -Math.sin(phi));
            const xn = new ComplexNumber(input[n], 0);
            const product = wn.multiply(xn);
            sum = sum.add(product);
        }
        sum = sum.divide(new ComplexNumber(N, 0));
        X[k] = sum;
    }

    return X;
}

// Usage example
// const input = [1, 2, 3, 4];
// const result = discreteFourierTransform(input);

// for (const res of result) {
//     console.log(res.toString());
// }
