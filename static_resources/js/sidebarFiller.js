function fillSidebar(game) {

    var sidebarHeader = document.getElementById("sidebarHeader");
    var eventBar = document.getElementById("eventBar");

    switch (game) {
        case 'CSGO':

            if (sidebarHeader.innerHTML != "CSGO") {
                eventBar.innerHTML = "";
                if (!csgoData) {
                    console.log("fetching: api/csgo/matches");
                    csgoData = fetch('http://localhost:1337/api/csgo/matches')
                        .then((response) => {
                            return response.json();
                        }).then((jsonData) => {
                            csgoData = jsonData;
                            addButtons(jsonData);
                        });
                } else {
                    addButtons(csgoData);
                }
            }

            sidebarHeader.innerHTML = "CSGO";
            break;

        case 'LOL':
            if (sidebarHeader.innerHTML != "LOL") {
                eventBar.innerHTML = "";
            }
            sidebarHeader.innerHTML = "LOL";
            break;

        case 'DOTA2':
            if (sidebarHeader.innerHTML != "DOTA2") {
                eventBar.innerHTML = "";
            }
            sidebarHeader.innerHTML = "DOTA2";
            break;

    }
}

function addButtons(jsonData) {
    for (var i = 0; i < jsonData.length; i++) {

        var element = document.createElement("input");

        element.type = "button";
        element.value = jsonData[i].eventName;
        element.onclick = function() {
            alert("vafan är detta ?");
        };

        eventBar = document.getElementById("eventBar");
        eventBar.appendChild(element);
    }
}

document.getElementById("btnAdd").onclick = function() {
    fillSidebar("CSGO");
};