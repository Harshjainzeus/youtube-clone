import { createSlice } from "@reduxjs/toolkit";
import { generate } from "./helper/randomGenerator";

const MAX_CHATS = 100; // Maximum number of messages to keep in the store

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    isConnected: false,
    lastActivity: null,
    isPaused: false
  },
  reducers: {
    addChat: (state, action) => {
      // If we're at max capacity, remove the oldest message
      if (state.messages.length >= MAX_CHATS) {
        state.messages.shift();
      }
      
      // Add the new message with additional metadata
      const newMessage = {
        id: generate(),
        name: action.payload.name || 'Anonymous',
        message: action.payload.message,
        timestamp: action.payload.timestamp || new Date().toISOString(),
        isYou: action.payload.isYou || false,
        likes: 0,
        isFlagged: false
      };
      
      state.messages.push(newMessage);
      state.lastActivity = new Date().toISOString();
    },
    
    // Add a like to a message
    likeMessage: (state, action) => {
      const { messageId } = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message) {
        message.likes = (message.likes || 0) + 1;
      }
    },
    
    // Flag a message as inappropriate
    flagMessage: (state, action) => {
      const { messageId } = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message) {
        message.isFlagged = true;
      }
    },
    
    // Clear all messages
    clearChat: (state) => {
      state.messages = [];
    },
    
    // Toggle chat pause state
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    
    // Set connection status
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    }
  }
});

// Selectors
export const selectAllMessages = (state) => state.chat.messages;
export const selectIsPaused = (state) => state.chat.isPaused;
export const selectIsConnected = (state) => state.chat.isConnected;
export const selectLastActivity = (state) => state.chat.lastActivity;

// Export actions
export const { 
  addChat, 
  likeMessage, 
  flagMessage, 
  clearChat, 
  togglePause, 
  setConnectionStatus 
} = chatSlice.actions;

export default chatSlice.reducer;