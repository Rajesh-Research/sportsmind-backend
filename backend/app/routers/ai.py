from fastapi import APIRouter, File, UploadFile, Depends
from app.services.ai import rag, video_coach
from app.db.models import User
from app.middleware.auth import get_current_user
import os
import asyncio

router = APIRouter()

@router.post("/rag/ask")
def ask_rag_assistant(query: str):
    # Depending on your architecture, you might also require auth here:
    # def ask_rag_assistant(query: str, current_user: User = Depends(get_current_user)):
    response = rag.answer_with_rag(query)
    return {"response": response}

@router.post("/rag/add_knowledge")
def add_knowledge(text: str, document_id: str):
    response = rag.add_document_to_knowledge_base(text, document_id)
    return {"response": response}

import io
from pypdf import PdfReader

@router.post("/rag/upload_document")
async def upload_document(file: UploadFile = File(...)):
    """
    Ingests physical documents or Research Papers into the RAG vector space
    to allow the GPT model to be continuously trained/reinforced.
    """
    content = await file.read()
    
    text_content = ""
    # Parse PDF research papers
    if file.filename.lower().endswith(".pdf"):
        pdf = PdfReader(io.BytesIO(content))
        for page in pdf.pages:
            extr = page.extract_text()
            if extr:
                text_content += extr + "\n"
    else:
        # standard text/json decoding
        text_content = content.decode('utf-8', errors='ignore')
    
    # Store directly into the RAG to act as continuous reinforcement memory
    doc_id = f"upload_{file.filename}"
    response = rag.add_document_to_knowledge_base(text_content, doc_id)
    return {"message": "Document (Research Paper/Dataset) successfully ingested into Knowledge Base for GPT reinforcement", "details": response}

@router.post("/video/analyze")
async def analyze_video(prompt: str, file: UploadFile = File(...)):
    # Offload I/O and processing appropriately
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        buffer.write(await file.read())
        
    try:
        # For production, this should ideally be sent to a Celery/Redis worker queue
        response = await asyncio.to_thread(video_coach.analyze_sports_video, temp_file_path, prompt)
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            
    return {"analysis": response}
