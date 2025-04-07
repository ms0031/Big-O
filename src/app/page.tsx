'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { NavbarDemo } from './components/Navbar';
import { useRef } from 'react';
import { CoverDemo } from './components/Cover';
export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  // Change the initial state to include a default false value for response
  const [complexityInfo, setComplexityInfo] = useState<{response: boolean, timeComplexity: string, spaceComplexity: string} | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [flag,setFlag] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    // Add complexity request to the question
    const enhancedQuestion = `${question}\n\nexplain the time complexity in json format {'response'='true/false','time-complexity'='','space-complexity'=''} and nothing else , response = 'true' if the answer is fetched else false 
    and dont send object in the 'time-complexity' and 'space-complexity' the value for every key must be strictly string`;
    
    setIsLoading(true);
    setError('');
    setComplexityInfo(null);
    
    try {
      // Create an AbortController to handle timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: enhancedQuestion }),
        signal: controller.signal
      });
      
      // Clear the timeout since we got a response
      clearTimeout(timeoutId);
      
      const data = await response.json();
      console.log('API Response:', data);
      // Check for OpenRouter error format in the response
      if (data.error) {
        const errorCode = data.error.code;
        const errorMessage = data.error.message;
        
        // Handle specific error codes with user-friendly messages
        switch (errorCode) {
          case 400:
            throw new Error('Invalid request parameters. Please check your input.');
          case 401:
            throw new Error('Authentication error. Please try again later.');
          case 402:
            throw new Error('Insufficient credits for this request.');
          case 403:
            throw new Error('Your input was flagged by content moderation.');
          case 408:
            throw new Error('Request timed out. Please try again or simplify your question.');
          case 429:
            throw new Error('Too many requests. Please try again in a moment.');
          case 502:
            throw new Error('The AI model is currently unavailable. Please try again later.');
          case 503:
            throw new Error('No available model provider. Please try again later.');
          default:
            throw new Error(`Error: ${errorMessage || 'Unknown error occurred'}`);
        }
      }
      
      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status}`);
      }
      
      const content = data.choices?.[0]?.message?.content || 'No response received'; 
      // Try to extract JSON complexity info from the response
      try {
        // Look for JSON pattern in the response
        const jsonMatch = content.match(/\{.*"response".*"time-complexity".*"space-complexity".*\}/);
        if (jsonMatch) {
          // Replace single quotes with double quotes for valid JSON
          const jsonStr = jsonMatch[0].replace(/'/g, '"');
          const complexityData = JSON.parse(jsonStr);
          setComplexityInfo({
            response: complexityData.response === 'true',
            timeComplexity: complexityData['time-complexity'],
            spaceComplexity: complexityData['space-complexity']
          });
          
          // Remove the JSON part from the answer
          const cleanAnswer = content.replace(jsonMatch[0], '').trim();
          setAnswer(cleanAnswer);
        } else {
          setAnswer(content);
        }
      } catch (jsonError) {
        console.error('Error parsing complexity info:', jsonError);
        setAnswer(content);
      }
    } catch (err) {
      console.error('Error:', err);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again or simplify your question.');
      } else {
        // Use the error message from our custom error handling
        setError(err instanceof Error ? err.message : 'Failed to get a response. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Add this useEffect to scroll to bottom when complexityInfo or answer changes
  // Add a ref to track if this is the initial render
  const isInitialRender = useRef(true);
  
  // Modified useEffect to avoid scrolling on initial render/refresh
  useEffect(() => {
    // Skip scrolling on the initial render (page refresh)
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    // Only scroll when we have actual content changes after user interaction
    if (complexityInfo || answer) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [complexityInfo, answer]);
  
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-6 bg-red-300`}>
      <NavbarDemo />
      <div className='mt-26 mb-14'>
        <CoverDemo />
        </div>
      <div className="lg:mb-24 mb-38 z-10 max-w-5xl w-full justify-items-center items-center justify-between font-mono text-sm">
        <form onSubmit={handleSubmit} className="w-full mb-8">
          <div className="flex flex-col gap-4  bg-white/40 bg-cover bg-center rounded-2xl p-4">
            <textarea
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setFlag(true);
              }}
              placeholder="Enter code snippet..."
              className={`${flag ? 'field-sizing-content' : 'lg:h-36 h-50'} p-4 border-0
 border-black bg-red-100 rounded-2xl resize-none text-black focus:outline-none focus:ring-2 focus:ring-red-400/75 focus:border-red-400/75 transition-all duration-200`}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className=" disabled:cursor-not-allowed cursor-pointer shadow-2xl border-0 border-black bg-red-400/95 hover:bg-red-500/90 text-black font-bold py-2 px-4 rounded-2xl "
            >
              {isLoading ? (
                <>
                  <svg className="mr-3 h-5 w-5 inline animate-spin text-black/75" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="6"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Getting Answer...
                </>
              ) : 'Get Answer'}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
            {complexityInfo && (
          <div className={`mt-4 w-full ${complexityInfo.response ? "bg-white/40" : "bg-red-400"} p-4 rounded-3xl pt-4`}>
            <h3 className={`mx-2 text-black text-2xl font-semibold mb-2`}>
                  {complexityInfo.response ? 'Complexity Analysis:' : 'Error:  please enter correct code snippet!!'}
                </h3>
                {complexityInfo.response ? (
                  <div className='flex-col bg-red-100 rounded-2xl p-4'>
                    <p className='mx-8 text-black text-xl'><strong>Time Complexity:</strong> {complexityInfo.timeComplexity || 'Not provided'}</p>
                    <p className='mx-8 text-black text-xl'><strong>Space Complexity:</strong> {complexityInfo.spaceComplexity || 'Not provided'}</p>
                  </div>
                ) : ""}
              </div>
            )}
      </div>
    </main>
  );
}