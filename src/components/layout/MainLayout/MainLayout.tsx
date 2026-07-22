import React, { useState } from "react";
import SideBar from "../SideBar"; 
import Header from "../Header";
import type { ConversationSummary } from "@/services/conversation";
import {
  createConversation as createConversationApi,
  getConversation,
  getConversations,
} from "@/services/conversation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);

  const createNewConversation = async () => {
    try {
      const created = await createConversationApi();
      if (!created.success || !created.conversation) return;

      setConversationId(created.conversation.id);
      
      const data = await getConversations();
      if (data.success) {
        setConversations(data.conversations);
      }
      
      window.location.reload(); 
    } catch (error) {
      console.error(error);
    }
  };

  const selectConversation = async (id: string) => {
    try {
      setConversationId(id);
      setIsSidebarOpen(false); 
      
      const data = await getConversation(id);
      if (data.success) {
        window.location.hash = id; 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white">
      {/* Unified SideBar panel */}
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={conversationId}
        onSelectConversation={selectConversation}
        onNewChat={createNewConversation}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Your standard global Header which handles the hamburger menu trigger */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Main scrolling chat container */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, {
                conversationId,
                setConversationId,
                conversations,
                setConversations,
                setIsSidebarOpen,
              })
            : children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;