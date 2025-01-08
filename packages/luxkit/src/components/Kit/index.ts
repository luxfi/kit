import App from "./index.svelte";

export const mount = () => {
  class LuxKit extends HTMLElement {
    constructor() {
      super();
    }
  }
  if (!customElements.get("lux-kit")) {
    customElements.define("lux-kit", LuxKit);
  }

  let mountNode = document.querySelector("[data-rk-mounted]");
  if (!mountNode) {
    mountNode = document.createElement("lux-kit");
    mountNode.setAttribute("data-rk-mounted", "");
    mountNode.attachShadow({ mode: "open" });
    document.body.insertAdjacentElement("afterend", mountNode!);
  }

  // handle refresh
  const child = mountNode?.shadowRoot?.querySelector("[data-luxkit]");
  if (child) {
    // window.location.reload();
  }

  if (!child) {
    new App({ target: mountNode!.shadowRoot! });
  }
};
