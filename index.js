const productsList = document.querySelector('#products-list')
const formCad = document.querySelector('#form')
const formEdit = document.querySelector('#formEdit')
const edit = document.querySelector('#edit')
const cad = document.querySelector('#cad')


const API_URL = "http://localhost:8080/api/products"


// Obtem a lista de produtos
function getList() {

    fetch(API_URL).then(response => {
        response.json().then(data => {
            const productsHtml = data.map(products => `
                <li>
                    ${products.name} - ${products.brand} - ${products.price} - 
                    <a href="#" class="btn-editar"
                    data-id="${products._id}"
                    data-name="${products.name}"
                    data-brand="${products.brand}"
                    data-price="${products.price}"
                    >
                    [Editar]
                    </a>
                    <a href="#" class="btn-excluir" data-id="${products._id}">[Excluir]</a>
                </li>    
            `).join('')

            productsList.innerHTML = productsHtml

            eventEdit()
            eventExclude()
        })
    })
}
getList()

// ao cadastrar um produto
form.onsubmit = function (e) {
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

    }).then(data => {

        if (data.status === 200) {
            form.reset()
            getList()
            alert('Cadastro realizado com sucesso!')
        } else {
            alert('Ops, ocorreu um erro, tente novamente!')
        }

    })
}



//  Ao editar um produto
formEdit.onsubmit = function (e) {
    e.preventDefault()

    
    const id = document.forms['formEdit'].id.value
    const name = document.forms['formEdit'].name.value
    const brand = document.forms['formEdit'].brand.value
    const price = document.forms['formEdit'].price.value

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            brand,
            price,
        })
    }).then(response => {
        response.json().then(data => {
            getList()


            if (data.message === "success") {
                alert('Produto alterado com sucesso!')
                edit.classList.add('hidden')
                cad.classList.remove('hidden')
            } else {
                alert('Oops, ocorreu um erro, tente novamente!')
            }
        })
    })
}



//  Evento de click botao Editar
function eventEdit() {
    const botoesEditar = document.querySelectorAll('.btn-editar')
    botoesEditar.forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault()

                edit.classList.remove('hidden')
                cad.classList.add('hidden')

                const id = this.dataset.id
                const name = this.dataset.name
                const brand = this.dataset.brand
                const price = this.dataset.price

                document.forms['formEdit'].id.value = id
                document.forms['formEdit'].name.value = name
                document.forms['formEdit'].brand.value = brand
                document.forms['formEdit'].price.value = price
        }
    })


}




// Evento de click do botão excluir
function eventExclude() {
    const botoesExcluir = document.querySelectorAll('.btn-excluir')
    botoesExcluir.forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault()

            const id = this.dataset.id

            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            }).then(response => {
                response.json().then(data => {
                    getList()

                    if (data.message === "success") {
                        alert('Produto excluído com sucesso!')
                    } else {
                        alert('Oops, ocorreu um erro, tente novamente!')
                    }
                })
            })

        }
    })
}