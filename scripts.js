const container = document.querySelector('.container');

let groceryList = []
const initialHtml = `
    <h1>Grocery List</h1>
    <form>
        <input type="text" id="itemName" name="itemName" placeholder="Item name" required>
        <input type="number" id="units" name="units" placeholder="Number of units" required>
        <input type="number" id="price" name="price" placeholder="Per unit price" required>
        <button type="submit">Add Item</button>
    </form>
    <table></table>
    <span></span>
`
container.innerHTML = initialHtml;

const table = document.querySelector('table');
function displayItems() {
    const tableHead = `<thead>
                        <tr>
                            <th>Grocery Item</th>
                            <th>Units</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>`
    const tableRows = groceryList.map((item) => `<tr>
        <td>${item.groceryItem}</td>
        <td>${item.noOfUnits}</td>
        <td>${item.perUnitPrice}</td>
        <td>${item.noOfUnits * item.perUnitPrice}</td>
    </tr>`).join('')
    table.innerHTML = `${tableHead}<tbody>${tableRows}</tbody>`
    const grandTotal = groceryList.reduce((totalPriceAccumulator,item) => {
        return totalPriceAccumulator + (item.noOfUnits * item.perUnitPrice);
    },0)
    const span = document.querySelector('span')
    span.textContent = `Grand Total : ${grandTotal}`
    
}

const isItems = JSON.parse(localStorage.getItem('items')) 
if (isItems) {
    groceryList = isItems;
    displayItems()
}

const formElement = document.querySelector('form');
function formElementSubmitHandler(event) {
    event.preventDefault();
    const { itemName,units,price } = event.target.elements;
    groceryList.push({
        groceryItem:itemName.value,
        noOfUnits:+units.value,
        perUnitPrice:+price.value
    })
    displayItems();
    localStorage.setItem('items',JSON.stringify(groceryList))
    event.target.reset()
}
formElement.addEventListener('submit', formElementSubmitHandler)