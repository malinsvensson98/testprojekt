'use strict'

/* Variables for work */

let workEl = document.getElementById("work");
let workElNoButton = document.getElementById("workNoButton");
let addWorkBtn = document.getElementById("addWork");
let companyInput = document.getElementById("company");
let titleInput = document.getElementById("title");
let lengthInput = document.getElementById("length");



/* Eventlisteners */

window.addEventListener('load', getWork);
window.addEventListener('load', getWorkNoButton);
addWorkBtn.addEventListener('click', addWork);

/* Functions */

/* Get all work 2 */

function getWorkNoButton() {
    workElNoButton.innerHTML = '';
    fetch("http://localhost/projekt_webb3/api_work/read.php")
        .then(response => response.json()
            .then(work_data => {
                work_data.forEach(work => {
                    workElNoButton.innerHTML +=
                        `<div class="workNoButton"> 
<p> 
<b> Company:</b> ${work.company} <br/>
<b> Title:</b> ${work.title}<br/>
<b> Length:</b> ${work.length}<br/>
</p> <br/><br/>
</div>`

                })
            }))
}



/* Get all work */
function getWork() {
    workEl.innerHTML = '';
    fetch("http://localhost/projekt_webb3/api_work/read.php")
        .then(response => response.json()
            .then(work_data => {
                work_data.forEach(work => {
                    workEl.innerHTML +=
                        `<div class="work"> 
<p> 
<b> Company:</b> ${work.company} <br/>
<b> Title:</b> ${work.title}<br/>
<b> Length:</b> ${work.length}<br/>
</p>

<button id="${work.work_id }" onClick="getOneWorkToUpdate(${work.work_id })">Update</button>
<button id="${work.work_id }" onClick="deleteWork(${work.work_id} )">Delete</button>
</div>`

                })
            }))
}




/* Add work */
function addWork() {
    let company = companyInput.value;
    let title = titleInput.value;
    let length = lengthInput.value;


    let work = { 'company': company, 'title': title, 'length': length };

    fetch("http://localhost/projekt_webb3/api_work/create.php", {
            method: "POST",
            body: JSON.stringify(work),
        })
        .then(response => response.json())
        .then(work_data => {
            getWork();
            document.getElementById('company').value = '';
            document.getElementById('title').value = '';
            document.getElementById('length').value = '';
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

/* Delete work */
function deleteWork(work_id) {
    fetch("http://localhost/projekt_webb3/api_work/delete.php?work_id=" + work_id, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(work_data => {
            getWork();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}



/* Get one to update  */
function getOneWorkToUpdate(work_id) {

    fetch('http://localhost/projekt_webb3/api_work/read_one.php?work_id=' + work_id)
        .then(response => response.json())
        .then(updateDivWork.style.display = 'block')
        .then(work => {
            updateDivWork.innerHTML +=
                `<form method="get">
            <label for="company">Company</label>
            <input type="text" name="company" id="newcompany" value="${work.company}"> <br>
            <label for="title">Title</label>
            <input type="text" name="title" id="newtitle" value="${work.title}"> <br>
            <label for="length">Length</label>
            <input type="text" name="length" id="newlength" value="${work.length}"> <br>
            <input type="submit" id="updateWorkButton" onClick="updateWork(${work.work_id })" value="Uppdatera"> <br>      
            <input type="submit" id="closeButton" onClick="closeDiv()" value="Avbryt">
            </form>`
        })
}


function updateWork(work_id) {

    let newcompany = document.getElementById('newcompany');
    let newtitle = document.getElementById('newtitle');
    let newlength = document.getElementById('newlength');


    newcompany = newcompany.value;
    newtitle = newtitle.value;
    newlength = newlength.value;


    let work = { 'work_id ': work_id, 'company': newcompany, 'title': newtitle, 'length': newlength };

    fetch('http://localhost/projekt_webb3/api_work/update.php?work_id=' + work_id, {
            method: 'PUT',
            body: JSON.stringify(work)
        })
        .then(response => response.json())
        .then(work_data => {
            getWork();
        })
        .catch(error => {
            console.log('Error: ', error);
        })

}