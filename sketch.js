import {sketch} from "p5js-wrapper"

sketch.setup=function(){
    createCanvas(800,800);
}

sketch.draw = function() {
    background(220);
    ellipse(50,50,80,80);
}