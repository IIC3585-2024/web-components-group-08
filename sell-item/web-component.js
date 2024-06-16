const sellItemTemplate = document.createElement('template');

sellItemTemplate.innerHTML = `
  <style>
    .sell-item {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 10px;
      width: 250px;
      background-color: #f9f9f9;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      text-align: center;
    }
    .sell-item img {
      max-width: 100%;
      border-radius: 5px;
    }
    .title {
      font-size: 1.2em;
      color: #333;
      margin: 10px 0;
    }
    .price-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
    }
    .price {
      font-size: 1.5em;
      color: #007bff;
      margin-right: 10px;
    }
    .discount {
      background-color: #dc3545;
      color: white;
      padding: 5px;
      border-radius: 5px;
      font-size: 1em;
      display: inline-block;
    }
    .discount-price-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
    }
    .discount-price-text {
      margin-right: 5px;
      font-size: 1em;
      color: #333;
    }
    .discount-price {
      font-size: 1em;
      color: red;
      text-decoration: line-through;
    }
    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
    .rating span {
      margin-left: 5px;
      font-size: 1em;
      color: #333;
    }
    .star {
      color: #ffcc00;
      font-size: 1.2em;
    }
  </style>
  <div class="sell-item">
    <img id="image" src="" alt="Product Image" />
    <div class="title"></div>
    <div class="price"></div>
    <div class="discount-price-container">
        <div class="discount-price-text">Precio Normal:</div>
        <div class="discount-price"></div>
    </div>
    <div class="rating"></div>
  </div>
`;

class SellItem extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(sellItemTemplate.content.cloneNode(true));
    }

    connectedCallback() {
      this.shadowRoot.querySelector("#image").src = this.getAttribute("image");
      this.shadowRoot.querySelector(".title").textContent =
        this.getAttribute("title");
      this.shadowRoot.querySelector(".price").textContent =
        "$" + this.getAttribute("price");
      this.shadowRoot.querySelector(".discount-price").textContent =
         "$" + this.getAttribute("discount-price");
      this.shadowRoot.querySelector(".rating").innerHTML =
        this.renderStars(this.getAttribute("rating"));
    }

    renderStars(rating){
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
            stars.push(`<span class="star">&#9733;</span>`);
            } else {
            stars.push(`<span class="star">&#9734;</span>`);
        }
        }
        return stars.join("");
    }

  }

  customElements.define("sell-item", SellItem);