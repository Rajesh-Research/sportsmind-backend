from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class AthleteStatus(str, Enum):
    active = "active"
    injured = "injured"
    resting = "resting"


class CheckInRequest(BaseModel):
    sleep_hours: float = Field(..., ge=0, le=24)
    sleep_quality: int = Field(..., ge=1, le=5)
    energy_level: int = Field(..., ge=1, le=5)
    soreness: int = Field(..., ge=1, le=5)
    mood: int = Field(..., ge=1, le=5)
    notes: Optional[str] = None


class CheckInResponse(BaseModel):
    id: str
    message: str


class AthleteProfile(BaseModel):
    name: str
    sport: str
    position: Optional[str] = None
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    goals: Optional[str] = None


class PerformanceMetric(BaseModel):
    label: str
    value: float
    max: float = 100
    unit: Optional[str] = None
    trend: Optional[str] = "stable"
    change: Optional[float] = 0


class RAGQueryRequest(BaseModel):
    query: str
    n_results: int = 3


class RAGResponse(BaseModel):
    response: str


class AddKnowledgeRequest(BaseModel):
    text: str
    document_id: str
    metadata: Optional[dict] = None


class VideoAnalysisResponse(BaseModel):
    analysis: str


class DashboardData(BaseModel):
    performance_index: float
    training_load: int
    sleep_score: float
    recovery_rate: float
    readiness_score: int


class DrillDifficulty(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"
    elite = "elite"


class Drill(BaseModel):
    id: str
    name: str
    sport: str
    category: str
    difficulty: DrillDifficulty
    duration: int
    description: str
    objectives: List[str]


class ScoutingStatus(str, Enum):
    watching = "watching"
    contacted = "contacted"
    trial = "trial"
    signed = "signed"


class ScoutingReport(BaseModel):
    id: str
    athlete_name: str
    sport: str
    rating: float = Field(..., ge=0, le=10)
    strengths: List[str]
    age: int
    location: Optional[str] = None
    status: ScoutingStatus
