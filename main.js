const cron = require("node-cron");
const fetch = require("node-fetch");
const weather = require("weather-js");
const config = require("./config.json");

async function update_github_bio(message) {
  const rep = await fetch(`https://api.github.com/user`, {
    method: "PATCH",
    body: JSON.stringify({
      bio: message,
    }),
    headers: {
      Authorization: `token ${config.personnalToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await rep.json();
  if (data.login) {
    console.log("Modification de la bio github pour " + data.login);
  } else {
    console.log("Erreur " + data);
  }
}

function good_locate(args) {
  const good = args.slice(0, args.indexOf(","));
  return good;
}

cron.schedule("* */1 * * *", () => {
  try {
    weather.find(
      {
        search: config.location,
        degreeType: config.degreeType,
        lang: config.language,
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          var current = result[0].current;

          var now = new Date();
          var hours = now.getHours();
          var minutes = now.getMinutes();
          var day = now.getDate();
          var month = now.getMonth() + 1;
          var year = now.getFullYear();
          var date =
            day + "/" + month + "/" + year + " " + hours + "h" + minutes;

          const message = `Météo actuelle à ${good_locate(
            current.observationpoint
          )} : ${current.skytext} avec une température de ${
            current.temperature
          }${config.degreeType} et un ressenti de ${current.feelslike}${
            config.degreeType
          } | Dernnière update ${date}`;

          update_github_bio(message);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});
