var jsonData = null;

function fillSidebar(game) {
    console.log("game: " + game);
    switch (game) {
        case 'CSGO':
            var foo = document.getElementById("fooBar");

            if (foo.children.length <= 0) {
                fetch('http://localhost:1337/api/csgo/matches')
                    .then((response) => {
                        return response.json();
                    }).then((jsonData) => {
                        addButtons(jsonData);
                    })
            }

            break;

        case 'LOL':

            break;

        case 'DOTA2':

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

        var foo = document.getElementById("fooBar");
        foo.appendChild(element);
    }
}

document.getElementById("btnAdd").onclick = function() {
    fillSidebar("CSGO");
};