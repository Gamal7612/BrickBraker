<?php

class Utilitaire
{
    public function test_input($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    /*trim($data)supprimera les caractères inutiles (espace supplémentaire, tabulation, nouvelle ligne) 
        des données saisies par l'utilisateur
    /*stripslashes($data)supprimera les barres obliques inverses () des données saisies par l'utilisateur
    /*htmlspecialchars($data)convertit les caractères spéciaux en entités HTML.
        (Si l'utilisateur saisit <et >, htmlspecialchars() le traduira en &lt;et &gt;).
    */
}