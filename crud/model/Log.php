<?php
class Log
{
    private string $date;
    private string $texte;

    public function __construct($texte)
    {
        $this->setDate( date("Y-m-d H:i:sa"));
        $this->setTexte($texte);
    }
    public function setDate($date)
    {
        $this->date=$date;
    }
    public function setTexte($texte)
    {
        $this->texte=$texte;
    }

    public function getDate()
    {
        return $this->date;
    }
    public function getTexte()
    {
        return $this->texte;
    }
    public function getTab()
    {
        return ['texte'=>$this->texte];
    }

}