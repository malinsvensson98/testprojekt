'use strict'

/* Variables for webpages */

let webpagesEl = document.getElementById("webpages");
let webpagesElNoButton = document.getElementById("webpagesNoButton");
let addWebpagesBtn = document.getElementById("addWebpages");
let web_titleInput = document.getElementById("web_title");
let urlInput = document.getElementById("url");
let descriptionInput = document.getElementById("description");



/* Eventlisteners */

window.addEventListener('load', getWebpages);
window.addEventListener('load', getWebpagesNoButton);
addWebpagesBtn.addEventListener('click', addWebpages);

/* Functions */

/* Get all webpages 2 */

function getWebpagesNoButton() {
    webpagesElNoButton.innerHTML = '';
    fetch("http://localhost/projekt_webb3/api_webpages/read.php")
        .then(response => response.json()
            .then(data => {
                data.forEach(webpages => {
                    webpagesElNoButton.innerHTML +=
                        `<div class="webpagesNoButton"> 
<p> 
<b> Title:</b> ${webpages.web_title} <br/>
<b> URL:</b> ${webpages.url}<br/>
<b> Description:</b> ${webpages.description}<br/>
</p> <br/><br/>
</div>`

                })
            }))
}



/* Get all webpages */
function getWebpages() {
    webpagesEl.innerHTML = '';
    fetch("http://localhost/projekt_webb3/api_webpages/read.php")
        .then(response => response.json()
            .then(data => {
                data.forEach(webpages => {
                    webpagesEl.innerHTML +=
                        `<div class="webpages"> 
<p> 
<b> Title:</b> ${webpages.web_title} <br/>
<b> URL:</b> ${webpages.url}<br/>
<b> Description:</b> ${webpages.description}<br/>
</p>

<button id="${webpages.web_id }" onClick="getOneWebpageToUpdate(${webpages.web_id })">Update</button>
<button id="${webpages.web_id }" onClick="deleteWebpages(${webpages.web_id} )">Delete</button>
</div>`

                })
            }))
}




/* Add webpages */
function addWebpages() {
    let web_title = web_titleInput.value;
    let url = urlInput.value;
    let description = descriptionInput.value;


    let webpages = { 'web_title': web_title, 'url': url, 'description': description };

    fetch("http://localhost/projekt_webb3/api_webpages/create.php", {
            method: "POST",
            body: JSON.stringify(webpages),
        })
        .then(response => response.json())
        .then(data => {
            getWebpages();
            document.getElementById('web_title').value = '';
            document.getElementById('url').value = '';
            document.getElementById('description').value = '';
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

/* Delete webpages */
function deleteWebpages(web_id) {
    fetch("http://localhost/projekt_webb3/api_webpages/delete.php?web_id=" + web_id, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            getWebpages();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}



/* Get one to update  */
function getOneWebpageToUpdate(web_id) {

    fetch('http://localhost/projekt_webb3/api_webpages/read_one.php?web_id=' + web_id)
        .then(response => response.json())
        .then(updateWebpageDiv.style.display = 'block')
        .then(webpages => {
            updateWebpageDiv.innerHTML +=
                `<form method="get">
            <label for="web_title">Title</label>
            <input type="text" name="web_title" id="newweb_title" value="${webpages.web_title}"> <br>
            <label for="url">URL</label>
            <input type="text" name="url" id="newurl" value="${webpages.url}"> <br>
            <label for="description">Description</label>
            <input type="text" name="description" id="newdescription" value="${webpages.description}"> <br>
            <input type="submit" id="updateWebpageButton" onClick="updateWebpages(${webpages.web_id })" value="Uppdatera"> <br>      
            <input type="submit" id="closeButton" onClick="closeDiv()" value="Avbryt">
            </form>`
        })
}


function updateWebpages(web_id) {

    let newweb_title = document.getElementById('newweb_title');
    let newurl = document.getElementById('newurl');
    let newdescription = document.getElementById('newdescription');


    newweb_title = newweb_title.value;
    newurl = newurl.value;
    newdescription = newdescription.value;


    let webpages = { 'web_id ': web_id, 'web_title': newweb_title, 'url': newurl, 'description': newdescription };

    fetch('http://localhost/projekt_webb3/api_webpages/update.php?web_id=' + web_id, {
            method: 'PUT',
            body: JSON.stringify(webpages)
        })
        .then(response => response.json())
        .then(data => {
            getWebpages();
        })
        .catch(error => {
            console.log('Error: ', error);
        })

}