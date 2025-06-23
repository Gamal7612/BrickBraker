<?php

class pdoWrapper
{

    private $host;
    private $dbname;
    private $user;
    private $pwd;
    private $charset;
    private PDO $con;
    private string $lg;
    private string $lastInsertId;
    public function __construct(private ConfigManager $cm)
    {
        $this->lg='PDO : OK - initialisation connection';
        try
        {
            $this->host = $this->cm->get('db.host');
            $this->dbname = $this->cm->get('db.name');
            $this->user = $this->cm->get('db.user');
            $this->pwd = $this->cm->get('db.pwd');
            $this->charset = $this->cm->get('db.charset', 'utf8mb4');
            $dsn = "mysql:host=$this->host;port=3306;dbname=$this->dbname;charset=$this->charset";
            $this->con = new PDO($dsn, $this->user, $this->pwd);

            
        }
        catch(Exception $e)
        {
            $this->lg='PDO : NOTOK - initialisation connection';
        }
        finally
        {
            $log=new Log($this->lg);
            $this->insertLog($log);
        }
    }
    public function getLastInsertId()
    {
        return $this->lastInsertId;
    }
    public function lastindex()
    {
        return $this->con->lastInsertId();
    }
    public function execute(string $query,array $tabParams=[],int $lii=0)
    {
        $stq='';
        try
        {
            $stq=$this->con->prepare($query);
            $stq->execute($tabParams);
            $this->lg='PDO : OK <- Execute() '.$query.' '.implode(', ',$tabParams);
            if($lii==0)
            {

            }
            else
            {
                $this->lastInsertId=$this->lastindex();
            }
            
        }
        catch(Exception $e)
        {
            $this->lg='PDO : NOTOK <- EXECUTE() '.$query.' - '.implode(', ',$tabParams).' - '.$e->getMessage();
        }
        finally
        {
            $log=new Log($this->lg);
            $this->insertLog($log);  
        }
        return $stq;
    }

    public function getPdo()
    {
        return $this->con;
    }

    public function insertLog(Log $log)
    {
        //$query="insert into pf_log(date,texte) values(:date,:texte)";
        $query="insert into pf_log(texte) values(:texte)";
        $stq=$this->con->prepare($query);
        $stq->execute($log->getTab());
    }
}