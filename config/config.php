<?php
// config.php

return 
[
    'db' => [
        'host' => 'localhost',
        'name' => '',
        'user' => '',
        'pwd' => '',
        'charset' => 'utf8mb4',
    ],
    'rules' =>[
        'title' => "Règles du jeu Brickbraker",
        'items' => [
            "Amusez-vous !",
            "Classement basé sur votre score.",
            "Déplacez la raquette pour faire rebondir la balle et détruire les briques.",
            "Certaines briques ont des effets spéciaux, lisez la classification ci-dessous."
    ],
    'bricks' => [
            [
                'type' => "Brique normale",
                'color' => "#0095DD",
                'points' => "2",
                'description' => "Brique classique, rapporte 2 points."
            ],
            [
                'type' => "Brique DoubleBall",
                'color' => "#78a5ab",
                'points' => "2",
                'description' => "Rapporte 2 points et crée une 2eme boule."
            ],
            [
                'type' => "Brique Boum",
                'color' => "#ff0000",
                'points' => "minimum:2 - maximum:18",
                'description' => "2 points par brique détruite."
            ],
            [
                'type' => "Brique Life Up",
                'color' => "#00ff00",
                'points' => "2",
                'description' => "Rapporte 2 points et fait gagner 1 vie."
            ],
            [
                'type' => "Brique Time Down",
                'color' => "#ff00ff",
                'points' => "2",
                'description' => "Rapporte 2 points et diminue le temps d'un quart."
            ],
            [
                'type' => "Brique Morte",
                'color' => "#000000",
                'points' => "0",
                'description' => "Mur indestructible, dure 5 secondes.sauf si touché par une brique Boum"
            ]
        ]
    ]
];


    // 0 => normal
    // 1 => double boule
    // 2 => brique boum
    // 3 => live up
    // 4 => 75% du temps
    // 5 => the Wall