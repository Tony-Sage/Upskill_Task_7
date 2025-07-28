let menuList = [
  {
    image: 'images/egusi.jpeg',
    name: 'Egusi & Fufu',
    description: 'Well cooked, well garnished egusi soup served with freshly pounded fufu. Perfect for lunch. A meal to last you days!',
    price: '#3000',
  },
  {
    image: 'images/jollof.jpeg',
    name: 'Jollof Rice & Chicken',
    description: 'Smoky party-style jollof rice served with spicy fried chicken and plantains. A Nigerian classic!',
    price: '#2500',
  },
  {
    image: 'images/ofada.jpeg',
    name: 'Ofada Rice & Ayamase',
    description: 'Local ofada rice served with spicy green pepper stew loaded with assorted meat. Packed with native flavor!',
    price: '#3500',
  },
  {
    image: 'images/afang.jpeg',
    name: 'Afang Soup & Eba',
    description: 'Rich, nutritious Afang soup made with water leaves, uziza, and stockfish. Served with hot, stretchy eba.',
    price: '#2800',
  },
  {
    image: 'images/beans.jpeg',
    name: 'Beans & Dodo',
    description: 'Steamed honey beans (ewa) with palm oil sauce, paired with golden fried plantains. A hearty and healthy choice.',
    price: '#1800',
  },
  {
    image: 'images/yam_porridge.jpeg',
    name: 'Yam Porridge (Asaro)',
    description: 'Creamy yam porridge cooked with palm oil, fish, and vegetables. Comfort food at its finest!',
    price: '#2000',
  },
  {
    image: 'images/moimoi.jpeg',
    name: 'Moi Moi & Pap',
    description: 'Soft, flavorful moi moi made with beans and spices, served with smooth, hot pap (ogi). Perfect for breakfast.',
    price: '#1500',
  }
];

let menuContainer = document.getElementById('showCase');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
let cartList = document.getElementById('cartDisplay');

// I'm rendering menu items here
menuList.forEach((item, index) => {
  menuContainer.innerHTML += `
    <div class="menu-card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p><strong><span class="price">${item.price}</span></strong></p>
      <button class="orderButton" data-index="${index}">Order Now</button>
    </div>
  `;
});

// This is the event listeners for the "Order Now" buttons
document.querySelectorAll(".orderButton").forEach(button => {
  button.addEventListener("click", function () {
    const item = menuList[this.dataset.index];
    const servings = prompt(`How many servings of "${item.name}" would you like to add?`);
    
    const quantity = parseInt(servings);
    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid number of servings.");
      return;
    }

    addToCart(item, quantity);
  });
});

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^\d]/g, ""));
}

function addToCart(item, quantity = 1) {
  if (cartItems[item.name]) {
    cartItems[item.name].quantity += quantity;
  } else {
    cartItems[item.name] = {
      ...item,
      quantity: quantity
    };
  }

  saveCart();
  updateCartUI();
}

function updateCartUI() {
  cartList.innerHTML = "";
  let total = 0;

  const ul = document.createElement("ul");

  for (let itemName in cartItems) {
    const cartItem = cartItems[itemName];
    const price = parsePrice(cartItem.price);
    const itemTotal = price * cartItem.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.textContent = `${cartItem.name} x${cartItem.quantity} - ₦${itemTotal.toLocaleString()}`;
    ul.appendChild(li);
  }

  cartList.appendChild(ul);

  const totalDisplay = document.createElement("p");
  totalDisplay.innerHTML = `<strong>Total: ₦${total.toLocaleString()}</strong>`;
  cartList.appendChild(totalDisplay);
}

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function clearCart() {
  cartItems = {};
  localStorage.removeItem('cartItems');
  updateCartUI();
}

// This place handles Place Order button
document.querySelector("#submitOrder").addEventListener("click", function () {
  if (Object.keys(cartItems).length === 0) {
    alert("Your cart is empty. Please add items before submitting your order.");
    return;
  }

  alert("Order submitted successfully! Thank you for choosing Sage's Eatery.");
  clearCart();
});

// This place handles Print button
document.querySelector("#printOrder").addEventListener("click", function () {
  let printContent = "Your Order Summary:\n\n";
  let total = 0;

  for (let itemName in cartItems) {
    const cartItem = cartItems[itemName];
    const price = parsePrice(cartItem.price);
    const itemTotal = price * cartItem.quantity;
    total += itemTotal;
    printContent += `${cartItem.name} x${cartItem.quantity} - ₦${itemTotal.toLocaleString()}\n`;
  }

  printContent += `\nTotal: ₦${total.toLocaleString()}`;
  const win = window.open('', '', 'width=600,height=400');
  win.document.write(`<pre>${printContent}</pre>`);
  win.print();
  win.close();
});

// This restores cart on page load
updateCartUI();

document.querySelector('#viewCart').addEventListener("click", viewCart)

function viewCart() {
 if (document.querySelector('#viewCart').textContent === "View Cart"){
  document.querySelector('#viewCart').textContent = "Go Back";
  document.querySelector('#cart-section').style.display = 'flex';
  document.querySelector('#showcase-section').style.display = 'none';
 } else if (document.querySelector('#viewCart').textContent === "Go Back") {
  document.querySelector('#viewCart').textContent = "View Cart";
  document.querySelector('#cart-section').style.display = 'none';
  document.querySelector('#showcase-section').style.display = 'block';
 }
}
