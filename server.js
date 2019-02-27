const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/seasonLeaderStats', (req, res) => {
    // fetch("https://stats.nba.com/stats/homepagev2/?GameScope=Season&PlayerOrTeam=Player&StatType=Traditional&Season=2018-19&SeasonType=Regular%20Season&PlayerScope=All%20Players&LeagueID=00&DayOffset=0")
    // .then(res => res.text())
    //   .then(body => console.log(body));
    console.log("Get Season Leader's stats");
    axios.get("https://stats.nba.com/stats/homepagev2/?GameScope=Season&PlayerOrTeam=Player&StatType=Traditional&Season=2018-19&SeasonType=Regular%20Season&PlayerScope=All%20Players&LeagueID=00&DayOffset=0")
    .then(response => res.send(response.data))
    .catch(function (error) {
        console.log(error);
      });

});

app.get('/api/playerInfo/:playerId', (req, res) => {
    // fetch("https://stats.nba.com/stats/homepagev2/?GameScope=Season&PlayerOrTeam=Player&StatType=Traditional&Season=2018-19&SeasonType=Regular%20Season&PlayerScope=All%20Players&LeagueID=00&DayOffset=0")
    // .then(res => res.text())
    //   .then(body => console.log(body));
    axios.get("https://stats.nba.com/stats/commonplayerinfo?PlayerID=" + req.params.playerId)
    .then(response => res.send(response.data))
    .catch(function (error) {
        console.log(error);
      });

});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));