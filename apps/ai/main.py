from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os

app = FastAPI()

# Configure Gemini
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

class PredictionRequest(BaseModel):
    home_team: str
    away_team: str
    home_strength: float
    away_strength: float

@app.post("/predict")
def predict_match(req: PredictionRequest):
    # Simulated Dixon-Coles statistical output
    home_xg = req.home_strength * 1.5
    away_xg = req.away_strength * 1.2
    
    home_win_prob = round(min(home_xg / (home_xg + away_xg) * 100, 99.0), 1)
    away_win_prob = round(min(away_xg / (home_xg + away_xg) * 100, 99.0), 1)
    draw_prob = round(100 - home_win_prob - away_win_prob, 1)

    # Generate Narrative using Gemini
    prompt = f"""
    You are a professional football analyst. Write a short, engaging 2-paragraph prediction narrative for a match between {req.home_team} and {req.away_team}.
    The statistical model predicts:
    {req.home_team} Win: {home_win_prob}% (xG: {home_xg:.2f})
    {req.away_team} Win: {away_win_prob}% (xG: {away_xg:.2f})
    Draw: {draw_prob}%
    
    Make it sound like an expert pundit. Do not use markdown headers.
    """
    
    try:
        response = model.generate_content(prompt)
        narrative = response.text
    except Exception as e:
        narrative = f"Failed to generate narrative: {str(e)}"

    return {
        "stats": {
            "homeWin": home_win_prob,
            "awayWin": away_win_prob,
            "draw": draw_prob,
            "homeXg": round(home_xg, 2),
            "awayXg": round(away_xg, 2)
        },
        "narrative": narrative
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}
