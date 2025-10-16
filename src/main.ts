import app, { PORT } from './config/app.config';

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', err => {
    console.error('Error starting server:', err);
})