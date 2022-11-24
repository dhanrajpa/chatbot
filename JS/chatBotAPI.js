/**
 * * category,Question API Fetch
 * TODO dynamic jtml cxreation for reply and menu
 * ? need to add api for answerss
 * 
 */
let jsondata = "";
let category = "";
let catId;
let cat_questions;
let chatBody = document.getElementById('Bot-Box')
let categories_List = document.getElementById('categories-list');
let question_list = document.getElementById('question-list');
let reply_list = document.getElementById('cat-reply');
let answer_list = document.getElementById("answer")

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
        newCat.onclick = anchorPressed
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
        newCat.id = `question-item-${cat.id}`;
        newCat.innerHTML = `${cat.question}`;
        newCat.onclick = answerList
        newCat.setAttribute('data-id', `${cat.id}`);
        console.log(newCat);
        question_list.appendChild(newCat);
    })
}


// create tag elements
async function createAnswerElem(answerText) {
    answerTag();

    let newCat = document.createElement("a");
    newCat.href = "#";
    newCat.classList.add("list-group-item", "list-group-item-action", "answer-list-item");
    // newCat.id = `answer-item-${cat.id}`;
    newCat.innerHTML = `${answerText}`;
    // newCat.onclick = answerList
    newCat.setAttribute('data-id', `${1}`);
    console.log(newCat);
    answer_list.appendChild(newCat);
}

const questionTag = () => {
    let messageItem = document.getElementById("tag-item");
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Select from below Query";
    messageItem.appendChild(div);
}
const answerTag = () => {
    let messageItem = document.getElementById("tag-item");
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Is Query resloved?";
    messageItem.appendChild(div);
}

// reply element created
const replyElem = (text) => {
    let newReply = document.createElement("a");
    newReply.href = "#";
    newReply.id = "mesg-reply";
    newReply.classList.add("list-group-item", "list-group-item-action", "reply-list-item");
    newReply.innerHTML = text;
    reply_list.appendChild(newReply);
}

const anchorPressed = async (e) => {
    let tagId = e.target.id; // Get ID of Clicked Element;
    let text = e.target.innerHTML; // Get innerText of Clicked Element;
    console.log(tagId);
    catId = e.currentTarget.getAttribute('data-id');
    console.log(`id of cat-list-${catId}`);
    replyElem(text);

    // disable category menu
    let menuDisable = document.getElementById('mesg-reply');

    if (menuDisable) {
        let anchors = document.getElementsByClassName("categories-list-item");
        for (let anchor of anchors) {
            anchor.onclick = false;
        }
    }
    //end
    //categories question**********************
    cat_questions = await getCatQuestions(catId);
    createCatQuesList(cat_questions);

}


const answerList = async (e) => {

    let tagQuesId = e.target.id; // Get ID of Clicked Element;
    let text = e.target.innerHTML; // Get innerText of Clicked Element;
    console.log(tagQuesId);

    let CatQuestId = e.currentTarget.getAttribute('data-id');
    console.log(`id of cat-question-selected -${CatQuestId}`);

    replyElem(text);
    let menuDisable = document.getElementById('mesg-reply');
    let questions = document.getElementsByClassName("question-list-item");
    console.log(questions);

    // disable questionList menu
    if (menuDisable) {
        for (let anchor of questions) {
            anchor.onclick = false;
        }
    }
    //end
    //categories question answer**********************

    const replyAnswer = cat_questions.filter((i) => {
        return i.id == CatQuestId;
    });
    let ans = replyAnswer[0].answer
    createAnswerElem(ans)
}

async function main() {

    category = await getCateg(fetch_Category)
    console.log(category);
    createCatList(category);



}











main();

