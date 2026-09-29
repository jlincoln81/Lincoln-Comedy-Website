# The Monkey Wrench Comedy Club — Website

Every page adjusts automatically for phones, tablets, and desktops. Upcoming shows are managed from a login page at **monkeywrenchcomedy.com/admin**.

## What's in the folder

| File | What it is |
|---|---|
| `index.html` | Homepage |
| `faqs.html` | FAQ page |
| `contact.html` | Contact Us page with the contact form |
| `thanks.html` | Page shown after someone submits a form |
| `404.html` | Page shown for links that don't exist |
| `data/shows.json` | The show list the homepage reads (edited through /admin) |
| `admin/` | The Show Manager login page and its settings (`config.yml`) |
| `css/styles.css` | Colors, fonts, and layout |
| `js/menu.js` | Phone menu |
| `js/shows.js` | Builds the show cards from `data/shows.json` |
| `images/` | Venue photo; show posters live in `images/shows/` |

## One-time setup (about 30 minutes)

### 1. Put the files on GitHub
1. Create a free account at github.com.
2. Click **+ → New repository**. Name it `lincoln-comedy-website`, choose **Public** or **Private**, and click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Open the unzipped `lincoln-comedy-website` folder, select **everything inside it** (not the folder itself), and drag it onto the page. Click **Commit changes**.

### 2. Connect Netlify to GitHub
Keep your existing Netlify site so your address and form settings stay the same:
1. In Netlify, open your site → **Project configuration → Build & deploy → Link repository** (or **Link to Git**).
2. Choose **GitHub**, approve access, and pick `lincoln-comedy-website`.
3. Leave the build command **empty** and set the publish directory to `.` (or leave it blank). Deploy.

From now on, the site republishes automatically whenever something changes on GitHub, including every time you publish a show. No more dragging folders.

### 3. Let the Show Manager log in with GitHub
1. On GitHub: click your profile picture → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `Lincoln Show Manager`
   - Homepage URL: your site address (e.g. `https://monkeywrenchcomedy.com`)
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Click **Register application**, copy the **Client ID**, then click **Generate a new client secret** and copy it.
3. In Netlify: **Project configuration → Access & security → OAuth → Install a provider → GitHub**. Paste the Client ID and secret and save.

### 4. Point the Show Manager at your repository
On GitHub, open `admin/config.yml`, click the pencil icon, and change:
```
repo: YOUR-GITHUB-USERNAME/lincoln-comedy-website
```
to your actual GitHub username. Also change `site_url` and `display_url` to your live address. Click **Commit changes**.

### 5. Log in
Go to **monkeywrenchcomedy.com/admin**, click **Login with GitHub**, and approve. You'll see **Show Schedule → Upcoming Shows**.

## Managing shows

In **Upcoming Shows** you can:
- **Add a show:** click **Add Show**, then fill in the title, headliner, date and showtime, ticket status, poster, and Buy Tickets link.
- **Edit a show:** click it to expand and change any field.
- **Remove a show:** click the **×** next to it.

Click **Publish → Publish now**. The site updates in about a minute.

Good to know:
- Shows appear in **date order** automatically and **disappear the day after** they happen, so there's no need to delete old ones.
- **On Sale** with a ticket link shows a **Buy Tickets** button (opens in a new tab). **Coming Soon**, or On Sale without a link yet, shows **Notify Me**, which jumps to the email signup. **Sold Out** shows a gray Sold Out label.
- Posters look best at a **4:5 ratio** (e.g. 960 × 1200 pixels). Keep files under about 1 MB so the page loads quickly.

## Forms

In Netlify, **Forms → Form detection** must be enabled. Set up email alerts under **Forms → Submission notifications → Add notification → Email notification**, choose **Any form**, and enter your email.

## Still to fill in before launch

- **Show dates** in the Show Manager. The current ones are samples.
- **Buy Tickets links** for each show.
- **Posters:** the three current posters belong to Empire Comedy Club (Portland, ME). Replace them with your own, and get permission from each comic or their team to use their photo.
- **Lost and found email** in `faqs.html` (search for `[EMAIL]`).
- **Instagram and Facebook links:** search for `instagram.com/` and `facebook.com/`.
- **Terms and Privacy** footer links.

## Changing the look

Colors are at the top of `css/styles.css`. Change `--accent` to swap the gold everywhere. Fonts are Fraunces (headlines) and Karla (everything else), from Google Fonts.
