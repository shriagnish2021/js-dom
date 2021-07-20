const container = document.querySelector('.container')

const initialHtml = `
    <h1>Grocery List</h1>
    <form>
        <input type="text" id="itemName" name="itemName" placeholder="Item name" required>
        <input type="number" id="units" name="units" placeholder="No. of units" required>
        <input type="number" id="price" name="price" placeholder="Per unit price" required>
        <button type="submit">Add Item</button>
    </form>
    <table></table>
    <span></span>
`
container.innerHTML = initialHtml

let groceryList = []
function displayItems() {
    const table = document.querySelector('table')
    const tableHead = `
        <thead>
            <tr>
                <th>Item Name</th>
                <th>Number of Units</th>
                <th>Unit Price</th>
                <th>Total Price</th>
            </tr>
        </thead>
    `
    groceryList = JSON.parse(localStorage.getItem('items'))
    const tableRows = groceryList.map(item => `
        <tr>
            <td>${item.itemName}</td>
            <td>${item.units}</td>
            <td>${item.price}</td>
            <td>${item.units * item.price}</td>
        </tr>
    `).join('')
    table.innerHTML = `${tableHead}<tbody>${tableRows}</tbody>`
    
    const grandTotal = groceryList.reduce((grandTotalAccumulator,item) => {
        return grandTotalAccumulator + (item.units * item.price)
    },0)
    const span = document.querySelector('span')
    span.innerHTML = `Grand Total : ${grandTotal}`
}
displayItems()

const form = document.querySelector('form')

function formSubmitHandler(event){
    event.preventDefault()
    const { itemName,units,price } = event.target.elements
    groceryList.push({
        itemName:itemName.value,
        units:+units.value,
        price:+price.value,
    })
    localStorage.setItem('items',JSON.stringify(groceryList))
    displayItems()
    event.target.reset()
}
form.addEventListener('submit', formSubmitHandler)

