<h1 align="center">
  <a href="https://duoxpy.site">
    <img src="https://github.com/Chromeyc/DuoXPy-Web/blob/main/images/transparent_banner.png?raw=true" alt="DuoXPy Web Banner" height="160" />
  </a>
</h1>

<p align="center"><i>Setup guide for the DuoXPy Website⚙️</i></p>

<p align="center">
  <a href="https://github.com/Chromeyc/DuoXPy-Web/graphs/contributors">
    <img src="https://img.shields.io/github/contributors-anon/Chromeyc/DuoXPy?style=flat-square">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-Custom-lightgrey.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="https://discord.gg/pu9uDNVMHT">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?style=flat-square&logo=discord">
  </a>
  <a href="https://github.com/Chromeyc/DuoXPy-Web">
    <img src="https://img.shields.io/github/stars/DuoXPy/DuoXPy-Web?style=social" alt="GitHub stars">
  </a>
</p>

---

## 🛠️ DuoXPy-Web Setup Instructions Only

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

---

### 2. Database Setup

Run the SQL commands in `supabase-setup.sql` inside your Supabase SQL editor to create the required tables and security policies.

---

### 3. Install Dependencies

```bash
# Install frontend and root dependencies
npm install

# Install API dependencies
cd api
npm install
cd ..
```

---

### 4. Start Development Server

```bash
npm run start
```

* Frontend runs on: `http://localhost:8080`
* API runs on: `http://localhost:3000`

---

### 5. Build for Production

```bash
npm run build
```

> Deploy the API separately if needed.

---

<p align="center">
  <i>Made with ❤️ by <a href="https://github.com/Chromeyc">Chromeyc</a></i>
</p>
