from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import SQLModel, Session, select
from models import User
from db import get_session
from auth import get_current_active_user, get_password_hash

router = APIRouter()


class UserResponse(SQLModel):
    id: int
    name: str
    email: str


class UserUpdate(SQLModel):
    name: str | None = None
    email: str | None = None
    password: str | None = None


@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user information"""
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_user_me(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Update current user information"""
    # Check if email is being changed to an existing email
    if user_update.email and user_update.email != current_user.email:
        statement = select(User).where(User.email == user_update.email)
        existing_user = session.exec(statement).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        current_user.email = user_update.email
    
    # Update name if provided
    if user_update.name:
        current_user.name = user_update.name
    
    # Update password if provided
    if user_update.password:
        current_user.password = get_password_hash(user_update.password)
    
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    
    return current_user


@router.get("/all", response_model=list[UserResponse])
async def get_all_users(
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get all users (admin feature)"""
    statement = select(User)
    users = session.exec(statement).all()
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id(
    user_id: int,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get user by ID"""
    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_me(
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Delete current user account"""
    session.delete(current_user)
    session.commit()
    return None

