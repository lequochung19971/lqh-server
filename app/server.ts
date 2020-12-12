import app from './app';
import env from './environment';

const PORT = process.env.PORT || env.port;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});