import { Utilitaire } from "./Utilitaire.js";
export class Bricks
{
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    brickRowCount = 5; //nombre de ligne minimum
    brickColumnCount = 7;//nombre de brique par ligne
    bricks=[];
    typeBricks=[0,1,2,3,4]; //les differents type de briques 
    // 0 => normal
    // 1 => double boule
    // 2 => brique boum
    // 3 => live up
    // 4 => 75% du temps
    // 5 => the Wall 
    cvs;
    game;
    util=new Utilitaire();

    constructor(canvas,game)
    {   
        this.cvs=canvas;
        this.game=game;
        this.initialiseBricks();
        this.drawBricks();
    }
     
    //contruction du tableau de bricks
    initialiseBricks()
    {
        let specialBrick=0;
        for(let r=0; r<this.brickRowCount; r++) 
        {
            specialBrick=0;
            this.bricks[r] = [];
            for(let c=0; c<this.brickColumnCount; c++) 
            {
                let brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                let brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                this.bricks[r][c] = { 
                    x: brickX, 
                    y: brickY,
                    width: this.brickWidth,
                    height: this.brickHeight, 
                    status: 1, 
                    type: 0 
                };//type 0 normal, 1 double balle, 2 brick boum
            }
            if(specialBrick==0)
            {
                this.bricks[r][this.util.randomNum(0,this.brickColumnCount-1)].type=this.util.randomNum(0,this.typeBricks.length-1);
                specialBrick=1;
            }
        }
    }  
    /*Gestion du tableau de brique*/
    /******************************/
    createLineBricks()// cree une nouvelle ligne et la place en haut du tableau
    {
        let line=[];
        let specialBrick=0;
        for(let i=0;i<this.brickColumnCount;i++ )
        {
            let brickX = (i * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
            let brickY = this.brickOffsetTop; // ligne tout en haut
            line[i]={ x: brickX, y: brickY,width: this.brickWidth,height: this.brickHeight, status: 1, type: 0 };
        }
        if(specialBrick==0)
        {
            line[this.util.randomNum(0,this.brickColumnCount-1)].type=this.util.randomNum(0,this.typeBricks.length-1);
            specialBrick=1;
        }
        this.bricks.forEach(row => 
        {
            row.forEach(brick => 
            {
                brick.y += this.brickHeight + this.brickPadding;
            });
        });
        this.brickRowCount=this.bricks.unshift(line); //ajout la ligne en premier au tableau
    }

    update()
    {
        this.deleteRowEmpty();
        this.createLineBricks();
    }

    deleteRowEmpty()//delete les lignes vides du tableau
    {
        let removed=false;
        for(let l=this.bricks.length-1;l>=0;l--)
        {
            if (this.bricks[l].every(brick => brick.status === 0)) //verifie si tous les statuts sont 0 pour une ligne du tableau donnée
            {   
                this.bricks.splice(l, 1);
                removed=true;
            }
        }
        if(removed)
        {
            this.reNewXY();//reafectation des coordonnées de chaque briques du tableau
        }
    }

    reNewXY() 
    {
        for (let row = 0; row < this.bricks.length; row++) 
        {
            for (let col = 0; col < this.bricks[row].length; col++) 
            {
                this.bricks[row][col].y = (row * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
            }
        }
    }

    /*Brique Boum*/
    brickBoum(r,c)
    {
        let score=0;
        for (let dr = -1; dr <= 1; dr++) 
        {
            for (let dc = -1; dc <= 1; dc++)
            {
              const rr = r + dr;
              const cc = c + dc;
        
                if (this.util.indiceExiste(this.bricks, rr, cc))
                {
                    if (this.bricks[rr][cc].status === 1) 
                    {
                        this.bricks[rr][cc].status = 0;
                        score+=2;
                    }
                }
            }
        }
        return score;
    }

    /*Fonction d'affichage*/
    /**********************/
    colorBrick(type)
    {
        let color;
        switch (type)
        {
            case 1://Brique Double Balle
                color= "#78a5ab";
                break;
            case 2://Brique Boum
                color = "#ff0000";
                break;
            case 3://Brique Live Up
                color = "#00ff00";
                break;
            case 4://Brique 75% Time
                color = "#ff00ff";
                break;
            case 5://Brique Wall
                color="#000000";
                break;
            default://Brique Classique
                color = "#0095DD";
                break;
        }
        return color;
    }

    drawBricks() 
    {
        let ctx=this.cvs.getContext("2d");
        for(let r=0; r<this.bricks.length; r++) 
        {              
            for(let c=0; c<this.bricks[r].length; c++) 
            {
                if(this.bricks[r][c].status == 1) 
                {    
                    ctx.beginPath();
                    ctx.rect(this.bricks[r][c].x, this.bricks[r][c].y, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = this.colorBrick(this.bricks[r][c].type);
                    ctx.fill();
                    ctx.closePath();
                }
                //suppression pour mise en prod
                ctx.font = "10px Arial";
                ctx.fillStyle = "#ffffff";
                    //affichage du status et des coordonnées de chaque brique dans la brique
                //ctx.fillText(`${this.bricks[r][c].status +"-"+this.bricks[r][c].x+"-"+this.bricks[r][c].y }`, this.bricks[r][c].x + 2, this.bricks[r][c].y + 10);
                //fin suppression 
            }
                
        }
    }
}