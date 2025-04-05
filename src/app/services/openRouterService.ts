export async function getAIResponse(userQuestion: string) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
          "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
          "messages": [
            {
              "role": "user",
              "content": userQuestion 
            }
          ]
        })
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      throw error;
    }
  }