<?php

class ScoreManagement
{
    private $lg;
    private $listScore=[];
    
    public function __construct(private pdoWrapper $con) 
    {
        
    }

    public function create($s)
    {
        $result=false;
        try
        {
            $pseudo = $s->getPseudo();
            $score = $s->getScore();

            if (!preg_match('/^[a-zA-Z0-9]{3,10}$/', $pseudo)) 
            {
                throw new Exception('Pseudo invalide');
            }
            if (!is_numeric($score) || $score < 0 || $score > 1000000) 
            {
                throw new Exception('Score invalide');
            }
            $query='insert into bb_brickbraker (pseudo,score) values(:pseudo,:score)';
            $this->con->execute($query,['pseudo'=>$s->getPseudo(),'score'=>$s->getScore()]);   
            $this->lg='ScoreManagement : OK <- Create()';
            $result=true;
        }
        catch(Exception $e)
        {
            $this->lg='ScoreManagement : NOTOK <- Create() '.$e->getMessage();
            $result=false;
        }
        finally
        {
            $log=new Log($this->lg);
            $this->con->insertLog($log);
            return $result;
        }
    }

    public function readAll(): array
    {
        try
        {
            $query='select pseudo,score,date from bb_brickbraker order by score desc limit 20';
            $stq=$this->con->execute($query,[]);
            $res = $stq->fetchAll();
            foreach ( $res as $row )
            {
                $this->listScore[] = [
                'pseudo' => $row['pseudo'],
                'score'  => $row['score'],
                'date'   => $row['date']
            ];
            }
            $this->lg='ScoreManagement : OK <- ReadAll()';
        }
        catch(Exception $e)
        {
            $this->lg='ScoreManagement : NOTOK <- ReadAll() '.$e->getMessage();
        }
        finally
        {
            $log=new Log($this->lg);
            $this->con->insertLog($log);
        }
        return $this->listScore;
    }
}