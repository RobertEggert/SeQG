# Basic needs to run the project

Prettier extension in your code edior (prefered is Visual Studio Code), EsLint extension aswell but only as a backup.
NodeJS or some package manager like npm, pnpm, yarn, brew ...

# Basic CLI

$ npm/pnpm i --> installs all packages in dev dependencies
$ npm/pnpm prettier . --write --> formats all code (all files)

# To use the llama3.1 llm you need to install OLLAMA first:

Install Ollama on their official website: https://ollama.com/
Then do:

$ ollama pull llama3.1

Now you have installed the current in use model
If not sure look up llm.ts, where the request to the model is send, there will be a defined model in use
