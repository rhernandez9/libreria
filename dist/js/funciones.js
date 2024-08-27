function imprimirCatalogo(articulos){
    var main = document.getElementById("main");
    for (let i = 0; i < articulos.length; i++) {
      var col = document.createElement("div");
      col.classList.add("col");
      col.classList.add("col-2");
      var card = document.createElement("div");
      card.classList.add("card");
      var image = document.createElement("img");
      image.setAttribute("src",articulos[i].urlImage);
      image.setAttribute("alt",articulos[i].NombreArt);

      var cardB = document.createElement("div");
      cardB.classList.add("card-body");

      var cardT = document.createElement("h5");
      cardT.classList.add("card-title");
      var h5Text = document.createTextNode(articulos[i].NombreArt);

      var pPrecio = document.createElement("p");
      var precioText = document.createTextNode("Precio: $" + articulos[i].Precio);

      var pStock = document.createElement("p");
      var stockText = document.createTextNode("Stock: " + articulos[i].Stock);

      var pCarrito = document.createElement("p");
      var carritoText = document.createTextNode("Añadir al Carrito ");

      var carrito = document.createElement("i");
      carrito.classList.add("fa-solid");
      carrito.classList.add("fa-cart-shopping");

      let idVar = articulos[i].IdArticulo;
      let catVar = articulos[i].Categoria;

      carrito.addEventListener("click", function() {
        añadirCarrito(idVar,catVar,1);
      });
    
      pCarrito.appendChild(carritoText);
      pCarrito.appendChild(carrito);

      pStock.appendChild(stockText);

      pPrecio.appendChild(precioText);
      
      cardT.appendChild(h5Text);
      cardB.appendChild(cardT);
      cardB.appendChild(pPrecio);
      cardB.appendChild(pStock);
      cardB.appendChild(pCarrito);

      card.appendChild(image);
      card.appendChild(cardB);

      col.appendChild(card);
      main.appendChild(col);

    }
}

function añadirCarrito(id,cat,cant){
  var item = {
        idItem:id,
        catItem:cat,
        cantItem:cant
  }
  var listItem = JSON.parse(localStorage.getItem('cartItem')) || [];

  const result = listItem.find((item) => item.idItem === id);
  if(result == undefined){
    listItem.push(item);
    localStorage.setItem('cartItem', JSON.stringify(listItem));
  }
  imprimirCarrito();
}

function imprimirCarrito(){
  const listItem = JSON.parse(localStorage.getItem('cartItem')) || [];
  var cart = document.getElementById("carritoList");
  cart.innerHTML = "";
  var Total = 0;
  for (let i = 0; i < listItem.length; i++) {
    
    if(listItem[i].catItem == "Escolar"){
      var cartItem = JSON.parse(localStorage.getItem('cartEsc')) || [];
      let result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
      Total = Total + (listItem[i].cantItem * result.Precio); 
      var prueba = itemCarrito(result,listItem[i].cantItem);
    }else if(listItem[i].catItem == "Arte"){
      var cartItem = JSON.parse(localStorage.getItem('cartArt')) || [];
      let result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
      Total = Total + (listItem[i].cantItem * result.Precio); 
      var prueba = itemCarrito(result,listItem[i].cantItem);
    }else{
      var cartItem = JSON.parse(localStorage.getItem('cartOfc')) || [];
      let result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
      Total = Total + (listItem[i].cantItem * result.Precio); 
      var prueba = itemCarrito(result,listItem[i].cantItem);
    }

    cart.appendChild(prueba);
  }
  var h5Total = document.createElement("h5");
  var h5TotalText = document.createTextNode("Total a Pagar: $" + Total);
  h5Total.appendChild(h5TotalText);
  cart.appendChild(h5Total);

  numCart();
}

function numCart(){
  var numCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  var cart = document.getElementById("carritoIcon");
  if(numCart.length != 0){
    cart.innerHTML = numCart.length;
  }else{
    cart.innerHTML = "";
  }
  
}

function itemCarrito(result,cant){
  var aItem = document.createElement("a");
  aItem.classList.add("list-group-item");
  aItem.classList.add("list-group-item-action");
  aItem.setAttribute("aria-current","true");

  var divItem = document.createElement("div");
  divItem.classList.add("d-flex");
  divItem.classList.add("w-100");
  divItem.classList.add("justify-content-between");

  var imageItem = document.createElement("img");
  imageItem.setAttribute("src",result.urlImage);
  imageItem.setAttribute("alt",result.NombreArt);
  imageItem.classList.add("imageItem");

  var h5Item = document.createElement("h5");
  h5Item.classList.add("mb-1");
  var h5ItemText = document.createTextNode(result.NombreArt);
  h5Item.appendChild(h5ItemText);

  var smallItem = document.createElement("small");
  var smallText = document.createTextNode("Stock: " + result.Stock);
  smallItem.appendChild(smallText);

  var more = document.createElement("i");
  more.classList.add("fa-solid");
  more.classList.add("fa-plus");
  more.addEventListener("click", function() {
    addItem(result.IdArticulo,result.Stock);
  });

  var minus = document.createElement("i");
  minus.classList.add("fa-solid");
  minus.classList.add("fa-minus");
  minus.addEventListener("click", function() {
    minusItem(result.IdArticulo);
  });

  var smallItemCant = document.createElement("small");
  var smallItemCantText = document.createTextNode(cant);
  smallItemCant.appendChild(smallItemCantText);

  divItem.appendChild(h5Item);
  divItem.appendChild(smallItem);

  divItem.appendChild(minus);
  divItem.appendChild(smallItemCant);
  divItem.appendChild(more);

  aItem.appendChild(divItem);

  divItem.appendChild(imageItem);
  var pItem =  document.createElement("p");
  var pItemText = document.createTextNode(result.Info);
  pItem.appendChild(pItemText);

  var smallItemPrice = document.createElement("small");
  var smallItemPriceText = document.createTextNode("Precio Unitario: $" + result.Precio + " ");
  smallItemPrice.appendChild(smallItemPriceText);
  
  var iDelete = document.createElement("i");
  iDelete.classList.add("fa-solid");
  iDelete.classList.add("fa-trash");
  iDelete.addEventListener("click", function() {
    deleteItem(result.IdArticulo);
  });

  aItem.appendChild(pItem);
  aItem.appendChild(smallItemPrice);
  aItem.appendChild(iDelete);

  return aItem;
}

function addItem(id,stock){
  var itemCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  var newCart = [];
  for (let i = 0; i < itemCart.length; i++) {
      if(itemCart[i].idItem == id){
        if(itemCart[i].cantItem < stock){
          var item = {
            idItem:itemCart[i].idItem,
            catItem:itemCart[i].catItem,
            cantItem:parseInt(itemCart[i].cantItem)+1,
          }
        }else{
          var item = {
            idItem:itemCart[i].idItem,
            catItem:itemCart[i].catItem,
            cantItem:itemCart[i].cantItem,
          }
        }

      }else{
        var item = {
          idItem:itemCart[i].idItem,
          catItem:itemCart[i].catItem,
          cantItem:parseInt(itemCart[i].cantItem),
        }
      }
      newCart.push(item);
      localStorage.setItem('cartItem', JSON.stringify(newCart));
      imprimirCarrito();
  }
}

function minusItem(id){
  var itemCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  var newCart = [];
  for (let i = 0; i < itemCart.length; i++) {
      if(itemCart[i].idItem == id){
        if(itemCart[i].cantItem == 1){
          var item = {
            idItem:itemCart[i].idItem,
            catItem:itemCart[i].catItem,
            cantItem:1,
          }
        }else{
          var item = {
            idItem:itemCart[i].idItem,
            catItem:itemCart[i].catItem,
            cantItem:parseInt(itemCart[i].cantItem)-1,
          }
        }
      }else{
        var item = {
          idItem:itemCart[i].idItem,
          catItem:itemCart[i].catItem,
          cantItem:parseInt(itemCart[i].cantItem),
        }
      }
      newCart.push(item);
      localStorage.setItem('cartItem', JSON.stringify(newCart));
      imprimirCarrito();
  }
}

function deleteItem(id){
  var itemCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  
  if(itemCart.length <= 1){
      localStorage.removeItem('cartItem');
      imprimirCarrito();
  }else{
    var newCart = [];
    for (let i = 0; i < itemCart.length; i++) {
        if(itemCart[i].idItem != id){
          let item = {
            idItem:itemCart[i].idItem,
            catItem:itemCart[i].catItem,
            cantItem:parseInt(itemCart[i].cantItem),
          }
          newCart.push(item);
        }
  
      }
        localStorage.setItem('cartItem', JSON.stringify(newCart));
        imprimirCarrito();
  }
}