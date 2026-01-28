# Backend V1 - Certificate Generation API

## Setup

```bash
cd backend_v1
uv sync
uv run fastapi dev
```

## Endpoints

### Payment Endpoints
- `POST /api/payment` - Create payment transaction
- `POST /api/verify-payment` - Verify payment

### Document Endpoints
- `POST /api/generate-certificate` - Generate certificate PDF
- `POST /api/generate-testimonial` - Generate testimonial PDF
- `POST /api/verify-ref` - Verify reference number

## Required Files

Copy from previous backend:
- `public/logo/just_logo.png`
- `public/signature/kamrul_signature.png`
