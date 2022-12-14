const productsList = document.querySelector('#products-list')
const formCad = document.querySelector('#form')        



const API_URL = "http://localhost:8080/api/products"

        
// Obtem a lista de produtos
function getList(){

    fetch(API_URL).then(response => {
        response.json().then(data => {
            const productsHtml = data.map(products => `
                <li>
                    ${products.name} - ${products.brand} - ${products.price}
                </li>    
            `).join('')
    
            productsList.innerHTML = productsHtml
            
        })
    })
}
getList()

// ao cadastrar um produto
form.onsubmit = function(e){
    e.preventDefault()

    const name = document.forms['form'].name.value
    const brand = document.forms['form'].brand.value
    const price = document.forms['form'].price.value
    
    fetch(API_URL, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            brand,
            price
        })

    }).then(data =>{
        
            if(data.status === 200){
                form.reset()
                getList()
                alert('Cadastro realizado com sucesso!')
            } else{
                alert('Ops, ocorreu um erro, tente novamente!')
            }
            
    })
}

