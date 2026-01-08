import app from './app.js';
import { config } from './config.js';
const LOCAL_PORT = config.port || 3000;
app.listen(LOCAL_PORT, () => {
    console.log(`Server is running on http://localhost:${LOCAL_PORT}`);
    console.log(`JWT_SECRET is set: ${!!config.jwtSecret}`);
});
//# sourceMappingURL=server.js.map