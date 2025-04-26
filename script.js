document.addEventListener('DOMContentLoaded', function(){
    const expenseName = document.getElementById('expense-name')
    const expenseAmt = document.getElementById('expense-amount')
    const expenseForm = document.getElementById('expense-form')
    const expenseList = document.getElementById('expense-list')

    
    let itemsInExpense = JSON.parse(localStorage.getItem('Items'))  || []
    let amtInExpense = JSON.parse(localStorage.getItem('total')) || 0 
    updateTheDom()

    expenseForm.addEventListener('submit', function(e){
        e.preventDefault()
        let x = {id:Date.now(), item:expenseName.value, price:expenseAmt.value} 
        let flag = false
        itemsInExpense.forEach(items => {
            if(items.item === x.item)
            {
                flag = true
            }
        })

        if(flag)
        {
            alert('This item is already in your expenses!')
        }

        else{
            itemsInExpense.push(x)
            localStorage.setItem('Items', JSON.stringify(itemsInExpense))
            amtInExpense += parseFloat(x.price)
            localStorage.setItem('total', JSON.stringify(amtInExpense))
            updateTheDom()
            expenseAmt.value = ""
            expenseName.value = ""
        }
    })



    function updateTheDom()
    {
        if(itemsInExpense.length !== 0)
        {
            expenseList.innerHTML = '' 
            itemsInExpense.forEach((item)=>{
                const li = document.createElement('li')
                li.innerHTML = `
                <span>${item.item} - ${item.price}</span>
                <button data-id="${item.id}">Remove</button>
                `
                expenseList.appendChild(li) 
            })
            document.getElementById('total-amount').textContent = `${JSON.parse(localStorage.getItem('total'))}`
        }
        else{
            expenseList.innerHTML = ``
            document.getElementById('total-amount').textContent = `${JSON.parse(localStorage.getItem('total'))}`
        }
    }

    expenseList.addEventListener('click', function(e){
        if(e.target.tagName === "BUTTON")
        {
            console.log(e.target.getAttribute("data-id"));
            const amtToSub = itemsInExpense.find(item => item.id === Number(e.target.getAttribute("data-id")))?.price || 0;
            amtInExpense -= amtToSub
            itemsInExpense = itemsInExpense.filter(item => item.id != e.target.getAttribute("data-id"))

            localStorage.setItem('Items', JSON.stringify(itemsInExpense))
            localStorage.setItem('total', JSON.stringify(amtInExpense))
            updateTheDom()            
        }

    })
})