let myLeads = [];
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.getElementById('tab-btn');



if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
tabBtn.addEventListener('click',function(){
    chrome.tabs.query({active : true,currentWindow : true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads)
    })
})

inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value);
    inputEl.value = ''
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    myLeads = JSON.parse(localStorage.getItem('myLeads'));
    render(myLeads)
})

function render(leads) {
    let list = "";
    leads.forEach(element => {
        list +=
            `<li> 
                <a target = "_blank" href='${element} >${element} </a>
             </li>
        <br>`
    });
    ulEl.innerHTML = list;
}



deleteBtn.addEventListener('dblclick',function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})
