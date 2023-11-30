class World {
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
                if(!Number.isInteger(Math.sqrt(parseInt(document.querySelector("#rooms").value)))){
                    break;
                }
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
        for(let i = 0; i < this.data.length; i++){
            let room = new Room;
            room.id = i;
            room.name = room.generateRoomName();
            room.exits = i == 0 ? [i+1, i+dimension] //top-left corner
                : i == dimension-1 ? [i-1, i+dimension] //top-right corner
                : i == this.data.length-dimension ? [i-dimension, i+1] //bottom-left corner
                : i == this.data.length-1 ? [i-1, i-dimension] //bottom-right corner
                : i % dimension == 0 ? [i-dimension, i+1, i+dimension] //left column (excluding corners)
                : (i + 1) % dimension == 0 ? [i-dimension, i-1, i+dimension] //right column (excluding corners)
                : i < dimension ? [i-1, i+1, i+dimension] //top row (excluding corners)
                : i > this.data.length-dimension-1 ? [i-1, i+1, i-dimension] //bottom row (excluding corners)
                : [i-1, i+1, i-dimension, i+dimension]; //all other rooms
            this.data[i] = room;
        }
    }
}