const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const registerApi = async (data) => {
  const response = await fetch(`${baseUrl}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new Error(body.message || " Something went wrong");
    error.status = response.status;
    error.response = body;
    throw error;
  }

  return body;
};

export const loginApi = async (data) => {
  const response = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    const error = new Error(body.message || "Something went wrong");
    error.status = response.status;
    error.response = body;
    throw error;
  }

  return body;
};

export const addRoom = async (data) => {
  const response = await fetch(`${baseUrl}/api/rooms/addRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new Error(response.message || "something went wrong");
    error.status = response.status;
    error.response = body;
    throw error;
  }

  return body;
};

export const authenticateUser = async () => {
  const response = await fetch(`${baseUrl}/api/users/auth`, {
    credentials: "include",
  });
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(response.message || "something went wrong");
    error.status = response.status;
    error.response = body;
    throw error;
  }

  return body;
};

export const logOutUser = async () => {
  const response = await fetch(`${baseUrl}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  const body = await response.json();
  return body;
};
