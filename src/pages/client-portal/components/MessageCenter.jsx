import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MessageCenter = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(messages?.[0] || null);

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
    <div className="relative rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl overflow-hidden min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between p-8 border-b border-white/5">
        <h3 className="text-xl font-black text-white tracking-tight">Messaging Hub</h3>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-primary transition-all">
            <Icon name="Search" size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-primary transition-all">
            <Icon name="Settings" size={18} />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/5 flex flex-col bg-black/20">
          <div className="p-6">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-2 pb-6">
            {messages?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`group relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${selectedConversation?.id === conversation?.id
                    ? 'bg-primary/10 border border-primary/20 shadow-lg'
                    : 'hover:bg-white/[0.05] border border-transparent'
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={conversation?.participant?.avatar}
                    alt={conversation?.participant?.avatarAlt}
                    className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/10"
                  />
                  {conversation?.participant?.online && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[3px] border-zinc-900 group-hover:border-zinc-800 transition-colors"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-black text-white uppercase tracking-widest truncate">
                      {conversation?.participant?.name}
                    </h4>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">
                    {conversation?.lastMessage?.content}
                  </p>
                </div>

                {conversation?.unreadCount > 0 && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-[10px] font-black text-white">
                      {conversation?.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col bg-zinc-950/20">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 backdrop-blur-md bg-zinc-900/10">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedConversation?.participant?.avatar}
                    alt={selectedConversation?.participant?.avatarAlt}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10"
                  />
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">
                      {selectedConversation?.participant?.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedConversation?.participant?.online ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {selectedConversation?.participant?.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-primary transition-all">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:text-primary transition-all">
                    <Icon name="Video" size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {selectedConversation?.messages?.map((message) => (
                  <div
                    key={message?.id}
                    className={`flex ${message?.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md group`}>
                      <div className={`p-4 rounded-2xl border transition-all duration-300 ${message?.sender === 'me'
                          ? 'bg-primary border-primary/20 text-white shadow-lg shadow-primary/20'
                          : 'bg-zinc-900/50 border-white/5 text-zinc-300'
                        }`}>
                        <p className="text-sm font-medium leading-relaxed">{message?.content}</p>
                      </div>
                      <div className={`mt-2 flex items-center gap-2 ${message?.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                          {formatMessageTime(message?.timestamp)}
                        </span>
                        {message?.sender === 'me' && <Icon name="CheckCheck" size={12} className="text-primary" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Input Area */}
              <div className="p-8 pt-0 mt-auto">
                <div className="relative p-2 rounded-[1.5rem] bg-zinc-900/80 border border-white/5 backdrop-blur-sm focus-within:border-primary/50 transition-all shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="flex-shrink-0 w-10 h-10 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all">
                      <Icon name="Paperclip" size={18} />
                    </Button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e?.target?.value)}
                      onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-transparent border-none py-3 text-sm text-white placeholder-zinc-600 focus:ring-0 focus:outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage?.trim()}
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${newMessage?.trim()
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'bg-zinc-800 text-zinc-500'
                        }`}
                    >
                      <Icon name="Send" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                <Icon name="MessageSquare" size={32} className="text-primary relative z-10" />
              </div>
              <h4 className="text-2xl font-black text-white tracking-tight mb-4 uppercase tracking-[0.1em]">Secure Comms</h4>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest leading-loose max-w-xs">Select a secure frequency to start your project communication.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;