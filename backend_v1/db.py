from sqlmodel import SQLModel, create_engine, Session, select
from models import User, AcademicRecord, Document, Transaction
from datetime import datetime

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=False)

def init_db():
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Dependency to get database session"""
    with Session(engine) as session:
        yield session

def seed_data():
    """Seed initial data for testing"""
    with Session(engine) as session:
        # Check if data already exists
        existing_user = session.exec(select(User)).first()
        if existing_user:
            print("Database already seeded")
            return
        
        # Create a test user
        user = User(
            name="John Doe",
            email="john.doe@example.com",
            password="hashed_password_here"
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        
        # Create academic record
        academic_record = AcademicRecord(
            student_id="190101",
            reg_no="2019000001",
            session="2019-2020",
            department="Computer Science and Engineering",
            father_name="Michael Doe",
            mother_name="Sarah Doe",
            degree_years=4,
            degree_months=0,
            degree_type="Bachelor(Engg.)",
            graduation_year=2024,
            cgpa=3.75,
            courses=[
                {"name": "Data Structures", "grade": "A+"},
                {"name": "Algorithms", "grade": "A"},
                {"name": "Database Systems", "grade": "A+"}
            ],
            user_id=user.id
        )
        session.add(academic_record)
        
        # Create a document
        document = Document(
            title="Academic Certificate",
            qr_code="sample_qr_code",
            user_id=user.id
        )
        session.add(document)
        session.commit()
        session.refresh(document)
        
        # Create transactions
        transaction1 = Transaction(
            transaction_id="TXN202601281000001",
            status="completed",
            amount=500.0,
            user_id=user.id,
            document_id=document.id
        )
        
        transaction2 = Transaction(
            transaction_id="TXN202601281000002",
            status="pending",
            amount=300.0,
            user_id=user.id,
            document_id=document.id
        )
        
        session.add(transaction1)
        session.add(transaction2)
        session.commit()
        
        print("Database seeded successfully")
