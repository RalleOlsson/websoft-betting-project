function openSport(evt, sportName, color) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        tablinks[i].style.backgroundColor = "";
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(sportName).style.display = "block";
    if (evt.currentTarget.className === "tabLink") {
        evt.currentTarget.className += " active";
        evt.currentTarget.style.backgroundColor = color;
    }

}

document.getElementById("defaultOpen").click();