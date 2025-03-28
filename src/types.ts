import * as React from 'react';

interface ChatWidgetProps {
  /**
   * Unique identifier for the chat
   */
  "chat-id": string;

  /**
   * Background color of the chat button
   * @default "#582975"
   */
  "button-color"?: string;

  /**
   * Background color of the chat button on hover
   * @default "#7b2ba6"
   */
  "button-hover-color"?: string;

  /**
   * Size of the chat button
   * @default "64px"
   */
  "button-size"?: string;

  /**
   * Message bubble text or boolean to disable
   * @default "Ciao, sono l'assistente virtuale di supportAI, se hai bisogno di assistenza apri la chat!"
   */
  "message-bubble"?: string | boolean;

  /**
   * Alignment of the chat widget
   * @default "right"
   */
  "chat-align"?: "left" | "right";

  /**
   * Custom SVG icon for the chat button
   * @default Built-in SupportAI icon
   */
  "svg-icon"?: string;

  /**
   * Function to provide dynamic context for the chat
   */
  getContext?(fn: () => string): void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Chat widget custom element
       */
      'chat-widget': ChatWidgetProps & React.HTMLAttributes<HTMLElement>;
    }
  }

  /**
   * Extend HTMLElement with custom properties
   */
  interface HTMLElementTagNameMap {
    "chat-widget": HTMLElement & ChatWidgetProps;
  }

  /**
   * Extend Window to support custom events
   */
  interface WindowEventMap {
    "chat-widget/updateContext": CustomEvent;
  }
}

export { ChatWidgetProps };