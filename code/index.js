import add from "./calc"
import "./index.css"
import image from "./logo.png"

import React from "react";
import ReactDom from "react-dom";

/*
console.log(add(3,5))

const h1=document.createElement("h1")

const img=document.createElement("img")

img.src=image

img.classList.add("logo")
h1.innerText="hello webpack";

h1.classList.add("redcolor")



document.getElementById("root").appendChild(h1)

document.getElementById("logo").appendChild(img)


var fm = document.querySelector("form");
var tb = document.querySelector("table");
fm.addEventListener("submit", addItem);
var btn = document.querySelector("button");
btn.addEventListener("click", deleteAll);

function deleteAll() {
    var items = tb.querySelectorAll("tr");
    for(var i = 1; i < items.length; i++) {
        items[i].remove();
    }
}

function addItem(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var quantity = document.getElementById("quantity").value;
    var priority = document.getElementById("priority").value;
    console.log(name, quantity, priority);
    if (name.length > 0) {
        createRow(name, quantity, priority);
    }
    document.getElementById("name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("priority").value = "";
}

function createRow(name, quantity, priority) {
    var row = document.createElement("tr");
    var td1 = document.createElement('td');
    td1.textContent = name;
    var td2 = document.createElement('td');
    td2.textContent = quantity
    var td3 = document.createElement('td');
    td3.textContent = priority;
    if (priority == "high") {
        td3.style.color = "red";
    }
    var td4 = document.createElement("td");
    td4.textContent = "Mark";
    td4.addEventListener("click", markComplete);

    var td5 = document.createElement("td");
    td5.textContent = "Delete";
    td5.addEventListener("click", makeDelete);

    row.append(td1, td2, td3, td4, td5);

    tb.appendChild(row);
}

function markComplete(e) {
    e.target.textContent = "Completed";
    e.target.removeEventListener("click", markComplete);
    e.target.parentNode.style.backgroundColor = "green";
}

function makeDelete(e) {
    e.target.parentNode.remove();
}
*/

ReactDom.render(
    //React.createElement("h1", { className: "redcolor"}, "Hello React"),// what
<h1 className="redcolor">React with{""} bABEL</h1>,

    document.getElementById("root")//where
)