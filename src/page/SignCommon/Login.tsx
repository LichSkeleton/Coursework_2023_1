import AuthServise from "../../components/ui/AuthServise";

export const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.accessToken;

        // Save the token in session storage
        AuthServise.login(jwtToken);

        if(AuthServise.getJwtTokenRole(jwtToken)) {window.location.href = '/admin';}
        else {window.location.href = '/dashboard';}
      } else {
        alert('Пошта або пароль введений не вірно.');
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };