# Universal Chat Widget
[![](https://data.jsdelivr.com/v1/package/npm/@supportai.it/chat-widget/badge)](https://www.jsdelivr.com/package/npm/@supportai.it/chat-widget)

## Installation

### Usign CND:
```html
<script src="
https://cdn.jsdelivr.net/npm/@supportai.it/chat-widget/dist/chat-widget.umd.min.js
"></script>
```

### Using npm
```bash
npm install @supportai.it/chat-widget
```

## Usage

### Web Component / Vanilla JS

```html
<chat-widget
  chat-id="chat-id"
  button-color="#ff0000"
  button-size="56px"
></chat-widget>
```

### React

```jsx
import { useEffect, useRef } from "react";
import "@supportai.it/chat-widget";

function App() {
  const chatRef = useRef(null);

  useEffect(() => {
    const getContext = () => {
      return JSON.stringify({ user: "example" });
    };

    if (chatRef.current) {
      chatRef.current.getContext = getContext;
    }
  }, []);

  return (
    <chat-widget
      ref={chatRef}
      chat-id="chat-id"
    />
  );
}
```

### Updating Context Dynamically

```javascript
// Dispatch event to update context
window.dispatchEvent(new CustomEvent("chat-widget/updateContext"));
```

## Props

- `chat-url`: Specific chat path (Optional)
- `button-color`: Custom button color (Default: #582975)
- `button-hover-color`: Custom hover color (Default: #7b2ba6)
- `button-size`: Button size (Default: 64px)
- `get-context`: Function to get dynamic context
- `message-bubble`: Display a message bubble on top of the open button (when the chat is closed). Set to `false` to disable.
- `chat-align`: Chat alignment "left" or "right". (Default: right)
