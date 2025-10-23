# Design Guidelines: Somali Diaspora News Network

## Design Approach

**Selected Framework**: Design System Approach with news industry references
- Primary inspiration: BBC News, The Guardian, Reuters for professional journalism layouts
- Focus on readability, content hierarchy, and information architecture
- **Brand Color Exception**: User-specified #408bd8 (Somali flag blue) as primary brand color throughout

## Typography System

**Font Families** (via Google Fonts):
- Headlines: Merriweather or Libre Baskerville (serif, authoritative)
- Body Text: Inter or Source Sans Pro (sans-serif, optimal readability)
- UI Elements: Inter

**Hierarchy**:
- Article Headlines: text-4xl to text-5xl, font-bold
- Section Headers: text-2xl to text-3xl, font-semibold
- Article Body: text-base to text-lg, leading-relaxed (line-height: 1.75)
- Metadata/Bylines: text-sm, font-medium
- Admin Interface: text-sm to text-base

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent use of p-4, p-6, p-8 for component padding
- Vertical rhythm: space-y-6 to space-y-12 between sections
- Article content: max-w-3xl for optimal reading (65-75 characters per line)

**Grid Structure**:
- Homepage: 3-column grid for featured articles (lg:grid-cols-3)
- Article listings: 2-column on tablet (md:grid-cols-2), single on mobile
- Admin dashboard: Sidebar navigation + main content area

## Component Library

### Public-Facing Site

**Navigation**:
- Sticky header with logo, primary navigation, search icon
- Categories in horizontal menu (World, Politics, Culture, Business, Technology)
- Secondary bar for breaking news ticker (optional breaking news banner)

**Homepage Layout**:
- Hero section: Large featured article with image overlay + headline + excerpt
- Breaking News: Horizontal scrolling ticker below header
- Featured Grid: 3-column layout for top stories with thumbnail images
- Category Sections: Each category gets dedicated section with 4-6 articles
- Sidebar: Latest news list, trending topics, newsletter signup

**Article Cards**:
- Thumbnail image (16:9 aspect ratio)
- Category tag badge
- Headline (2-3 lines max with ellipsis)
- Excerpt (2 lines)
- Author name + publish date
- Read time estimate

**Article Detail Page**:
- Full-width hero image (optional, based on article)
- Headline with large, bold typography
- Author byline with avatar, date, social share buttons
- Article content in single column (max-w-3xl, mx-auto)
- Generous paragraph spacing (space-y-6)
- Pull quotes: Larger text, left border accent
- Related articles section at bottom
- Comment section placeholder

**Footer**:
- Newsletter subscription form
- Category links organized in columns
- Social media icons
- About/Contact/Privacy links
- RSS feed link prominently displayed
- Copyright notice

### Admin Panel

**Dashboard Layout**:
- Left sidebar navigation (fixed, scrollable)
- Main content area with statistics cards
- Recent articles table with quick actions

**Rich Text Editor Interface**:
- Toolbar with formatting options: Bold, Italic, Underline, Font selector, Text color picker, HTML view toggle
- Live preview panel beside editor
- "Insert HTML/Iframe" button with modal for embedding tweets
- Media library integration for images
- Article metadata fields: Title, Excerpt, Category, Tags, Featured Image, Author, Publish Date
- SEO section: Meta description, Keywords, Slug customization
- Save as Draft / Publish buttons

**Article Management**:
- Filterable table view (by category, status, date)
- Bulk actions (publish, archive, delete)
- Search functionality
- Status indicators (draft, published, scheduled)

## Visual Design Patterns

**Cards & Containers**:
- Subtle shadows (shadow-sm to shadow-md)
- Rounded corners (rounded-lg)
- Border treatments (border border-gray-200)
- Hover states: subtle lift (hover:shadow-lg transition)

**Interactive Elements**:
- Buttons: Solid primary color, rounded-md, px-6 py-3
- Links: Underline on hover, color transition
- Form inputs: Clear labels, rounded borders, focus rings
- Badges: Pill-shaped category tags with colored backgrounds

**Images**:
- All article images should have alt text for accessibility
- Lazy loading implementation
- Responsive images with srcset
- Placeholder states during loading

## Responsive Behavior

**Breakpoints**:
- Mobile: Single column, stacked navigation (hamburger menu)
- Tablet (md): 2-column grids, expanded navigation
- Desktop (lg): 3-column grids, full navigation visible
- Admin stays responsive with collapsible sidebar

**Mobile Optimizations**:
- Touch-friendly hit areas (min-height: 44px)
- Readable font sizes (min 16px for body to prevent zoom)
- Streamlined navigation
- Bottom-aligned key actions

## SEO & Technical Requirements

**Structured Content**:
- Semantic HTML5 tags (article, section, header, nav, footer)
- Proper heading hierarchy (h1 → h2 → h3)
- Schema.org markup for articles (NewsArticle structured data)
- OpenGraph tags for social sharing
- Clean URL structure (/category/article-slug)

**iOS Reader Mode Compatibility**:
- Use article tag for main content
- Clear content hierarchy
- Avoid complex nested structures
- Proper paragraph spacing
- No critical content in sidebars

**RSS & Sitemap**:
- RSS feed icon in header and footer
- Sitemap.xml accessible and properly formatted
- Both auto-update with new content

## Admin UX Considerations

- Autosave drafts every 30 seconds
- Confirmation dialogs for destructive actions
- Success/error toast notifications
- Loading states for async operations
- Keyboard shortcuts for power users (Ctrl+B for bold, etc.)

This design creates a professional, trustworthy news platform that balances modern web design with the serious nature of journalism, while incorporating the cultural significance of the Somali flag blue throughout the interface.