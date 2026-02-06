# 📋 Product Requirements Document
## Baraka Stock Trading Website

---

## 📌 Overview

| Property | Value |
|----------|-------|
| **Product Name** | Baraka Stock Trading Website |
| **Version** | 1.0 |
| **Last Updated** | January 2025 |
| **Status** | In Development |

### Product Summary
A stock trading website with Baraka branding featuring investment themes, stock details with interactive charts, trading interface, and news section. The platform integrates with the live Baraka API for real-time stock data.

### Data Sources
| Source | Type | Description |
|--------|------|-------------|
| Baraka API | System-controlled | Live stock prices, themes, company data |
| CMS/Admin | User-managed | News articles, promotional content, featured items |
| System | Fixed | UI components, branding, layouts |

---

## 📄 Pages & Content Control

---

### 🏠 Page: Themes Listing

> Investment themes discovery page with grid of themed stock collections

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Reorder themes | Display order | Drag & drop to prioritize |
| Feature themes | Featured flag | Pin to top of listing |
| Hide themes | Visibility toggle | Hide specific themes from display |
| Add promotional banner | Banner content | Custom marketing banners |
| Edit page title | Page heading | "Explore Themes" default |
| Add custom theme | Custom collection | Create user-defined stock groups |
| Edit icon | Theme icon | Change theme icon from icon library |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Modify API theme data | Sourced from Baraka API |
| Change theme internal IDs | System-controlled |
| Edit theme stock composition | Managed by Baraka |
| Override stock prices | Real-time API data |

#### 🔧 Admin Controls:
- Enable/disable entire themes section
- Set default sort order (alphabetical, popularity, custom)
- Configure grid layout (3, 4, or 5 columns)
- Set theme card display format

---

### 📊 Page: Theme Detail

> Detailed view of stocks within a specific investment theme

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Edit theme description | Description text | Custom intro text |
| Add theme insights | Editorial content | Market analysis, commentary |
| Reorder stocks display | Stock list order | Custom sorting within theme |
| Feature specific stocks | Featured flag | Highlight stocks at top |
| Add call-to-action | CTA button | Custom download prompts |
| Set header image | Theme banner | Custom hero image |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Add/remove stocks from theme | API-controlled composition |
| Change stock prices | Real-time data |
| Modify stock ticker symbols | System identifiers |
| Edit company names | Sourced from API |

#### 🔧 Admin Controls:
- Enable stock comparison feature
- Set default chart timeframe
- Configure price alert visibility
- Toggle "Get the App" CTA

---

### 🏦 Page: Stocks & News (Homepage)

> Main landing page with trending stocks, investor calendar, sectors, and themes

#### 🔥 Trending Section

| CMS Action | Field | Notes |
|------------|-------|-------|
| ✅ Add new pill | Trending item | Create new trending stock/topic pill |
| ✅ Select icon | Pill icon | Choose from icon library |
| ✅ Reorder pills | Display order | Drag & drop to prioritize |
| ✅ Edit info popup | Info icon content | Configure tooltip/popup text |
| ✅ Remove pill | Pill deletion | Remove trending item |

#### 📅 Investor Calendar Section

| CMS Action | Field | Notes |
|------------|-------|-------|
| ✅ Edit info popup | Info icon content | Configure tooltip/popup text for calendar info |
| ❌ Edit event data | Calendar events | Sourced from Baraka API |
| ❌ Modify dates | Event scheduling | System-controlled |

#### 🏢 Sectors Section

| CMS Action | Field | Notes |
|------------|-------|-------|
| ✅ Add sector | New sector | Create new sector category |
| ✅ Rename sector | Sector name | Edit display name |
| ✅ Reorder sectors | Display order | Drag & drop to prioritize |
| ✅ Add title | Section title | Edit section heading |
| ✅ Add description | Section description | Edit section subtitle/description |
| ❌ Add/select icon | Icons | Sectors do not have icons |
| ❌ Modify sector stock data | Stock composition | Sourced from Baraka API |

#### 🎨 Themes Section

| CMS Action | Field | Notes |
|------------|-------|-------|
| ✅ Add theme | New theme | Create new theme category |
| ✅ Rename theme | Theme name | Edit display name |
| ✅ Reorder themes | Display order | Drag & drop to prioritize |
| ✅ Add title | Section title | Edit section heading |
| ✅ Add description | Section description | Edit section subtitle/description |
| ❌ Modify theme stock data | Stock composition | Sourced from Baraka API |

#### 🔧 Admin Controls:
- Configure maximum trending pills displayed
- Set default sector/theme display count
- Enable/disable section visibility
- Configure info popup styling

---

### 📈 Page: Stock Detail

> Comprehensive stock page with charts, trading, and analysis

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Edit stock description | Custom overview | Supplement API data |
| Add analyst notes | Editorial section | Custom insights |
| Configure visible sections | Section toggles | Show/hide analysis sections |
| Reorder sections | Section order | Customize page layout |
| Add promotional content | CTA blocks | Trading prompts |
| Set featured news | News selection | Pin relevant articles |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Modify stock price | Real-time API |
| Edit financial metrics | Sourced from Baraka |
| Change chart data | Live data feed |
| Modify P/E ratio, market cap | Calculated values |
| Edit dividend history | Historical API data |
| Change shareholder data | API-controlled |

#### 📑 Section Visibility Controls:

| Section | Toggleable | Reorderable | Editable |
|---------|------------|-------------|----------|
| Stock Summary | ✅ | ✅ | Partial (description only) |
| Trade Section | ✅ | ✅ | CTA text only |
| Interactive Chart | ✅ | ✅ | ❌ |
| Company Overview | ✅ | ✅ | Custom notes |
| Key Stats | ✅ | ✅ | ❌ |
| Earnings | ✅ | ✅ | ❌ |
| Dividends | ✅ | ✅ | ❌ |
| Shareholders | ✅ | ✅ | ❌ |
| Stock Splits | ✅ | ✅ | ❌ |
| Sentiment Analysis | ✅ | ✅ | ❌ |
| Sharia Score | ✅ | ✅ | ❌ |
| Advanced Analysis | ✅ | ✅ | ❌ |
| Similar Stocks | ✅ | ✅ | Featured picks |
| Stock News | ✅ | ✅ | Pinned articles |
| FAQ | ✅ | ✅ | Q&A content |

#### 🔧 Admin Controls:
- Set default section order for all stocks
- Configure chart default timeframe (1D, 1W, 1M, 1Y)
- Enable/disable trading interface
- Set Sharia compliance display rules

---

### 📰 Page: News Listing

> News articles with interactive hero banner

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Create article | Full article | Title, body, image, category |
| Edit article | All fields | Update existing content |
| Delete article | Removal | Permanent deletion |
| Set featured article | Featured flag | Hero banner display |
| Add categories/tags | Taxonomy | Custom labels |
| Set publish date | Scheduling | Future publishing |
| Set visibility | Status | Draft / Published / Archived |
| Reorder articles | Display order | Manual sorting |
| Edit hero banner | Banner config | Image, title, subtitle |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Modify system timestamps | Auto-generated |
| Change article IDs | System identifiers |
| Access deleted articles | Permanent removal |

#### 🔧 Admin Controls:
- Set articles per page
- Configure hero banner behavior (static vs hover-interactive)
- Enable/disable newsletter signup
- Set image aspect ratio requirements

---

### 📄 Page: News Detail

> Individual article view with full content

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Edit headline | Article title | Main heading |
| Edit body content | Rich text | Full article text |
| Edit featured image | Hero image | Main article image |
| Add/edit tags | Categories | Topic labels |
| Set author | Author name | Byline display |
| Add related articles | Related links | Manual selection |
| Edit meta description | SEO | Search preview text |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Modify view count | System-tracked |
| Edit created timestamp | Auto-generated |
| Access revision history | System-managed |

#### 🔧 Admin Controls:
- Enable comments section
- Configure social sharing buttons
- Set related articles algorithm (manual vs auto)
- Toggle "Back to News" CTA

---

### 🎯 Component: App Promotion Section

> Download app CTA appearing across pages

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Edit headline | CTA title | Main message |
| Edit description | Supporting text | Value proposition |
| Change CTA button text | Button label | "Get the App" etc. |
| Update QR code | App store link | Download destination |
| Change phone mockup | Device image | App preview |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Modify section layout | Design-controlled |
| Change animation | System styling |
| Remove Baraka branding | Brand requirement |

---

### 🧭 Component: Header / Navigation

> Global navigation bar

#### ✅ User Can:
| Action | Field | Notes |
|--------|-------|-------|
| Edit nav links | Menu items | Add/remove/rename |
| Reorder nav items | Menu order | Drag to reorder |
| Change CTA text | Button text | "Get the App" label |
| Update logo | Brand logo | SVG/PNG upload |

#### ❌ User Cannot:
| Restriction | Reason |
|-------------|--------|
| Remove logo | Brand requirement |
| Change animation effects | Design-controlled |
| Modify mobile menu layout | System template |

---

## 📊 Summary Table

| Page/Section | Create | Edit | Delete | Reorder | Toggle Visibility |
|--------------|--------|------|--------|---------|-------------------|
| Stocks & News (Homepage) | ✅ Sectors/Themes/Pills | ✅ Full | ✅ Pills only | ✅ | ✅ |
| ↳ Trending | ✅ Pills | ✅ Icons, Popups | ✅ | ✅ | ✅ |
| ↳ Investor Calendar | ❌ | ✅ Info popup | ❌ | ❌ | ✅ |
| ↳ Sectors | ✅ | ✅ Name, Title, Desc | ❌ | ✅ | ✅ |
| ↳ Themes | ✅ | ✅ Name, Title, Desc | ❌ | ✅ | ✅ |
| Themes Listing | ⚠️ Custom only | ✅ Partial | ⚠️ Hide only | ✅ | ✅ |
| Theme Detail | ❌ | ✅ Editorial | ❌ | ✅ Stocks | ✅ Sections |
| Stock Detail | ❌ | ✅ Notes only | ❌ | ✅ Sections | ✅ Sections |
| News Listing | ✅ | ✅ | ✅ | ✅ | ✅ |
| News Detail | ✅ | ✅ | ✅ | N/A | ✅ |
| App Promotion | ❌ | ✅ Text/Image | ❌ | ❌ | ✅ |
| Header/Nav | ⚠️ Links only | ✅ | ⚠️ Links only | ✅ | ❌ |

**Legend:**
- ✅ Full control
- ⚠️ Partial/Limited
- ❌ Not allowed

---

## 👥 Permissions Matrix

### Role: End User (Public Visitor)
| Capability | Access |
|------------|--------|
| View themes | ✅ Read-only |
| View stock details | ✅ Read-only |
| View news articles | ✅ Read-only |
| Download app | ✅ External link |
| Trade stocks | ❌ Requires app |
| Edit any content | ❌ |

### Role: Content Editor
| Capability | Access |
|------------|--------|
| Create/edit news articles | ✅ |
| Edit promotional content | ✅ |
| Reorder content | ✅ |
| Toggle section visibility | ✅ |
| Modify API data | ❌ |
| Access admin settings | ❌ |

### Role: Administrator
| Capability | Access |
|------------|--------|
| All Content Editor permissions | ✅ |
| Configure page layouts | ✅ |
| Manage user roles | ✅ |
| Access analytics | ✅ |
| Modify system settings | ✅ |
| Edit API configurations | ⚠️ Limited |

---

## ⚠️ Assumptions & Edge Cases

### Data Refresh
| Data Type | Refresh Rate | Fallback |
|-----------|--------------|----------|
| Stock prices | Real-time (WebSocket) | Last known price + stale indicator |
| Theme composition | Daily sync | Cache with timestamp |
| Company metrics | Hourly | Display "as of" timestamp |
| News articles | On publish | Draft state until published |

### Validation Rules
| Field | Rule |
|-------|------|
| Article title | Required, max 200 characters |
| Article body | Required, min 100 characters |
| Theme description | Optional, max 500 characters |
| Image uploads | Max 5MB, JPG/PNG/WebP |
| Tags | Max 10 per item |

### Limits
| Resource | Limit |
|----------|-------|
| Custom themes | 20 per account |
| News articles | Unlimited |
| Featured articles | 5 max at once |
| Image storage | 500MB per account |

### Edge Cases
| Scenario | Behavior |
|----------|----------|
| API unavailable | Show cached data + error banner |
| Stock delisted | Hide from listings, show notice on detail |
| Empty theme | Display "No stocks available" message |
| Unpublished article accessed | 404 for public, preview for editors |
| Duplicate article slug | Auto-append number (-1, -2, etc.) |

---

## 🔄 System-Controlled Elements

These elements are **fixed** and cannot be modified:

| Element | Reason |
|---------|--------|
| Baraka logo styling | Brand guidelines |
| Color scheme (Green #0DDD00, Red #FF3317) | Brand identity |
| Font family (Proxima Nova) | Design system |
| Stock price formatting | API standard |
| Chart library & behavior | Technical implementation |
| Mobile responsive breakpoints | Design system |
| Animation timings | UX consistency |
| Error message formats | System templates |

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2025 | Initial PRD |

---

*Document maintained by Product Team*
