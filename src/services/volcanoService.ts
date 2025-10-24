const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const API_KEY = import.meta.env.VITE_VOLCANO_API_KEY || 'bd747896-e89b-46f4-a5ab-0a232d086845';
const ENDPOINT_ID = 'ep-20251015101857-wc8xz';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatWithVolcano = async (messages: Message[]) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: ENDPOINT_ID,
        messages: [
          {
            role: 'system',
            content: '你是一个有帮助的AI助手'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to fetch from Volcano API');
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('Error calling Volcano API:', error);
    throw error;
  }
};
