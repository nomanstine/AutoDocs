from db import get_session
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import Response
from fastapi.templating import Jinja2Templates
from sqlmodel import SQLModel, Session, select
from models import Transaction, Document, User
from datetime import datetime
import qrcode
from io import BytesIO
import base64
from weasyprint import HTML
from pathlib import Path
from auth import get_current_active_user

router = APIRouter()
templates = Jinja2Templates(directory="public/templates")

# Get the base directory for static files
BASE_DIR = Path(__file__).parent.parent / "public"


class CertificateRequest(SQLModel):
    transaction_id: str
    student_name: str
    student_id: str
    reg_no: str
    session: str
    department: str = "Computer Science and Engineering"
    works: str = "Software Development and System Administration"
    courses: list[dict] = []


class TestimonialRequest(SQLModel):
    transaction_id: str
    student_name: str
    father_name: str
    mother_name: str
    roll_no: str
    reg_no: str
    session: str
    pronoun: str = "He"
    degree_years: int = 4
    degree_months: int = 0
    degree_type: str = "Bachelor(Engg.)"
    graduation_year: int
    cgpa: float
    prepared_by: str = "Office Staff"
    checked_by: str = "Academic Coordinator"


class VerifyRefRequest(SQLModel):
    ref_no: str


@router.post("/generate-certificate")
async def generate_certificate(
    request: Request,
    cert_data: CertificateRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    """
    Generate certificate PDF with provided data and return it
    """
    # Verify transaction exists and is completed
    statement = select(Transaction).where(Transaction.transaction_id == cert_data.transaction_id)
    transaction = session.exec(statement).first()
    
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    
    if transaction.status != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment not verified. Please complete payment first."
        )
    
    # Generate QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=2)
    qr_data = f"http://localhost:5173/verify?ref={cert_data.transaction_id}"
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    qr_img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    qr_img.save(buffer, format='PNG')
    qr_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    # Load PNG logo directly
    logo_path = BASE_DIR / "logo" / "just_logo.png"
    with open(logo_path, "rb") as f:
        logo_base64 = base64.b64encode(f.read()).decode()
    
    # Load and encode signature image
    signature_path = BASE_DIR / "signature" / "kamrul_signature.png"
    with open(signature_path, "rb") as f:
        signature_base64 = base64.b64encode(f.read()).decode()
    
    # Prepare template context
    context = {
        "request": request,
        "date": datetime.now().strftime("%d/%m/%Y"),
        "ref_no": cert_data.transaction_id,
        "student_name": cert_data.student_name,
        "student_id": cert_data.student_id,
        "reg_no": cert_data.reg_no,
        "session": cert_data.session,
        "department": cert_data.department,
        "works": cert_data.works,
        "courses": cert_data.courses if cert_data.courses else [],
        "qr_code": f"data:image/png;base64,{qr_base64}",
        "signature_path": f"data:image/png;base64,{signature_base64}",
        "logo_path": f"data:image/png;base64,{logo_base64}"
    }
    
    # Render HTML template
    html_content = templates.get_template("certificate.html").render(context)
    
    # Convert HTML to PDF
    pdf_buffer = BytesIO()
    HTML(string=html_content, base_url=str(request.base_url)).write_pdf(pdf_buffer)
    pdf_buffer.seek(0)
    
    # Return PDF as response
    return Response(
        content=pdf_buffer.getvalue(),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=certificate_{cert_data.transaction_id}.pdf"
        }
    )


@router.post("/generate-testimonial")
async def generate_testimonial(
    request: Request,
    test_data: TestimonialRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    """
    Generate testimonial PDF with provided data and return it
    """
    # Verify transaction exists and is completed
    statement = select(Transaction).where(Transaction.transaction_id == test_data.transaction_id)
    transaction = session.exec(statement).first()
    
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    
    if transaction.status != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment not verified. Please complete payment first."
        )
    
    # Generate QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=2)
    qr_data = f"http://localhost:5173/verify?ref={test_data.transaction_id}"
    qr.add_data(qr_data)
    qr.make(fit=True)
    
    qr_img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    qr_img.save(buffer, format='PNG')
    qr_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    # Load PNG logo directly
    logo_path = BASE_DIR / "logo" / "just_logo.png"
    with open(logo_path, "rb") as f:
        logo_base64 = base64.b64encode(f.read()).decode()
    
    # Load and encode signature image
    signature_path = BASE_DIR / "signature" / "kamrul_signature.png"
    with open(signature_path, "rb") as f:
        signature_base64 = base64.b64encode(f.read()).decode()
    
    # Prepare template context
    context = {
        "request": request,
        "date": datetime.now().strftime("%d/%m/%Y"),
        "serial_no": test_data.transaction_id,
        "student_name": test_data.student_name,
        "father_name": test_data.father_name,
        "mother_name": test_data.mother_name,
        "roll_no": test_data.roll_no,
        "reg_no": test_data.reg_no,
        "session": test_data.session,
        "pronoun": test_data.pronoun,
        "degree_years": test_data.degree_years,
        "degree_months": test_data.degree_months,
        "degree_type": test_data.degree_type,
        "graduation_year": test_data.graduation_year,
        "cgpa": test_data.cgpa,
        "prepared_by": test_data.prepared_by,
        "checked_by": test_data.checked_by,
        "qr_code": f"data:image/png;base64,{qr_base64}",
        "signature_path": f"data:image/png;base64,{signature_base64}",
        "logo_path": f"data:image/png;base64,{logo_base64}"
    }
    
    # Render HTML template
    html_content = templates.get_template("testimonial.html").render(context)
    
    # Convert HTML to PDF (landscape)
    pdf_buffer = BytesIO()
    HTML(string=html_content, base_url=str(request.base_url)).write_pdf(pdf_buffer)
    pdf_buffer.seek(0)
    
    # Return PDF as response
    return Response(
        content=pdf_buffer.getvalue(),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=testimonial_{test_data.transaction_id}.pdf"
        }
    )


@router.post("/verify-ref")
async def verify_reference(
    verify_ref: VerifyRefRequest,
    session: Session = Depends(get_session)
):
    """
    Verify if a reference number (transaction ID) exists and is valid
    """
    # Find the transaction
    statement = select(Transaction).where(Transaction.transaction_id == verify_ref.ref_no)
    transaction = session.exec(statement).first()
    
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reference number not found"
        )
    
    # Get user and document information
    user_statement = select(User).where(User.id == transaction.user_id)
    user = session.exec(user_statement).first()
    
    document_statement = select(Document).where(Document.id == transaction.document_id)
    document = session.exec(document_statement).first()
    
    return {
        "valid": True,
        "ref_no": transaction.transaction_id,
        "status": transaction.status,
        "amount": transaction.amount,
        "issue_date": transaction.created_at.strftime("%d/%m/%Y"),
        "student_name": user.name if user else None,
        "student_email": user.email if user else None,
        "document_title": document.title if document else None,
        "message": "Certificate/Testimonial is valid and authentic"
    }
