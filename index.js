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
let enemies = [];

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
    road = new Road();
    player = new Player();
    enemies.push(new Chicken("left"));

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
    ctx.fillText("clock: " + clock, 24, 24);
    ctx.fillText("seconds: " + Math.trunc(clock/30), 24, 48);
    
    // draw the road
    if(road.visible){
        road.Draw();
    }

    // default states
    player.forward = 0;
    player.crouch = 0;

    // check controls
    if(keys.includes('ArrowRight') || keys.includes('d')){
        if(player.forward != 1) player.forward = 1;
    }

    else if(keys.includes('ArrowLeft') || keys.includes('a')){
        if(player.forward != -1) player.forward = -1;
    }

    if(keys.includes('ArrowUp') || keys.includes('w')){
        if(player.upward == 0) player.upward = 1;
    }

    else if(keys.includes('ArrowDown') || keys.includes('s')){
        if(player.crouch == 0) player.crouch = 1;
    }

    // update objects
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].type == "Chicken"){

            let chicken = enemies[i];

            if(BoxCollision(player, chicken)){
                console.log("Collision detected!");
            }

            if(chicken.spawnloc == "left" && chicken.x > canvasWidth + chicken.thick + chicken.offset){
                enemies.splice(i, 1);
                enemies.push(new Chicken("right"));
            }
            else if(chicken.spawnloc == "right" && chicken.x < -chicken.thick - chicken.offset){
                enemies.splice(i, 1);
                enemies.push(new Chicken("left"));
            }
        }

        enemies[i].Update();
    }
    player.Update();
    requestAnimationFrame(Render);  
    
}