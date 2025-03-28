export interface ChatWidgetProps {
  chatId: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonSize?: string;
  getContext?: () => string;
  messageBubble?: string | boolean;
  chatAlign?: "left" | "right";
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-widget": HTMLElement & {
      getContext(fn: () => string): void;
    };
  }
}