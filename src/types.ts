export interface ChatWidgetProps {
  chatId: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonSize?: string;
  getContext?: () => string;
}

declare global {
  interface HTMLElementTagNameMap {
    "chat-widget": HTMLElement & {
      getContext(fn: () => string): void;
    };
  }
}