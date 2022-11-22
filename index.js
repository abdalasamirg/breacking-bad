let cards = document.querySelector(".row")
let sInput = document.querySelector("#searchInput")
let title = document.querySelector(".title")
let select = document.querySelector("#selectChar")
let api = "https://www.breakingbadapi.com/api/characters"
select.onchange = async function() {
    let char = await fetch(api + "?name=" + select.value)
    let data = await char.json()
    nameData(data[0])
}

function nameData(actor) {
    cards.innerHTML = `<div class="col-lg-2 col-md-6 col-sm-1 card unmatch" id="${actor.name}"><h4 class="h4">${actor.name}</h4><img class="img "id="${actor.char_id}" src="${actor.img}" alt=""></div>`
    let docs = document.createElement("div")
    docs.innerHTML = `
    <h4><span class="docs"> Name:       </span> ${actor.name}        </h4>
    <h4><span class="docs"> Birtday:    </span> ${actor.birthday}</h4>
    <h4><span class="docs"> Occupation: </span> ${actor.occupation}</h4>
    <h4><span class="docs"> Status:     </span> ${actor.status}</h4>
    <h4><span class="docs"> Nickname:   </span> ${actor.nickname}</h4>
`
    cards.appendChild(docs)
}

//char_id=0 ##name:1#birthday:2#img:4
async function hello() {
    let char = await fetch("https://www.breakingbadapi.com/api/characters")
    let data = await char.json()
    printData(data);

}

function printData(data) {
    cards.innerHTML += ` ${data.map(actor=>  `<div class="col-lg-2 col-md-6 col-sm-1 card unmatch" id="${actor.name}"><h4 class="h4">${actor.name}</h4><img class="img "id="${actor.char_id}" src="${actor.img}" alt=""></div>`)}`
    select.innerHTML += ` ${data.map(actor=>  `<option class="actors" value="${actor.name}">${actor.name}</option>`)}`
    let actors=document.querySelectorAll(".actors")


    let img=document.querySelectorAll(".img")
    let card = document.querySelector(".card")


    img.forEach(element => {
        element.addEventListener("click",function(){ 
            select.value=""
            let actorName= element.parentElement.textContent
            element.parentElement.classList.remove("unmatch")
            element.parentElement.classList.add("match")
            element.classList.remove("img")
            element.classList.add("matchImg")
            let unmatch=document.querySelectorAll(".unmatch")
            let h4=document.querySelectorAll(".h4")
            let docs=document.createElement("div")
            docs.innerHTML=`
            <h4><span class="docs"> Name:       </span> ${element.parentElement.id}        </h4>
            <h4><span class="docs"> Birtday:    </span> ${data[element.id-1].birthday}</h4>
            <h4><span class="docs"> Occupation: </span> ${data[element.id-1].occupation}</h4>
            <h4><span class="docs"> Status:     </span> ${data[element.id-1].status}</h4>
            <h4><span class="docs"> Nickname:   </span> ${data[element.id-1].nickname}</h4>

            `
            cards.appendChild(docs)

            h4.forEach(element => {
        element.textContent=""                
            });
            unmatch.forEach(element => {
                cards.removeChild(element)

                
            });
        })
    });
    
}
hello()