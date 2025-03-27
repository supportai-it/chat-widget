<template>
    <div class="chat-widget">
        <button @click="toggleChat" :style="style" class="chat-button" :aria-label="isOpen ? 'Close Chat' : 'Open Chat'">
            <slot name="button-icon">
                <svg v-if="!isOpen" viewBox="0 0 24 24" fill="white">
                    <path
                        d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="white">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </slot>
        </button>

        <div v-if="isOpen" class="chat-modal" :class="{ 'mobile-fullscreen': isMobile }">
            <div class="chat-modal-header" v-if="isMobile">
                <button @click="toggleChat" class="close-button">Close</button>
            </div>
            <iframe :src="fullChatUrl" :class="{ 'chat-iframe': !isMobile, 'chat-iframe-mobile': isMobile }"
                frameborder="0"></iframe>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

const baseUrl = "https://www.supportai.it/chat/"

export default defineComponent({
    name: 'ChatWidget',
    props: {
        chatId: {
            type: String,
            default: ''
        },
        buttonColor: {
            type: String,
            default: '#e74266'
        },
        buttonHoverColor: {
            type: String,
            default: '#d6365d'
        },
        buttonSize: {
            type: String,
            default: '64px'
        },
        getContext: {
            type: Function,
            required: false
        }
    },
    setup(props: {
        chatId: string,
        buttonColor: string,
        buttonHoverColor: string,
        buttonSize: string
        getContext: () => string;
    }) {
        const isOpen = ref(false)
        const isMobile = ref(false)
        const fullChatUrl = ref('')

        const toggleChat = () => {
            isOpen.value = !isOpen.value
        }

        const handleResize = () => {
            isMobile.value = window.innerWidth <= 768
        }

        const updateContext = async () => {
            if (props.getContext) {
                try {
                    const context = props.getContext()
                    const url = new URL(fullChatUrl.value)
                    url.searchParams.set('context', context)
                    fullChatUrl.value = url.toString()
                } catch (error) {
                    console.error('Failed to get context:', error)
                }
            }
        }

        onMounted(() => {
            handleResize()
            window.addEventListener('resize', handleResize)

            // Construct initial URL
            fullChatUrl.value = `${baseUrl}${props.chatId}`

            // Listen for context update event
            window.addEventListener('chat-widget/updateContext', updateContext)

            // console log all props and refs
            console.log(props);
            console.log(fullChatUrl.value);
            console.log(isOpen.value);
        })

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('chat-widget/updateContext', updateContext)
        })

        return {
            isOpen,
            isMobile,
            fullChatUrl,
            toggleChat
        }
    },
    data() {
        return {
            style: {
                '--chat-btn-size': this.buttonSize,
                '--chat-btn-color': this.buttonColor,
                '--chat-btn-hovercolor': this.buttonHoverColor,
            },
        };
    }
})
</script>

<style scoped>
.chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
}

.chat-button {
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    background-color: var(--chat-btn-color);
    width: var(--chat-btn-size);
    height: var(--chat-btn-size);
}

.chat-button:hover {
    background-color: var(--chat-btn-hovercolor);
}

.chat-button svg {
    width: 60%;
    height: 60%;
}

.chat-modal {
    position: fixed;
    bottom: 100px;
    right: 20px;
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
    cursor: pointer;
}

.chat-iframe {
    width: 100%;
    height: 100%;
    border: none;
}

.chat-iframe-mobile {
    width: 100%;
    height: 95%;
    border: none;
}
</style>