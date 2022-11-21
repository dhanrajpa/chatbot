/**
 * * category API Fetch
 * TODO Lavkar Sampav
 * ! check for looping elements
 * 
 */
let jsondata = "";
let category = "";
let chatBody = document.getElementById('Bot-Box')
let categories_List = document.getElementById('categories-list');
let question_list = document.getElementById('question-list');

let reply_list = document.getElementById('cat-reply');

let fetch_Category = "http://localhost:3000/category"

/**
 * 
 * @param {categoryId} category id  
 * *API created 
 */
// get categories
const getCateg = async (url) => {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

// get questions 
const getCatQuestions = async (id) => {
    let response = await fetch(`http://localhost:3000/queries?categoryId=${id}`);
    let data = await response.json()
    return data;
}
//end


//create category list
const createCatList = async (category) => {
    category.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#";
        newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item");
        newCat.id = `cat-item-${cat.id}`;
        newCat.innerHTML = `${cat.name}`;
        newCat.setAttribute('data-id', `${cat.id}`);
        console.log(newCat);
        categories_List.appendChild(newCat);
    })
}

//question list 
async function createCatQuesList(cat_question) {
    questionTag();
    cat_question.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#";
        newCat.classList.add("list-group-item", "list-group-item-action", "question-list-item");
        newCat.id = `cat-item-${cat.id}`;
        newCat.innerHTML = `${cat.question}`;
        newCat.setAttribute('data-id', `${cat.id}`);
        console.log(newCat);
        question_list.appendChild(newCat);
    })
}

const questionTag = () => {
    let messageItem = document.getElementById("tag-item");
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Select from below Query";
    messageItem.appendChild(div);

}

// reply element created
const replyElem = (text) => {
    let newReply = document.createElement("a");
    console.log(newReply, reply_list);
    newReply.href = "#";
    newReply.classList.add("list-group-item", "list-group-item-action", "reply-list-item");
    newReply.innerHTML = text;
    reply_list.appendChild(newReply);
}

const anchorPressed = async (e) => {
    let tagId = e.target.id; // Get ID of Clicked Element;
    let text = e.target.innerHTML; // Get innerText of Clicked Element;
    console.log(tagId);
    let id = e.currentTarget.getAttribute('data-id');
    console.log(`id of cat-list-${id}`);
    replyElem(text);
    let cat_questions = await getCatQuestions(id);
    console.log(cat_questions);
    createCatQuesList(cat_questions)
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

