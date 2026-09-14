# Production Stage
FROM node:20-alpine

WORKDIR /app

# Set environment
ENV NODE_ENV=production

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production --prefer-offline --no-audit

# Copy pre-built compiled JavaScript dist directory
COPY dist ./dist

# Expose backend port
EXPOSE 5000

# Start production server
CMD ["node", "dist/index.js"]
