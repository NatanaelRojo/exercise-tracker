import dotenv from 'dotenv';
import express from 'express';
import { setupApp } from './config/server/index.js';
import { User } from './database/models/user.js';
import { Exercise } from './database/models/exercise.js';

const app = express()

await setupApp(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.create({ username });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const newExercise = await Exercise.create({
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });
    user.exercises.push(newExercise._id);
    await user.save();
    const exerciseResponse = {
      user,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date.toDateString(),
    }
    res.send(exerciseResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const user = await User.findById(_id).populate('exercises');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const exercises = await Exercise.find({ _id: { $in: user.exercises } });
    if (!exercises) {
      return res.status(404).send({ error: 'Exercises not found' });
    }

    const filteredExercises = exercises.filter((exercise) => {
      if (from && new Date(exercise.date) < new Date(from)) {
        return false;
      }
      if (to && new Date(exercise.date) > new Date(to)) {
        return false;
      }
      return true;
    });
    const exerciseResponse = filteredExercises.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
      };
    });
    res.send({
      _id: user._id,
      username: user.username,
      count: exerciseResponse.slice(0, limit).length,
      log: exerciseResponse.slice(0, limit),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
