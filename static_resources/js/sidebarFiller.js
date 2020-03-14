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
                }
                /** if data is already loaded */
                else {
                    console.log("loading from memory");
                    addButtons(csgoData);
                }

            }

            sidebarHeader.innerHTML = "CSGO";
            break;

        case 'LOL':
            if (sidebarHeader.innerHTML != "LOL") {
                eventBar.innerHTML = "";
                if (!lolData) {
                    document.getElementById("tabcontent").innerHTML = "";
                    /**addButtons(lolData);*/
                }
                /** if data is already loaded */
                else {
                    document.getElementById("tabcontent").innerHTML = "";
                    //addButtons(lolData);
                }
            }
            sidebarHeader.innerHTML = "LOL";
            break;

        case 'DOTA2':
            if (sidebarHeader.innerHTML != "DOTA2") {
                eventBar.innerHTML = "";
                if (!dotaData) {
                    document.getElementById("tabcontent").innerHTML = "";
                    //addButtons(dotaData);
                }
                /** if data is already loaded */
                else {
                    document.getElementById("tabcontent").innerHTML = "";
                    //addButtons(dotaData);
                }
            }
            sidebarHeader.innerHTML = "DOTA2";
            break;

    }
}

function addButtons(jsonData) {
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
                sideBarButtons[i].className = sideBarButtons[i].className.replace("active", "");
                sideBarButtons[i].style.backgroundColor = "";
            }

            if (this.className === "sideBarButton") {
                this.className += " active";
                this.style.backgroundColor = "purple";
            }

            fillMatchTables(jsonData[this.name]);

        }

        eventBar.appendChild(element);

        if (i === 0) {
            element.id = "defaultSideBar";
        }
    }
    document.getElementById("defaultSideBar").click();
}