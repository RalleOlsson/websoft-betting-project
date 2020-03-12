function fillMatchTables(jsonData) {
    tabContent.innerHTML = "";

    console.log(jsonData);

    for (var i = 0; i < jsonData.matches.length; i++) {

        var match = jsonData.matches[i];

        var matchRow = document.createElement("div");

        matchRow.className = "content-row";

        var teams = document.createElement("div");
        teams.innerHTML = match.team1.name + " - " + match.team2.name;
        teams.className = "content-row-item teams";


        var odds1 = document.createElement("div");
        odds1.innerHTML = "1.00";
        odds1.className = "content-row-item odds1";
        var odds2 = document.createElement("div");
        odds2.innerHTML = "2.00";
        odds2.className = "content-row-item odds2";
        var time = document.createElement("div");
        time.className = "content-row-item matchTime";

        if (match.live) {
            time.innerHTML = "live";
        } else {
            var date = new Date(match.date);
            var timeStr = date.toLocaleTimeString();
            time.innerHTML = timeStr;
        }

        matchRow.appendChild(teams);
        matchRow.appendChild(odds1);
        matchRow.appendChild(odds2);
        matchRow.appendChild(time);

        tabContent.appendChild(matchRow);
    }





    /*matchRow.innerHTML = document.getElementsByClassName("active")[0].innerHTML;*/


}