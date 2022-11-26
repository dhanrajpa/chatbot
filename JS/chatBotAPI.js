/**
 * * category,Question API Fetch
 * TODO 
 * ? need to add api for answerss
 * 
 */
let jsondata = "";
let category = "";
let catId;
let CatQuestId;
let cat_questions;
let categories_List = document.getElementById('categories-list');
let question_list = document.getElementById('question-list');
let reply_list = document.getElementById('cat-reply');
let answer_list = document.getElementById("answer")
let botBox = document.getElementById("Bot-Box")
let fetch_Category = "http://localhost:3000/category"
let newQuery = "http://localhost:3000/NewQuries"
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
const showMoreCat = (e) => {
    console.log("into hsow more cat");
    const hiddenItems = document.querySelectorAll('.hidden-item');
    hiddenItems.forEach(item => item.classList.toggle('hidden'));
    e.target.onclick = false
    document.querySelector(".show-more-button").remove()
}
//create category list
const createCatList = async (category) => {
    catTag()

    let catDiv1 = document.createElement("div");
    catDiv1.id = "categories-list";
    catDiv1.classList.add("list-group", "row", "categories-list");

    let count = 0
    category.map((cat) => {
        let newCat = document.createElement("a");
        newCat.href = "#";

        if (count < 4) {
            newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item");
        } else {
            newCat.classList.add("list-group-item", "list-group-item-action", "categories-list-item", "hidden-item", "hidden");
        }

        count = count + 1;
        newCat.id = `cat-item-${cat.id}`;
        newCat.innerHTML = `${cat.name}`;
        newCat.onclick = anchorPressed
        newCat.setAttribute('data-id', `${cat.id}`);
        console.log(newCat);
        catDiv1.appendChild(newCat);
    })

    let showMore = document.createElement("a");
    showMore.classList.add("show-more-button", "list-group-item", "list-group-item-action", "categories-list-item");
    showMore.innerHTML = "Show More"
    showMore.href = "#";
    showMore.onclick = showMoreCat
    catDiv1.appendChild(showMore);




    let catDiv2 = document.createElement("div");
    catDiv2.classList.add("col-8");
    catDiv2.appendChild(catDiv1);

    let catDiv3 = document.createElement("div");
    catDiv3.classList.add("chatbox__messages");
    catDiv3.id = "cat";
    catDiv3.appendChild(catDiv2);
    console.log(catDiv3);
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
//Answer Element
async function createAnswerElem(answerText) {

    let newCat = document.createElement("a");
    newCat.href = "#";
    newCat.classList.add("list-group-item", "list-group-item-action", "answer-list-item");
    newCat.id = `answer-item-${CatQuestId}`;
    newCat.innerHTML = `${answerText}`;
    newCat.setAttribute('data-id', `${CatQuestId}`);
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

    // selectMenu()

    answerTag();
}

//query Post Feedback
const LastMessage = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Thanks for writing to us. We will get back to you , incase iff your query doesn't get answered pl reach out to xxxxx@cybage.com";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "last-msg-tag"
    message.appendChild(messageItem);
    console.log(message);
    botBox.appendChild(message);
}

const postQuery = async (e) => {
    e.preventDefault();
    console.log(newQuery);

    let input = document.getElementById("queryText").value;

    const postData = {
        query: input,
    };
    // Post Query API
    const res = await fetch(newQuery,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    const data = await res.json();
    console.log(data);
    e.target.onclick = false;
    document.getElementById("query-msg-tag").remove();
    document.getElementById("write-query").remove();
    LastMessage();

}

const queryWrite = (e) => {
    // remove feedback
    queryTag();

    let feedBack = document.getElementById("feedback-mesg")
    feedBack.remove()

    let div = document.createElement("div");
    div.classList.add("chatbox__footer");
    div.id = "write-query"
    botBox.appendChild(div)

    let input = document.createElement("input");
    input.id = "queryText"
    input.setAttribute("type", "text")

    input.setAttribute("placeholder", "write your query")

    let btn_Query = document.createElement("button")
    btn_Query.classList.add("btn", "btn-sm")
    btn_Query.setAttribute("type", "button")
    btn_Query.innerHTML = "Send"
    div.appendChild(input)
    div.appendChild(btn_Query)

    e.target.onclick = false
    btn_Query.onclick = postQuery;
}

const feedbackMenu = async () => {
    //remove tag feedback
    let div1 = document.getElementById("tag-feedback")
    div1.remove();

    //remove previous buttons element  
    let feedback_btn_No = document.getElementById("feedback-btn-menu")
    feedback_btn_No.onclick = false
    let feedback_btn_Yes = document.getElementById("feedback-btn-share")
    feedback_btn_Yes.onclick = false
    feedback_btn_Yes.remove();
    feedback_btn_No.remove();

    // add new button elements 
    let div2 = document.getElementById("feedback-btn")

    let feedback_no_menu = document.createElement("button");
    feedback_no_menu.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_no_menu.id = `feedback-btn-select-menu`;
    feedback_no_menu.innerHTML = "Go to Menu";

    let feedback_no_query = document.createElement("button");
    feedback_no_query.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_no_query.id = `feedback-btn-query`;
    feedback_no_query.innerHTML = "Write Your Query";
    div2.appendChild(feedback_no_menu);
    div2.appendChild(feedback_no_query);

    feedback_no_menu.onclick = () => {
        let feedBack = document.getElementById("feedback-mesg")
        feedBack.remove()
        createCatList(category);
    }
    feedback_no_query.onclick = queryWrite;
}
//end

// create tag elements
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

const queryTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Write your query to us";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "query-msg-tag"
    message.appendChild(messageItem);

    botBox.appendChild(message);
}

const catTag = () => {
    let div = document.createElement("div");
    div.classList.add("messages__item--operator");
    div.id = "tag-questions";
    div.innerHTML = "Please choose your query from below Category";

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";
    messageItem.appendChild(div);

    let message = document.createElement("div");
    message.classList.add("message");
    message.appendChild(messageItem);

    botBox.appendChild(message);
}

const answerTag = () => {

    let div1 = document.createElement("div");
    div1.classList.add("messages__item--operator");
    div1.id = "tag-feedback";
    div1.innerHTML = "Is Query resolved?";

    let div2 = document.createElement("div");
    div2.classList.add("feedback");
    div2.id = "feedback-btn";

    let feedback_btn = document.createElement("button");
    feedback_btn.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_btn.id = `feedback-btn-share`

    feedback_btn.innerHTML = "yes";

    let feedback_btn_menu = document.createElement("button");
    feedback_btn_menu.classList.add("btn", "btn-primary", "btn-sm", "btn");
    feedback_btn_menu.id = `feedback-btn-menu`;
    feedback_btn_menu.innerHTML = "No";
    feedback_btn_menu.onclick = feedbackMenu
    feedback_btn.onclick = () => {
        console.log("yes");

    }
    div2.appendChild(feedback_btn);
    div2.appendChild(feedback_btn_menu);

    let messageItem = document.createElement("div");
    messageItem.id = "tag-item";

    messageItem.appendChild(div1);
    messageItem.appendChild(div2);

    console.log(messageItem);
    let message = document.createElement("div");
    message.classList.add("message");
    message.id = "feedback-mesg"

    message.appendChild(messageItem);
    botBox.appendChild(message);


}
//end

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

//question List
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
//answer
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

    //sort category on counter basis descending
    category.sort((a, b) => parseInt(b.counter) - parseInt(a.counter));
    console.log(category);

    createCatList(category);

    // console.log("hello");

}











main();

