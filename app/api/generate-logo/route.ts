import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { brandName, tagline, colors } = await request.json()

    // Construct the prompt for DALL-E
    let prompt = `Create a modern, professional logo for a windsurfing brand called "${brandName}"`
    if (tagline) {
      prompt += ` with the tagline "${tagline}"`
    }
    if (colors) {
      prompt += `. Use the following colors: ${colors}`
    }
    prompt += `. The logo should incorporate windsurfing elements and convey a sense of motion and adventure. Make it minimalistic and suitable for both digital and print use.`

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    })

    return NextResponse.json({ imageUrl: response.data[0].url })
  } catch (error) {
    console.error('Error generating logo:', error)
    return NextResponse.json(
      { error: 'Failed to generate logo' },
      { status: 500 }
    )
  }
}
