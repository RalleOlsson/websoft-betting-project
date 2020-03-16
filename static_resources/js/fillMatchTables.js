function fillMatchTables(jsonData) {
    tabContent.innerHTML = "";

    console.log(jsonData);

    var currentDayRow = null;
    var day = null;

    var matchesHeader = document.createElement("div");

    matchesHeader.style.marginTop = "0px";
    matchesHeader.className = "content-row-match";
    matchesHeader.style.textAlign = "center";
    matchesHeader.style.borderTopRightRadius = "4px";
    matchesHeader.style.borderTopLeftRadius = "4px";


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
            var timeStr = date.toUTCString();
            time.innerHTML = timeStr;
        }

        if (i == jsonData.matches.length - 1) {
            row.style.borderBottomLeftRadius = "4px";
            row.style.borderBottomRightRadius = "4px";

        }

        row.appendChild(teams);
        row.appendChild(odds1);
        row.appendChild(odds2);
        row.appendChild(time);

        tabContent.appendChild(row);
    }


}


function makeMatchRow(row) {
    console.log("adding match");
    row.className = "content-row-match";

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
        var timeStr = date.toUTCString();
        time.innerHTML = timeStr;
    }

    matchIsPlaced = true;

    row.appendChild(teams);
    row.appendChild(odds1);
    row.appendChild(odds2);
    row.appendChild(time);

    currentDayRow.nextElementSibling.appendChild(row);
}

function makeDateRow(row) {
    /*console.log("adding day");*/
    row.className += "content-row-day";
    var content = document.createElement("div");
    row.appendChild(content);
    row.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });

    day = new Date(match.date).getUTCDay;

    currentDayRow = row;
    tabContent.appendChild(currentDayRow);
    /*console.log("finshed day");*/
}