/**
 * Complex number class
 * z = a + bi
 * a - real part
 * b - imaginary part
 * z = r * e^(i * phi)
 * r - magnitude
 * phi - phase
 * @class ComplexNumber
 * @param {number} real
 * @param {number} imaginary
 * @return {ComplexNumber}
 * @see https://en.wikipedia.org/wiki/Complex_number
 * @see https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/complex-number
 */

class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add(other) {
        return new ComplexNumber(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

    Add(one, two) {
        return new ComplexNumber(
            one.real + two.real,
            one.imaginary + two.imaginary
        );
    }

    subtract(other) {
        return new ComplexNumber(
            this.real - other.real,
            this.imaginary - other.imaginary
        );
    }

    Subtract(one, two) {
        return new ComplexNumber(
            one.real - two.real,
            one.imaginary - two.imaginary
        );
    }

    multiply(other) {
        const real = this.real * other.real - this.imaginary * other.imaginary;
        const imaginary =
            this.real * other.imaginary + this.imaginary * other.real;
        return new ComplexNumber(real, imaginary);
    }

    Multiply(one, two) {
        const real = one.real * two.real - one.imaginary * two.imaginary;
        const imaginary = one.real * two.imaginary + one.imaginary * two.real;
        return new ComplexNumber(real, imaginary);
    }

    divide(other) {
        const denominator = other.real ** 2 + other.imaginary ** 2;
        const real =
            (this.real * other.real + this.imaginary * other.imaginary) /
            denominator;
        const imaginary =
            (this.imaginary * other.real - this.real * other.imaginary) /
            denominator;
        return new ComplexNumber(real, imaginary);
    }

    Divide(one, two) {
        const denominator = two.real ** 2 + two.imaginary ** 2;
        const real =
            (one.real * two.real + one.imaginary * two.imaginary) / denominator;
        const imaginary =
            (one.imaginary * two.real - one.real * two.imaginary) / denominator;
        return new ComplexNumber(real, imaginary);
    }

    magnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    phase() {
        return Math.atan2(this.imaginary, this.real);
    }

    toPolar() {
        return {
            r: this.magnitude(),
            phi: this.phase(),
        };
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

// Usage example:
// const complex1 = new ComplexNumber(2, 3);
// const complex2 = new ComplexNumber(4, -1);

// console.log(complex1.add(complex2).toString()); // Output: 6 + 2i
// console.log(complex1.subtract(complex2).toString()); // Output: -2 + 4i
// console.log(complex1.multiply(complex2).toString()); // Output: 11 + 10i
