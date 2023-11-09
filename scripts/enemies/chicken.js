class Chicken {
    constructor(){
        this.visible = true;

        // bounds
        this.thick = 32;
        this.tall = 34;
        this.offset = 28;
        this.onFloor = BASE - this.tall - this.offset; 

        // directions
        this.forward = 0;
        this.upward = 0;    

        // physics
        this.x = canvasWidth - 80;
        this.y = this.onFloor;
        this.velx = 0;
        this.vely = 0;
        this.thrust = 4;

        // visuals
        this.sheet;
        this.sprite;
        this.idleFrame = "idle1";
        this.walkFrame = "walk1";
        this.face = "right";
    }

    Load(){
        this.sprite = Ralph.Idle.idle1;
        this.sheet = new Image();
        this.sheet.src = Ralph.Idle.path;
        this.thick = this.sprite.scaleX;
        this.tall = this.sprite.scaleY;
    }

    Update(){
        // this.Move();
        this.Animate();
        if(this.visible){
            this.Draw();
        }
    } 

    Animate(){
        if(this.forward != 0){
            if(clock % 6 == 0) this.WalkAnimation();
        }
        else{
            if(clock % 2 == 0) this.IdleAnimation();
        }
    }     
    
    IdleAnimation(){
        if(this.idleFrame == "idle1"){
            this.sprite = Ralph.Idle.idle2;
            this.idleFrame = "idle2";
        }
        else if(this.idleFrame == "idle2"){
            this.sprite = Ralph.Idle.idle3;
            this.idleFrame = "idle3";
        }
        else if(this.idleFrame == "idle3"){
            this.sprite = Ralph.Idle.idle4;
            this.idleFrame = "idle4";
        }
        else if(this.idleFrame == "idle4"){
            this.sprite = Ralph.Idle.idle5;
            this.idleFrame = "idle5";
        }
        else if(this.idleFrame == "idle5"){
            this.sprite = Ralph.Idle.idle6;
            this.idleFrame = "idle6";
        }
        else if(this.idleFrame == "idle6"){
            this.sprite = Ralph.Idle.idle7;
            this.idleFrame = "idle7";
        }
        else if(this.idleFrame == "idle7"){
            this.sprite = Ralph.Idle.idle8;
            this.idleFrame = "idle8";
        }
        else if(this.idleFrame == "idle8"){
            this.sprite = Ralph.Idle.idle9;
            this.idleFrame = "idle9";
        }
        else if(this.idleFrame == "idle9"){
            this.sprite = Ralph.Idle.idle10;
            this.idleFrame = "idle10";
        }
        else if(this.idleFrame == "idle10"){
            this.sprite = Ralph.Idle.idle11;
            this.idleFrame = "idle11";
        }
        else if(this.idleFrame == "idle11"){
            this.sprite = Ralph.Idle.idle12;
            this.idleFrame = "idle12";
        }
        else if(this.idleFrame == "idle12"){
            this.sprite = Ralph.Idle.idle13;
            this.idleFrame = "idle13";
        }
        else if(this.idleFrame == "idle13"){
            this.sprite = Ralph.Idle.idle1;
            this.idleFrame = "idle1";
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

}