import { defineCustomElement } from "vue";
import ChatWidget from "./chat-widget.ce.vue";
import type { ChatWidgetProps, ChatWidgetComponent } from "./types";

const ChatWidgetElement = defineCustomElement(ChatWidget);

customElements.define("chat-widget", ChatWidgetElement);

export { ChatWidgetElement, ChatWidgetProps, ChatWidgetComponent };
export default ChatWidget;
