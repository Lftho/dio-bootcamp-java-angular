class Cards extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(this.build());
    shadow.appendChild(this.styles());
  }

  build() {
    const appCards = document.createElement("article");
    appCards.setAttribute("class", "article");

    const contentCard = document.createElement("section");
    contentCard.setAttribute("class", "content");

    const contentCardImage = document.createElement("img");
    contentCardImage.setAttribute("class", "image");
    contentCardImage.src = this.getAttribute("photo") || "assets/image/logo-aqui.png";
    contentCardImage.alt = "Foto do boruto";
    contentCard.appendChild(contentCardImage);

    const contentCardDiv = document.createElement("div");
    contentCard.setAttribute("class", "carddiv");
    
    const contentCardH3 = document.createElement("h3");
    contentCardH3.setAttribute("class", "titulo");
    contentCardH3.textContent = this.getAttribute("title");

    const contentCardSpan = document.createElement("span");
    contentCardSpan.setAttribute("class", "descricao");
    contentCardSpan.textContent = this.getAttribute("description");
    
    contentCard.appendChild(contentCardDiv);
    contentCardDiv.appendChild(contentCardH3);
    contentCardDiv.appendChild(contentCardSpan);
    

    let array = [contentCard, contentCard, contentCard, contentCard];

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      console.log('du neida',element)
      appCards.appendChild(element);
    
    }

    return appCards;
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
    /** Cards */
    .article {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr 1fr;
    }
    
    .article .content {
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      max-width: 800px;
      margin: 1rem;
    }
    
    .article .content .image {
      height: 12.5rem;
      width: 100%;
    }
    
    .article .content .carddiv {
      width: 28rem;
      padding: 1rem 1.2rem;
      background-color: #1e1e26;
    }
    
    .article .content .carddiv .titulo {
      font-family: sans-serif;
      font-size: 1.25rem;
      color: #ddd;
    }
    
    .article .content .carddiv .descricao {
      color: #fff;
      opacity: .8;
    }
    
    @media only screen and (max-width: 600px) {
      .root {
        width: 100%;
      }
    
      .article {
        grid-template-columns: 1fr;
      }
    
      .article .content .image {
        height: 12.5rem;
        width: 100%;
      }
    
      .article .content .carddiv {
        width: 100%;
        padding: 1rem 1.2rem;
        background-color: #1e1e26;
      }
    }
    
    `;

    return style;
  }
}

customElements.define("app-cards", Cards);