# Fix Social Media Preview Issue

## The Problem
Social media platforms are showing an old/generic image instead of your professional preview because:
1. The current `optimal-social-preview.png` is just a copy of your logo (not optimized for social sharing)
2. Social platforms cache images aggressively and don't automatically refresh

## Solution Steps

### 1. Create a Proper Social Media Image

**Option A: Use the Generator I Created**
1. Open `create-social-preview.html` in your browser
2. Take a screenshot of the 1200x630 preview design
3. Save it as `optimal-social-preview.png` in the `public/` folder

**Option B: Use Design Tools**
- **Canva:** Use their "Facebook Post" template (1200x630)
- **Figma:** Create a 1200x630 frame
- **Photoshop:** New document 1200x630 pixels

**Design Requirements:**
- Dimensions: 1200x630 pixels (Facebook/Twitter standard)
- Keep important content in center 1000x560 "safe zone"
- High contrast text for readability
- Include your logo and key messaging
- File size under 8MB (preferably under 1MB)

### 2. Replace the Current Image
```bash
# Replace the current file
cp /path/to/your/new-image.png public/optimal-social-preview.png

# Commit and push
git add public/optimal-social-preview.png
git commit -m "Update social media preview image"
git push
```

### 3. Force Social Media Platforms to Refresh

**Facebook/Meta (also affects Instagram, WhatsApp):**
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL: `https://gooptimal.io/`
3. Click "Debug"
4. Click "Scrape Again" to force refresh
5. Repeat for: `https://gooptimal.io/warfighter-solutions.html`

**Twitter:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL: `https://gooptimal.io/`
3. Click "Preview card"
4. Repeat for warfighter solutions page

**LinkedIn:**
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your URL: `https://gooptimal.io/`
3. Click "Inspect"
4. Repeat for warfighter solutions page

### 4. Test on Each Platform

**Manual Testing:**
1. Share your URL on each platform
2. Check if the new preview appears
3. If not, wait 24 hours (some platforms have longer cache times)

### 5. Alternative: Add Cache Busting

If platforms still show old images, you can add a version parameter:
```html
<!-- In your HTML meta tags -->
<meta property="og:image" content="https://gooptimal.io/public/optimal-social-preview.png?v=2">
<meta property="twitter:image" content="https://gooptimal.io/public/optimal-social-preview.png?v=2">
```

## Design Suggestions for Your Preview Image

### Main Site Preview Should Include:
- **OPTIMAL** logo/branding
- **"Secure • Accelerate • Innovate"** tagline
- **"Combat-tested cybersecurity and warfighter software solutions"**
- **"Veteran-owned • Defense Industrial Base"**
- Professional gradient background (black to blue)

### Warfighter Solutions Preview Should Include:
- **"WARFIGHTER SOLUTIONS"** as main title
- **"Combat-Tested Software for the Battlefield"**
- **"AI-powered drone detection • Friend-or-foe identification"**
- **OPTIMAL** branding
- Military/tactical color scheme (red/orange gradients)

## Pro Tips

1. **Test at thumbnail size** - Make sure text is readable when small
2. **Use high contrast** - Ensure text stands out against background
3. **Include faces/people** - Images with people get more engagement
4. **Keep it simple** - Don't overcrowd the image
5. **Brand consistency** - Use your website's colors and fonts

## Timeline
- **Image creation:** 30 minutes
- **Platform cache refresh:** 1-24 hours
- **Full propagation:** Up to 48 hours

## Support Tools
- **Image optimization:** TinyPNG, ImageOptim
- **Design inspiration:** Dribbble, Behance
- **Testing:** Use Facebook Debugger after each change 