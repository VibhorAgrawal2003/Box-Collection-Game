class Player{
    constructor(){
        this.visible = true;

        // physics
        this.x = START_X;
        this.y = START_Y;
        this.velx = START_VELX;
        this.vely = START_VELY;
        this.thrust = 10;

        // bounds
        this.thick;
        this.tall;
        this.offset = 5;

        // directions
        this.forward = 0;
        this.upward = 0;

        // visuals
        this.sprite;
        this.character;
        this.sequence = "idle";
        this.idleFrame = "idle1";
        this.walkFrame = "walk1";
        this.face = "right";
    }

    Hitbox(){
        return {
            left: this.x + this.offset,
            right: this.x + this.thick - this.offset,
            up: this.y,
            down: this.y + this.tall
        }
    }


    Load(){
        this.character = Mort.idle1;
        this.sprite = new Image();
        this.sprite.src = Mort.path;
        this.thick = this.character.scaleX;
        this.tall = this.character.scaleY;
    }

    Draw() {
        ctx.save();
    
        if (this.face == "left") {
            ctx.translate(this.x + this.character.scaleX, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.sprite,
                this.character.cropX,
                this.character.cropY,
                this.character.cropWidth,
                this.character.cropHeight,
                0, this.y,
                this.character.scaleX,
                this.character.scaleY
            );
        }
        
        else if (this.face == "right") {
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
        }
    
        ctx.restore();
    }

    Update(){
        this.Move();
        this.Animate();
    } 

    Move(){
        // walk
        if(this.forward == 1 && this.x < canvasWidth- this.thick){
            this.x += this.velx;
            this.face = "right";
        }
        else if(this.forward == -1 && this.x > 0){
            this.x -= this.velx;
            this.face = "left";
        }

        // jump
        if(this.upward == 1){
            this.vely -= this.thrust;
            this.upward = -1;
        }
        else if(this.upward == -1){
            if(this.y < ON_FLOOR){
                this.vely += GRAVITY;
            }
            else{
                this.vely = 0;
                this.upward = 0;
            }
        }
        this.y += this.vely;

    }

    Animate(){
        if(this.forward != 0){
            if(clock % 6 == 0) this.WalkAnimation();
        }
        else{
            if(clock % 6 == 0) this.IdleAnimation();
        }
    }    

    IdleAnimation(){
        if(this.idleFrame == "idle1"){
            this.character = Mort.idle2;
            this.idleFrame = "idle2";
        }
        else if(this.idleFrame == "idle2"){
            this.character = Mort.idle3;
            this.idleFrame = "idle3";
        }
        else if(this.idleFrame == "idle3"){
            this.character = Mort.idle4;
            this.idleFrame = "idle4";
        }
        else if(this.idleFrame == "idle4"){
            this.character = Mort.idle1;
            this.idleFrame = "idle1";
        }

    }

    WalkAnimation(){
        if(this.walkFrame == "walk1"){
            this.character = Mort.walk2;
            this.walkFrame = "walk2";
        }
        else if(this.walkFrame == "walk2"){
            this.character = Mort.walk3;
            this.walkFrame = "walk3";
        }
        else if(this.walkFrame == "walk3"){
            this.character = Mort.walk4;
            this.walkFrame = "walk4";
        }
        else if(this.walkFrame == "walk4"){
            this.character = Mort.walk5;
            this.walkFrame = "walk5";
        }
        else if(this.walkFrame == "walk5"){
            this.character = Mort.walk6;
            this.walkFrame = "walk6";
        }
        else if(this.walkFrame == "walk6"){
            this.character = Mort.walk1;
            this.walkFrame = "walk1";
        }
    }
}