<?php
class Score
{
    private $pseudo;
    private $score;
   // private Utilitaire $util;

    public function __construct() 
    {
    }

    public function setPseudo($txt)
    {
        $this->pseudo=$txt;
    }

    public function setScore($txt)
    {
        $this->score=$txt;
    }

    public function getPseudo()
    {
        return $this->pseudo;
    }
    public function getScore()
    {
        return $this->score;
    }

    public function initWithTab(array $tab)
    {
        $this->setPseudo($tab['pseudo']);
        $this->setScore($tab['score']);
    }

    public function test_input($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    /*  trim($data)supprimera les caractères inutiles (espace supplémentaire, tabulation, nouvelle ligne) 
            des données saisies par l'utilisateur
        
            stripslashes($data)supprimera les barres obliques inverses () des données saisies par l'utilisateur
        
        htmlspecialchars($data)convertit les caractères spéciaux en entités HTML.
            (Si l'utilisateur saisit <et >, htmlspecialchars() le traduira en &lt;et &gt;).
    */
}