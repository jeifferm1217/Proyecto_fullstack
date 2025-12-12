# 🚀 Proyecto Fullstack – Notas (React + FastAPI)

Este es un proyecto fullstack que implementa un CRUD de notas utilizando:

- **Frontend:** React con Vite  
- **Backend:** FastAPI  
- **Base de datos:** Railway (MySQL)  
- **Despliegue Frontend:** Vercel  
- **Despliegue Backend:** Render  

---

## 📌 Tabla de Contenido

1. [Tecnologías](#-tecnologías)
2. [Arquitectura](#-arquitectura-del-proyecto)
3. [Frontend](#-frontend-react--vite)
4. [Backend](#-backend-fastapi)
5. [Variables de Entorno](#-variables-de-entorno)
6. [Instalación Local](#-instalación-local)
7. [Deploys](#-deploys)
8. [Rutas del API](#-rutas-del-api)

---

## 🛠 Tecnologías

### **Frontend**
- React 19  
- Vite  
- Fetch API  
- CSS / Tailwind (si aplica)

### **Backend**
- FastAPI  
- SQLAlchemy  
- Pydantic  
- Uvicorn  

### **Infraestructura**
- Railway (Base de datos MySQL)
- Render (Servidor FastAPI)
- Vercel (Frontend)

---

## 🏗 Arquitectura del Proyecto

Proyecto_fullstack/
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── backend/
├── app/
│ ├── main.py
│ ├── routers/
│ ├── models/
│ ├── schemas/
│ └── db/
├── requirements.txt
└── Procfile

## yaml

name: CI

on:
  push:
  pull_request:

jobs:
  frontend-build:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: frontend

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build frontend
        run: npm run build


## 🎨 Frontend (React + Vite)

El frontend consume las APIs del backend usando una variable global:

## js
const API_BASE = import.meta.env.VITE_API_URL || "https://proyecto-fullstack-prya.onrender.com/api";

## Para desarrollo:
bash
cd frontend
npm install
npm run dev
⚙ Backend (FastAPI)
Estructura:

/models → modelos SQLAlchemy

/schemas → Pydantic

/routers → endpoints

/db → conexión a la base de datos

/main.py → inicialización de la app

Para desarrollo:

bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

## Variables de Entorno

Backend (.env en /backend):
ini
DATABASE_URL=mysql+pymysql://root:UTExwsbfSjJQIYteaBqFjhfmlEftngCv@shuttle.proxy.rlwy.net:28173/railway
Ejemplo:

bash
DATABASE_URL=mysql+pymysql://root:UTExwsbfSjJQIYteaBqFjhfmlEftngCv@shuttle.proxy.rlwy.net:28173/railway
Frontend (Vercel / .env):
ini
VITE_API_URL=https://proyecto-fullstack-prya.onrender.com/api
 🚀 Deploys
Backend – Render
Se despliega desde /backend
Comando de inicio:

cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000
Variables:
DATABASE_URL

## Frontend – Vercel

bash
cd frontend
vercel --prod
Build:

vite build
Output folder:
dist

## Rutas del API

Método	Ruta	Descripción
GET	/api/notas/	Listar notas
POST	/api/notas/	Crear nota
PUT	/api/notas/{id}	Actualizar nota
DELETE	/api/notas/{id}	Eliminar nota





