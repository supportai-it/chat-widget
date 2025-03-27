import { DefineComponent } from "vue";

export interface ChatWidgetProps {
  baseUrl: string;
  chatUrl?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonSize?: string;
  getContext?: () => Promise<string> | string;
}

export type ChatWidgetComponent = DefineComponent<{
  baseUrl: { type: StringConstructor; required: true };
  chatUrl: { type: StringConstructor; required: false };
  buttonColor: { type: StringConstructor; required: false };
  buttonHoverColor: { type: StringConstructor; required: false };
  buttonSize: { type: StringConstructor; required: false };
  getContext: { type: FunctionConstructor; required: false };
}>;

declare global {
  interface HTMLElementTagNameMap {
    "chat-widget": HTMLElement & {
      getContext?: () => Promise<string> | string;
    };
  }
}
