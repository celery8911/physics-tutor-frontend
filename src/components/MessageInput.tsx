import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, image?: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || imagePreview) && !disabled) {
      onSendMessage(message.trim(), imagePreview || undefined);
      setMessage('');
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-32 rounded-xl border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-white border border-gray-300 text-gray-700 rounded-full p-1.5 hover:bg-gray-50 transition-all shadow-sm"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-3 bg-white border border-gray-300 rounded-2xl p-2 focus-within:border-gray-400 transition-colors">
        {/* Image Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="上传图片"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Text Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="有什么物理问题需要帮助吗？"
          disabled={disabled}
          className="flex-1 resize-none bg-transparent px-2 py-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-[15px] leading-6 max-h-32 placeholder:text-gray-400"
          rows={1}
          style={{
            minHeight: '24px',
            maxHeight: '200px',
          }}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={(!message.trim() && !imagePreview) || disabled}
          className="flex-shrink-0 bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
          title="发送"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
