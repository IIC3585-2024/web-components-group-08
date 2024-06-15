import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.4.0/core/lit-core.min.js";

class SellItem extends LitElement {
  static properties = {
    image: { type: String },
    title: { type: String },
    price: { type: String },
    discountPrice: { type: String },
    discount: { type: String },
    rating: { type: Number },
  };

  static styles = css`
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
  `;

  renderStars() {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(this.rating)) {
        stars.push(html`<span class="star">&#9733;</span>`);
      } else {
        stars.push(html`<span class="star">&#9734;</span>`);
      }
    }
    return stars;
  }

  render() {
    return html`
      <div class="sell-item">
        <img src="${this.image}" alt="Product Image" />
        <div class="title">${this.title}</div>
        ${this.discountPrice && this.discount
          ? html`
              <div class="price-container">
                <div class="price">$${this.discountPrice}</div>
                <div class="discount">${this.discount}</div>
              </div>
              <div class="discount-price-container">
                <div class="discount-price-text">Normal:</div>
                <div class="discount-price">$${this.price}</div>
              </div>
            `
          : html`<div class="price">$${this.price}</div>`}
        <div class="rating">
          ${this.renderStars()}
          <span>${this.rating}</span>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-sell-item", SellItem);
