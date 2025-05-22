const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');

// POST /summarize - Summarize todos using local Mistral model via Ollama
router.post('/', async (req, res) => {
  try {
    console.log('Received request to /summarize');

    // Fetch TODOs from the database
    const result = await pool.query('SELECT text, completed FROM todos');
    const todos = result.rows;

    if (!todos.length) {
      console.log('No TODOs found in the database');
      return res.status(400).json({ error: 'No TODOs found to summarize' });
    }

    console.log('Fetched TODOs:', todos);

    // Create prompt for Mistral
    const prompt = `
      You are an assistant tasked with summarizing a TODO list.
      Here is the list of tasks with their statuses:
      ${todos
        .map(
          (todo, index) =>
            `${index + 1}. ${todo.text} - ${todo.completed ? 'Completed' : 'Pending'}`
        )
        .join('\n')}

      Please provide a concise summary of the completed tasks and the pending tasks.
    `;

    console.log('Generated prompt for Mistral:', prompt);

    // Call local Ollama Mistral model
    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: prompt,
      stream: false // Set to true if you want to handle streamed response
    });

    const summary = ollamaResponse.data.response?.trim() || 'No summary generated.';
    console.log('Received summary from Mistral:', summary);

    // Post the summary to Slack
    const slackResponse = await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `TODO Summary:\n${summary}`,
    });

    console.log('Posted summary to Slack:', slackResponse.data);

    res.json({ message: 'Summary sent to Slack', summary });
  } catch (err) {
    console.error('Error in /summarize route:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
