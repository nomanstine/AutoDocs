# Refresh Token Implementation

## Overview
The system now supports JWT refresh tokens for secure, long-lived authentication sessions.

## Token Types

### Access Token
- **Lifetime**: 30 minutes
- **Purpose**: Authenticate API requests
- **Secret**: `SECRET_KEY`
- **Type field**: `"access"`

### Refresh Token
- **Lifetime**: 7 days
- **Purpose**: Obtain new access tokens
- **Secret**: `REFRESH_SECRET_KEY` (separate from access token secret)
- **Type field**: `"refresh"`

## API Endpoints

### 1. Login - POST /api/login
Get both access and refresh tokens.

```bash
curl -X POST "http://localhost:8000/api/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=yourpassword"
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

### 2. Refresh - POST /api/refresh
Use refresh token to get new access and refresh tokens.

```bash
curl -X POST "http://localhost:8000/api/refresh" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "your_refresh_token_here"}'
```

**Response:**
```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

### 3. Protected Endpoints
Use access token in Authorization header:

```bash
curl -X GET "http://localhost:8000/api/me" \
  -H "Authorization: Bearer your_access_token_here"
```

## Implementation Details

### Backend Changes

1. **auth.py**:
   - Added `REFRESH_SECRET_KEY` and `REFRESH_TOKEN_EXPIRE_DAYS` constants
   - Created `create_refresh_token()` function
   - Created `verify_refresh_token()` function
   - Added `"type"` field to JWT payloads for token type validation

2. **router/auth.py**:
   - Updated `Token` model to include `refresh_token` field
   - Modified `/login` endpoint to return both tokens
   - Added `/refresh` endpoint to exchange refresh token for new tokens
   - Added `RefreshTokenRequest` model for refresh endpoint

## Security Features

1. **Separate Secrets**: Access and refresh tokens use different secret keys
2. **Token Type Validation**: Each token contains a `"type"` field to prevent misuse
3. **Automatic Rotation**: Refresh endpoint issues both new access AND refresh tokens
4. **Short Access Token Lifetime**: 30 minutes reduces exposure if compromised
5. **Long Refresh Token Lifetime**: 7 days for better UX while maintaining security

## Frontend Integration

Store tokens securely:
```javascript
// After login
const { access_token, refresh_token } = await loginAPI();
localStorage.setItem('access_token', access_token);
localStorage.setItem('refresh_token', refresh_token);

// Axios interceptor for automatic token refresh
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refresh_token = localStorage.getItem('refresh_token');
      const { access_token, refresh_token: new_refresh } = await refreshAPI(refresh_token);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', new_refresh);
      // Retry original request
      error.config.headers['Authorization'] = `Bearer ${access_token}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
```

## Testing

```bash
# 1. Login
RESPONSE=$(curl -s -X POST "http://localhost:8000/api/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=test123")

ACCESS_TOKEN=$(echo $RESPONSE | jq -r '.access_token')
REFRESH_TOKEN=$(echo $RESPONSE | jq -r '.refresh_token')

# 2. Use access token
curl -X GET "http://localhost:8000/api/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 3. Refresh tokens
NEW_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}")

NEW_ACCESS_TOKEN=$(echo $NEW_RESPONSE | jq -r '.access_token')

# 4. Use new access token
curl -X GET "http://localhost:8000/api/me" \
  -H "Authorization: Bearer $NEW_ACCESS_TOKEN"
```

## Production Considerations

1. **Environment Variables**: Move secrets to environment variables
2. **Secure Storage**: Never expose refresh tokens in logs or URLs
3. **HTTPS Only**: Always use HTTPS in production
4. **Token Blacklisting**: Consider implementing token revocation for logout
5. **Refresh Token Rotation**: Current implementation rotates refresh tokens on each use (best practice)
