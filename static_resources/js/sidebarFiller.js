function fillSidebar(type) {

    var element = document.createElement("input");

    element.type = type;
    element.value = type;
    element.name = type;
    element.onclick = function() {
        alert("vafan är detta ?");
    };

    var foo = document.getElementById("fooBar");
    foo.appendChild(element);

}

document.getElementById("btnAdd").onclick = function() {
    fillSidebar("button");
};