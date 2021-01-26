import app from './app';
import env from './providers/config/ts/environment';

const PORT = process.env.PORT || env.PORT;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});