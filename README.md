# 🌱 My Garden — আমার বাগান

A modern Bengali-first digital garden management and plant-tracking application built to help gardeners organize plants, monitor plant health, manage watering and care tasks, track garden activities, and explore AI-powered gardening assistance.

> **আমার বাগান** — আপনার বাগান, আপনার গাছ, আপনার যত্ন। 🌿

---

## ✨ Overview

**My Garden (আমার বাগান)** is a personal digital garden companion designed for managing plants and everyday gardening activities from a single dashboard.

The application provides an organized way to:

* 🌱 Track plants
* 🪴 Monitor plant health
* 💧 Manage watering
* ☀️ Record sunlight requirements
* 📍 Organize plants by location
* 📅 Schedule gardening tasks
* 🔔 Manage care reminders
* 🌦️ Check weather information
* 📖 Maintain gardening journals
* 📊 Analyze garden statistics
* 🥭 Track harvests
* 🤖 Get AI-powered gardening assistance

The interface is designed with a **Bengali-first experience**, responsive layouts, modern cards, garden-inspired visuals, and a clean dark/light UI.

---

## 🚀 Features

### 🌿 Plant Management

Manage your complete plant collection with useful information such as:

* Plant name
* Category
* Health/status
* Quantity
* Planting date
* Location
* Watering requirements
* Sunlight requirements
* Plant image
* Nursery information
* Price
* Notes
* Plant timeline

The plant collection includes search and filtering functionality for quickly finding specific plants.

---

### 🔎 Plant Search & Filtering

Find plants quickly using:

* Search
* Category filters
* Plant status
* Location
* Health condition

Plant cards provide a quick overview while detailed information can be viewed without leaving the page.

---

### 🩺 Plant Health Tracking

Track the current condition of plants using statuses such as:

* ফল হয়েছে
* ফল হয়নি
* ফুল হয়েছে
* গাছ ছোট
* গাছ মরে গেছে

This makes it easier to monitor plant development and identify plants that require attention.

---

### 💧 Watering Management

Keep track of watering requirements and gardening routines.

Future-ready functionality includes:

* Watering schedules
* Last watered date
* Next watering date
* Watering reminders
* Plant-specific watering requirements

---

### ☀️ Sunlight Tracking

Record the sunlight requirements of individual plants.

Plants can be organized according to their preferred growing conditions, helping gardeners place plants in appropriate locations.

---

### 📍 Garden Locations

Organize plants based on where they are growing.

Examples:

* ছাদ বাগান
* বারান্দা
* উঠান
* টব
* বাগানের নির্দিষ্ট অংশ

---

### 📅 Gardening Tasks

Create and manage gardening activities such as:

* Watering
* Fertilizing
* Pruning
* Repotting
* Planting
* Harvesting
* Pest control

Tasks can be organized using dates and reminders.

---

### 🔔 Reminders

Keep track of important gardening activities with reminders for recurring plant-care tasks.

---

### 🌦️ Weather Integration

Weather information can be used to provide useful gardening context, including:

* Temperature
* Weather conditions
* Rain information
* Gardening considerations

Weather-aware gardening can help determine when watering or outdoor activities may be appropriate.

---

### 📖 Garden Journal

Maintain a personal record of gardening activities.

Possible journal entries include:

* Plant growth observations
* New plant additions
* Problems encountered
* Treatments
* Gardening experiments
* Harvest notes
* Photos and memories

---

### 📊 Garden Analytics

The dashboard can provide useful statistics about the garden, including:

* Total plants
* Plant categories
* Healthy plants
* Plants requiring attention
* Garden activity
* Harvest information
* Plant growth trends

Charts and visual analytics help turn garden data into useful insights.

---

### 🥭 Harvest Tracking

Record harvested produce and track information such as:

* Plant
* Harvest date
* Quantity
* Notes
* Harvest history

This can be useful for fruit, vegetable, herb, and flowering plants.

---

### 🤖 Garden AI

The project includes an AI-focused gardening experience designed to assist with plant-related questions and workflows.

Potential AI capabilities include:

* Plant-care suggestions
* Gardening questions
* Troubleshooting
* Plant-care recommendations
* Garden planning
* Natural-language assistance

---

## 🖥️ Main Pages

| Route         | Description             |
| ------------- | ----------------------- |
| `/`           | Garden dashboard / home |
| `/plants`     | Plant collection        |
| `/plants/add` | Add a new plant         |
| `/garden`     | Garden overview         |
| `/tasks`      | Gardening tasks         |
| `/garden-ai`  | AI gardening assistant  |
| `/login`      | User authentication     |

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16**
* **React**
* **TypeScript**
* **Tailwind CSS v4**
* **shadcn/ui**
* **Radix UI**
* **Lucide React**

### Data & Backend

* **MongoDB**
* **Mongoose**
* **Auth.js**

### Forms & Validation

* **React Hook Form**
* **Zod**

### Data Fetching

* **TanStack Query**

### Visualization

* **Recharts**

### AI

* **AI SDK**

### Deployment

* **Vercel**

---

## 🎨 UI & Design

The application follows a modern garden-inspired interface with a strong focus on usability.

### Design principles

* 🌿 Garden-inspired visual language
* 📱 Mobile-first responsive design
* 🌓 Dark and light mode
* 🇧🇩 Bengali-first content
* ✨ Modern glassmorphism elements
* 🪴 Plant-focused cards
* 🎯 Clear calls to action
* ⚡ Fast interactions
* ♿ Accessible UI components

The interface uses reusable components from **shadcn/ui** and icons from **Lucide React**.

---

## 📁 Suggested Project Structure

```text
my-garden/
├── app/
│   ├── page.tsx
│   ├── plants/
│   │   ├── page.tsx
│   │   └── add/
│   │       └── page.tsx
│   ├── garden/
│   │   └── page.tsx
│   ├── tasks/
│   │   └── page.tsx
│   ├── garden-ai/
│   │   └── page.tsx
│   └── login/
│       └── page.tsx
│
├── components/
│   ├── ui/
│   ├── plants/
│   ├── garden/
│   ├── tasks/
│   └── dashboard/
│
├── public/
│   ├── data/
│   │   └── plant.ts
│   └── images/
│
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
│
├── models/
│   └── Plant.ts
│
├── hooks/
│
├── types/
│
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/azijulhakimbd/My-Garden
```

Move into the project directory:

```bash
cd My Garden
```

---

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or pnpm:

```bash
pnpm install
```

---


### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Build for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## 🔍 Code Quality

Recommended commands:

```bash
npm run lint
```

For projects configured with testing:

```bash
npm run test
```

---

## 🖼️ Plant Images

Plant records can contain image URLs for displaying plant images on cards and detail views.

For externally hosted images, configure the corresponding host inside `next.config.ts`.

Example:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

export default nextConfig;
```

A local fallback image can be used when a plant does not have an image:

```text
/public/images/plant-placeholder.jpg
```

---

## 🌱 Plant Data

Plant information can be maintained using the project's plant data structure.

Example:

```ts
export type PlantCategory =
  | "ফলজ"
  | "সাইট্রাস"
  | "ঔষধি"
  | "মসলা"
  | "আম"
  | "ফুল";

export type PlantStatus =
  | "ফল হয়েছে"
  | "ফল হয়নি"
  | "ফুল হয়েছে"
  | "গাছ ছোট"
  | "গাছ মরে গেছে";
```

A plant record can contain information such as:

```ts
{
  name: "আম গাছ",
  category: "আম",
  status: "ফল হয়েছে",
  quantity: 2,
  location: "ছাদ বাগান",
  plantedAt: "2026-04-10",
  image: "/images/mango.jpg",
  notes: "নিয়মিত পানি ও পর্যাপ্ত রোদ প্রয়োজন।"
}
```

---

## 📱 Responsive Design

The application is designed to work across:

* 📱 Mobile phones
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop displays

Layouts use responsive Tailwind CSS utilities to adapt cards, grids, navigation, dashboards, and forms to different screen sizes.

---

## 🔐 Authentication

The application is designed to support authenticated users through **Auth.js**.

Authentication can be used to protect features such as:

* Personal plant collections
* Garden data
* Tasks
* Journals
* Harvest records
* AI interactions

---

## 🗄️ Database

MongoDB is used as the primary database for persistent application data.

Mongoose provides schema modeling and database interaction.

Potential collections include:

```text
users
plants
gardens
tasks
journals
harvests
reminders
```

---

## 🤖 AI Architecture

The AI gardening functionality can be implemented using the AI SDK.

A typical flow is:

```text
User
  ↓
Garden AI Interface
  ↓
AI API Route
  ↓
AI SDK
  ↓
Language Model
  ↓
Gardening Response
```

The AI layer can later be extended with application tools for retrieving:

* User plants
* Plant health
* Garden tasks
* Weather information
* Gardening history
* Harvest records

---

## 🚀 Deployment

The project is designed for deployment on **Vercel**.

### Deploy with Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure environment variables.
4. Deploy the project.
5. Configure the production domain if required.

For production, make sure the following are configured:

* MongoDB connection
* Authentication secret
* AI provider credentials
* Production application URL
* Image domains
* Authentication callback URLs

---

## 🔒 Security

Never commit sensitive credentials to Git.

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

Never expose:

* MongoDB credentials
* Authentication secrets
* AI API keys
* Private tokens

---

## 🧭 Future Improvements

Planned or expandable features include:

* [ ] Complete user authentication
* [ ] Cloud-based plant storage
* [ ] Advanced plant reminders
* [ ] Recurring tasks
* [ ] Plant growth timeline
* [ ] Plant photo history
* [ ] Weather-based recommendations
* [ ] Advanced analytics
* [ ] Harvest reports
* [ ] Plant disease identification
* [ ] AI plant diagnosis
* [ ] AI garden planning
* [ ] Garden notifications
* [ ] PWA support
* [ ] Offline garden tracking
* [ ] Multi-user gardens
* [ ] Data export/import
* [ ] Bengali/English language switching

---

## 🌿 Project Goals

The main goal of **My Garden** is to create a practical digital companion for everyday gardening.

The project combines:

```text
Modern Web Development
        +
Garden Management
        +
Data Visualization
        +
Weather Information
        +
AI Assistance
        =
Smart Digital Garden
```

---

## 👨‍💻 Developer

**Md. Azijul Hakim**

Full Stack Developer with AI Fluency

* 🌐 Portfolio: https://www.azijul.pro.bd
* 💻 GitHub: https://github.com/azijulhakimbd
* 💼 LinkedIn: https://linkedin.com/in/azijulhakimbd/

--
---

## 🌱 My Garden

**আমার বাগান — আপনার গাছপালা, আপনার যত্ন, আপনার ডিজিটাল বাগান।**

Made with ❤️ and 🌱 by **Md. Azijul Hakim**.
                  