import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 SERVIDOR CORRIENDO EN EL PUERTO: ${PORT}`);
  console.log(`🔗 Testealo en: http://localhost:${PORT}/ping`);
  console.log('--------------------------------------------------');
});