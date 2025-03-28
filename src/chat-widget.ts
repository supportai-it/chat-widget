const svgIcon =
  `<?xml version="1.0" encoding="UTF-8"?><svg id="a" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 535.62 369.81"><defs><linearGradient id="b" x1="218.11" y1="-120.74" x2="475.29" y2="-123.48" gradientTransform="translate(0 145.8) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ededed"/><stop offset="1" stop-color="#fafafa"/></linearGradient></defs><path d="M473.62,329.58c-.42,4.74-1.75,13.63-8.33,20.69-6.33,6.82-15.33,8.39-24.9,10.31-3.91.75-10.66,1.83-23.57,1.66-7.5-.08-18.99-.33-34.48-3.16-33.06-6.07-61.55-20.11-61.55-20.11-48.06-20.11-81.79-48.87-102.69-70.48,4.25-4.16,8.58-8.31,12.83-12.38.5-.42.92-.91,1.5-1.41.67-.67,1.42-1.33,2.17-2.08,14.41-13.63,28.73-26.51,42.98-36.9,16.24-10.89,32.4-21.78,48.56-32.66,4.33-2.83,8.66-5.9,13.08-8.81,3.25,4.74,6.75,9.22,10.66,13.55,32.65,35.9,85.45,48.2,103.61,50.78,2.58.42,9.41,1.25,14.58,6.4,6.41,6.32,6.83,15.71,6.91,21.19.67,26.26-.75,52.61-1.33,63.41Z" fill="url(#b)"/><path d="M525.99,19.32c-5.16,13.8-25.99,76.05-45.64,105.63-1.5,2.33-4.25,6.23-8.75,10.47-2.17,2.08-6.83,6.57-13.58,9.56-11.66,5.24-22.57,3.74-25.57,3.24-18.82-2.99-29.9-17.04-35.98-24.68-16.49-20.69-23.32-48.87-16.74-54.27,2.66-2.16,8.08-2.99,20.9,3.66,1.33.75,2.58,1.33,4,2.16,5.41,2.91,9.58,5.15,13.66,7.56.92.5,2.08,1.16,3.25,1.83.5-.33.92-.66,1.33-1,15.33-11.22,30.48-22.52,45.64-33.74,9.24-6.82,18.41-13.63,27.57-20.45,2.5-1.83,14.33-11.22,19.49-15.04,9.75-7.15,11.66-7.31,12.24-7.06h.08c2.17,1.41-.83,9.14-1.92,12.22v-.08Z" fill="#fff"/><path d="M339.2,174.25c-4.41,2.91-8.75,5.98-13.08,8.81-16.16,10.89-32.32,21.78-48.56,32.66-14.24,10.39-28.57,23.27-42.98,36.9-.75.75-1.5,1.41-2.17,2.08-.58.5-1,1-1.5,1.41-4.25,4.07-8.58,8.23-12.83,12.38-5.75,5.57-13.08,12.55-20.74,19.61-14.16,13.21-31.15,28.92-49.89,41.39-9.83,6.48-32.73,21.36-66.05,28.76-29.65,6.65-55.72,4.65-74.13,1.33,0-53.27-.17-106.55-.25-159.82.75.08,1.5.08,2.42.08,38.9,1.75,67.21-19.78,93.28-42.14,4.33-3.82,8.66-7.56,12.91-11.22,21.4-18.45,41.06-38.31,61.47-57.6,18.07-17.04,36.65-39.14,64.05-43.63.42-.08.75-.17,1.17-.08,1.58-.33,3.25-.5,4.83-.58,12.41-1.16,26.15.5,36.81,5.82,10.66,5.32,16.41,15.87,20.24,27.68,2.42,7.48,4,15.54,5.66,22.94,1.83,8.06,3.17,13.8,3.33,14.54,2.08,9.31,8.16,26.01,25.99,58.59v.08Z" fill="#fff"/></svg>` as const;

const SafeHTMLElement =
  typeof window !== "undefined"
    ? window.HTMLElement
    : (class {} as typeof HTMLElement);

class ChatWidget extends SafeHTMLElement {
  private _isOpen = false;
  private _isMobile = false;
  private _fullChatUrl = "";
  private _baseUrl = "https://dev.supportai.it/chat/";
  private _isFirstLoad = true;
  private _firstChatOpen = false;
  private readonly _cookieName = "chat-widget-opened";
  private readonly _cookieExpDays = 7;

  // Default configuration
  private _config = {
    chatId: "",
    apiKey: "",
    buttonColor: "#582975",
    buttonHoverColor: "#7b2ba6",
    buttonSize: "64px",
    getContext: null as (() => string) | null,
    messageBubble:
      "Ciao, sono l'assistente virtuale di <b>supportAI</b>, se hai bisogno di assistenza apri la chat!" as
        | string
        | boolean,
    chatAlign: "right" as "right" | "left",
    svgIcon: svgIcon as string,
  };

  private setCookie(name: string, value: string, expDays: number) {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  private getCookie(name: string): string {
    console.log(`Getting cookie: ${name}`);
    if (typeof document === "undefined") return "";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }

  private updateChatUrl() {
    const url = new URL(`${this._baseUrl}${this._config.chatId}`);
    url.searchParams.set("apiKey", this._config.apiKey);
    this._fullChatUrl = url.toString();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._firstChatOpen = this.getCookie(this._cookieName) === "true";
  }

  static get observedAttributes() {
    return [
      "chat-id",
      "api-key",
      "button-color",
      "button-hover-color",
      "button-size",
      "message-bubble",
      "chat-align",
      "svg-icon",
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case "chat-id":
          this._config.chatId = newValue;
          this.updateChatUrl();
          break;
        case "api-key":
          this._config.apiKey = newValue;
          this.updateChatUrl();
          break;
        case "button-color":
          this._config.buttonColor = newValue;
          break;
        case "button-hover-color":
          this._config.buttonHoverColor = newValue;
          break;
        case "button-size":
          this._config.buttonSize = newValue;
          break;
        case "message-bubble":
          this._config.messageBubble =
            newValue === "false"
              ? false
              : newValue ||
                "Ciao, sono l'assistente virtuale di supportAI, se hai bisogno di assistenza apri la chat!";
          break;
        case "chat-align":
          this._config.chatAlign = newValue === "left" ? "left" : "right";
          break;
        case "svg-icon":
          this._config.svgIcon = newValue || (svgIcon as string);
          break;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  private setupEventListeners() {
    this.handleResize = this.handleResize.bind(this);
    this.updateContext = this.updateContext.bind(this);

    window.addEventListener("resize", this.handleResize);
    window.addEventListener("chat-widget/updateContext", this.updateContext);

    this.handleResize();
  }

  private removeEventListeners() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("chat-widget/updateContext", this.updateContext);
  }

  private handleResize() {
    this._isMobile = window.innerWidth <= 768;
    this.render();
  }

  private toggleChat() {
    if (!this._firstChatOpen) {
      this._firstChatOpen = true;
      this.setCookie(this._cookieName, "true", this._cookieExpDays);
    }
    this._isOpen = !this._isOpen;
    this.render();
  }

  private updateContext() {
    if (this._config.getContext) {
      try {
        const context = this._config.getContext();

        const url = new URL(this._fullChatUrl);
        url.searchParams.set("context", context);
        this._fullChatUrl = url.toString();

        this.render();
      } catch (error) {
        console.error("Failed to get context:", error);
      }
    }
  }

  set getContext(fn: () => string) {
    this._config.getContext = fn;
  }

  private render() {
    const style = `
      <style>
      .chat-widget {
        position: fixed;
        bottom: 20px;
        ${this._config.chatAlign}: 20px;
        z-index: 9999;
      }

      .chat-button-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: ${
          this._config.chatAlign === "right" ? "flex-end" : "flex-start"
        };
      }

      .message-bubble, .typing-indicator {
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: ${
          this._config.chatAlign === "right"
            ? "15px 15px 0 15px"
            : "15px 15px 15px 0"
        };
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin-${this._config.chatAlign}: 40px;
        text-align: left;
      }

      .message-bubble {
        max-width: 250px;
        font-size: 14px;
        line-height: 1.4;
      }

      .typing-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .typing-dot {
        background-color: #888;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        animation: typing 1.4s infinite ease-in-out;
      }

      .typing-dot:nth-child(1) {
        animation-delay: -0.32s;
      }

      .typing-dot:nth-child(2) {
        animation-delay: -0.16s;
      }

      @keyframes typing {
        0%, 80%, 100% {
        opacity: 0.5;
        transform: scale(0.8);
        }
        40% {
        opacity: 1;
        transform: scale(1);
        }
      }

      .chat-button {
        border: none;
        border-radius: 50%;
        cursor: pointer;
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
        background-color: ${this._config.buttonColor};
        width: ${this._config.buttonSize};
        height: ${this._config.buttonSize};
      }

      .chat-button svg {
        width: 75%;
        height: 75%;
      }

      .chat-button:hover {
        background-color: ${this._config.buttonHoverColor};
      }

      .chat-modal {
        position: fixed;
        bottom: 100px;
        ${this._config.chatAlign}: 20px;
        width: 400px;
        height: 600px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        z-index: 10000;
      }

      .chat-modal.mobile-fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        bottom: auto;
        right: auto;
        border-radius: 0;
      }

      .chat-modal-header {
        display: flex;
        justify-content: flex-end;
        height: 2%;
        padding: 10px;
        background-color: #f0f0f0;
      }

      .close-button {
        background: none;
        border: none;
        color: #333;
        font-size: 1.2rem;
        cursor: pointer;
      }

      .chat-iframe {
        width: 100%;
        height: 100%;
        border: none;
      }

      .mobile-fullscreen .chat-iframe {
        height: calc(100% - 1% - 20px) !important;
      }
      </style>
    `;

    // Prepare message bubble HTML with typing animation
    const messageBubbleHtml =
      this._config.messageBubble &&
      typeof this._config.messageBubble === "string" &&
      !this._isMobile &&
      !this._isOpen &&
      !this._firstChatOpen
        ? this._isFirstLoad
          ? `
              <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
              </div>
            `
          : `<div class="message-bubble">${this._config.messageBubble}</div>`
        : "";

    const chatButton = `
       <div class="chat-button-container">
          ${messageBubbleHtml}
          <button class="chat-button" aria-label="${
            this._isOpen ? "Close Chat" : "Open Chat"
          }">
            ${
              this._isOpen
                ? '<svg viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
                : this._config.svgIcon
            }
          </button>
       </div>
     `;

    const chatHeader = this._isMobile
      ? `<div class="chat-modal-header">
            <button @click="toggleChat" class="close-button">Close</button>
        </div>`
      : "";

    const chatModal = this._isOpen
      ? `
          <div class="chat-modal ${this._isMobile ? "mobile-fullscreen" : ""}">
            ${chatHeader}

            <iframe
              src="${this._fullChatUrl}"
              class="chat-iframe"
              frameborder="0">
            </iframe>
          </div>
        `
      : "";

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
            ${style}
            <div class="chat-widget">
              ${chatButton}
              ${chatModal}
            </div>
          `;

      // Add event listener to button
      const button = this.shadowRoot.querySelector(".chat-button");
      if (button) {
        button.addEventListener("click", () => this.toggleChat());
      }

      // Add event listener to close button
      const closeButton = this.shadowRoot.querySelector(".close-button");
      if (closeButton) {
        closeButton.addEventListener("click", () => this.toggleChat());
      }

      // Add typing animation logic
      if (this._isFirstLoad && !this._isOpen && !this._isMobile) {
        const typingIndicator =
          this.shadowRoot.querySelector(".typing-indicator");
        if (typingIndicator) {
          setTimeout(() => {
            this._isFirstLoad = false;
            this.render();
          }, 2500);
        }
      }
    }
  }
}

// Define the custom element
if (typeof window !== "undefined" && window.customElements) {
  customElements.define("chat-widget", ChatWidget);
}

export default ChatWidget;
