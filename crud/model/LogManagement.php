<?php
class LogManagement
{
    private array $listLog=[];
    public function __construct(private pdoWrapper $con)
    {

    }
    public function readAll(int $limit=25 )
    {
        try
        {
            if($limit==0)
            {
                $query='select date,texte from pf_log order by id desc limit 1000';
            }
            else
            {
                $query='select date,texte from pf_log order by id desc limit '.$limit;
            }
            
            $stq=$this->con->execute($query,[]);
            $res = $stq->fetchAll();
            foreach ( $res as $row )
            {
                $l=new Log('');
                $l->setDate($row['date']);
                $l->setTexte($row['texte']); 
                $this->listLog[]=$l;
            }
            $this->lg='LogManagement : OK <- ReadAll()';
        }
        catch(Exception $e)
        {

        }
        return $this->listLog;
    }

}