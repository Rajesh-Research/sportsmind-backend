import os
import base64
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
from typing import List

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key and api_key != "your_openai_api_key_here" else None

class VideoAnalysisFeedback(BaseModel):
    summary: str
    strengths: List[str]
    areas_of_improvement: List[str]
    injury_risks: List[str]
    actionable_cues: List[str]
    overall_score: int

def analyze_sports_video(video_path: str, prompt: str) -> str:
    """
    Analyzes a sports video for coaching mechanics and improvements using GPT-4o Vision.
    Uses Structured Outputs for reliable, parsable data.
    """
    try:
        if not os.path.exists(video_path):
            return "Video file not found."

        if not client:
            return "OpenAI API key not configured. Mocking analysis for development."

        with open(video_path, "rb") as f:
            video_data = f.read()
        
        video_base64 = base64.b64encode(video_data).decode("utf-8")
        
        ext = os.path.splitext(video_path)[1].lower()
        mime_types = {".mp4": "video/mp4", ".mov": "video/quicktime", ".avi": "video/x-msvideo", ".webm": "video/webm"}
        mime_type = mime_types.get(ext, "video/mp4")

        system_prompt = """You are an elite sports biomechanics expert.
Analyze the athlete's movement in the provided video with extreme detail.
Focus on body mechanics, efficiency, and injury risks.
Ensure your response follows the precise JSON schema requested."""

        combined_prompt = f"{system_prompt}\n\nCoaching Focus: {prompt}"

        response = client.beta.chat.completions.parse(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": combined_prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{video_base64}",
                            },
                        },
                    ],
                }
            ],
            response_format=VideoAnalysisFeedback,
            max_tokens=3000,
        )

        feedback = response.choices[0].message.parsed
        # Convert structured output into nicely formatted markdown
        markdown = f"### 📊 Overall Score: {feedback.overall_score}/100\n\n"
        markdown += f"**Summary**: {feedback.summary}\n\n"
        markdown += "### 🌟 Strengths\n" + "\n".join([f"- {s}" for s in feedback.strengths]) + "\n\n"
        markdown += "### 🛠️ Areas of Improvement\n" + "\n".join([f"- {s}" for s in feedback.areas_of_improvement]) + "\n\n"
        markdown += "### ⚠️ Injury Risks\n" + "\n".join([f"- {s}" for s in feedback.injury_risks]) + "\n\n"
        markdown += "### 🎯 Actionable Cues\n" + "\n".join([f"- {s}" for s in feedback.actionable_cues])
        
        return markdown

    except Exception as e:
        return f"Error analyzing video: {str(e)}"
