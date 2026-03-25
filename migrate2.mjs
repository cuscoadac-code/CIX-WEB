import fs from 'fs';

let content = fs.readFileSync('./src/App.tsx', 'utf8');

// Replace the function definition
content = content.replace(
`const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({ provider: 'google' });
};`,
`const signInWithEmail = async () => {
  const email = window.prompt("Ingresa tu correo electrónico para iniciar sesión:");
  if (!email) return;
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    alert("Error al enviar el correo: " + error.message);
  } else {
    alert("¡Revisa tu correo! Te hemos enviado un enlace mágico para entrar seguro.");
  }
};`
);

// Replace function calls
content = content.replaceAll('signInWithGoogle', 'signInWithEmail');

fs.writeFileSync('./src/App.tsx', content, 'utf8');
console.log("Migration to Email Login complete!");
