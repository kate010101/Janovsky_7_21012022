P7 Créez un réseau social d'entreprise

Téléchargez le dossier github. 
Extraire le dossier.


Dossier Backend

    Serveur Node.js
    Framework Express.js
    Base de données MySQL
    ORM Sequelize
    Api RESET
    sécurité RGPD et OWASP

Installation

    Accédez sur https://nodejs.org/en/ pour télécharger puis installer Node.js sur votre machine
    cd Backend:
        Chargez le package nodemon : npm install -g nodemon
        Pour installer Express.js, exécutez la commande : npm install --save express
        pour le téléchargement de fichiers, installez le package Multer : npm install --save multer
        Lancez les commandes: npm i fs, npm install body-parser
	Enfin pour plus de faliciter, tapez : npm install


    Pour créer la base de données et ses tables, vous devez :

        Ouvrir un autre terminal, connectez-vous à votre serveur MySQL

        Pour créer une base de données dans MySQL :

           Exécutez la commande : 
           DROP DATABASE IF EXISTS groupomania; 
				   CREATE DATABASE groupomania CHARACTER SET 'utf8';


    Placé dans backend, tapez : nodemon server


Frontend (groupomania) :

    Framework Vue.js avec l'utilisation de Vue CLI
    Axios
    Bootstrap
    WCAG

Installation

    Pour se placer dans le dossier groupomania = "cd groupomania" puis :
        Installez Vue CLI et cli-service : npm install -g @vue/cli et npm install @vue/cli-service -g
        
            Exécuter la commande npm install pour installer tous les modules nécessaires au fonctionnement de l'application.
            Installez Axios : npm install axios
            Installez Bootstrap : npm install vue bootstrap bootstrap-vue
            Lancez la commande npm run serve

    Le serveur est accessible en local via le port 8080: http://localhost:8080/


Indications:

Une fois le compte de l'administrateur créé comme un compte normal, tapez dans le terminal mysql :  

select * from users;

Puis tapez : update users set isAdmin=1 where userId=1; 
(l'userId est celui du compte concerné)

Pour la sécurité du développement, avant toute sauvegarde sur votre repo git :
	dans le fichier gitignore ajoutez :
						node_modules
						.env
						config
