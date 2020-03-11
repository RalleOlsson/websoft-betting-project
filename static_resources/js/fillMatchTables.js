function fillMatchTables(jsonData) {
    tabContent.innerHTML = "";

    var eventTab = document.createElement("div");

    eventTab.className = "content-row";

    eventTab.innerHTML = document.getElementsByClassName("active")[0].innerHTML;

    tabContent.appendChild(eventTab);
}