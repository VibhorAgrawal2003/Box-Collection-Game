class Road{
    constructor(){
        this.visible = true;
        this.x = 0;
        this.y = canvasHeight - 30;
        this.thick = canvasWidth;
        this.tall = 40;
        this.strokeColor = '#0a590f';
        this.fillColor = '#b4e884';
    }

    Draw(){
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.thick, this.tall);

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.thick, this.y);
        ctx.stroke();
    }
}
