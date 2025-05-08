const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const tenderRoutes = require('./routes/tender.routes');
const masterRoutes = require('./routes/master.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/master', masterRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});