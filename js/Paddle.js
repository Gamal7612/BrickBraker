import { Utilitaire } from "./Utilitaire.js";


export class Paddle
{
    color="#0095DD";
    height = 10;//hauteur de la raquette
    width = 75;//Largeur de la raquette
    paddleX; // Position sur l'axe X
    paddleY;
    dX;
    da=0; // Deplacement du paddle
    acceleration=1;
    maxSpeed=10;
    initSpeed=7;
    cvs;
    ctx;
    util;
    constructor(canvas,util)
    {
        this.cvs=canvas;
        this.ctx=this.cvs.getContext('2d');
        this.paddleX= (this.cvs.width-this.width)/2;
        this.paddleY = this.cvs.height - this.height - 10; // 10 px au-dessus du bas
        this.dX = 0;
        this.util=util;
    }

    update()
    {   
        if (this.util.rightPressed && this.paddleX < this.cvs.width - this.width) 
        {
            this.dx=this.initSpeed; //7
            this.da+=this.acceleration;
            this.paddleX +=this.dx+this.da;
        }
        else if (this.util.leftPressed && this.paddleX > 0) 
        {
            this.dx=this.initSpeed; //7
            this.da+=this.acceleration;
            this.paddleX -=this.dx+this.da;
        }
        else
        {
            this.da=0; // Deplacement du paddle
            this.acceleration=1;
            this.maxSpeed=10;
            this.initSpeed=7;
        }
    }

    reset() 
    {
        this.paddleX = (this.cvs.width - this.width) / 2;
        this.da=0; // Deplacement du paddle
        this.acceleration=1;
        this.maxSpeed=10;
        this.initSpeed=7;
    }

    draw() 
    {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.paddleY, this.width, this.height);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fill();
        this.ctx.closePath();
    }

}