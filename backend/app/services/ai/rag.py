import os
import chromadb
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# Configure OpenAI
api_key = os.getenv("OPENAI_API_KEY")
client = None
if api_key and api_key != "your_openai_api_key_here":
    client = OpenAI(api_key=api_key)

# Initialize ChromaDB client for RAG
chroma_client = chromadb.PersistentClient(path="./chroma_db")


def get_or_create_collection(collection_name: str = "sports_knowledge"):
    """Get or create a ChromaDB collection for sports knowledge."""
    return chroma_client.get_or_create_collection(name=collection_name)


def add_document_to_knowledge_base(text: str, document_id: str, metadata: dict = None):
    """Add a new piece of coaching/sports knowledge into the RAG."""
    collection = get_or_create_collection()
    collection.add(
        documents=[text],
        metadatas=[metadata or {"source": "unknown"}],
        ids=[document_id],
    )
    return {"message": "Knowledge added successfully", "id": document_id}


def search_knowledge_base(query: str, n_results: int = 3):
    """Query the knowledge base using semantic search."""
    collection = get_or_create_collection()
    results = collection.query(query_texts=[query], n_results=n_results)
    documents = results.get("documents", [[]])[0]
    return documents


def answer_with_rag(query: str) -> str:
    """
    RAG pipeline:
    1. Retrieve relevant knowledge related to the query.
    2. Feed knowledge + query to GPT to generate the answer.
    """
    retrieved_docs = search_knowledge_base(query)
    context = "\n\n".join(retrieved_docs)

    system_prompt = """You are an elite sports performance coach and analyst with deep expertise in:
- Biomechanics and movement science
- Periodization and training programming
- Sports nutrition and recovery
- Injury prevention and rehabilitation
- Team strategy and tactics
- Performance analytics and data interpretation

Answer the user's question using the provided context when relevant. 
If the context doesn't have sufficient information, use your expert sports knowledge.
Be specific, actionable, and data-driven in your recommendations."""

    user_message = f"""Context from knowledge base:
{context if context else "(No relevant context found — use expert knowledge)"}

Question: {query}"""

    try:
        if not client:
            return "OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file."

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            temperature=0.7,
            max_tokens=2000,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating GPT response: {str(e)}"
