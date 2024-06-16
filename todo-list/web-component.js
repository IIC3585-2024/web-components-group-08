const todoListTemplate = document.createElement('template');

todoListTemplate.innerHTML = `
  <style>
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
      width: 200px;
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
  </style>
  <div class="todo-list">
        <h3 id="title"></h3>
        <div class="input-container">
          <input
            id="promptInput"
            type="text"
            placeholder=""
          />
          <button id="addItemButton">
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
        <ul id="todoListUl">
 
        </ul>
      </div>
`;

class TodoList extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(todoListTemplate.content.cloneNode(true));
      this.currentInput = "";
      this.items = ["item1", "item2", "item3"];
      const input = this.shadowRoot.querySelector('#promptInput');
      const addItemButton = this.shadowRoot.querySelector('#addItemButton');
      input.addEventListener('input', this.handleInput.bind(this));
      addItemButton.addEventListener("click", this.addNewToDoItem.bind(this));
    }

    connectedCallback() {
      this.shadowRoot.querySelector("#promptInput").placeholder = this.getAttribute("prompt");
      this.shadowRoot.querySelector("#title").textContent = this.getAttribute("title");
      this.item1 = this.getAttribute("item1");
      this.item2 = this.getAttribute("item2");
      this.item3 = this.getAttribute("item3");
      this.items = [this.item1, this.item2, this.item3].filter((item) => item);
       this.updateItems();

    }

    updateItems(){
        
        const newItems = this.items.map(
            (item) => `<li class="todo-item"> ${item} <button class="removeButton" item="${item}">-</button>
            </li>`
        )

        this.shadowRoot.querySelector("#todoListUl").innerHTML = newItems.join("");
        this.connectRemoveButton();


    }

    connectRemoveButton(){
        this.shadowRoot.querySelectorAll(".removeButton").forEach((button) => 
            button.addEventListener("click", (event) => this.removeItem(event.target.getAttribute("item"))));
    }

    handleInput(event){
        this.currentInput = event.target.value;
    }

    addNewToDoItem(){
        if (this.currentInput) {
            this.items = [...this.items, this.currentInput];
            this.currentInput = "";
            this.shadowRoot.querySelector("#promptInput").value = "";
            this.updateItems();
          }
    }

    removeItem(itemToRemove) {
        this.items = this.items.filter((item) => item !== itemToRemove);
        this.updateItems();
    }

  }

  customElements.define("todo-list", TodoList);