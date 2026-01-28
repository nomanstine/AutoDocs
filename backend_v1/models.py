from sqlmodel import SQLModel, Field, Relationship, JSON, Column
from datetime import datetime
from typing import Optional

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    documents: list["Document"] = Relationship(back_populates="user")
    transactions: list["Transaction"] = Relationship(back_populates="user")
    academic_record: Optional["AcademicRecord"] = Relationship(back_populates="user")

class AcademicRecord(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    student_id: str
    reg_no: str
    session: str
    department: str = "Computer Science and Engineering"
    father_name: str = ""
    mother_name: str = ""
    degree_years: int = 4
    degree_months: int = 0
    degree_type: str = "Bachelor(Engg.)"
    graduation_year: int = 2025
    cgpa: float
    courses: list = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    user_id: int = Field(foreign_key="user.id", unique=True)
    user: User = Relationship(back_populates="academic_record")

class Document(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    qr_code: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    user_id: int = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="documents")

    transaction: "Transaction" = Relationship(back_populates="document")

class Transaction(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    transaction_id: str
    status: str
    amount: float
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    document_id: int = Field(foreign_key="document.id")
    document: Document = Relationship(back_populates="transaction")

    user_id: int = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="transactions")
