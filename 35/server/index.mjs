import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Task from './tasks.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/todo-tasks';
if (dbUrl.startsWith('"')) {
    dbUrl = dbUrl.slice(1, -1);
}

async function connectDB() {
    try {
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB:', dbUrl);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

connectDB();

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.json());

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.post('/tasks', async (req, res) => {
    console.log('POST /tasks, body:', req.body);
    try {
        const { text, completed } = req.body;
        if (!text) {
            return res.status(400).json({ error: "text is required" });
        }

        const newTask = new Task({ text, completed });
        const savedTask = await newTask.save();

        console.log('Task added:', savedTask);
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error adding a task:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    console.log('DELETE /tasks/:id', req.params.id);
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log('Task deleted:', deletedTask);
        res.json({ message: 'Deleted', deletedTask });
    } catch (error) {
        console.error('Error deleting a task:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    console.log('PUT /tasks/:id', req.params.id, req.body);
    try {
        const { text, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { text, completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        console.log('Task updated:', updatedTask);
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating a task:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

const port = process.env.PORT || 4444;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
});