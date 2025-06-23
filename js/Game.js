
import { Bricks } from "./Bricks.js";
import { Paddle } from "./Paddle.js";
import { Ball } from "./Ball.js";
import { Utilitaire } from "./Utilitaire.js";
import {ZZFX, zzfx} from './ZzFX-master/ZzFX.js';
import { Html } from "./Html.js";
import { Score } from "./Score.js";
export class Game
{
    
    speedTabBricks=20000;//Vitesse de defilement du tableau
    minSpeedTabBricks=6000;//Vitesse maximum de deplacement du tableau de briques
    maxSpeedTabBricks = 20000;//Vitesse minimum de deplacement du tableau
    speedAccelerationBricks=5000;//Acceleration de la vitesse du tableau 1000=1sec

    wall = false;           // indique si le mur est actif
    timeWall = 5;           // durée d’affichage du mur en secondes
    countTimeWall = 0;      // moment où le mur a été affiché
    wallTimer = 0;          // compteur général en secondes

    containerX= 280; //Emplacement du container (1200-640)/2
    containerY=0; // emplacement du container on fixe 200 pour laisser la place a un header et eventuellement a un menu 
    container;//objet HTML
    zzfxV=.9;               // volume
    zzfxX=new AudioContext; // audio context
    ctx;
    score=0;
    lives=3;
    time=0;
    width=640;
    height=480;
    paddle;
    bricks;
    ball;
    doubleBall = null;
    interval;
    nSeconde; //compteur nombre de seconde avant ajout de ligne dans le tableau 
    lastLineAddTime = Date.now();
    lastUpdateTimeCount;
    lastBallCollision = 0;
    ballCollisionCooldown = 300;
    util;
    constructor(parent,util)
    {
        this.container=document.createElement('canvas');
        this.container.id='container';
        this.container.style.position="absolute";
        this.container.style.left=this.containerX+'px';
        this.container.style.top=this.containerY+'px';
        this.container.width=this.width;
        this.container.height=this.height;
        this.ctx = this.container.getContext("2d");
        this.util=new Utilitaire();
        this.paddle=new Paddle(this.container,util);
        this.bricks=new Bricks(this.container,this);
        this.ball=new Ball(this,0);//Balle normale
        this.bgImg=document.createElement('img');
        this.bgImg.src='../Pictures/fond.jpg';
        this.bgImg.addEventListener("load", (e) => 
        {
            this.ctx.drawImage(this.bgImg, 0,0,640,480);
        });
        this.drawScore();
        this.drawLives();
        this.paddle.draw();
        this.secondCount=0;
        this.lastUpdateTimeCount=Date.now();
        this.drawTime();
        parent.append(this.container);  
        
    }
    calculateScore(val)
    {
        this.score+=val;
    }

    drawScore() 
    {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#454949";
        this.ctx.fillText("Score: "+this.score, 8, 20);
    }
    drawLives()
    {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#454949";
        this.ctx.fillText("Lives: "+this.lives, this.width-65, 20);
    }
    drawTime() 
    {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#454949";
        this.ctx.fillText("Time: "+this.util.timeConverted(this.time), this.width/2, 20);
    }

    start()
    {
        document.getElementById('btnstart').style.display='none';
        this.playSound(0);
        this.interval=setInterval(() => 
        {
            this.update();
        }, 1000/60);//60fps
    }

    playSound(sound)
    {
        switch (sound) 
        {
            case 0:
                zzfx(1.1,.05,12,.06,.21,.04,3,3.5,5,30,77,.02,0,0,0,0,.2,.99,.36,0,0);// start
                break;
            case 1:
                zzfx(.5,.05,162,.01,.17,.001,3,.4,12,1,0,0,0,0,0,0,.15,.72,.47,0,198);//DoubleBall
                break;
            case 2:
                zzfx(...[2.4,,40,.02,.19,.73,1,.7,3,1,,,,.3,,.7,.14,.33,.11]);//BriqueBoum
                break;
            case 3:
                zzfx(1,.05,98,.01,.05,.04,3,.3,0,0,237,0,.03,0,0,0,0,.61,.03,0,0);//TimeLess
                break;
            case 4:
                zzfx(1,.05,134,.03,.03,.12,1,1.3,15,0,0,0,0,.8,0,0,0,.86,.04,0,0);//GameOver
                break;
            case 5:
                zzfx(.5,.05,73,.02,.03,.07,3,.6,19,15,0,0,.01,.6,42,0,0,.65,.17,.08,-849);//Live--
                break;
            case 6:
                zzfx(1,.05,451,.01,.03,.07,1,.9,6,76,179,.07,0,0,0,.1,0,.55,.03,0,0);//Live++
                break;
            case 7:
                zzfx(1.1,.05,678,.01,.07,.1,1,4,0,0,0,0,0,0,0,0,0,.61,.04,0,0);//collision paddle
            default:
                zzfx(2.1,.05,328,0,.02,.14,1,3.1,3,0,0,0,.01,.1,0,.2,0,.59,0,.33,0);//collision brique normal
                break;
        }
    }

    update()
    {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.paddle.update();
        this.ball.update();
        this.collisionDetection(this.bricks,this.ball);
        this.bricks.deleteRowEmpty();
        let now = Date.now();
        // Ajout ligne au tableau de briques
        if (now - this.lastLineAddTime >= this.speedTabBricks) 
        {
            if (this.speedTabBricks - this.speedAccelerationBricks >= this.minSpeedTabBricks)
            {
                this.speedTabBricks -= this.speedAccelerationBricks;
            }
            else
            {
                this.speedTabBricks = this.minSpeedTabBricks;
            }
            this.bricks.update();
            this.lastLineAddTime = now;
        }
        
        if (this.bricks.bricks.length>14)
        {
            this.gameOver();
        }
        // Update Time && timer wall toutes les secondes
        if (now - this.lastUpdateTimeCount >= 1000) 
        {
            this.time++;
            this.lastUpdateTimeCount = now;
            this.wallTimer++;
        }

        if (this.doubleBall) 
        {
            this.doubleBall.update();
            this.collisionDetection(this.bricks,this.doubleBall);
            if (this.doubleBall.y + this.doubleBall.radius > this.height) 
            {
                this.doubleBall = null; // La double balle tombe => supprimée
            }
        }
        this.theWall();
        
        this.checkCollisionWithBall();

        this.draw();
    }

    setTimeLessQuarter()
    {
        this.time=Math.floor((this.time)/4*3);//diminution du temps de jeu de 25%
        this.score=this.score+5;
        this.playSound(3);
    }

    getLive()
    {
        return this.lives;
    }
    liveDown()//perte d'une vie
    {
        this.lives-=1;
        this.playSound(5);
    }
    liveUp()//gain d'une vie
    {
        this.lives+=1;
        this.score=this.score+5;
        this.playSound(6);
    }

    theWall() //Affichage du mur
    {

        // Si 60 secondes se sont écoulées et qu'il n'y a pas encore de mur
        if (this.wallTimer >= 60 && !this.wall) 
        {
            //choix aleatoire de la ligne ou le mur va s'afficher 
            let line = Math.floor(this.util.randomNum(0, this.bricks.bricks.length - 1));
            this.bricks.bricks[line].forEach(brick => {
                if (brick.x !== 285) { // ignore la colonne centrale
                    brick.status = 1;
                    brick.type = 5;
                }
            });

            this.wall = true;
            this.countTimeWall = this.time;
            this.wallTimer = 0;
        }

    // Si le mur est actif depuis 5 secondes, on le retire
        if (this.wall && this.time - this.countTimeWall >= this.timeWall) 
        {
            this.bricks.bricks.forEach(row => 
            {
                row.forEach(brick => {
                    if (brick.type === 5) 
                    {
                        brick.status = 0;
                    }
                });
            });
            this.wall = false;
        }

    }

    checkCollisionWithBall()// collision avec la 2eme boule 
    {
        if (this.doubleBall)
        {
            let now = Date.now();
            if (now - this.lastBallCollision < this.ballCollisionCooldown)
            {
            }
            else
            {
                const dx = this.ball.x - this.doubleBall.x;
                const dy = this.ball.y - this.doubleBall.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = this.ball.radius + this.doubleBall.radius;

                if (distance <= minDistance) 
                {
                    // Inversion
                    this.ball.dx *= -1;
                    this.ball.dy *= -1;
                    this.doubleBall.dx *= -1;
                    this.doubleBall.dy *= -1;
                    // Décale légèrement les balles
                    this.ball.x += this.ball.dx;
                    this.ball.y += this.ball.dy;
                    this.doubleBall.x += this.doubleBall.dx;
                    this.doubleBall.y += this.doubleBall.dy;
                    this.lastBallCollision = now; // 🕒 on enregistre le moment
                }
            }
        }
    }

    collisionDetection(bricksObj,ball)
    {
        let bricks=bricksObj.bricks;
        for (let r = 0; r < bricks.length; r++) 
        {
            for (let c = 0; c < bricks[r].length; c++) 
            {
                let brick = bricks[r][c];
                if(
                    ball.x + ball.radius > brick.x &&
                    ball.x - ball.radius < brick.x + brick.width &&
                    ball.y + ball.radius > brick.y &&
                    ball.y - ball.radius < brick.y + brick.height
                    ) 
                {
                    if (brick.status==1)
                    {
                        // Inversion de la vitesse verticale
                        ball.dy = -ball.dy;

                        // Désactive la brique
                        brick.status = 0;
                        this.playSound();
                        // Bonus selon le type
                        switch (brick.type) 
                        {
                            case 1:
                                if (!this.doubleBall) 
                                {
                                    this.doubleBall = new Ball(this, 1); // type = 1
                                    this.doubleBall.x = ball.x;
                                    this.doubleBall.y = ball.y;
                                    this.doubleBall.dx = -ball.dx; // inverse direction
                                    this.doubleBall.dy = -ball.dy;
                                    this.playSound(1);
                                }
                                this.score+=2;
                                break;
                            case 2:
                                this.score=this.score+bricksObj.brickBoum(r, c);
                                this.playSound(2);
                                break;
                            case 3:
                                this.liveUp();
                                this.score+=2;
                                break;
                            case 4:
                                this.setTimeLessQuarter();
                                this.score+=2;
                                break;
                            case 5 :
                                brick.status = 1;
                                break;
                            default:
                                this.score+=2;
                                break;
                        }

                        return; // On sort après la première collision trouvée
                    }
                }
            }
        }
    }

    draw()//on dessine tout le contexte 
    {  
        this.drawScore();
        this.drawLives();
        this.paddle.draw();
        this.drawTime();
        this.bricks.drawBricks();
        this.ball.draw();
        if (this.doubleBall) 
        {
            this.doubleBall.draw();
        }
    }
    calculFinalResult()
    {
        let result;
        result=Math.floor(this.time/10);
        this.score=this.score-result;
        this.time=0; 
    }

    async gameOver()
    {
        clearInterval(this.interval);
        this.calculFinalResult();
        let choice = confirm('Votre score est de :' + this.score + ' voulez-vous l\'enregistrer ?');
        if (choice)
        {
            let objhtml = new Html();
            let objScore = new Score();
            objScore.setScore(this.score);

            const pseudo = await objhtml.askPseudo(objScore);
            // Ici, le pseudo est validé
            objScore.sendScore();
        }
    }
}