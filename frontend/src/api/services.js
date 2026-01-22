import { api } from "./client";

// Auth Services
export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (email, full_name, password) => {
    const response = await api.post("/auth/register", {
      email,
      full_name,
      password,
    });
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post("/auth/refresh", { refresh_token: refreshToken });
    return response.data;
  },
};

// User Services
export const userService = {
  getProfile: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put("/users/me", data);
    return response.data;
  },

  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/users/me/password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },

  getAllUsers: async (skip = 0, limit = 100) => {
    const response = await api.get(`/users/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};

// Certificate Services
export const certificateService = {
  processPayment: async (paymentData) => {
    const response = await api.post("/certificates/payment", paymentData);
    return response.data;
  },

  generateCertificate: async (serviceId, transactionId) => {
    const response = await api.post("/certificates/generate", {
      service_id: serviceId,
      transaction_id: transactionId,
    });
    return response.data;
  },

  verifyCertificate: async (referenceNumber) => {
    const response = await api.get(`/certificates/verify/${referenceNumber}`);
    return response.data;
  },

  getMyDocuments: async () => {
    const response = await api.get("/certificates/my-documents");
    return response.data;
  },

  getDocumentById: async (documentId) => {
    const response = await api.get(`/certificates/document/${documentId}`);
    return response.data;
  },

  getServices: async () => {
    const response = await api.get("/certificates/services");
    return response.data;
  },

  revokeDocument: async (documentId) => {
    const response = await api.delete(`/certificates/document/${documentId}`);
    return response.data;
  },
};
