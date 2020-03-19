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

                var data = [{
                        eventName: 'OW test event1',
                        matches: [{
                                id: 1,
                                date: 1584651600000,
                                team1: { name: 'XQC' },
                                team2: { name: 'Seagull' },
                                live: false

                            },
                            {
                                id: 2,
                                team1: { name: 'Covid-19' },
                                team2: { name: 'Vaccine' },
                                date: 1584565200000,
                                live: false
                            }
                        ]
                    },
                    {
                        eventName: 'OW test event2',
                        matches: [{
                                id: 3,
                                team1: { name: 'T1' },
                                team2: { name: 'T2' },
                                date: 1584565200000,
                                live: false
                            },
                            {
                                id: 4,
                                team1: { name: 'T3' },
                                team2: { name: 'T4' },
                                date: 1584565200000,
                                live: false
                            }
                        ]
                    }
                ];
                addButtons(data, 'ow');
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
        console.log("fetching: api/" + game + "/matches");
        fetch('http://localhost:1337/api/' + game + '/matches')
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