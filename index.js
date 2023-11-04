let canvas;
let ctx;
let canvasWidth = 800;
let canvasHeight = 400;
let floorHeight = canvasHeight - 30;

let keys = [];
let boxes = [];
let player;
let road;

let score = 0;
let clock = 0;
let maxtime = 3000; 

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){
    // canvas
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // objects
    player = new Player();
    road = new Road();
    boxes.push(new Box());

    // loading
    player.Load();

    // key presses
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });

    Render();

}


function Render(){
    clock += 1;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score.toString(), 20, 24);
    ctx.fillText('Timer: ' + (Math.round((maxtime - clock)/50)).toString(), 20, 48);    

    // Draw the road
    if(road.visible){
        road.Draw();
    }

    player.forward = 0;
    if(keys[39]){ // Right Cursor pressed down
        player.forward = 1;
    }

    if(keys[37]){ // Left Cursor pressed down
        player.forward = -1;
    }

    // Draw the player
    player.Update();
    if(player.visible){
        player.Draw();
    }

    // Check collision
    for(let i=0; i<boxes.length; i++){
        if(BoxCollision(player, boxes[i])){
            boxes.splice(i, 1);
            score += 10;
        }
    }


    // Draw boxes
    for(let i=0; i<boxes.length; i++){
        boxes[i].Update();
        if(boxes[i].visible){
            boxes[i].Draw();
        }
        if(boxes[i].y >= floorHeight){
            boxes.splice(i, 1);
        }
    }

    // Add new box
    if(clock%50 == 0){
        boxes.push(new Box());
    }

    // frame selection
    if(clock == maxtime){
        Gameover();
    }
    else{
        requestAnimationFrame(Render);        
    }

}

function Gameover(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('GAME OVER!', 300, 200);
    ctx.fillText('Final Score: ' + score.toString(), 300, 240);    
}


class Road{
    constructor(){
        this.visible = true;
        this.x = 0;
        this.y = floorHeight;
        this.thick = canvasWidth;
        this.tall = 2;
        this.strokeColor = '#000';
        this.fillColor = '#000';
    }

    Draw(){
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.thick, this.tall);
    }
}

const Mort = {

    path : 'assets/sheets/mort.png',

    idle1 : {
        cropX : 0,
        cropY : 0,
        cropWidth : 24,
        cropHeight : 24,
        scaleX : 48,
        scaleY : 48
    },

    idle2 : {
        cropX : 24,
        cropY : 0,
        cropWidth : 24,
        cropHeight : 24,
        scaleX : 48,
        scaleY : 48
    }

}

class Player{
    constructor(){
        this.visible = true;
        this.x = 20;
        this.y = canvasHeight - 70;
        this.thick;
        this.tall;
        this.forward = 0;
        this.speed = 6;
        this.strokeColor = '#000';
        this.fillColor = '#000';
        this.sprite;
        this.character;
        this.frame = "idle1";
    }

    HitboxLeft(){
        return this.x;
    }

    HitboxRight(){
        return this.x + this.thick;
    }

    HitboxUp(){
        return this.y;
    }

    HitboxDown(){
        return this.y + this.tall;
    }

    Load(){

        this.character = Mort.idle1;
        this.sprite = new Image();
        this.sprite.src = Mort.path;
        this.thick = this.character.scaleX;
        this.tall = this.character.scaleY;
    }

    Draw(){

        ctx.drawImage(
            this.sprite,
            this.character.cropX,
            this.character.cropY,
            this.character.cropWidth,
            this.character.cropHeight,
            this.x, this.y,
            this.character.scaleX,
            this.character.scaleY
        );

        // ctx.strokeStyle = this.strokeColor;
        // ctx.fillStyle = this.fillColor;
        // ctx.fillRect(this.x, this.y, this.thick, this.tall);
    }

    IdleAnimation(){
        if(this.frame == "idle1"){
            this.character = Mort.idle2;
            this.frame = "idle2";
        }
        else if(this.frame == "idle2"){
            this.character = Mort.idle1;
            this.frame = "idle1";
        }

    }

    Update(){
        if(this.forward == 1 && this.x < canvasWidth- this.thick){
            this.x += this.speed;
        }
        else if(this.forward == -1 && this.x > 0){
            this.x -= this.speed;
        }

        if(clock%10 == 0){
            this.IdleAnimation();
        }
    }

}



class Box{
    constructor(){
        this.visible = true;
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = 0;
        this.thick = 10;
        this.tall = 10;
        this.speed = 3;
        this.falling = true;
        this.strokeColor = '#110000';
        this.fillColor = '#110000';
    }

    HitboxLeft(){
        return this.x;
    }

    HitboxRight(){
        return this.x + this.thick;
    }

    HitboxUp(){
        return this.y;
    }

    HitboxDown(){
        return this.y + this.tall;
    }    

    Draw(){
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.thick, this.tall);
    }

    Update(){
        this.y += this.speed;
    }

}


function BoxCollision(entity1, entity2){
    let c1, c2, c3, c4;

    c1 = entity2.HitboxLeft() <= entity1.HitboxRight();
    c2 = entity2.HitboxRight() >= entity1.HitboxLeft();
    c3 = entity2.HitboxUp() <= entity1.HitboxDown();
    c4 = entity2.HitboxDown() >= entity1.HitboxUp();

    return c1 && c2 && c3 && c4;
}
