function fillMatchTables(jsonData) {
    tabContent.innerHTML = "";

    console.log(jsonData);

    for (var i = 0; i < jsonData.matches.length; i++) {
        var matchRow = document.createElement("div");

        matchRow.className = "content-row";

        matchRow.innerHTML = jsonData.matches[i].team1.name + " - " + jsonData.matches[i].team2.name;

        tabContent.appendChild(matchRow);
    }





    /*matchRow.innerHTML = document.getElementsByClassName("active")[0].innerHTML;*/


}