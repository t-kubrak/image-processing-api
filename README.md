# Image Processing Api

# UdaciRacer Simulator

This project is part of the
[Full Stack JavaSript Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067) 
program by Udacity. It provides a modifiable api to change image properties. Currently, it's able to resize the image with 
the specified width and height.



## Usage

1. `npm build && npm start` to build and run the server
2. Open the api url http://localhost:3000/api/images and enter parameters for image file name, width and height. 
For instance http://localhost:3000/api/images?filename=fjord&width=1280&height=720 will resize the image with name `fjord`
to have width `1280`px and height `720`px.
3. The images available for conversion are located in the `images/full` folder and the converted images are in the `images/thumb` folder.
Currently the code is able to process only the images with `.jpg` extension.

## Development
- `npm test` to run the tests
- `npm prettier` to style the code
- `npm lint` to lint the code