const PRODUCTS = [

  {

    id: "orange-cream",

    name: "Orange Juice Body Cream",

    size: "4 oz",

    category: "Skin Care",

    image: "assets/orange-cream.jpg",

    description: "Refreshing body cream with orange-inspired care to hydrate, soften and leave skin feeling smooth."

  },

  {

    id: "shea-4",

    name: "Shea Butter Body Cream",

    size: "4 oz",

    category: "Skin Care",

    image: "assets/shea-4.jpg",

    description: "Rich 4 oz shea butter cream designed for deep moisture, softness and everyday skin nourishment."

  },

  {

    id: "shea-2",

    name: "Shea Butter Body Cream",

    size: "2 oz",

    category: "Skin Care",

    image: "assets/shea-2.jpg",

    description: "Compact 2 oz moisturizing shea butter cream, ideal for travel and daily hydration."

  },

  {

    id: "argan-serum",

    name: "Argan Oil Serum",

    size: "Serum",

    category: "Body Care",

    image: "assets/argan-serum.jpg",

    description: "Lightweight argan oil serum that helps nourish and hydrate hair, face and skin."

  },

  {

    id: "menthol-balm",

    name: "Menthol Muscle Balm",

    size: "4 oz",

    category: "Body Care",

    image: "assets/menthol-balm.jpg",

    description: "Cooling menthol balm formulated for a soothing massage experience on tired muscles."

  },

  {

    id: "body-lotion",

    name: "Hand & Body Lotion",

    size: "200 ml",

    category: "Body Care",

    image: "assets/body-lotion.jpg",

    description: "Lightweight daily lotion that moisturizes hands and body without a heavy or greasy feel."

  },

  {

    id: "rose-oil",

    name: "Rose Massage Oil",

    size: "4 oz",

    category: "Body Care",

    image: "assets/rose-oil.jpg",

    description: "Rose-scented massage oil that glides smoothly over skin and leaves it feeling soft and conditioned."

  },

  {

    id: "anti-dandruff",

    name: "Anti Dandruff Shampoo & Conditioner",

    size: "8 oz each",

    category: "Hair Care",

    image: "assets/anti-dandruff.jpg",

    description: "Two-piece anti-dandruff hair-care set created to cleanse the scalp while keeping hair soft and manageable."

  },

  {

    id: "red-hair",

    name: "Red Hair Shampoo & Conditioner",

    size: "8 oz each",

    category: "Hair Care",

    image: "assets/red-hair.jpg",

    description: "Shampoo and conditioner duo made for red hair, helping cleanse, condition and maintain a vibrant-looking finish."

  },

  {

    id: "aloe",

    name: "Aloe Vera Cream",

    size: "4 oz",

    category: "Skin Care",

    image: "assets/aloe.jpg",

    description: "Aloe vera moisturizing cream designed to hydrate, soothe and refresh skin for everyday use."

  },

  {

    id: "reishi",

    name: "Reishi Mushroom Cream",

    size: "4 oz",

    category: "Skin Care",

    image: "assets/reishi.jpg",

    description: "Moisturizing skin cream featuring reishi mushroom-inspired care for a soft, nourished and radiant appearance."

  },

  {

    id: "bronzing",

    name: "Skin Bronzing Cream",

    size: "4 oz",

    category: "Skin Care",

    image: "assets/bronzing.jpg",

    description: "Bronzing body cream designed to enhance a warm, sun-kissed appearance while moisturizing skin."

  },

  {

    id: "rosemary",

    name: "Rosemary Oil",

    size: "2 oz",

    category: "Hair Care",

    image: "assets/rosemary.jpg",

    description: "Rosemary oil for hair and scalp care, ideal for massage and a nourishing hair-care routine."

  },

  {

    id: "collagen",

    name: "Collagen Moisturizing Cream",

    size: "1 oz",

    category: "Skin Care",

    image: "assets/collagen.jpg",

    description: "Lightweight 1 oz collagen moisturizing cream that helps skin feel hydrated, soft and smooth."

  },

  {

    id: "vitd",

    name: "Vitamin D Body Oil – Coconut",

    size: "4 oz",

    category: "Body Care",

    image: "assets/vitd.jpg",

    description: "Coconut-scented Vitamin D body oil with a lightweight feel for moisturizing and softening the skin."

  },

  {

    id: "trio",

    name: "Brazilian Premium Hair Care Trio",

    size: "8 oz + 8 oz + 4 oz",

    category: "Hair Care",

    image: "assets/trio.jpg",

    description: "Complete Brazilian-inspired trio with shampoo, conditioner and leave-in styling cream for cleansing, conditioning and styling."

  },

  {

    id: "clarifying",

    name: "Clarifying Shampoo & Conditioner",

    size: "8.5 fl oz each",

    category: "Hair Care",

    image: "assets/clarifying.jpg",

    description: "Clarifying shampoo and conditioner pair designed to remove buildup while keeping hair nourished and manageable."

  }

];

let quoteList = JSON.parse(localStorage.getItem("bencosQuoteList") || "{}");

const grid = document.getElementById("productGrid");

const drawer = document.getElementById("cartDrawer");

const backdrop = document.getElementById("backdrop");

function renderProducts(filter = "All") {

  grid.innerHTML = "";

  PRODUCTS

    .filter(p => filter === "All" || p.category === filter)

    .forEach(p => {

      const el = document.createElement("article");

      el.className = "product";

      el.innerHTML = `

        <img src="${p.image}" alt="${p.name}">

        <div class="product-body">

          <small>${p.category}</small>

          <h3>${p.name}</h3>

          <div class="size">${p.size}</div>

          <p class="desc">${p.description}</p>

          <div class="product-bottom">

            <strong>Wholesale</strong>

            <button class="add" data-id="${p.id}">

              Add to Quote

            </button>

          </div>

        </div>

      `;

      grid.appendChild(el);

    });

  document.querySelectorAll(".add").forEach(button => {

    button.onclick = () => {

      const id = button.dataset.id;

      quoteList[id] = (quoteList[id] || 0) + 1;

      save();

      openCart();

    };

  });

}

function save() {

  localStorage.setItem("bencosQuoteList", JSON.stringify(quoteList));

  renderCart();

}

function renderCart() {

  const box = document.getElementById("cartItems");

  const countElement = document.getElementById("cartCount");

  const totalElement = document.getElementById("cartTotal");

  const shippingElement = document.getElementById("shippingMsg");

  const quoteButton = document.getElementById("checkoutBtn");

  box.innerHTML = "";

  let count = 0;

  Object.entries(quoteList).forEach(([id, quantity]) => {

    const product = PRODUCTS.find(p => p.id === id);

    if (!product) return;

    count += quantity;

    const el = document.createElement("div");

    el.className = "cart-item";

    el.innerHTML = `

      <img src="${product.image}" alt="${product.name}">

      <div>

        <strong>${product.name}</strong>

        <small>${product.size}</small>

        <div class="qty">

          <button class="minus">−</button>

          <span>${quantity}</span>

          <button class="plus">+</button>

        </div>

      </div>

      <strong>Qty ${quantity}</strong>

    `;

    el.querySelector(".minus").onclick = () => changeQty(id, -1);

    el.querySelector(".plus").onclick = () => changeQty(id, 1);

    box.appendChild(el);

  });

  if (!count) {

    box.innerHTML = "<p>Your quote list is empty.</p>";

  }

  if (countElement) countElement.textContent = count;

  if (totalElement) {

    totalElement.textContent = "Pricing by quote";

  }

  if (shippingElement) {

    shippingElement.textContent =

      "Wholesale pricing and shipping are confirmed after we review your request.";

  }

  if (quoteButton) {

    quoteButton.textContent = "Request a Quote";

  }

}

function changeQty(id, change) {

  quoteList[id] = (quoteList[id] || 0) + change;

  if (quoteList[id] <= 0) {

    delete quoteList[id];

  }

  save();

}

function openCart() {

  drawer.classList.add("show");

  backdrop.classList.add("show");

}

function closeCart() {

  drawer.classList.remove("show");

  backdrop.classList.remove("show");

}

document.getElementById("openCart").onclick = openCart;

document.getElementById("closeCart").onclick = closeCart;

backdrop.onclick = closeCart;

document.getElementById("checkoutBtn").onclick = () => {

  if (!Object.keys(quoteList).length) {

    alert("Your quote list is empty.");

    return;

  }

  const items = Object.entries(quoteList)

    .map(([id, quantity]) => {

      const product = PRODUCTS.find(p => p.id === id);

      if (!product) return "";

      return `${product.name} - ${product.size} - Quantity: ${quantity}`;

    })

    .filter(Boolean)

    .join("\n");

  const subject = "Wholesale Quote Request - Benco's";

  const body =

`Hello Benco's,

I would like to request wholesale pricing for the following products:

${items}

Please contact me with wholesale pricing, minimum order information, shipping options and availability.

Thank you.`;

  window.location.href =

    "mailto:bencosbeauties@gmail.com?subject=" +

    encodeURIComponent(subject) +

    "&body=" +

    encodeURIComponent(body);

};

document.querySelectorAll(".filters button").forEach(button => {

  button.onclick = () => {

    document.querySelectorAll(".filters button").forEach(x => {

      x.classList.remove("active");

    });

    button.classList.add("active");

    renderProducts(button.dataset.filter);

  };

});

renderProducts();

renderCart();
