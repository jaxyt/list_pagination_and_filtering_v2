/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing



const mainDiv = document.querySelector('div.page');
const searchDiv = document.querySelector('div.page-header');
const h2 = searchDiv.querySelector('h2')

function createSearchBar() {
    const newSearchDiv = document.createElement('div');  //creates the search bar
    newSearchDiv.className = 'student-search';
    searchDiv.appendChild(newSearchDiv);

    const newSearchInput = document.createElement('input');
    newSearchInput.placeholder = 'Search for students...';
    newSearchDiv.appendChild(newSearchInput);

    const newSearchButton = document.createElement('button');
    newSearchButton.textContent = 'Search';
    newSearchDiv.appendChild(newSearchButton);
}


createSearchBar();



const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');

const ul = document.querySelector('ul.student-list');
const studentList = ul.children;







const showPage = (list, page)=>{
    const startIndex = (page * 10) - 10;
    const endIndex = page * 10;

    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) { //displays students
            list[i].style.display = '';
        } else {
            list[i].style.display = 'none'; //hides students
        }
    }
}


const appendPageLinks = (list)=>{
    const newDiv = document.createElement('div');
    newDiv.className = 'pagination';
    mainDiv.appendChild(newDiv);  //creates the page div section

    const newUl = document.createElement('ul');
    newDiv.appendChild(newUl);

    for (let i = 0; i < (list.length / 10); i++) {
        const li = document.createElement('li');
        newUl.appendChild(li);

        const a = document.createElement('a'); //creates a link for each page
        a.href = '#';
        a.textContent = i + 1;
        if (i === 0) {
            a.className = 'active';
        }
        li.appendChild(a);
    }

    for (let i = 0; i < newUl.children.length; i++) { //adds an event listener to each 'a' link
        const link = newUl.children[i].firstElementChild;
        link.addEventListener('click', (e)=>{
            for (let k = 0; k < newUl.children.length; k++) {
                const currentLink = newUl.children[k].firstElementChild;
                if (currentLink.className === 'active') {
                    currentLink.className = '';
                }
            }
            e.target.className = 'active';
            showPage(list, e.target.textContent);
        }) 
    }
}

const removePageLinks = ()=>{
   const childDiv = document.querySelector('div.pagination');
   mainDiv.removeChild(childDiv);
}

const noResults = ()=>{
   const span = document.createElement('span');
   span.textContent = ': No Results Found';
   h2.appendChild(span);
}

const removeNoResults = ()=>{
   const span = h2.firstElementChild;
   h2.removeChild(span);
}





searchButton.addEventListener('click', (e)=>{
   const searchValue = e.target.previousElementSibling.value;
   for (let k = 0; k < studentList.length; k++) { //first sets all students display styles to none
      const stu = studentList[k];
      stu.style.display = 'none';
    }
    for (let i = 0; i < studentList.length; i++) { //searches through names in realtime to find partial matches
        const stu = studentList[i]; 
        const name = stu.firstElementChild.firstElementChild.nextElementSibling.textContent;
        

        if (name.includes(searchValue)) {
            stu.style.display = '';
        }
    }
})

searchInput.addEventListener('keyup', (e)=>{
    const searchResults = []
    const searchValue = e.target.value;
    for (let k = 0; k < studentList.length; k++) { //first sets all students display styles to none
        const stu = studentList[k];
        stu.style.display = 'none';
    }
    for (let i = 0; i < studentList.length; i++) { //searches through names in realtime to find partial matches
        const stu = studentList[i]; 
        const name = stu.firstElementChild.firstElementChild.nextElementSibling.textContent;

        if (name.includes(searchValue)) {
            searchResults.push(stu);
            removePageLinks();
            showPage(searchResults, 1);
            appendPageLinks(searchResults);
        }
    }
    if (searchResults.length === 0) {
        if (!h2.firstElementChild) {
            noResults();
        }   
    }
    if (searchResults.length > 0) {
        if (h2.firstElementChild) {
            removeNoResults();
        }   
    }
})



appendPageLinks(studentList);

showPage(studentList, 1); //just so the screen looks fine when the page first loads




