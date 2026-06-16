import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Kita kunci langsung nilainya ke port Docker PostgreSQL lokal Anda
DATABASE_URL = "postgresql://postgres:postgres@127.0.0.1:5434/kerjole_db"

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
