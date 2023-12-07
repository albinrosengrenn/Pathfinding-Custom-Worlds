import {Room} from "./room.js";
export class World {
    constructor(rooms, type){
        this.data = new Array(rooms);
        this.generateWorld(type);
    }

    generateWorld(type){
        switch (type){
            case "string":
                this.generateStringWorld();
                break;
            case "circle":
                this.generateCircleWorld();
                break;
            case "square":
                /*if(!Number.isInteger(Math.sqrt(parseInt(document.querySelector("#rooms").value)))){
                    break;
                }*/
                this.generateSquareWorld();
                break;
        }
    }

    generateStringWorld(){
        for(let i = 0; i < this.data.length; i++){
            let room = new Room;
            room.id = i;
            room.name = room.generateRoomName();
            room.exits = i == 0 ? [i+1]
                : i == this.data.length-1 ? [i-1]
                : [i-1, i+1];
            this.data[i] = room;
        }
    }

    generateCircleWorld(){
        for(let i = 0; i < this.data.length; i++){
            let room = new Room;
            room.id = i;
            room.name = room.generateRoomName();
            room.exits = i == 0 ? [this.data.length-1, i+1]
                : i == this.data.length-1 ? [i-1, 0]
                : [i-1, i+1];
            this.data[i] = room;
        }
    }
    
    generateSquareWorld(){
        let dimension = Math.floor(Math.sqrt(this.data.length));
        let roomJ = 0;
        let roomI = 0;

        for(let i = 0; i < this.data.length; i++){
            let room = new Room;
            room.id = i;
            if(roomI>=dimension){
                roomI = 0;
            }
            room.i = roomI;
            if(i%dimension == 0 && i != 0){
                roomJ++;
            }
            room.j = roomJ;
            room.name = room.generateRoomName();
            room.exits = i == 0 ? [i+1, i+dimension, i+dimension+1] //top-left corner
                : i == dimension-1 ? [i-1, i+dimension, i+dimension-1] //top-right corner
                : i == this.data.length-dimension ? [i-dimension, i+1, i-dimension+1] //bottom-left corner
                : i == this.data.length-1 ? [i-1, i-dimension, i-dimension-1] //bottom-right corner
                : i % dimension == 0 ? [i-dimension, i+1, i+dimension, i-dimension+1, i+dimension+1] //left column (excluding corners)
                : (i + 1) % dimension == 0 ? [i-dimension, i-1, i+dimension, i-dimension-1, i+dimension-1] //right column (excluding corners)
                : i < dimension ? [i-1, i+1, i+dimension, i+dimension+1, i+dimension-1] //top row (excluding corners)
                : i > this.data.length-dimension-1 ? [i-1, i+1, i-dimension, i-dimension-1, i-dimension+1] //bottom row (excluding corners)
                : [i-1, i+1, i-dimension, i+dimension, i+dimension-1, i+dimension+1, i-dimension-1, i-dimension+1]; //all other rooms
            this.data[i] = room;
            roomI++;
        }
    }
}