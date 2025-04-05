import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse } from '@/services/openRouterService';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { question } = body;
    
    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Call the service function
    const aiResponse = await getAIResponse(question);
    
    // Return the response
    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}