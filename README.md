# Universal Chat Widget

## Installation

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

<script type="module">
  import "@supportai.it/chat-widget";
</script>
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
      button-color="#ff0000"
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

- `base-url`: Base URL for the chat (Required)
- `chat-url`: Specific chat path (Optional)
- `button-color`: Custom button color (Default: #e74266)
- `button-hover-color`: Custom hover color (Default: #d6365d)
- `button-size`: Button size (Default: 64px)
- `get-context`: Function to get dynamic context
