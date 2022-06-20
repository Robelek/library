let myLibrary = [];
let usedIDs = [];

let formContainer = document.querySelector("#form-container");
let overlayElement = document.querySelector(".overlay");
let formContainerParent = formContainer.parentElement;
hideForm();

let cardParent = document.querySelector(".card-container");
let templateCard = document.querySelector(".card");

cardParent.removeChild(templateCard);

function book(title, author, pages, read)
{
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
book.prototype.displayInfo =function()
{
    console.log(this.title, this.author, this.pages, this.read);
}
function showForm()
{
    let formChildren = formContainer.childNodes;
    for(let i=0;i<formChildren.length;i++)
    {
        if(formChildren[i].nodeName=="DIV")
        {   
            if(formChildren[i].classList.contains("input-holder"))
            {
                formChildren[i].lastElementChild.value="";
            }
        }
       
    }
     formContainerParent.appendChild(overlayElement);
    formContainerParent.appendChild(formContainer);


   
}
function hideForm()
{
    formContainerParent.removeChild(overlayElement);
    formContainerParent.removeChild(formContainer);
}
function addBookToLibrary(title, author, pages, read)
{
    let newBook = new book(title, author, pages, read);
    myLibrary.push(newBook);
    
    let newBookCard = templateCard.cloneNode(true);
    let children = newBookCard.childNodes;

    for(let i=0;i<children.length;i++)
    {
        if(children[i].nodeName=="DIV")
        {
            if(children[i].classList.contains("title"))
            {
                children[i].textContent=title;
            }
            else if(children[i].classList.contains("author"))
            {
                children[i].textContent="by "+author;
            }
            else if(children[i].classList.contains("pages"))
            {
                children[i].textContent=pages + " pages";
            }
            else if(children[i].classList.contains("isRead"))
            {
                if(read===true)
                {
                    children[i].classList.add("Read");
                }
            }
            
        }
    }
    if(usedIDs.length==0)
    {
        newBookCard.setAttribute("id", 0);
        usedIDs.push(0);
    }
    else
    {
        let newID = usedIDs[usedIDs.length-1];
        newID+=1;
        newBookCard.setAttribute("id", newID);
        usedIDs.push(newID);
    }
    cardParent.appendChild(newBookCard);
    console.log(usedIDs);
    console.log(myLibrary);
}
function submitData()
{
    let title = document.getElementsByName("title")[0].value;
    console.log(title);
    let author = document.getElementsByName("author")[0].value;
    console.log(author);
    let pages = document.getElementsByName("pages")[0].value;
    console.log(pages);
    let read = document.getElementsByName("read")[0].checked;
    console.log(read);
    if(title.length>0&&author.length>0&&pages>0)
    {
        hideForm();
        addBookToLibrary(title, author, pages, read);
    }
    
}
function changeRead(el)
{
    if(el.classList.contains("Read"))
    {
        el.classList.remove("Read");
        el.textContent = "not read";
        myLibrary[el.parentElement.id].read = false;
    }
    else
    {
        el.classList.add("Read");
        el.textContent = "read";
        myLibrary[el.parentElement.id].read = true;
    }
}
function removeBook(el)
{

    if(myLibrary.length>0)
    {
        myLibrary.splice(el.parentElement.id,1);
    }
    else
    {
        myLibrary=[];
    }
    console.log(el.parentElement);
    cardParent.removeChild(el.parentElement);

   
}
