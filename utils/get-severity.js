import { getResponse } from "./gemini";

const prompt = `
We are collecting harassesment reports from girl students. I want to know which reports are severe and needs immediate action.
Your task is to assign a number from 1 to 10 for the given report.

use a 10-star rating scale to assess the severity of the case, with 1 being the least severe and 10 being the most severe. Here's a general breakdown of how can you assign ratings:
1-3 stars: Low-level harassment, such as occasional unwanted comments or gestures.
4-6 stars: Moderate-level harassment, such as frequent unwanted contact or threats.
7-9 stars: High-level harassment, such as physical assault or stalking.
10 stars: Extremely severe harassment, such as sexual assault or threats of violence.

The given report consists of "Type of harassesment" and the "Information of it"

Here's a breakdown of different types of Type of harassesment:
Verbal abuse: Intimidation, demeaning language, or public humiliation.
Sexual harassment: Unwelcome touching, sexual comments, or coercive requests for favors.
Bullying: Spreading rumors, public embarrassment, or abuse of power.
Stalking: Monitoring movements, recording without consent, or leaving unsolicited gifts.
Cyber harassment: Excessive messaging, hacking accounts, or sharing inappropriate content.
Discrimination: Unequal academic opportunities, exclusion, or religious barriers.
Abuse of authority by staff or faculty: Favoritism, unwelcome physical contact, or threats.

Respond ONLY with a number from 1 to 10 to indicate the severity of the following case.
`

export const getSeverity = async (type, additionalInfo) => {
  const promptWithReport = prompt + `
    Type: ${type}
    information: ${additionalInfo}
  `
  const text = await getResponse(promptWithReport);
  console.log(text);
  const rating = Number(text.trim());
  console.log(rating)
  if (typeof rating === 'number' && !isNaN(rating)) {
    return rating;
  }
  return 5;
}