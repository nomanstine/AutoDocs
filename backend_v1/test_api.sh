#!/bin/bash

echo "=== Testing Backend API with JSON ==="
echo ""

# 1. Register
echo "1. Testing Register..."
curl -s -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name": "API Test User", "email": "apitest@example.com", "password": "test123"}' | python3 -m json.tool
echo ""

# 2. Login
echo "2. Testing Login (JSON)..."
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}')
echo $LOGIN_RESPONSE | python3 -m json.tool
echo ""

ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['refresh_token'])")

# 3. Get Current User
echo "3. Testing GET /auth/me..."
curl -s -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool
echo ""

# 4. Get User Profile
echo "4. Testing GET /users/me..."
curl -s -X GET "http://localhost:8000/api/users/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool
echo ""

# 5. Refresh Token
echo "5. Testing Refresh Token..."
curl -s -X POST "http://localhost:8000/api/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}" | python3 -m json.tool
echo ""

echo "=== All Tests Complete ==="
