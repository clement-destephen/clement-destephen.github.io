---
layout: post
title:  "Monocorde Harmonique"
date:   2022-09-01 23:28:40 +0200
categories: instrument building
visible: 1
lang: fr
---

<style>
    .single-image {
        width: 100%;  
        margin-left: auto;
        margin-right: auto;
    }
    .single-image-80 {
        width: 80%;  
        margin-left: auto;
        margin-right: auto;
    }
</style>
    

![alt text](/assets/images/monochord_1.png "monochord pic 1")

<p>&nbsp;</p>

Le monochorde harmonique est une expérience mettant en jeu une corde et des électro-aimants.

Je me demandais s'il était possible de faire vibrer une corde selon ses fréquences harmoniques, en utilisant des champs élecromagnetiques adaptés.

<p>&nbsp;</p>

![alt text](/assets/images/monochord_2.png "monochord pic 2")

<p>&nbsp;</p>

Cet instrument donne la possibilité de faire résonner les 16 premières harmoniques, individuellement, et en polyphonie, jusqu'à 5 en même temps.

Le volume de chaque harmonique peut être modulé en faisant glisser son doigt sur les petits élements de cuivre.

<p>&nbsp;</p>

![alt text](/assets/images/monochord_9.jpg "monochord pic 9")

<p>&nbsp;</p>

Les vibrations de la cordes sont ensuite amplifiées par une caisse de résonance en érable ondé et hêtre.

Le son est donc entièrement acoustique, n'impliquant aucun système de micro.

<p>&nbsp;</p>

### Enregistrements

Voici quelques enregistrements, explorant des intervalles obtenus en combinant une harmonique de "base" et differents sous-ensembles de la série harmonique. Pour ces enregistrements, la corde a été accordée à la fréquence de 128 Hz.

<p align="center">
    2-1 | 2-3 | 2-4 | 2-5 | 2-7 | 2-8 | 2-9 | 2-11 | 2-12 | 2-13 | 2-15 | 2-16
    <br>
    <audio src="/assets/sounds/ZOOM0032_corrected.mp3" controls></audio>
    <br>
    <br>
    3-2 | 3-3 | 3-6 | 3-10 | 3-12 | 3-13 | 3-14 | 3-15 | 3-16 
    <br>    
    <audio src="/assets/sounds/ZOOM0033_corrected.mp3" controls></audio>
    <br>
    <br>
    4-1 | 4-3 | 4-5 | 4-6 | 4-7 | 4-9 | 4-11 | 4-13 | 4-15 | 4-16 
    <br>
    <audio src="/assets/sounds/ZOOM0034_corrected.mp3" controls></audio>
    <br>
    <br>
    5-2 | 5-4 | 5-6 | 5-8 | 5-10 | 5-12 | 5-14 | 5-15 
    <br>
    <audio src="/assets/sounds/ZOOM0035_corrected.mp3" controls></audio>
    <br>
    <br>
    6-1 | 6-3 | 6-4 | 6-5 | 6-7 | 6-8 | 6-9 | 6-11 | 6-12 | 6-13 | 6-15 | 6-16 
    <br>
    <audio src="/assets/sounds/ZOOM0036_corrected.mp3" controls></audio>
    <br>
    <br>
    7-2 | 7-4 | 7-6 | 7-8 | 7-10 | 7-12 | 7-14
    <br> 
    <audio src="/assets/sounds/ZOOM0037_corrected.mp3" controls></audio>
    <br>
    <br>
    8-6 | 8-9 | 8-10 | 8-12 | 8-14 <- 
    <br>
    <audio src="/assets/sounds/ZOOM0038_corrected.mp3" controls></audio>
</p>

On peut entendre assez clairement comment certaines harmoniques se renforcent mutuellement, alors que d'autres ont tendence à s'atténuer.

<p>&nbsp;</p>

### Principes de fonctionnement

![alt text](/assets/images/monochord_5.png "monochord pic 5")

Les électro-aimants sont excités par des signaux modulés en largeur d'impulsion (MLI/PWM). Le concept est différent des E-bows qui utilisent une boucle de rétroaction. L'utilisation d'une excitaiton directe en MLI apporte notamment :
- une entrée en résonance plus rapide de la corde (attaque)
- la corde peut être potentiellement excitée à n'importe lequel de ses modes de résonance, ou n'importe quelle combinaison de modes.

Naturellement, cela implique la connaissance préalable des valeurs de fréquence des modes par le système.

<p>&nbsp;</p>

### Les électro-aimants 

<p class="single-image">
  <img src="/assets/images/monochord_7.png" />
</p>

Les électro-aimants sont placés majoritairement sur des ventres de vibration pour qu'ils aient le maximum d'effet, mais aussi à d'autres points permettant l'excitation simultanée de plusieurs modes. J'ai du trouver un compromis pour pouvoir exciter les 16 premières harmoniques, et étant limité à l'utilisation de  seulement 5 électro-aimants. Placer un électroaimant proche d'une extremité de la corde n'a malheureusement pas fonctionné, l'inertie de la corde étant plus forte à cet endroit, meme si potentiellement de nombreux modes auraient pu être excités.

<p class="single-image">
  <img src="/assets/images/monochord_onlg_3_hor.png" />
</p>

La distance de chaque électro-aimant à la corde peut être ajustée, pour pouvoir les rapprocher le plus possible de celle-ci, sans qu'ils ne rentrent en contact (les premiers modes de vibrations étant plus important, leur amplitude l'est également).

<p>&nbsp;</p>

### Potentiomètres/chevilles d'accordage

<p class="single-image">
  <img src="/assets/images/monochord_8.png" />
</p>

Cet instrument permet de mettre en évidence de façon très concrète l'inharmonicité d'une corde.

L'inharmonicité d'une corde s'observe dans le décalage entre la fréquence observée de ses harmoniques et la fréquence théorique issue de la série harmonique.
Par example, si la corde est accordée précisemment à 128 Hz, on peut s'attendre à ce que la deuxième harmonique soit à 2 * 128 = 256 Hz. A cause de la façon dont la corde est fabriquée, et des proprietés physiques de ses matériaux, cette fréquence sera dans la pratique légèrement différente, de quelques centièmes de demi-ton.

Chaque harmonique a un potentiomètre dédié qui va décaler légèrement la fréquence de son signal MLI pour atteindre la valeur réelle de la corde.

Le processus d'accord est intéressant car il permet d'entendre l'éloignement d'une harmonique par rapport à la série harmonique parfaite. Grâce à la résonance forcée induite par le champ électromagnétique, produisant des battements contre le mode naturel de résonance de la corde, et en se rapprochant progressivement, ces battements se réduisent jusqu'à ce que la fréquence parfaite soit atteinte, et que la corde rentre en résonance 'naturelle'.

Désacorder la corde, ne serait-ce que de quelques centièmes de demi-ton a un impact très fort sur son inharmonicité. Je n'ai pas pu observer de pattern évident. De façon générale, après un accordage, la corde va mettre quelques minutes à se stabiliser. De plus, et comme on peut s'y attendre pour un instrument en bois, n'importe quel changement des conditions de température et d'humidité dans la pièce pourra s'observer sur l'inharmonicité, au travers du jeu du bois et du léger désaccord de la corde.

Du côté du circuit électronique, le système est calibré pour avoir une résolution d'accord toujours meilleure que le centième de demi-ton.
Dans la pratique, cette résolution est inégale et varie selon la fréquence à cause de mode de fonctionnement du microcontroller. Le choix des 'prescalers' internes divisant l'horloge principale et la profondeur de bits des Timers imposent une résolution variable.

Dans la version actuelle, les potentiomètres d'accord couvrent une plage de 10 centièmes de demi-ton (-5 .. +5) autour de la fréquence harmonique idéale. Pendant mes recherches, j'ai pu observer que les cordes de diamètre inférieur, ainsi que les cordes sans enroulement additionnel avaient tendence à être plus inharmoniques, des fois jusqu'à 40 centièmes de demi-ton. En choisissant spécialement une corde ayant une faible inharmonicité, j'ai pu réduire la plage des potentiomètres et améliorer leur précision.

La corde en elle même peut être accordée grâce à deux chevilles, une pour un accordage grossier et une pour un accordage plus fin.

<p class="single-image-80">
  <img src="/assets/images/monochord_10.png" />
</p>

L'instrument fonctionne avec une batterie externe 15V / Adaptateur secteur.