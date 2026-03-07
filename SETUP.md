# Setup Instructions

If you encounter `ENOTEMPTY` or corrupted `node_modules` during install:

1. **Close any running dev servers** (CAREER-ASSISTANCE-PORTAL or other Next.js apps)

2. **Remove node_modules and reinstall:**
   ```powershell
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   Remove-Item package-lock.json -ErrorAction SilentlyContinue
   npm install
   ```

3. **Configure .env** - Copy from .env.example and add:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET` - Any random string for JWT signing
   - `GEMINI_API_KEY` - From https://makersuite.google.com/app/apikey

4. **Setup database:**
   ```bash
   npx prisma db push
   ```

5. **Run the app:**
   ```bash
   npm run dev
   ```

## Quick Start (without PostgreSQL)

For testing without a database, you can use a local PostgreSQL or Docker:

```bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ai_career_db postgres:15
```

Then set `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_career_db"` in .env
