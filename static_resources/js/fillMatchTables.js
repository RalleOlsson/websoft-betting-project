function fillMatchTables(jsonData, game) {


    tabContent.innerHTML = "";

    //console.log(jsonData);

    var currentDayRow = null;
    var day = null;

    var matchesHeader = document.createElement("div");

    matchesHeader.style.marginTop = "0px";
    matchesHeader.className = "content-row-match";
    matchesHeader.style.textAlign = "center";
    matchesHeader.style.borderTopRightRadius = "var(--cornerRadius)";
    matchesHeader.style.borderTopLeftRadius = "var(--cornerRadius)";
    matchesHeader.style.backgroundColor = "var(--primaryColor)";


    var matchesText = document.createElement("div");
    matchesText.style.gridColumnStart = "1";
    matchesText.style.gridColumnEnd = "5";
    matchesText.innerHTML = "Matches";

    matchesHeader.appendChild(matchesText);

    tabContent.appendChild(matchesHeader);

    for (var i = 0; i < jsonData.matches.length; i++) {

        var match = jsonData.matches[i];
        var matchIsPlaced = false;

        var row = document.createElement("div");

        row.className = "content-row-match";

        var teams = document.createElement("div");
        teams.innerHTML = match.team1.name + " - " + match.team2.name;
        teams.className = "content-row-item teams";

        var odds1 = document.createElement("div");
        odds1.innerHTML = "x";
        odds1.className = "content-row-item odds1";
        var odds2 = document.createElement("div");
        odds2.innerHTML = "x";
        odds2.className = "content-row-item odds2";
        var time = document.createElement("div");
        time.className = "content-row-item matchTime";

        if (match.live) {
            time.innerHTML = "live";
        } else {
            var date = new Date(match.date);
            var timeStr = date.toUTCString();
            time.innerHTML = timeStr;
        }

        if (i == jsonData.matches.length - 1) {
            row.style.borderBottomLeftRadius = "var(--cornerRadius)";
            row.style.borderBottomRightRadius = "var(--cornerRadius)";

        }

        const matchId = match.id;
        row.onclick = function() {
            var userId = document.getElementById("userId").innerText;

            var data = {
                userId: userId,
                matchId: matchId,
                betPlaced: 'none'
            };

            fetch('http://localhost:1337/api/bets/' + game.toLowerCase(), {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    alert(json + ", enter /accounts to change the amount and team");
                });
        };

        const odd1 = odds1;
        const odd2 = odds2;
        fetch('http://localhost:1337/api/odds/' + matchId)
            .then((response) => {
                return response.json();
            }).then((jsonData) => {
                odd1.innerHTML = jsonData[0].team1odds;
                odd2.innerHTML = jsonData[0].team2odds;
            });

        row.appendChild(teams);
        row.appendChild(odds1);
        row.appendChild(odds2);
        row.appendChild(time);

        tabContent.appendChild(row);

    }


}