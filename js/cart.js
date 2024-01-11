// const items = [

    
//     {
//         id: 0,
//         nome: 'hamburguer',
//         img: 'image.jpg',
//         quantidade: 0
//     },
//     {
//         id: 1,
//         nome: 'lanches',
//         img: 'image.jpg',
//         quantidade: 0
//     },
//     {
//         id: 2,
//         nome: 'bebidas',
//         img: 'image.jpg',
//         quantidade: 0
//     },
//     {
//         id: 3,
//         nome: 'doces',
//         img: 'image.jpg',
//         quantidade: 0
//     },
// ]

// inicializarLoja = () => {
//     var containerCardapio = document.getElementById('cardapio');
//     items.map((val)=>{
//         containerCardapio.innerHTML+= `
        
//          <div class="cardapio-section">
//             <img src="`+val.img+`" />
//             <p>`+val.nome+`</p>
//             <a key="`+val.id+`"  href="#">Adicionar ao carrinho!</a>
//          </div>
//         `;
//     })
// }

// inicializarLoja();

// atualizarCarrinho = () => {
//     console.log(items)
// }

// var links = document.getElementsByTagName('a');

// for(var i = 0; i < links.length; i++){
//     links[i].addEventListener("click",function(){
//         let key = this.getAttribute('key');
//         items[key].quantidade++;
//         atualizarCarrinho();
//         return false;
//     })
// }

let cart = [];

function addToCart(itemName, itemPrice) {
    const newItem = { name: itemName, price: itemPrice };
    cart.push(newItem);
    updateCart();
}

document.getElementById('menu').addEventListener('click', function(event) {
    const priceElement = event.target.closest('.price');
    if (priceElement) {
        const itemName = priceElement.parentElement.querySelector('h3').textContent;
        const itemPrice = parseFloat(priceElement.textContent.replace('R$', '').trim());
        addToCart(itemName, itemPrice);
    }
});

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    // Limpa o conteúdo atual do carrinho
    cartList.innerHTML = '';

    // Adiciona os itens ao carrinho
    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Adiciona botão de remover item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.dataset.index = index;
        removeButton.addEventListener('click', removeItem);
        listItem.appendChild(removeButton);

        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        listItem.appendChild(itemText);

        cartList.appendChild(listItem);
        total += item.price;
    });

    // Atualiza o total
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeItem(event) {
    // Obtém o índice do botão de remover
    const index = event.target.dataset.index;

    // Remove o item do carrinho com base no índice
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    const message = generateWhatsAppMessage();
    const whatsappLink = `https://wa.me/seunumerodetelefone/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

function generateWhatsAppMessage() {
    let message = 'Olá! Gostaria de fazer o seguinte pedido:\n';

    cart.forEach(item => {
        message += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });

    message += `\nTotal: R$ ${getTotal()}`;

    return message;
}

function getTotal() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}
