# Chat App (Node/Express + MongoDB + Socket.IO) + React + Tailwind

## Overview

This repo contains a simple real-time chat application:

- Backend: Node.js + Express + TypeScript + MongoDB + Socket.IO
- Frontend: React + TypeScript + Vite + TailwindCSS

Features:

- User registration & login (JWT)
- Real-time chat via Socket.IO
- Chat history saved to MongoDB
- API to fetch total users and total chats
- Live UI that listens to message and user:join events

## Prerequisites

- Node.js (>= 18 recommended)
- npm
- MongoDB (local or Atlas)

## 1) Setup backend

```bash
cd backend
cp .env
npm install
npm run dev
```

## 2) Setup frontend

```bash
cd frontend
npm install
npm run dev
```
