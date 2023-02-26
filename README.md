# github-bio

### Bienvenue sur ce répo 👋

Il sert à automatiser votre bio github avec la météo de votre emplacement.

Tout d'abord vous devez créer un jeton d'accès personnel, pour permettre à votre application de mettre à jour votre biographie. Cliquez [ICI](https://github.com/settings/tokens/new) pour accéder à la page de création de jeton d'accès personnel. Sélectionnez le champ `user` (Mettre à jour toutes les données utilisateur) et cliquez sur Générer un nouveau jeton.

Copiez-le et collez-le dans votre fichier app.ts à la ligne 6.

Vous pourrez ensuite changez votre ville ainsi que les deux autres informations.

<hr />

Avant de le lancer le programme, n'oubliez pas de faire

```Css
npm i
npx tsc .\app.ts
node .\app.js
```

Afin d'installer tous les packages nécessaire et de compiler le programme.

<hr />

Si tout est bon la console vous répondra quelque chose comme

```Css
Modification de la bio github pour votre-username
```

Tout fonctionne donc, votre bio s'actualisera toutes les heures !
