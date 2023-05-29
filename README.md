# back_saintleonard

- Cloner le repos dans un repo du compte github service jeunesse

- npm install dans le dossier du projet

- installez pgAdmin

- créer un .env avec les données: 
    PORT=5000
    DB_DATABASE=saintleo        nom de votre base de données
    DB_USERNAME=postgres        nom d'utilisateur pgAdmin
    DB_PASSWORD=root            mot de passe pgAdmin
    ACCESS_TOKEN_SECRET=aaa
    REFRESH_TOKEN_SECRET=aaa
    GOOGLE_CLIENT_ID=993762277151-4g03kfgks4rc0e9n6bn261f4tne1oesn.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=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
    API_BASE_URL=http://localhost:5000

- Décommentez la ligne initDB se server.ts 

- npm run dev