import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body.message;
  
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  // قراءة اسم الموديل من البيئة
  const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  
  // قراءة تعليمات النظام (التوجيهات) من البيئة، مع وضع قيمة افتراضية
  const SYSTEM_INSTRUCTION = process.env.GEMINI_SYSTEM_INSTRUCTION || "You are a helpful assistant. Always respond in the same language as the user's prompt.";

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is missing from environment variables' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        // 1. تمرير المتغير الخاص بتعليمات النظام هنا
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }] 
        },
        // 2. رسالة المستخدم العادية
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ response: reply || "No reply from Gemini." });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Gemini API error:', error.response?.data || error.message);
      return NextResponse.json(
        {
          error: 'Error connecting to Gemini',
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 }
      );
    } else if (error instanceof Error) {
      console.error('❌ Unknown error:', error.message);
      return NextResponse.json(
        {
          error: 'Unknown error',
          details: error.message,
        },
        { status: 500 }
      );
    } else {
      console.error('❌ Unexpected error:', error);
      return NextResponse.json(
        {
          error: 'Unexpected error',
          details: String(error),
        },
        { status: 500 }
      );
    }
  }
}