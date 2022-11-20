/**
 * * category API Fetch
 * TODO check for multi ports access 
 * 
 */
let jsondata = "";
let category = "";
let categories_List = document.getElementById('categories-list');
let reply_list = document.getElementById('cat-reply');

let fetch_Category = "http://localhost:3000/category"



async function getCateg(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

async function getCatQuestions(id) {
    let response = await fetch(`http://localhost:3000/queries?categoryId=${id}`);
    let data = await response.json()
    return data;
}


async function createCatList(category) {
    category.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#"
        newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item");
        newCat.id = `cat-item-${cat.id}`
        newCat.innerHTML = `${cat.name}`;
        newCat.setAttribute('data-id', `${cat.id}`);
        console.log(newCat);
        categories_List.appendChild(newCat);
    })
}


const anchorPressed = async (e) => {
    let tagId = e.target.id; // Get ID of Clicked Element;
    let text = e.target.innerHTML; // Get innerText of Clicked Element;
    console.log(tagId);
    let id = e.currentTarget.getAttribute('data-id')
    console.log(`id of cat-list-${id}`);
    let cat_questions = await getCatQuestions(id);
    console.log(cat_questions);

    let newReply = document.createElement("a");
    console.log(newReply, reply_list);
    newReply.href = "#"
    newReply.classList.add("list-group-item", "list-group-item-action", "reply-list-item");
    newReply.innerHTML = text;
    reply_list.appendChild(newReply);



}

async function main() {

    category = await getCateg(fetch_Category)
    console.log(category);
    createCatList(category);


    let anchors = document.getElementsByTagName("a");

    for (let anchor of anchors) {
        anchor.addEventListener("click", anchorPressed);
    }
}











main();

