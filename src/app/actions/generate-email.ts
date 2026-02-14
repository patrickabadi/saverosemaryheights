'use server'

import OpenAI from 'openai'

const FACT_SHEET: Record<string, string[]> = {
  environment: [
    "The property is identified as 'Hub J' in Surrey's Biodiversity Conservation Strategy.",
    "It is ranked as the 5th most important wildlife corridor in Surrey.",
    "The development would remove approximately 95% of the upland forest.",
    "The land is a critical riparian forest bordering the Nicomekl River.",
  ],
  traffic: [
    "152nd Street is a major arterial road with high speeds (often 80km/h+) and a dangerous hill crest.",
    "The proposed 'Protected-T' intersection is insufficient and dangerous due to limited sightlines.",
    "Traffic from 300+ new families would overwhelm 36th Avenue and 154th Street.",
    "The original NCP never designed the road network for this density.",
    "Existing congestion at 32nd Ave and Hwy 99 is already critical.",
  ],
  schools: [
    "Rosemary Heights Elementary is already significantly over capacity.",
    "The school has 7+ portables occupying the playing field with no room for expansion.",
    "Grandview Heights Secondary is also over capacity with extended schedules.",
    "The proposed 'Francophone school' does not solve local overcrowding as it has restricted enrollment.",
  ],
  planning: [
    "The 1996 Neighbourhood Concept Plan (NCP) designates this land as 'Institutional/Parkland'.",
    "The community was designed around this land remaining a green buffer.",
    "Polygon purchased the land knowing the zoning was Institutional.",
    "High-density residential use violates the core principles of the award-winning NCP.",
  ],
  density: [
    "Polygon proposes 200 townhomes and 175 condos — a total of 375 units.",
    "This density far exceeds anything the surrounding community was designed to accommodate.",
    "The proposal has increased in total units from earlier iterations despite community opposition.",
  ],
  wildlife: [
    "The land serves as a mating and migration hub for owls, eagles, and deer.",
    "The riparian forest along the Nicomekl River supports diverse species.",
    "Hub J is recognized as one of the most ecologically significant corridors in the city.",
  ],
  slopes: [
    "The clay composition of the soil poses a high risk of impacting adjacent structures during construction.",
    "Slope stability and geotechnical issues have not been adequately addressed in the proposal.",
  ],
  community: [
    "Polygon purchased the land knowing its Institutional zoning designation.",
    "The rezoning application is being fast-tracked with minimal community consultation.",
    "Previous community feedback sessions were largely ignored by the developer.",
    "Polygon's own promotional materials have been found to contain misleading claims.",
  ],
}

export async function generateEmail(formData: FormData) {
  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const tone = formData.get('tone') as string
  const concerns = JSON.parse(formData.get('concerns') as string) as string[]

  if (!process.env.OPENAI_API_KEY) {
    return { error: "OpenAI API Key is missing. Please add OPENAI_API_KEY to your .env.local file." }
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Construct the prompt with specific facts
  const keyFacts: string[] = []
  for (const concern of concerns) {
    if (FACT_SHEET[concern]) {
      keyFacts.push(...FACT_SHEET[concern])
    }
  }

  const systemPrompt = `You are a deeply concerned resident of Rosemary Heights, Surrey, BC, writing a formal letter to the Mayor and Council. 
  Your goal is to oppose the rezoning application for 3660 and 3690 152nd Street (The Retreat Centre Lands) by Polygon Homes.
  
  Do not mention being an AI. Make the letter sound distinct and personal.
  Use the following verified facts to support your argument. Do not make up facts.
  
  VERIFIED FACTS TO USE:
  ${keyFacts.map(f => `- ${f}`).join('\n')}
  
  TONE: ${tone} (but always respectful and firm).
  RESIDENT NAME: ${name || 'A Concerned Resident'}
  RESIDENT ADDRESS: ${address || 'Rosemary Heights, Surrey, BC'}
  
  Structure the email as follows:
  1. First line must be: Subject: [a compelling subject line]
  2. Then a blank line
  3. Then the salutation: Dear Mayor and Council,
  4. Body paragraphs focusing on the selected concerns
  5. A respectful sign-off with the resident's name`

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Write the email now." }
      ],
      model: "gpt-4o",
    })

    return { content: completion.choices[0].message.content }
  } catch (error) {
    console.error("OpenAI Error:", error)
    return { error: "Failed to generate email. Please try again later." }
  }
}
