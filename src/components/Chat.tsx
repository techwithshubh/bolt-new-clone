import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, SendIcon, CopyIcon, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Message = {
  id: string;
  content: string;
  sender: 'human' | 'bot';
  timestamp: Date;
};

const ChatMessage = ({ message }: { message: Message }) => {
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex gap-4 py-6 items-start">
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.sender === 'bot' ? "/bot-avatar.png" : "/user-avatar.png"} />
        <AvatarFallback>{message.sender === 'bot' ? 'B' : 'U'}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {message.sender === 'bot' ? 'Assistant' : 'You'}
        </div>
        <div className="text-sm text-card-foreground">
          {message.content}
        </div>
        
        {message.sender === 'bot' && (
          <div className="flex items-center gap-2 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-gray-500 hover:text-gray-700"
              onClick={() => copyToClipboard(message.content)}
            >
              <CopyIcon className="h-4 w-4 mr-1" />
              Copy
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Helpful
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-gray-500 hover:text-gray-700"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              Not helpful
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Report message</DropdownMenuItem>
                <DropdownMenuItem>Share message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatInput = ({ onSend, onFileUpload }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative bg-card rounded-md">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="min-h-[60px] w-full pr-24 resize-none rounded-md"
        rows={1}
      />
      <div className="absolute right-2 bottom-2 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onFileUpload()}
        >
          <PaperclipIcon className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          className="h-8 w-8"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'I have a question about React hooks.',
      sender: 'human',
      timestamp: new Date(),
    },
    {
      id: '2',
      content: 'The component maintains its own message state, but you could easily modify it to accept messages as props if you need to manage the state elsewhere.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll whenever messages change

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'human',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleFileUpload = () => {
    console.log('File upload clicked');
  };

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} /> {/* Invisible element for scrolling */}
        </div>
      </div>
      
      <div className="border-t bg-accent p-4 rounded-md shadow-[0_4px_30px_rgba(0,234,255,0.1)]
            shadow-cyan-400/20 
            ring-1 ring-white/10">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={handleSend} onFileUpload={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default Chat;