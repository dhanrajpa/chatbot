/**
 * * category,Question API Fetch
 * TODO dynamic jtml cxreation for reply and menu
 * ? need to add api for answerss
 * 
 */
let jsondata = "";
let category = "";
let catId;
let CatQuestId;
let cat_questions;
let chatBody = document.getElementById('Bot-Box')
let categories_List = document.getElementById('categories-list');
let question_list = document.getElementById('question-list');
let reply_list = document.getElementById('cat-reply');
let answer_list = document.getElementById("answer")
let botBox = document.getElementById("Bot-Box")
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

    let catDiv1 = document.createElement("a");
    catDiv1.id = "categories-list";
    catDiv1.classList.add("list-group", "row", "categories-list");

    category.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#";
        newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item");
        newCat.id = `cat-item-${cat.id}`;
        newCat.innerHTML = `${cat.name}`;
        newCat.onclick = anchorPressed
        newCat.setAttribute('data-id', `${cat.id}`);
        console.log(newCat);
        catDiv1.appendChild(newCat);
    })

    let catDiv2 = document.createElement("div");
    catDiv2.classList.add("col-8");
    catDiv2.appendChild(catDiv1);

    let catDiv3 = document.createElement("div");
    catDiv3.classList.add("chatbox__messages");
    catDiv3.id = "cat";
    catDiv3.appendChild(catDiv2);

    botBox.appendChild(catDiv3)
}

//question list 
async function createCatQuesList(cat_question) {
    questionTag();

    let questDiv1 = document.createElement("div");
    questDiv1.classList.add("list-group", "row", "questions-list");
    questDiv1.id = "question-list";

    cat_question.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#";
        newCat.classList.add("list-group-item", "list-group-item-action", "question-list-item");
        newCat.id = `question-item-${cat.id}`;
        newCat.innerHTML = `${cat.question}`;
        newCat.onclick = answerList
        newCat.setAttribute('data-id', `${cat.id}`);
        questDiv1.appendChild(newCat);
    })

    let questDiv2 = document.createElement("div");
    questDiv2.classList.add("col-8");
    questDiv2.appendChild(questDiv1)

    let questDiv3 = document.createElement("div");
    questDiv3.classList.add("chatbox__messages");
    questDiv3.appendChild(questDiv2)
    botBox.appendChild(questDiv3)
}


// create tag elements
async function createAnswerElem(answerText) {

    let newCat = document.createElement("a");
    newCat.href = "#";
    newCat.classList.add("list-group-item", "list-group-item-action", "answer-list-item");
    newCat.id = `answer-item-${catId.id}`;
    newCat.innerHTML = `${answerText}`;
    newCat.setAttribute('data-id', `${1}`);
    console.log(newCat);

    let ansDiv1 = document.createElement("div");
    ansDiv1.classList.add("list-group", "row", "answer-list");
    ansDiv1.id = "answer";
    ansDiv1.id = "question-list";
    ansDiv1.appendChild(newCat);

    let ansDiv2 = document.createElement("div");
    ansDiv2.classList.add("col-8");
    ansDiv2.appendChild(ansDiv1)

    let ansDiv3 = document.createElement("div");
    ansDiv3.classList.add("chatbox__messages");
    ansDiv3.appendChild(ansDiv2)

    botBox.appendChild(ansDiv3)
    answerTag();
}

const questionTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Select from below Query";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.appendChild(messageItem);

    botBox.appendChild(message);
}

const answerTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Is Query resloved?";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.appendChild(messageItem);

    botBox.appendChild(message);


}

// reply element created
const replyElem = (text) => {

    let newReply = document.createElement("a");
    newReply.href = "#";
    newReply.id = "mesg-reply";
    newReply.classList.add("list-group-item", "list-group-item-action", "reply-list-item");
    newReply.innerHTML = text;


    let replyDiv = document.createElement("div");
    replyDiv.classList.add("list-group", "row", "cat-reply");
    replyDiv.appendChild(newReply);

    let replyDiv2 = document.createElement("div");
    replyDiv2.classList.add("col-8", "reply__messages__box");
    replyDiv2.appendChild(replyDiv);


    let replyDiv3 = document.createElement("div");
    replyDiv3.classList.add("reply__messages");
    replyDiv.id = "cat-replyy";
    replyDiv3.appendChild(replyDiv2);

    botBox.appendChild(replyDiv3)






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

    CatQuestId = e.currentTarget.getAttribute('data-id');
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

