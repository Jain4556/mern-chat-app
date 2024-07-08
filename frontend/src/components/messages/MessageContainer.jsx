import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../context/AuthContext';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="px-4 py-4 flex flex-col h-full">
      {!selectedConversation ? <NoChatSelected /> : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>
          <div className="p-4 flex-1 overflow-auto">
            <Messages />
          </div>
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full px-4 md:px-15">
      <div className="text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2 md:min-w-[450px] px-4 md:px-20">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
