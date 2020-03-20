function fillSidebar(game) {

    var sidebarHeader = document.getElementById("sidebarHeader");
    var eventBar = document.getElementById("eventBar");

    switch (game) {
        case 'CSGO':
            if (sidebarHeader.innerHTML != "CSGO") {
                eventBar.innerHTML = "";
                fetchEvents(game);
            }
            sidebarHeader.innerHTML = "CSGO";
            break;

        case 'LOL':
            if (sidebarHeader.innerHTML != "LOL") {
                eventBar.innerHTML = "";
                //fetchEvents(game);
                workInProgress();

            }
            sidebarHeader.innerHTML = "LOL";
            break;

        case 'DOTA2':
            if (sidebarHeader.innerHTML != "DOTA2") {
                eventBar.innerHTML = "";
                //fetchEvents(game);
                workInProgress();
            }
            sidebarHeader.innerHTML = "DOTA2";
            break;

        case 'OW':
            if (sidebarHeader.innerHTML != "OW") {
                eventBar.innerHTML = "";
                fetchEvents(game);
                sidebarHeader.innerHTML = "OW";
                break;
            }

    }
}

function addButtons(jsonData, game) {
    for (var i = 0; i < jsonData.length; i++) {

        var element = document.createElement("input");

        element.type = "button";
        element.className = "sideBarButton";
        element.value = jsonData[i].eventName;
        eventBar = document.getElementById("eventBar");
        element.name = i;

        element.onclick = function() {

            eventBar = document.getElementById("eventBar");

            sideBarButtons = document.getElementsByClassName("sideBarButton");

            for (i = 0; i < sideBarButtons.length; i++) {
                sideBarButtons[i].className = sideBarButtons[i].className.replace(" active", "");
                sideBarButtons[i].style.backgroundColor = "";
            }

            if (this.className === "sideBarButton") {
                this.className += " active";
                this.style.backgroundColor = "var(--primaryColor)";
            }

            fillMatchTables(jsonData[this.name], game);

        }

        eventBar.appendChild(element);

        if (i === 0) {
            element.id = "defaultSideBar";
        }

    }
    document.getElementById("defaultSideBar").click();
}

function fetchEvents(game) {
    if (!gamesData[game]) {
        var url = 'http://localhost:1337/api/matches/' + game;
        console.log("fetching: " + url);
        fetch(url)
            .then((response) => {
                return response.json();
            }).then((jsonData) => {
                gamesData[game] = jsonData;
                addButtons(gamesData[game], game);
            });
    }
    /** if data is already loaded */
    else {
        console.log("loading from memory");
        addButtons(gamesData[game], game);
    }

}

function workInProgress() {
    document.getElementById("tabcontent").innerHTML = "";
    var matchesHeader = document.createElement("div");

    matchesHeader.style.marginTop = "0px";
    matchesHeader.className = "content-row-match";
    matchesHeader.style.textAlign = "center";
    matchesHeader.style.borderRadius = "var(--cornerRadius)";
    matchesHeader.style.backgroundColor = "var(--primaryColor)";


    var matchesText = document.createElement("div");
    matchesText.style.gridColumnStart = "1";
    matchesText.style.gridColumnEnd = "5";
    matchesText.innerHTML = "No data";

    matchesHeader.appendChild(matchesText);

    tabContent.appendChild(matchesHeader);
}