// Canvas variables
let canvas;
let ctx;
let canvasWidth = ABSOLUTE_WIDTH;
let canvasHeight = ABSOLUTE_HEIGHT;
let onFloor = ABSOLUTE_HEIGHT - GROUND_DEPTH;

// Dynamic variables
let keys = [];
let clock = 0;

// Game objects
let player;
let road;

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas(){

    // load game canvas
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.strokeStyle = '#6de373';
    ctx.fillStyle = '#6de373';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // create game objects
    player = new Player();
    road = new Road();
    player.Load();

    // enable key presses
    document.body.addEventListener("keydown", function(event){
        const key = event.key;

        if(!keys.includes(key)){
            keys.push(key);
        }

    });

    document.body.addEventListener("keyup", function(event){
        const key = event.key;
        const index = keys.indexOf(key);
        if(index !== -1){
            keys.splice(index, 1);
        }
    });

    Render();
}


function Render(){
    clock += 1;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000"
    ctx.fillText("x left->right", 5, 30);
    ctx.fillText("y up->down", 5, 50);

    // draw the road
    if(road.visible){
        road.Draw();
    }

    // check controls
    player.forward = 0;
    if(keys.includes('ArrowRight') || keys.includes('d')){
        player.forward = 1;
    }

    if(keys.includes('ArrowLeft') || keys.includes('a')){
        player.forward = -1;
    }

    if(player.upward == 0){
        if(keys.includes('ArrowUp') || keys.includes('w')){
            player.upward = 1;
        }
    }

    // draw the player
    player.Update();
    if(player.visible){
        player.Draw();
    }

    requestAnimationFrame(Render);  
          
}