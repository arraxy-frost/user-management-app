import app from "./app";
import * as db from './config/sequelize';

const PORT = process.env.PORT || 3000;

db.initDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});