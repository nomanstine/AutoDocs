from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import init_db, seed_data
from router import payments, documents, auth

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(payments.router, prefix="/api", tags=["payments"])
app.include_router(documents.router, prefix="/api", tags=["documents"])

@app.on_event("startup")
def on_startup():
    init_db()
    seed_data()

@app.get("/")
async def read_root():
    return {"msg": "Hello, World!"}
