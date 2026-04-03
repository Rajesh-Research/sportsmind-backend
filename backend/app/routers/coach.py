from fastapi import APIRouter
from typing import List

router = APIRouter()


@router.get("/dashboard")
def get_coach_dashboard():
    return {
        "active_athletes": 12,
        "avg_readiness": 84,
        "sessions_this_week": 38,
        "injury_alerts": 1,
        "team": [
            {"name": "Alex Rivera", "sport": "Sprint", "status": "active", "readiness": 92},
            {"name": "Mia Chen", "sport": "Hurdles", "status": "active", "readiness": 87},
            {"name": "Jordan Taylor", "sport": "Long Jump", "status": "injured", "readiness": 34},
            {"name": "Sam Okafor", "sport": "Sprint", "status": "active", "readiness": 95},
            {"name": "Lucia Fernandez", "sport": "Pole Vault", "status": "resting", "readiness": 68},
        ],
    }


@router.get("/drills")
def get_drills():
    return {
        "drills": [
            {
                "id": "1",
                "name": "Ladder Speed Drill",
                "sport": "General",
                "category": "Speed & Agility",
                "difficulty": "intermediate",
                "duration": 15,
                "description": "High-frequency foot patterns through an agility ladder.",
                "objectives": ["Improve foot speed", "Enhance coordination", "Develop rhythm"],
            },
            {
                "id": "2",
                "name": "Reactive Sprint Starts",
                "sport": "Track & Field",
                "category": "Speed",
                "difficulty": "advanced",
                "duration": 20,
                "description": "Explosive starts with varied auditory and visual cues.",
                "objectives": ["Reduce reaction time", "Improve block clearance", "First-step explosiveness"],
            },
            {
                "id": "3",
                "name": "Plyometric Box Jumps",
                "sport": "General",
                "category": "Power",
                "difficulty": "advanced",
                "duration": 20,
                "description": "Progressive box jump heights focusing on landing mechanics.",
                "objectives": ["Vertical power", "Landing mechanics", "Stretch-shortening cycle"],
            },
        ]
    }
