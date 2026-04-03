from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import athlete, coach, ai, auth
from app.db.database import engine, Base

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SportMind AI",
    description="AI-powered sports performance intelligence platform",
    version="1.0.0",
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(athlete.router, prefix="/api/athlete", tags=["athlete"])
app.include_router(coach.router, prefix="/api/coach", tags=["coach"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

@app.get("/")
def read_root():
    return {"message": "Welcome to SportMind AI API", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
