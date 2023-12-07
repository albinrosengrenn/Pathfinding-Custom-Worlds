import {sketch} from "p5js-wrapper";
import {World} from "./world.js";

function removeFromArray(arr, element){
    for (let i = arr.length-1; i >= 0; i--){
        if(arr[i] == element){
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b){
    let d = dist(a.i, a.j, b.i, b.j);
    return d;
}

let myWorld;
let openSet = [];
let closedSet = [];
let start;
let end;
let sideLength;
let path = [];
let current;

sketch.setup=function(){
    createCanvas(500,500);

    myWorld = new World(2500, "square");
    console.log(myWorld.data)
    console.log(myWorld.data.length)

    sideLength = width / Math.floor(Math.sqrt(myWorld.data.length))

    start = myWorld.data[0];
    end = myWorld.data[myWorld.data.length-1];
    start.terrain = false;
    end.terrain = false;
    openSet.push(start);
}

sketch.draw = function() {
    if(openSet.length > 0){
        let winner = 0;
        for(let i = 0; i < openSet.length; i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }
        current = openSet[winner];
        if(openSet[winner] === end){
            console.log("DONE!");
            noLoop();
        }

        removeFromArray(openSet, current)
        closedSet.push(current);

        let neighbors = current.exits;
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = myWorld.data[neighbors[i]];
            
            if(!closedSet.includes(neighbor) && !neighbor.terrain){
                let tempG = current.g + 1;
                let newPath = false;
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else{
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if(newPath){
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current; 
                }
                
            }
        }
    } else {
        console.log("no solution");
        noLoop();
        return;
    }

    background(0);

    for(let i = 0; i < myWorld.data.length; i++){
        myWorld.data[i].show(color(255))
    }

    for(let i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255,0,0))
    }

    for(let i = 0; i < openSet.length; i++){
        openSet[i].show(color(0,255,0))
    }


    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
    }

    for(let i = 0; i < path.length; i++){
        path[i].show(color(0,0,255));
    }
}