window.onload = getObjects;

function getObjects() {
    var getit = new XMLHttpRequest;
    getit.onload = function() {
        if (getit.status === 200) {
            writeObject(JSON.parse(getit.responseText))
        }
    };
    getit.open("GET", "jfile.php", true);
    getit.send(null)
}