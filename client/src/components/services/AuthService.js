// AuthService.js

// Kullanıcı adını local storage'dan al
export const getCurrentUsername = () => {
    const token = localStorage.getItem('accessToken'); // Örneğin localStorage'da saklanan token
    if (!token) {
      return null;
    }
  
    // Token'i decode ederek kullanıcı bilgilerini alabilirsiniz (örneğin JWT)
    const decodedToken = decodeToken(token);
    return decodedToken.username; // Örneğin token içinde username alanı varsa
  };
  