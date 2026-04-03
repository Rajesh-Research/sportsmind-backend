from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.db.database import get_db
from app.db.models import User
from app.middleware.auth import verify_password, get_password_hash, create_access_token
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "athlete"
    primary_sport: str = "General"

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    primary_sport: str

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        hashed_password=hashed_pwd,
        full_name=user.full_name,
        role=user.role,
        primary_sport=user.primary_sport
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email, "role": new_user.role, "sport": new_user.primary_sport})
    return {"access_token": access_token, "token_type": "bearer", "role": new_user.role, "primary_sport": new_user.primary_sport}

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role, "sport": user.primary_sport})
    return {"access_token": access_token, "token_type": "bearer", "role": user.role, "primary_sport": user.primary_sport}

class PasswordReset(BaseModel):
    email: str

@router.post("/forgot-password")
def forgot_password(reset_req: PasswordReset, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == reset_req.email).first()
    if not user:
        # Prevent email enumeration by returning a success-like message anyway
        return {"message": "If that email is registered, a recovery link has been sent."}
    
    # In a real application, you would generate a secure token here, save it to the DB with an expiration,
    # and send an email via an SMTP service (e.g. SendGrid, Mailgun) or Firebase Auth via SMTP.
    # For now, we simulate an email sent response.
    return {"message": "If that email is registered, a recovery link has been sent."}
