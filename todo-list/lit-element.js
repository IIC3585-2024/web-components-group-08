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
      padding: 20px;
      border-radius: 10px;
      width: 300px;
      background-color: #f9f9f9;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
    .todo-list h3 {
      margin: 0;
      font-size: 1.5em;
      color: #333;
    }
    .input-container {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    .todo-list input[type="text"] {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1em;
      margin-right: 10px;
    }
    .todo-list button {
      display: inline-block;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1em;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .todo-list button:hover {
      background-color: #0056b3;
    }
    .todo-list button svg {
      width: 20px;
      height: 20px;
    }
    .todo-list ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #fff;
    }
    .todo-item button {
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 0.9em;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .todo-item button:hover {
      background-color: #c82333;
    }
  `;

  constructor() {
    super();
    this.title = "To Do List";
    this.prompt = "Add new element";
    this.items = [];
  }

  firstUpdated() {
    this.items = [this.item1, this.item2, this.item3].filter((item) => item);
  }

  render() {
    return html`
      <div class="todo-list">
        <h3>${this.title}</h3>
        <div class="input-container">
          <input
            type="text"
            placeholder="${this.prompt}"
            @input=${this.handleInput}
          />
          <button @click=${this.addNewToDoItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              />
            </svg>
          </button>
        </div>
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
      this.shadowRoot.querySelector("input").value = "";
    }
  }

  removeItem(itemToRemove) {
    this.items = this.items.filter((item) => item !== itemToRemove);
  }
}

customElements.define("lit-todo-list", LitTodoList);

// https://medium.com/@westbrook/litelement-to-do-app-1e08a31707a4
// https://stackoverflow.com/questions/68614776/using-lit-with-javascript-and-no-build-tools
