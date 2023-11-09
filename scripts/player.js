class Player{
    constructor(){
        this.visible = true;

        // bounds
        this.thick = 32;
        this.tall = 32;
        this.offset = 5;    
        this.onFloor = BASE - this.tall - this.offset;    

        // directions
        this.forward = 0;
        this.upward = 0;

        // physics
        this.x = 40;
        this.y = this.onFloor;
        this.velx = 6;
        this.vely = 0;
        this.thrust = 10;

        // visuals
        this.sheet;
        this.sprite;
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
        this.sprite = Mort.idle1;
        this.sheet = new Image();
        this.sheet.src = Mort.path;
        this.thick = this.sprite.scaleX;
        this.tall = this.sprite.scaleY;
    }

    Update(){
        this.Move();
        this.Animate();
        if(this.visible){
            this.Draw();
        }
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
            if(this.y < this.onFloor){
                this.vely += GRAVITY;
            }
            else{
                this.vely = 0;
                this.upward = 0;
            }
        }

        // land
        if(this.y + this.vely > this.onFloor) this.y = this.onFloor;
        else this.y += this.vely;

    }

    Animate(){
        if(this.forward != 0){
            if(clock % 6 == 0) this.WalkAnimation();
        }
        else{
            if(clock % 6 == 0) this.IdleAnimation();
        }
    }    

    Draw() {
        ctx.save();
    
        if (this.face == "left") {
            ctx.translate(this.x + this.sprite.scaleX, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.sheet,
                this.sprite.cropX,
                this.sprite.cropY,
                this.sprite.cropWidth,
                this.sprite.cropHeight,
                0, this.y,
                this.sprite.scaleX,
                this.sprite.scaleY
            );
        }
        
        else if (this.face == "right") {
            ctx.drawImage(
                this.sheet,
                this.sprite.cropX,
                this.sprite.cropY,
                this.sprite.cropWidth,
                this.sprite.cropHeight,
                this.x, this.y,
                this.sprite.scaleX,
                this.sprite.scaleY
            );
        }
    
        ctx.restore();
    }    

    IdleAnimation(){
        if(this.idleFrame == "idle1"){
            this.sprite = Mort.idle2;
            this.idleFrame = "idle2";
        }
        else if(this.idleFrame == "idle2"){
            this.sprite = Mort.idle3;
            this.idleFrame = "idle3";
        }
        else if(this.idleFrame == "idle3"){
            this.sprite = Mort.idle4;
            this.idleFrame = "idle4";
        }
        else if(this.idleFrame == "idle4"){
            this.sprite = Mort.idle1;
            this.idleFrame = "idle1";
        }

    }

    WalkAnimation(){
        if(this.walkFrame == "walk1"){
            this.sprite = Mort.walk2;
            this.walkFrame = "walk2";
        }
        else if(this.walkFrame == "walk2"){
            this.sprite = Mort.walk3;
            this.walkFrame = "walk3";
        }
        else if(this.walkFrame == "walk3"){
            this.sprite = Mort.walk4;
            this.walkFrame = "walk4";
        }
        else if(this.walkFrame == "walk4"){
            this.sprite = Mort.walk5;
            this.walkFrame = "walk5";
        }
        else if(this.walkFrame == "walk5"){
            this.sprite = Mort.walk6;
            this.walkFrame = "walk6";
        }
        else if(this.walkFrame == "walk6"){
            this.sprite = Mort.walk1;
            this.walkFrame = "walk1";
        }
    }
}