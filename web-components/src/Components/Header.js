class Header extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.build());
    shadow.appendChild(this.styles());
  }

  build() {
    const appRoot = document.createElement("header");
    appRoot.setAttribute("class", "root");

    const content = document.createElement("div");
    content.setAttribute("class", "content");

    const contentImage = document.createElement("img");
    contentImage.src = this.getAttribute("photo") || "assets/image/logo-aqui.png";
    contentImage.alt = "Logo da empresa";
    content.appendChild(contentImage);

    const listCenter = document.createElement("ul");
    listCenter.setAttribute("class", "list-center");

    const itemLi = document.createElement("li");
    itemLi.textContent = this.getAttribute("item1");

    const itemLi2 = document.createElement("li");
    itemLi2.textContent = this.getAttribute("item2");

    const itemLi3 = document.createElement("li");
    itemLi3.textContent = this.getAttribute("item3");

    listCenter.appendChild(itemLi);
    listCenter.appendChild(itemLi2);
    listCenter.appendChild(itemLi3);

    content.appendChild(listCenter);
    appRoot.appendChild(content);

    return appRoot;
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
    *,
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    ul,
    li {
      list-style: none;
    }
    
    .root {
      background-color: #1e1e26;
      width: 100%;
    }
    
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      max-width: 800px;
      height: 110px;
    }
    
    .content .list-center {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .content .list-center li {
      color: #fff;
      margin: 40px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 1rem;
      font-weight: 500;
    }
    
    .root img {
      width: 140px;
      height: 84px;
    }
    `;

    return style;
  }
}

customElements.define("header-title", Header);