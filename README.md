# GROUPOMANIA #

## Contexte.

 Dans le cadre des mesures d’amélioration de la communication entre collègues, la Direction de Groupomania a promis la création d’un réseau social interne, moderne et ludique, qui permettra aux employés de se connaître dans un cadre plus informel.
### Requêtes spécifiques.
-	Présentation simple des fonctionnalités,
-   Création simple d’un compte, accessible depuis un téléphone mobile,
-   Profil avec très peu d’informations pour une complétion rapide,
-	Suppression du compte devant être possible ;
-	Publication de textes ou de multimédias (images) dans un forum,
-	Repérage facile des dernières publications,
-	Modération des interactions entre les salariés par le Chargé de Communication.

***
## Installation et Usage ##
### Front-End Application:
Pour l'application front-end, voici les dépendances à installer:
-   NodeJS 12.14 or 14.0,
-   "axios": "^0.24.0",
-   "bootstrap": "^5.1.3",
-   "react": "^17.0.2",
-   "react-bootstrap": "^2.0.4",
-   "react-router-dom": "^6.2.1",
-   "sass": "^1.43.4".

Sur Windows, ces installations requièrent d'utiliser PowerShell en mode administrateur.  
Alors, clonez ce repository (https://github.com/Ffedronic/p7_fedronic_felix_122021.git).  
Pour lancer l'application front-end, lancez `npm start`. Il configure votre environnement de développement de façon à vous permettre d’utiliser l'application front-end et lance votre navigateur par défaut.  
Si le navigateur échoue à se lancer, entrez l'adresse http://localhost:3000 dans la barre de navigation.  
L'application front-end devrait se recharger automatiquement après la sauvegarde de chaque modification.  
Utilisez `Ctrl+C` dans le terminal pour arrêter l'environnement de développement.  
### Back-End Application:
Pour l'application front-end, voici les dépendances à installer:
-   "bcrypt": "^5.0.1",
-   "body-parser": "^1.19.1",
-   "cookie-parser": "^1.4.6",
-   "cors": "^2.8.5",
-   "dotenv": "^10.0.0",
-   "express": "^4.17.1",
-   "helmet": "^4.6.0",
-   "jsonwebtoken": "^8.5.1",
-   "multer": "^1.4.4",
-   "mysql": "^2.18.1",
-   "nodemon": "^2.0.15",
-   "password-validator": "^5.2.1"

Alors, lancez `nodemon server` à partir du dossier racine contenant l'application back-end.  
*Le port "4000"* sera utilisé par le serveur pour écouter les requêtes issues du serveur.  
L'application back-end devrait se recharger automatiquement après la sauvegarde de chaque modification.  
Utilisez `Ctrl+C` dans le terminal pour arrêter le serveur.

***