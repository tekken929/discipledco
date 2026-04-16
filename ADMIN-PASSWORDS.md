# Admin Passwords & Access

All admin access is password-protected. Passwords are stored in the `.env` file at the root of the project.

---

## Current Passwords

| Area | Password | Where it's used |
|---|---|---|
| Admin Portal (upload music & books) | `jukebox2024` | Admin Portal login screen |
| Delete songs | `deletesong2024` | Trash icon confirmation on the Music page |
| Hallowed page (upload music) | `hallowed2026` | Upload form on the Hallowed page |

---

## How to Access the Admin Portal

1. Go to the **Music** page (`/music`) on the live site
2. Click the **Admin** button in the top-right corner
3. Enter the admin password: `jukebox2024`
4. You'll see options to manage music and books

---

## How to Change a Password

Passwords are set in the `.env` file at the root of the project:

```
VITE_MUSIC_UPLOAD_PASSWORD=jukebox2024
VITE_MUSIC_DELETE_PASSWORD=deletesong2024
```

To change a password:

1. Open `.env`
2. Replace the value after the `=` sign with your new password
3. Save the file
4. Redeploy the site for the change to take effect on the live version

**Note:** After changing a password in `.env`, anyone with the old password will no longer have access.

---

## What Each Password Controls

### Admin Portal password (`VITE_MUSIC_UPLOAD_PASSWORD`)

Unlocks the full Admin Portal, which includes:
- Upload MP3 files to the music jukebox
- Add and manage books in the book library
- Delete books

### Hallowed page password

Unlocks the music upload form on the Hallowed page (`/hallowed`).

**Note:** This password is stored differently from the others — it is hardcoded directly inside `src/components/HallowedMusicUpload.tsx` on line 9:

```typescript
const ADMIN_PASSWORD = 'hallowed2026';
```

To change it, edit that line, save the file, and redeploy.

---

### Delete song password (`VITE_MUSIC_DELETE_PASSWORD`)

Required separately when deleting a song from the music playlist. This is a second layer of protection to prevent accidental deletions.

---

## Security Notes

- The `.env` file should **never** be shared publicly or committed to a public GitHub repository
- The `.gitignore` file already excludes `.env` from version control
- Passwords are visible to anyone who can see the source code of a deployed build — for a higher level of security, consider moving to Supabase Auth (speak to your developer)
- If you suspect a password has been compromised, change it immediately and redeploy

---

## Supabase Dashboard Access

The Supabase database and storage can be managed directly at the Supabase dashboard. This requires a separate Supabase account login.

- **Dashboard URL:** supabase.com/dashboard
- **Project:** arzfdmplsjpqycgunwnf

Contact your developer for Supabase account access.
