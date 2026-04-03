from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.db.database import get_db
from app.db.models import User, AthleteProfile, CheckIn
from app.middleware.auth import get_current_user

router = APIRouter()

@router.get("/dashboard")
def get_athlete_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # In a real app, calculate these metrics from the checkins and physical data
    return {
        "performance_index": 87.4,
        "training_load": 742,
        "sleep_score": 8.2,
        "recovery_rate": 92,
        "readiness_score": 84,
        "weekly_metrics": [
            {"day": "Mon", "value": 82},
            {"day": "Tue", "value": 91},
            {"day": "Wed", "value": 75},
            {"day": "Thu", "value": 88},
            {"day": "Fri", "value": 95},
            {"day": "Sat", "value": 70},
            {"day": "Sun", "value": 60},
        ],
    }

@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(AthleteProfile).filter(AthleteProfile.user_id == current_user.id).first()
    if not profile:
        return {"name": current_user.full_name, "message": "Profile not created yet"}
    return profile

@router.put("/profile")
def update_profile(data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(AthleteProfile).filter(AthleteProfile.user_id == current_user.id).first()
    if not profile:
        profile = AthleteProfile(user_id=current_user.id, **data)
        db.add(profile)
    else:
        for key, value in data.items():
            setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return {"message": "Profile updated", "profile": profile}

@router.post("/checkin")
def submit_checkin(
    data: dict,
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    entry = CheckIn(
        user_id=current_user.id,
        sleep_hours=data.get("sleep_hours", 7.0),
        sleep_quality=data.get("sleep_quality", 3),
        energy_level=data.get("energy_level", 3),
        soreness=data.get("soreness", 3),
        mood=data.get("mood", 3),
        notes=data.get("notes", "")
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"message": "Check-in recorded", "id": entry.id}

@router.get("/checkins")
def get_checkins(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    checkins = db.query(CheckIn).filter(CheckIn.user_id == current_user.id).order_by(CheckIn.date.desc()).all()
    return {"checkins": checkins}
