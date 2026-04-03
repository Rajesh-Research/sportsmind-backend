from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default="athlete") # athlete, coach, management
    primary_sport = Column(String, default="General")
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    athlete_profile = relationship("AthleteProfile", back_populates="user", uselist=False)
    checkins = relationship("CheckIn", back_populates="user")


class AthleteProfile(Base):
    __tablename__ = "athlete_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    sport = Column(String)
    position = Column(String)
    age = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    location = Column(String)
    bio = Column(String)
    goals = Column(String)
    
    user = relationship("User", back_populates="athlete_profile")


class CheckIn(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, default=datetime.utcnow)
    sleep_hours = Column(Float)
    sleep_quality = Column(Integer)
    energy_level = Column(Integer)
    soreness = Column(Integer)
    mood = Column(Integer)
    notes = Column(String)

    user = relationship("User", back_populates="checkins")
