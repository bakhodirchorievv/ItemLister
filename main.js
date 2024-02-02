const input = document.querySelector("#item-input") 
const submitBtn = document.querySelector("#submit-btn") 
const itemList = document.querySelector("#items") 

let thingsToDo = JSON.parse(localStorage.getItem("thingsToDo")) || []

function updateLocalStorage () {
    localStorage.setItem("thingsToDo", JSON.stringify(thingsToDo))
}

function addData () {
    itemList.innerHTML = ""

    thingsToDo.forEach(data => {
        itemList.style.display = "block" 
        const newItem = document.createElement("li") 
        newItem.textContent = data.value 
        newItem.className = "list-group-item" 
        const newItem2 = document.createElement("div") 
        newItem2.textContent = "x" 
        newItem2.className = "addition" 
     
        itemList.append(newItem) 
        newItem.append(newItem2) 
        newItem2.addEventListener("click", function(event) { 
            const li = event.target.parentElement
            itemList.removeChild(li)
            const indexToRemove = thingsToDo.findIndex(item => item.value === data.value);
            thingsToDo.splice(indexToRemove, 1);
            if (itemList.childElementCount == 0) {
                itemList.style.display = "none"
            }
            updateLocalStorage()
        }) 
    });

}

submitBtn.addEventListener("click", (event)=> {
    event.preventDefault()
    thingsToDo.push({
        value: input.value,
    })
    addData()
    updateLocalStorage()
    input.value = ""
})
addData()