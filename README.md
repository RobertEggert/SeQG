# Basic needs to run the project

Needed:

- Prettier extension in your code edior (prefered is Visual Studio Code),
- EsLint extension,
- NodeJS (24.x^ !!!) and some package manager like npm, pnpm, yarn, brew ...

Convenience:

- Auto Rename Tag <JUN HANi>
- indent-rainbow
- Visual Studio Theme: Dark+

# Basic CLI

```batch
$ npm/pnpm i --> installs all packages in dev dependencies
$ npm/pnpm format --> formats all code (all files)
$ npm/pnpm dev --> starts the frontend in an exposed form to the local network

$ npm/pnpm backend --> starts the backend for host/client side connections and the qr codes
$ npm/pnpm llmBackend --> starts the communcator between frontend and llm
$ npm/pnpm llm --> starts the llm itself as it is an api
```

# To use the llama3.1 llm you need to install Ollama first:

Install Ollama on their official website: https://ollama.com/
Then do:

```batch
$ ollama pull llama3.1
```

Now you have installed the current in use model
If not sure look up llm.ts, where the request to the model is send, there will be a defined model, which is in use
Everytime (for now) when starting Ollamas llm you have to close the process completely as it will interrupt the backend service

# Current process flow

Frontend <-----> Backend (client / host architecture for a session)  
Frontend (sends age and experience) <--> LLMBackend <--> LLM (receives the prompt and sends a question)
