const apiKey="7rC276MUp34bhwJjUyNeT1q217bymewuzbUCz89G";

const container=document.getElementById("current-image-container");
const form=document.getElementById("search-form");
const input=document.getElementById("search-input");
const history=document.getElementById("search-history");

function getCurrentImageOfTheDay(){

const currentDate=new Date().toISOString().split("T")[0];

fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
.then(res=>res.json())
.then(data=>{

container.innerHTML=`
<h3>${data.title}</h3>
<p>${data.date}</p>
<img src="${data.url}">
<p>${data.explanation}</p>
`;

});

}

function getImageOfTheDay(date){

fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
.then(res=>res.json())
.then(data=>{

container.innerHTML=`
<h3>${data.title}</h3>
<p>${data.date}</p>
<img src="${data.url}">
<p>${data.explanation}</p>
`;

saveSearch(date);
addSearchToHistory();

});

}

function saveSearch(date){

let searches=JSON.parse(localStorage.getItem("searches"))||[];

searches.push(date);

localStorage.setItem("searches",JSON.stringify(searches));

}

function addSearchToHistory(){

history.innerHTML="";

let searches=JSON.parse(localStorage.getItem("searches"))||[];

searches.forEach(date=>{

let li=document.createElement("li");

li.textContent=date;

li.addEventListener("click",function(){
getImageOfTheDay(date);
});

history.appendChild(li);

});

}

form.addEventListener("submit",function(e){

e.preventDefault();

const date=input.value;

getImageOfTheDay(date);

});

window.onload=function(){

getCurrentImageOfTheDay();

addSearchToHistory();


};
