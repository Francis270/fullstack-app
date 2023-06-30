import app from './app';
import { env } from './utils/config';


app.listen(env.PORT, () => {
    console.log(`Listening on http://localhost:${env.PORT}`);
});