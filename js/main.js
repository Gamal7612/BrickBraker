import { Html}  from "./Html.js";
import { Game } from "./Game.js";
import { Utilitaire } from "./Utilitaire.js";
import { Score } from "./Score.js";


//récuperation de l'url et de ces parametres
const params = new URLSearchParams(window.location.search);
const action = params.get('action'); // par exemple ?action=game

let score = new Score();
let objhtml=new Html();
let util=new Utilitaire();
objhtml.init();

switch(action)
{
    case 'Ranking':
        objhtml.showSections(  'none', 'none',  'flex' );
        showScores();
        break;
    case 'Rules':
        objhtml.showSections( 'none', 'flex', 'none' );
        fetchAndShowRules();
        break;
    default:
        objhtml.showSections( 'flex', 'none', 'none');
        document.getElementById('btnstart').addEventListener('click',(e)=>startGame(e));
        document.addEventListener("keydown", (e)=>util.keyDownHandler(e), false);
        document.addEventListener("keyup",(e)=> util.keyUpHandler(e), false);
        break;
}

function startGame(e)
{
    e.target.value='START';
    const g=new Game(document.getElementById('divprincipal'),util);
    g.start();
}

async function showScores()
{
    try 
    {
        const data = await score.fetchScores();
        objhtml.showScoreTable(data);
    } catch (error) 
    {
        const container = document.getElementById('divranking');
        if (container) 
        {
            container.innerHTML = '<p class="alert-danger">Erreur lors du chargement des scores. Veuillez réessayer plus tard.</p>';
        }
        console.error('Erreur lors de la récupération des données :', error);
    }
}

async function fetchAndShowRules() 
{
    try {
        const response = await fetch('urlserver/api.php?rules=1');
        if (!response.ok) throw new Error('Erreur lors du chargement des règles');
        const rules = await response.json();
        objhtml.showRules(rules);
    } catch (e) 
    {
        const div = document.getElementById('divrules');
        if (div) div.textContent = "Impossible de charger les règles.";
    }
}




