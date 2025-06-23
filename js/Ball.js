import { Utilitaire } from "./Utilitaire.js";
export class Ball 
{
    cvs;
    ctx;
    x;
    y;
    dx;
    dy;
    speedBallStartX=5;
    speedBallStartY=-5;
    color;
    type;// 0 = normal & 1 = doubleBall
    radius;
    game;
    paddle;
    util=new Utilitaire();

    constructor(game,type) 
    {
        this.game=game;
        this.cvs=game.container;
        this.paddle=game.paddle;
        this.ctx=game.container.getContext('2d');
        this.radius = 10;
        this.x = this.cvs.width / 2;
        this.y = this.cvs.height - this.paddle.height - this.radius - 1; // Juste au-dessus du paddle

        this.dx =this.speedBallStartX; // Vitesse horizontale
        this.dy =this.speedBallStartY; // Vitesse verticale
        if(type===0)
        {
            this.color = "#ffffff";
            this.type=0;
        }
        else
        {
            this.color="#78a5ab";
            this.type=1;
        }
    }
    
    update()
    {
        if(this.x + this.dx > this.cvs.width-this.radius || this.x + this.dx < this.radius)//Lateral
        {
            this.dx = -this.dx;
        }
        if(this.y + this.dy < this.radius) //Top
        {
            this.dy = -this.dy;
        }
        if(this.y + this.radius + this.dy >=this.paddle.paddleY) //paddel
        {
            if(this.x > this.paddle.paddleX && this.x < this.paddle.paddleX + this.paddle.width)
            {
                let ratio= 120/this.paddle.width;
                let angle=30+((this.x-this.paddle.paddleX)*ratio);
                let moveY=this.util.getVector(angle,this.speedBallStartX).y; 
                let moveX=this.util.getVector(angle,this.speedBallStartX).x;
                this.dy=-moveY;
                this.dx=-moveX;
                this.game.playSound(7);
            }
        }
        if (this.y + this.dy > this.cvs.height - this.radius) 
        {
            if (this.type===0)
            {
                if (this.game.getLive()>0)
                {
                    this.game.liveDown();
                    this.reset();
                    
                }
                else
                {
                    this.game.gameOver();
                }
            }
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    reset() 
    {
        this.x = this.cvs.width / 2;
        this.y = this.cvs.height - this.paddle.height - this.radius - 1;
        let ratio= 120/this.paddle.width;
        let angle=30+((this.x-this.paddle.paddleX)*ratio);
        let moveY=this.util.getVector(angle,this.speedBallStartX).y; 
        let moveX=this.util.getVector(angle,this.speedBallStartX).x;
        this.dy=-moveY;
        this.dx=-moveX;
        this.game.paddle.reset();
        this.game.doubleBall=null;
    }
  
    draw()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}