

export class Score
{
    pseudo;
    score;

    

    constructor()
    {
        this.pseudo = '';
        this.score = 0;      
        this.serverUrl = "urlserver/api.php";  
    }

    setUser(pseudo) 
    {
        let regex = /^[a-zA-Z0-9]+$/;
        if (pseudo.length < 3 || pseudo.length > 10)
            return { 
                valid: false, 
                message: 'Le pseudo doit contenir entre 3 et 10 caractères.' };
        
        if (!regex.test(pseudo))
            return { 
            valid: false, 
            message: 'Pseudo invalide. Seuls les lettres et les chiffres sont autorisés.' };
        
        this.pseudo = pseudo;
        return { 
            valid: true, 
            message: 'Votre score a été enregistré'
        };
    }

    setScore(score) 
    {
        if (/^[0-9]+$/.test(score)) 
        {
            this.score = score;
            return { valid: true };
        }
        return { valid: false, message: 'Score invalide.' };
    }

    async sendScore() 
    {
        const data = 
        { 
            pseudo: this.pseudo, 
            score: this.score 
        };

        const response = await fetch(this.serverUrl, 
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur HTTP : ' + response.status);
        return await response.json();
    }

    async fetchScores() 
    {
        const response = await fetch(this.serverUrl + '?list=1');
        if (!response.ok) throw new Error('Erreur HTTP : ' + response.status);
        return await response.json();
    }
}