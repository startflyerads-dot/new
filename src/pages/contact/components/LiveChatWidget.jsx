import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
  {
    id: 1,
    type: 'bot',
    message: "Hi! I\'m Sarah from ServiceHub Pro. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of woman with brown hair in business attire smiling"
  }]
  );
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const quickReplies = [
  "I need help with pricing",
  "Tell me about your services",
  "Schedule a consultation",
  "I have a technical question"];


  const botResponses = {
    "pricing": "I'd be happy to help with pricing information! Our services are customized based on your specific needs. Would you like to schedule a free consultation to discuss your requirements?",
    "services": "We offer comprehensive business consulting including Strategy Consulting, Digital Transformation, Operations Optimization, and more. Which area interests you most?",
    "consultation": "Great! I can help you schedule a free consultation. You can use our consultation form above, or I can connect you with one of our specialists right now. What works better for you?",
    "technical": "I can help with technical questions or connect you with one of our technical specialists. What specific technical challenge are you facing?",
    "default": "Thanks for your message! Let me connect you with one of our specialists who can provide detailed assistance. In the meantime, feel free to explore our services or schedule a consultation."
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageText = newMessage) => {
    if (!messageText?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: messageText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responseKey = Object.keys(botResponses)?.find((key) =>
      messageText?.toLowerCase()?.includes(key)
      ) || 'default';

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponses?.[responseKey],
        timestamp: new Date(),
        avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
        avatarAlt: "Professional headshot of woman with brown hair in business attire smiling"
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-primary rounded-full shadow-professional-xl flex items-center justify-center text-white hover:shadow-professional-xl hover:scale-110 transition-all duration-300 animate-pulse">

          <Icon name={isOpen ? "X" : "MessageCircle"} size={24} />
        </button>
        
        {/* Online Indicator */}
        {isOnline && !isOpen &&
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white animate-ping"></div>
        }
      </motion.div>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-professional-xl z-50 flex flex-col overflow-hidden border border-border">

            {/* Chat Header */}
            <div className="bg-gradient-primary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                      src="https://images.unsplash.com/photo-1734456611474-13245d164868"
                      alt="Professional headshot of woman with brown hair in business attire smiling"
                      className="w-full h-full object-cover" />

                    </div>
                    {isOnline &&
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                  }
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-white/80">
                      {isOnline ? 'Online now' : 'Offline'}
                    </p>
                  </div>
                </div>
                <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors">

                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.map((message) =>
            <div
              key={message?.id}
              className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}>

                  <div className={`flex items-end space-x-2 max-w-[80%] ${
              message?.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`
              }>
                    {message?.type === 'bot' &&
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                    src={message?.avatar}
                    alt={message?.avatarAlt}
                    className="w-full h-full object-cover" />

                      </div>
                }
                    <div className={`rounded-2xl px-4 py-2 ${
                message?.type === 'user' ? 'bg-primary text-white' : 'bg-muted text-foreground'}`
                }>
                      <p className="text-sm">{message?.message}</p>
                      <p className={`text-xs mt-1 ${
                  message?.type === 'user' ? 'text-white/70' : 'text-muted-foreground'}`
                  }>
                        {formatTime(message?.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
            )}

              {/* Typing Indicator */}
              {isTyping &&
            <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                    src="https://images.unsplash.com/photo-1734456611474-13245d164868"
                    alt="Professional headshot of woman with brown hair in business attire smiling"
                    className="w-full h-full object-cover" />

                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
            }
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages?.length === 1 &&
          <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickReplies?.map((reply, index) =>
              <button
                key={index}
                onClick={() => handleSendMessage(reply)}
                className="px-3 py-1 bg-muted hover:bg-border text-sm text-foreground rounded-full transition-colors">

                      {reply}
                    </button>
              )}
                </div>
              </div>
          }

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                className="flex-1" />

                <Button
                variant="default"
                size="icon"
                onClick={() => handleSendMessage()}
                disabled={!newMessage?.trim()}
                iconName="Send" />

              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

};

export default LiveChatWidget;