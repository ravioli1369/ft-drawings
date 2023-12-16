# **Drawing with fourier transforms**

This repository contains the web implementation of the 3blue1brown video on [Pure Fourier series animation montage](https://www.youtube.com/embed/-qgreAUpPwM?si=gcAV4Bb7tZBcTmfO). The code is written in JavaScript and uses the [p5.js](https://p5js.org/) library for drawing the vectors.


Detailed explanation and demonstation of the code can be found in the article [drawing with fourier transforms](https://ravioli1369.github.io/blog/2023/drawing-with-fourier-transforms/).

## Brief overview

The code is divided into two parts:

- Helper functions: These are the functions that are used to generate the fourier series, the epicycles and the data structure for the complex numbers. 

    * `complex-numbers.js`: This file contains the data structure for complex number used throughout the project. 
    * `discrete-fourier-transform.js`: This file contains the implementation of the discrete fourier transform algorithm.
    * `functions.js`: This file contains the implementation of the functions used to generate the epicycles and a linear space similar to `np.linspace`.

- Main functions: These are the functions that are used to generate the graphics. 

    * `sawtooth.js`: The first canvas in the article.
    * `2dDrawing-batman.js`: The second canvas in the article.
    * `2dDrawing-user.js`: The third canvas in the article.
    * `ft-drawings.js`: Combination of the above three to make use of `divs` and show all three canvases in one page.

# **References**

- [3blue1brown](https://www.youtube.com/watch?v=r6sGWTCMz2k)
- [The Coding Train](https://www.youtube.com/watch?v=Mm2eYfj0SgA)
- [Wikipedia](https://en.wikipedia.org/wiki/Fourier_series)