let template = document.createElement("template");

template.innerHTML = /* html */ `
<style>
    h3{
        color : coral;
    }
    img {
      width : 300px;
    }
</style>
<div class='user-card'>
    <div>
      <h3></h3>
      <img/>
      <div class='info'>
        <p>
          <slot name='nation'></slot>
        </p>
        <p>
          <slot name='weather'></slot>
        </p>
      </div>
    </div>
    <button id='toggle-info'>hide info</button>
</div>
`;

// UserCard.js
class UserCard extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });

    let imgSrc = this.getAttribute("scenery");
    let city = this.getAttribute("city");

    this.showinfo = true;

    shadow.appendChild(template.content.cloneNode(true));
    shadow.querySelector("h3").innerHTML = city;
    shadow.querySelector("img").src = imgSrc;
  }

  toggleInfo() {
    let $info = this.shadowRoot.querySelector(".info");
    this.showinfo = !this.showinfo;
    if (this.showinfo) {
      $info.style.display = "block";
    } else {
      $info.style.display = "none";
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", (e) => {
        this.toggleInfo();
      });
  }

  disconnectedCallback() {
    this.shadowRoot.closest("#toggle-info").removeEventListener();
  }
}

customElements.define("user-card", UserCard);
