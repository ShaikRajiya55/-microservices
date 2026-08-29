FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build production application bundle
RUN npm run build

# Expose server port
EXPOSE 3000

# Entrypoint run script
CMD ["npm", "start"]
