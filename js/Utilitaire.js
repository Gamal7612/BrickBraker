

export class Utilitaire
{
    rightPressed = false;
    leftPressed = false;

    constructor()
    {
        
    }
    
    keyDownHandler(e)
    {   
        if(e.key == "Right" || e.key == "ArrowRight")
        {
            this.rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft")
        {
            this.leftPressed = true;
        }
    }
    
    keyUpHandler(e) 
    {   
        if(e.key == "Right" || e.key == "ArrowRight") 
        {
            this.rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") 
        {
            this.leftPressed = false;
        }
    }

    randomNum(min,max)
    { 
        let interval=max-min;
        let val=Math.round(Math.random() * interval)+min;
        return val;
    }

    indiceExiste(tab, x, y)
    {
    return tab[x] && tab[x][y];
    }

    getVector(angleDeg, speed)
    {
        let angleRad = angleDeg * (Math.PI / 180); // Conversion en radian
        return {
            x: Math.cos(angleRad) * speed,
            y: Math.sin(angleRad) * speed
        }; 
    }

    timeConverted(timeSeconde)
    {
        let minutes=Math.floor(timeSeconde/60);
        let seconds= timeSeconde %60; //Retourne le reste de la division de timeSeconde par 60 ex: 125/60 => le reste est 5
        return minutes.toString().padStart(2, '0')+':'+seconds.toString().padStart(2, '0');
    }

}