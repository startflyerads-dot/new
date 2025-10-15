import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessageCenter = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-professional overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Message Center</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" iconName="Search" />
          <Button variant="ghost" size="icon" iconName="Settings" />
        </div>
      </div>
      <div className="flex h-96">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border overflow-y-auto">
          <div className="p-4">
            <Input
              type="search"
              placeholder="Search conversations..."
              className="mb-4"
            />
          </div>
          
          <div className="space-y-1">
            {messages?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`flex items-center space-x-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200 ${
                  selectedConversation?.id === conversation?.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                }`}
              >
                <div className="relative">
                  <Image
                    src={conversation?.participant?.avatar}
                    alt={conversation?.participant?.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conversation?.participant?.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-card-foreground truncate">
                      {conversation?.participant?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(conversation?.lastMessage?.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation?.lastMessage?.content}
                  </p>
                </div>
                
                {conversation?.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {conversation?.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Image
                    src={selectedConversation?.participant?.avatar}
                    alt={selectedConversation?.participant?.avatarAlt}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground">
                      {selectedConversation?.participant?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation?.participant?.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" iconName="Phone" />
                  <Button variant="ghost" size="icon" iconName="Video" />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation?.messages?.map((message) => (
                  <div
                    key={message?.id}
                    className={`flex ${message?.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message?.sender === 'me' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm">{message?.content}</p>
                      <p className={`text-xs mt-1 ${
                        message?.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                      }`}>
                        {formatMessageTime(message?.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" iconName="Paperclip" />
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e?.target?.value)}
                    onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    iconName="Send"
                    onClick={handleSendMessage}
                    disabled={!newMessage?.trim()}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-medium text-card-foreground mb-2">Select a conversation</h4>
                <p className="text-sm text-muted-foreground">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;