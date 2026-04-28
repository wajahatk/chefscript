import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { menuItems, settings } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a professional marketing expert for home-based restaurants in Pakistan. 
    Create a highly attractive WhatsApp broadcast message.
    
    KITCHEN INFO:
    Name: ${settings.kitchen_name}
    City: ${settings.city}
    Delivery Areas: ${settings.delivery_areas}
    Delivery Fee: ${settings.delivery_fee}
    Free Delivery Min: ${settings.min_free_delivery}
    WhatsApp: ${settings.phone_number}

    MENU ITEMS:
    ${menuItems.map(item => `${item.name} - Rs.${item.price}`).join(", ")}

    REQUIREMENTS:
    1. Use beautiful Unicode borders (boxes and stars).
    2. Write a professional section in English.
    3. Write a warm, inviting section in Urdu.
    4. Include clear delivery details.
    5. Do not use hashtags or em-dashes.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return NextResponse.json({ text: response.text() });
}
