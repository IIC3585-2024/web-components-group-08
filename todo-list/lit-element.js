// import { LitElement, html, css } from "lit";
import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.4.0/core/lit-core.min.js";

class LitTodoList extends LitElement {
  static properties = {
    title: { type: String },
    item1: { type: String },
    item2: { type: String },
    item3: { type: String },
    prompt: { type: String },
    items: { type: Array },
  };

  static styles = css`
    .todo-list {
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 5px;
      width: 200px;
    }
    .todo-item {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
    }
  `;

  constructor() {
    super();
    this.title = "To Do List";
    this.item1 = "";
    this.item2 = "";
    this.item3 = "";
    this.prompt = "Add new element";
    this.items = [this.item1, this.item2, this.item3].filter((item) => item);
  }

  render() {
    return html`
      <div class="todo-list">
        <h3>${this.title}</h3>
        <input
          type="text"
          placeholder="${this.prompt}"
          @input=${this.handleInput}
        />
        <button @click=${this.addNewToDoItem}>Add</button>
        <ul>
          ${this.items.map(
            (item) => html` <li class="todo-item">
              ${item} <button @click=${() => this.removeItem(item)}>-</button>
            </li>`
          )}
        </ul>
      </div>
    `;
  }

  handleInput(event) {
    this.currentInput = event.target.value;
  }

  addNewToDoItem() {
    if (this.currentInput) {
      this.items = [...this.items, this.currentInput];
      this.currentInput = "";
    }
  }

  removeItem(itemToRemove) {
    this.items = this.items.filter((item) => item !== itemToRemove);
  }
}

customElements.define("lit-todo-list", LitTodoList);
