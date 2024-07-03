const API_URL = import.meta.env.VITE_API_URL;

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    // Handle error
    return null;
  }

  const data = await response.json();
  return data;
};
