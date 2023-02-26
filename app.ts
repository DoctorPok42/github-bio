import { CronJob } from "cron";
import axios from "axios";
import fetch from "node-fetch";

const config = {
  personnalToken: "YOUR_PERSONNAL_TOKEN", // https://github.com/settings/tokens
  location: "Paris",
  degreeType: "C",
  language: "FR",
  apiKey: "YOUR_API_KEY", // https://www.weatherapi.com/my/
};

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const getWeather = async (location: string): Promise<WeatherData> => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${location}&lang=${config.language}`;
  const response = await axios.get(url);
  return response.data as WeatherData;
};

async function updateGithubBio({ message }: any) {
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

const job = new CronJob("* * * *", () => {
  try {
    getWeather(config.location).then((data) => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const date = day + "/" + month + "/" + year + " " + hours + "h" + minutes;

      const message = `Météo actuelle à ${data.location.name} : ${data.current.condition.text} ${data.current.condition.icon} avec une température de ${data.current.temp_c}${config.degreeType} | Dernnière update ${date}`;

      updateGithubBio(message);
    });
  } catch (error) {
    console.log(error);
  }
});

job.start();
