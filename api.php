<?php

include_once 'boot.php';
if($_SERVER['REQUEST_METHOD']==='POST')
{
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    $s->initWithTab($data);
    if($sm->create($s))
    {
        echo json_encode(['success' => true, 'message' => 'Score enregistré']);
    }
    else
    {
        echo json_encode(['success' => false, 'message' => 'Score non enregistré']);
   }  
}

if($_SERVER['REQUEST_METHOD']==='GET')
{
    if(count($_GET))
    {//executera un if ou l'autre if ou juste success false
        if(isset($_GET['list']) && $_GET['list'] == 1)
        {
            echo json_encode($sm->readAll());
            exit;
        }
        if(isset($_GET['rules']))
        {
            echo json_encode($cm->get('rules'));
            exit;
        }
        echo json_encode(['success' => false, 'message' => 'Requête GET invalide']);
        exit;     
    }
}
