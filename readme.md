## TODO List App with Local Mistral LLM Summarization & Slack Integration

This is a full-stack TODO List Manager built with React (frontend), Node.js/Express (backend), and PostgreSQL (database).
It allows you to manage tasks efficiently and generate intelligent summaries using a locally hosted Mistral LLM via Ollama, with integration to Slack for sending updates.

# GitHub Repository: https://github.com/jayneeshk/Todo-List-Manager

Features:

Add, complete, and delete tasks

Filter tasks (all, active, completed)

Summarize your TODO list using the Mistral LLM (via Ollama)

Send the generated summary to a Slack channel

Responsive, modern UI

Tech Stack:

Frontend: React (Vite)

Backend: Node.js, Express

Database: PostgreSQL (Supabase)

LLM: Mistral 7B via Ollama

Notifications: Slack Webhook

Getting Started:

Clone the Repository:

git clone https://github.com/jayneeshk/Todo-List-Manager.git
cd Todo-List-Manager

Backend Setup:

cd Backend
npm install

Create a .env file in the Backend directory with:

DATABASE_URL=your_postgres_connection_string
SLACK_WEBHOOK_URL=your_slack_webhook_url
OLLAMA_API_URL=http://localhost:11434/api/generate

DATABASE_URL: Your Supabase/PostgreSQL connection string

SLACK_WEBHOOK_URL: See Slack documentation on creating a webhook

OLLAMA_API_URL: Default URL where Ollama runs locally

Database Setup:

Create a todos table in your PostgreSQL database:

CREATE TABLE todos (
id SERIAL PRIMARY KEY,
text TEXT NOT NULL,
completed BOOLEAN DEFAULT FALSE
);

Frontend Setup:

cd ../Frontend
npm install

Running the App:

Start the Local Mistral LLM:
ollama run mistral

Start the Backend:
cd ../Backend
node index.js

Start the Frontend:
cd ../Frontend
npm run dev

Frontend will be available at http://localhost:5173

Backend will run at http://localhost:5000

Mistral LLM & Slack Integration:

When you click "Summarize Tasks", the backend:

Fetches the TODO list from the database

Sends a prompt to the local Mistral LLM via Ollama

Receives a summary and posts it to your Slack channel

Make sure Ollama is running and your Slack webhook is configured properly.

Troubleshooting:

Database errors: Ensure the correct DATABASE_URL is in .env

Slack not receiving messages: Validate webhook URL and Slack app permissions

LLM issues: Confirm Ollama is running and the Mistral model is downloaded

CORS/network problems: Check that both backend and frontend servers are correctly configured and reachable

License: MIT

Credits:

Ollama (https://ollama.com)

Mistral 7B

Slack Webhooks (https://api.slack.com/messaging/webhooks)

Supabase (https://supabase.com)