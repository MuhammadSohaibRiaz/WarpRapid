import { slugify } from "./utils"
import { supabase } from "./supabase"
import { StorageCMS } from "./supabase-cms"


const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

interface GeneratedBlog {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  seo_title: string
  seo_description: string
  image_url: string
  image_prompt: string
  faqs: { question: string; answer: string }[]
  cta: { title: string; description: string; buttonText: string; buttonLink: string }
}

const SYSTEM_PROMPT = `You are the Senior Technical Content Writer for RapidNexTech, an innovative software development company specializing in web development, mobile apps, UI/UX design, and enterprise solutions.

Your job is to write a single, compelling, SEO-optimized blog post that will rank well on Google and provide genuine value to readers. The post must feel professional, authoritative, and modern.

FORMATTING RULES:
- Write the content body in clean Markdown (H2 ##, H3 ###, bold, lists, code blocks where relevant).
- The content MUST be between 2500-3500 words. This is CRITICAL — short content will be rejected.
- Include at least 6-8 H2 sections to cover the topic thoroughly.
- Use short paragraphs (2-3 sentences max) for readability.
- Include practical advice, real-world examples, statistics, and actionable takeaways.
- Add a "Key Takeaways" or "TL;DR" bullet list near the end.
- Naturally mention RapidNexTech once or twice as an authority but do NOT make it a sales pitch.
- End with a compelling conclusion paragraph that encourages readers to take action.

OUTPUT FORMAT:
Return ONLY a valid JSON object (no markdown fences, no extra text) with these exact keys:
{
  "title": "The blog post title (60-70 chars, compelling, includes primary keyword)",
  "excerpt": "A 150-160 character meta-description-style summary that hooks the reader",
  "content": "The full markdown body of the blog post (DO NOT include the title as H1)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seo_title": "SEO-optimized title | RapidNexTech (max 60 chars)",
  "seo_description": "SEO meta description (max 160 chars)",
  "image_prompt": "A detailed, vivid prompt (40-60 words) describing an ideal, professional, photorealistic technology editorial header image for this topic. Describe lighting, composition, and a modern tech aesthetic. This will be used to generate the image manually.",
  "faqs": [
    { "question": "A relevant FAQ question?", "answer": "A concise, helpful answer." },
    { "question": "Another FAQ?", "answer": "Another answer." },
    { "question": "Third FAQ?", "answer": "Third answer." }
  ],
  "cta": {
    "title": "A compelling CTA title related to the blog topic (e.g., Ready to Build Your Next App?)",
    "description": "A short description encouraging the reader to take action, mentioning RapidNexTech's services.",
    "buttonText": "CTA button label (e.g., Schedule Free Consultation)",
    "buttonLink": "/contact"
  }
}`

export async function generateBlogPost(
  topic?: string,
  onStatusUpdate?: (status: string) => void
): Promise<GeneratedBlog> {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GROQ_API_KEY is not configured. Please add it to your .env.local file.")
  }

  const userPrompt = topic
    ? `Write a blog post about: "${topic}"`
    : `Write a blog post about a trending topic in software development, web development, mobile apps, AI, or enterprise technology that would be valuable for business owners and CTOs in 2025-2026.`

  onStatusUpdate?.("✨ Initiating AI creative engine...")

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 8192,
      response_format: { type: "json_object" },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error("Groq API error:", errorBody)
    if (response.status === 401) {
      throw new Error("Groq API key is invalid or expired. Please generate a new key at https://console.groq.com/keys and update NEXT_PUBLIC_GROQ_API_KEY in .env.local, then restart the dev server.")
    }
    throw new Error(`Groq API error (${response.status}): ${response.statusText}`)
  }

  const data = await response.json()
  const rawContent = data.choices?.[0]?.message?.content

  if (!rawContent) {
    throw new Error("No content received from Groq API")
  }

  let parsed: any
  try {
    parsed = JSON.parse(rawContent)
  } catch (e) {
    console.error("Failed to parse Groq response:", rawContent)
    throw new Error("AI returned invalid JSON. Please try again.")
  }

  // Validate required fields
  if (!parsed.title || !parsed.content || !parsed.excerpt) {
    throw new Error("AI response is missing required fields (title, content, or excerpt). Please try again.")
  }

  const slug = slugify(parsed.title)

  // Skip AI image generation, provide prompt and standard placeholder
  onStatusUpdate?.("🔍 Optimizing structure for SEO...")

  const finalImageUrl = "/placeholder.svg?height=630&width=1200&query=" + encodeURIComponent(parsed.title)

  return {
    title: parsed.title,
    slug,
    excerpt: parsed.excerpt,
    content: parsed.content,
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    seo_title: parsed.seo_title || parsed.title,
    seo_description: parsed.seo_description || parsed.excerpt,
    image_url: finalImageUrl,
    image_prompt: parsed.image_prompt || `Modern technology blog header image about ${parsed.title}`,
    faqs: Array.isArray(parsed.faqs) ? parsed.faqs : [],
    cta: parsed.cta || {
      title: "Ready to Build Something Amazing?",
      description: "Let RapidNexTech turn your vision into reality with cutting-edge software solutions.",
      buttonText: "Schedule Free Consultation",
      buttonLink: "/contact",
    },
  }
}

