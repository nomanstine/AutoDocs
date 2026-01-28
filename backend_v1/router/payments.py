from db import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import SQLModel, Session, select
from models import Transaction
from datetime import datetime

router = APIRouter()


class PaymentRequest(SQLModel):
    user_id: int
    document_id: int
    amount: float


class PaymentVerifyRequest(SQLModel):
    transaction_id: str


@router.post("/payment", status_code=status.HTTP_201_CREATED)
async def create_payment(
    payment: PaymentRequest,
    session: Session = Depends(get_session)
):
    """
    Create a new payment transaction
    """
    # Generate a unique transaction ID
    transaction_id = f"TXN{datetime.now().strftime('%Y%m%d%H%M%S')}{payment.user_id}"
    
    # Create new transaction
    new_transaction = Transaction(
        transaction_id=transaction_id,
        status="pending",
        amount=payment.amount,
        user_id=payment.user_id,
        document_id=payment.document_id
    )
    
    session.add(new_transaction)
    session.commit()
    session.refresh(new_transaction)
    
    return {
        "message": "Payment initiated successfully",
        "transaction_id": transaction_id,
        "status": "pending",
        "amount": payment.amount
    }

@router.post("/verify-payment")
async def verify_payment(
    verify_request: PaymentVerifyRequest,
    session: Session = Depends(get_session)
):
    # Find the transaction
    statement = select(Transaction).where(Transaction.transaction_id == verify_request.transaction_id)
    transaction = session.exec(statement).first()
    
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found"
        )
    
    # Update transaction status to completed
    transaction.status = "completed"
    transaction.updated_at = datetime.now()
    
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    
    return {
        "message": "Payment verified successfully",
        "transaction_id": transaction.transaction_id,
        "amount": transaction.amount,
        "status": transaction.status,
    }
