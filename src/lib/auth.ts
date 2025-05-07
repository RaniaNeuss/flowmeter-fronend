export async function checkLoginStatus() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-status`, {
      credentials: 'include',
    });
  
    if (!res.ok) return null;
    return res.json();
  }
  
  export async function logout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
  