import app from './app.js';  // Agora usa import em vez de require
import connectDB from './config/db.js';  // Troque também o require por import

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port [${PORT}]`));
