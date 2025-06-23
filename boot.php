<?php
header("Access-Control-Allow-Origin: *");// qui peut faire une requete
header("Access-Control-Allow-Methods: GET, POST");//Type de requete autorisée
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');//quel est le type de données attendues
// Chemins vers les classes
include_once 'config/ConfigManager.php';
include_once 'crud/model/Log.php';
include_once 'crud/model/LogManagement.php';
include_once 'crud/model/Score.php';
include_once 'crud/model/ScoreManagement.php';
include_once 'crud/model/PdoWrapper.php';

// Initialisation de la configuration
$cm= new ConfigManager();
$cm->load('config/config.php');

// Connexion à la base de données
$pdo = new pdoWrapper($cm);
$sm=new ScoreManagement($pdo);
$s=new score();
