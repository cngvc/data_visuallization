import { Bot, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatAI = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAsk = () => {
    if (question.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: question,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, userMessage]);
      console.log('Question:', question);
      setQuestion('');

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'This is a response from your Personal Club Analyst.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  const renderDialogContent = () => (
    <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0 overflow-hidden">
      <DialogHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-blue-100 h-10 w-10">
            <Bot className="size-6 text-blue-600" strokeWidth={1.5} />
          </div>
          <div>
            <DialogTitle className="font-semibold">Personal Club Analyst</DialogTitle>
            <p className="text-xs text-gray-500">Turn Data into insights instantly</p>
          </div>
        </div>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start a conversation by typing your question below</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-4 space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Chat with AI Bot"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 rounded-sm border text-sm border-gray-200 bg-white px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Button disabled={!question} onClick={handleAsk} className="bg-blue-100 hover:bg-blue-200 text-blue-500">
            Send
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="px-4 my-4">
      <Dialog onOpenChange={(open) => !open && setMessages([])}>
        <DialogTrigger asChild>
          <div className="rounded-lg bg-linear-to-b from-blue-200 to-indigo-200 p-2 text-center cursor-pointer transition hover:shadow-md">
            <div className="mb-4 flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-white shadow-md h-12 w-12">
                <Bot className="size-8" strokeWidth={1.5} />
              </div>
            </div>

            <p className="mb-2 font-semibold text-base">
              Think of me as your
              <br />
              Personal Club Analyst.
            </p>

            <p className="mb-6 text-sm text-gray-600">
              Turn Data into
              <br />
              insights instantly.
            </p>

            <Input
              type="text"
              placeholder="Type your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mb-2 w-full rounded-sm border text-sm border-gray-200 bg-white px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-white disabled:opacity-100 disabled:placeholder-gray-400"
              disabled
              onClick={(e) => e.stopPropagation()}
            />

            <Button className="w-full rounded-sm bg-blue-500 p-3 text-sm hover:bg-blue-600 flex items-center justify-center gap-2">
              <MessageCircle className="size-4" strokeWidth={2} />
              Ask Your Club
            </Button>
          </div>
        </DialogTrigger>
        {renderDialogContent()}
      </Dialog>
    </div>
  );
};

export default ChatAI;
