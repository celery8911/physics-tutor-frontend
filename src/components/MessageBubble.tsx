import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 py-8 ${isUser ? 'bg-white' : 'bg-gray-50/50'}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500">
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Image if present */}
        {message.image && (
          <div className="rounded-xl overflow-hidden border border-gray-200 max-w-md">
            <img
              src={message.image}
              alt="Uploaded"
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="text-[15px] leading-7 text-gray-900">
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  // 段落
                  p: ({ children }: { children?: React.ReactNode }) => (
                    <p className="mb-4 last:mb-0">{children}</p>
                  ),
                  // 标题
                  h1: ({ children }: { children?: React.ReactNode }) => (
                    <h1 className="text-xl font-semibold mb-3 mt-6 first:mt-0">{children}</h1>
                  ),
                  h2: ({ children }: { children?: React.ReactNode }) => (
                    <h2 className="text-lg font-semibold mb-3 mt-5 first:mt-0">{children}</h2>
                  ),
                  h3: ({ children }: { children?: React.ReactNode }) => (
                    <h3 className="text-base font-semibold mb-2 mt-4 first:mt-0">{children}</h3>
                  ),
                  // 粗体
                  strong: ({ children }: { children?: React.ReactNode }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  // 列表
                  ul: ({ children }: { children?: React.ReactNode }) => (
                    <ul className="list-none pl-0 mb-4 space-y-2">{children}</ul>
                  ),
                  ol: ({ children }: { children?: React.ReactNode }) => (
                    <ol className="list-none pl-0 mb-4 space-y-2">{children}</ol>
                  ),
                  li: ({ children }: { children?: React.ReactNode }) => (
                    <li className="pl-0">{children}</li>
                  ),
                  // 代码
                  code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode; [key: string]: any }) =>
                    inline ? (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[13px] font-mono text-gray-800" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-50 border border-gray-200 p-4 rounded-lg text-[13px] font-mono my-4 overflow-x-auto" {...props}>
                        {children}
                      </code>
                    ),
                  // 换行
                  br: () => <br />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
