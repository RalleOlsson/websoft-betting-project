var jsonData = null;

function fillSidebar(game) {
    console.log("game: " + game);
    switch (game) {
        case 'CSGO':
            fetch('http://localhost:1337/api/csgo/matches')
                .then((response) => {
                    return response.json();
                }).then((jsonData) => {
                    addButtons(jsonData);
                })

            break;

    }

}

function addButtons(jsonData) {
    for (var i = 0; i < jsonData.length; i++) {
        console.log("adding button");
        var element = document.createElement("input");

        element.type = "button";
        element.value = jsonData[i].name;
        element.onclick = function() {
            alert("vafan är detta ?");
        };

        var foo = document.getElementById("fooBar");
        foo.appendChild(element);
    }
}

document.getElementById("btnAdd").onclick = function() {
    fillSidebar("CSGO");
};