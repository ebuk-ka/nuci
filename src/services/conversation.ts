const API_URL = "http://localhost:5000/api/conversations";

const getToken = () => localStorage.getItem("token");

export interface ConversationMessage {
  id: string;
  content: string;
  role: "USER" | "ASSISTANT";
}

export interface ConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationResponse {
  success: boolean;
  conversation?: ConversationSummary;
  message?: string;
}

export interface ConversationsResponse {
  success: boolean;
  conversations: ConversationSummary[];
  message?: string;
}

export interface ConversationDetailsResponse {
  success: boolean;
  conversation: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: ConversationMessage[];
  };
  message?: string;
}

export const createConversation = async (): Promise<CreateConversationResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

export const getConversations = async (): Promise<ConversationsResponse> => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

export const getConversation = async (
  id: string
): Promise<ConversationDetailsResponse> => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};