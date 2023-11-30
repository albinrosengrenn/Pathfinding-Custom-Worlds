class Room {
    constructor(){
        this.name = "";
        this.id = 0;
        this.exits = [];
        this.terrain = [];
    }

    generateRoomName(){
        let adjectives = ["a smiling", "a bright", "a handy", "a salty", "a determined", "a haunted", "a bloody", "a futuristic", "a sinister", "an abandoned", "a creepy", "a terrifying"];
        let rooms = ["kitchen", "bathroom", "hallway", "garage", "bedroom", "living room", "dining room", "basement", "attic", "office", "guest room", "play room", "study room"];
        let emotions = ["hopelessness", "satisfaction", "happiness", "anxiousness", "stress", "rage", "sorrow", "horror", "despair", "terror", "fury", "grief", "panic", "outrage", "melancholy", "resentment", "frustration"];
    
        let components = [adjectives, rooms, emotions]
    
        let string = "";

        for(let i = 0; i < components.length; i++){
            if(components[i] == emotions){
                string += "of " + components[i][Math.floor(Math.random() * components[i].length)];
            } else {
                string += components[i][Math.floor(Math.random() * components[i].length)] + " ";
            }
        }
        
        return string;
    }
}