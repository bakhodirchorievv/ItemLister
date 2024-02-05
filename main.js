const input = document.querySelector("#item-input") 
const submitBtn = document.querySelector("#submit-btn") 
const itemList = document.querySelector("#items") 
const header = document.querySelector(".header")
const searchIput = document.querySelector(".search-input")

header.style.backgroundColor = "#1c8d41"
header.style.color = "#f0f0f0"

let thingsToDo = JSON.parse(localStorage.getItem("thingsToDo")) || []

function updateLocalStorage () {
    localStorage.setItem("thingsToDo", JSON.stringify(thingsToDo))
}

searchIput.addEventListener("input", ()=> {
    let filteredItems = thingsToDo.filter(data => data.value.toLowerCase().includes(searchIput.value.toLowerCase()))
    addData(filteredItems)
})

let determine;

function addData (filteredItems) {
    itemList.innerHTML = ""

    let itemsForList;

    if (filteredItems) {
        itemsForList = filteredItems
        determine = "f"
    } else {
        itemsForList = thingsToDo
        determine = "t"
    }

    itemsForList.forEach(data => {
      
        if (data.value) {
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
                if (determine == "t" || filteredItems.length == thingsToDo.length) {
                    updateDisplay()
                }
                updateLocalStorage()
            }) 
        }
    
    })
    if (determine == "t" || filteredItems.length == thingsToDo.length) {
        updateDisplay()
    }

}

function updateDisplay () {
    if (itemList.childElementCount == 0) {
        searchIput.style.display = "none"
    } else {
        searchIput.style.display = "inline-block"
    }
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