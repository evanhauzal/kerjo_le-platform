import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Menggunakan URL Pooler Supabase Sydney dengan driver psycopg2 yang sudah terinstal di laptopmu
DATABASE_URL = "postgresql+psycopg2://postgres:XnJPb4kGqIcy1G3B@db.ikglmnfjszgufesxafag.supabase.co:5432/postgres"
SECRET_KEY = "kerjole-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()