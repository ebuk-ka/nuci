const API_URL = "http://localhost:5000/api/messages";

const token = () => localStorage.getItem("token");

export interface SendMessageResponse {
  success: boolean;

  userMessage: {
    id: string;
    content: string;
    role: "USER";
  };

  assistantMessage: {
    id: string;
    content: string;
    role: "ASSISTANT";
  };

  message?: string;
}

export const sendMessage = async (
  conversationId: string,
  content: string
): Promise<SendMessageResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },

    body: JSON.stringify({
      conversationId,
      content,
    }),
  });

  return response.json();
};