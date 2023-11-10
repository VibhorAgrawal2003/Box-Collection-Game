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
        this.x = 200;
        this.y = this.onFloor;
        this.velx = 0;
        this.vely = 0;
        this.thrust = 4;

        // visuals
        this.sheet;
        this.sprite;
        this.idleFrame = "idle1";
        this.runFrame = "run1";
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

        // cycle
        if(clock % 200 == 0){
            if(this.forward == 0) this.forward = 1;
            else this.forward = 0;
        }

        // this.Move();
        this.Animate();
        if(this.visible){
            this.Draw();
        }
    } 

    Animate(){
        if(this.forward != 0){
            if(clock % 2 == 0) this.RunAnimation();
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

    RunAnimation() {
        if(this.runFrame == "run1"){
            this.sprite = Ralph.Run.run2;
            this.runFrame = "run2";
        }
        else if(this.runFrame == "run2"){
            this.sprite = Ralph.Run.run3;
            this.runFrame = "run3";
        }
        else if(this.runFrame == "run3"){
            this.sprite = Ralph.Run.run4;
            this.runFrame = "run4";
        }
        else if(this.runFrame == "run4"){
            this.sprite = Ralph.Run.run5;
            this.runFrame = "run5";
        }
        else if(this.runFrame == "run5"){
            this.sprite = Ralph.Run.run6;
            this.runFrame = "run6";
        }
        else if(this.runFrame == "run6"){
            this.sprite = Ralph.Run.run7;
            this.runFrame = "run7";
        }
        else if(this.runFrame == "run7"){
            this.sprite = Ralph.Run.run8;
            this.runFrame = "run8";
        }
        else if(this.runFrame == "run8"){
            this.sprite = Ralph.Run.run9;
            this.runFrame = "run9";
        }
        else if(this.runFrame == "run9"){
            this.sprite = Ralph.Run.run10;
            this.runFrame = "run10";
        }
        else if(this.runFrame == "run10"){
            this.sprite = Ralph.Run.run11;
            this.runFrame = "run11";
        }
        else if(this.runFrame == "run11"){
            this.sprite = Ralph.Run.run12;
            this.runFrame = "run12";
        }
        else if(this.runFrame == "run12"){
            this.sprite = Ralph.Run.run13;
            this.runFrame = "run13";
        }
        else if(this.runFrame == "run13"){
            this.sprite = Ralph.Run.run14;
            this.runFrame = "run14";
        }
        else if(this.runFrame == "run14"){
            this.sprite = Ralph.Run.run1;
            this.runFrame = "run1";
        }

    }

    Draw() {
        ctx.save();
    
        if(this.forward == 0){
            this.sheet.src = Ralph.Idle.path;
        }
        else{
            this.sheet.src = Ralph.Run.path;
        }

        if (this.face == "left") {
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
        else if (this.face == "right") {
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

        ctx.restore();
    }

}