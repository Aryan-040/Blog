# CA Monk - Blog Application Assignment

Welcome to the CA Monk Blog Application assignment! This project tests your ability to build a modern React application with state management, styling, and component libraries.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Git
- React.js knowledge
- Familiarity with TanStack Query, Tailwind CSS, and shadcn/ui.

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd camonk-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required libraries for the assignment** , ie, TanStack Query, Tailwind CSS, and  shadcn/ui
4. **Start the JSON Server (Backend API)**
   ```bash
   npm run server
   ```
   The API will run on `http://localhost:3001`

5. **Start the Development Server (in a new terminal)**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## Features

### Core Functionality
- **View All Blogs** - Display all blog posts in a scrollable sidebar with infinite scroll
- **Blog Details** - View individual blog posts with full content, cover images, and metadata
- **Create Blogs** - Create new blog posts with title, category, description, content, and cover image upload
- **Delete Blogs** - Delete blog posts with confirmation dialogs from both sidebar and detail pages
- **Dynamic Content Loading** - Click any blog in the sidebar to view its content in the main area without navigation
- **Real-time Updates** - UI automatically updates when blogs are created or deleted using TanStack Query

### User Interface Features
- **Sort Functionality** - Sort blogs by:
  - Most Recent (newest first)
  - Oldest First
  - Alphabetical (A-Z)
- **Infinite Scroll** - Sidebar shows 5 blogs initially and automatically loads 5 more as you scroll
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI** - Modern, clean interface with:
  - Centered hero section with elegant typography
  - Sleek footer with organized links and social media icons
  - Smooth animations and transitions
  - Custom scrollbars and hover effects

### User Experience
- **Loading States** - Skeleton loaders while data is being fetched
- **Error Handling** - User-friendly error messages with retry options
- **Toast Notifications** - Success and error feedback using Sonner
- **Confirmation Dialogs** - Prevent accidental deletions with confirmation modals
- **Active Blog Highlighting** - Currently selected blog is highlighted in the sidebar
- **Image Compression** - Automatic image compression for optimized storage

### Required Technologies
- ✅ **TanStack Query** - For server state management and data fetching
  - 📚 [Documentation](https://tanstack.com/query/latest)
- ✅ **Tailwind CSS** - For styling
  - 📚 [Documentation](https://tailwindcss.com/docs)
- ✅ **shadcn/ui** - For UI components
  - 📚 [Documentation](https://ui.shadcn.com/)

## UI Reference

Here's a reference design for the blog application layout:

![Blog Reference](image.png)

**Left Panel:** Blog list view showing blog cards with category, title, and description  
**Right Panel:** Blog detail view displaying cover image, full content

UI IMAGE - ![UI-refernece](ui.jpeg)

> **Note:** This is just a reference design. Your implementation does not have to look exactly like this. 

For the blog content, use plain text — no need to use HTML-formatted text.

## Implementation Details

### Completed Features

#### 1. **Get All Blogs**
- Implemented ArticleSidebar component that displays all blogs using `GET /blogs`
- Uses TanStack Query for data fetching with proper loading and error states
- Features infinite scroll (shows 5 blogs initially, loads more on scroll)
- Includes sort functionality (recent, oldest, alphabetical)

#### 2. **Get Blog by ID**
- Implemented BlogDetail page for individual blog view using `GET /blogs/:id`
- Implemented ArticleContent component for dynamic content display on home page
- Uses TanStack Query for data fetching
- Displays cover image, category, read time, date, and full content

#### 3. **Create a New Blog**
- Implemented CreateBlogModal with form validation
- Supports image upload with automatic compression
- Uses `POST /blogs` API endpoint
- Automatically invalidates queries after successful creation
- New blogs appear immediately in the sidebar

#### 4. **Delete Blogs**
- Delete functionality available in both BlogDetail page and sidebar cards
- Confirmation dialogs prevent accidental deletions
- Uses `DELETE /blogs/:id` API endpoint
- Automatically updates UI after deletion

#### 5. **Dynamic Content Loading**
- Click any blog card in the sidebar to view its content in the main area
- Uses URL search parameters to track selected blog
- No page navigation required - seamless user experience

#### 6. **Sort and Filter**
- Sort blogs by date (recent/oldest) or alphabetically
- Frontend-based sorting for instant results
- Sort option persists during session

### API Endpoints

The JSON Server provides the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/:id` | Get a specific blog by ID |
| POST | `/blogs` | Create a new blog |
| DELETE | `/blogs/:id` | Delete a blog by ID |

### Evaluation Criteria

Your submission will be evaluated on:
- ✅ Correct implementation of TanStack Query hooks
- ✅ Proper use of Tailwind CSS for styling
- ✅ Integration of shadcn/ui components
- ✅ Code organization and structure
- ✅ Error handling and loading states
- ✅ Responsive design []
- ✅ User experience and UI polish



## Sample Blog Object

```json
{
  "id": 1,
  "title": "Future of Fintech",
  "category": ["FINANCE", "TECH"],
  "description": "Exploring how AI and blockchain are reshaping financial services",
  "date": "2026-01-11T09:12:45.120Z",
  "coverImage": "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
  "content": "Full blog content..."
}
```

description: A short summary of the blog  
content: The full content of the blog

## Usage Guide

### Viewing Blogs
1. The home page displays all blogs in the left sidebar
2. Click on any blog card to view its full content in the main area
3. Use the sort dropdown to organize blogs by date or alphabetically
4. Scroll down in the sidebar to load more blogs automatically

### Creating a Blog
1. Click the "Create Blog" button in the header
2. Fill in the required fields:
   - Title
   - Category (Finance, Career, Regulations, Skills, or Technology)
   - Overview (short description)
   - Content (full blog content)
   - Cover Image (upload an image file - automatically compressed)
3. Click "Publish Blog" to save
4. The new blog appears immediately in the sidebar

### Deleting a Blog
1. **From Sidebar**: Hover over a blog card to reveal the delete button, then confirm deletion
2. **From Detail Page**: Click the "Delete Blog" button and confirm in the dialog
3. The blog is removed from both the UI and the database

### Finding Recent Blogs
- Use the sort dropdown in the sidebar and select "Most Recent"
- Blogs are automatically sorted by date (newest first)
- The sidebar shows the most recent blogs at the top

## Development Tips

- Set up TanStack Query's `QueryClientProvider` in your app root
- Configure Tailwind CSS properly in your config files
- Use shadcn components like `Card`, `Button`, `Input`, etc.
- Handle loading states with skeletons
- Implement proper error boundaries
- Use React Router for navigation between pages

## Submission

Once you've completed the assignment:
1. Ensure all tasks are working correctly
2. Commit your changes with clear commit messages
3. Push to your repository
4. Share the repository link for review in the google form provided

## FAQ

**Do I need to deploy the code?**  
No. Simply clone the repository, commit and push your changes, and share the repository link via the Google Form.

**Is it mandatory to use TypeScript and TanStack Query?**  
Yes, using both TypeScript and TanStack Query is compulsory for this assignment.

**Is using JSON Server mandatory, or can I create my own server?**  
Using JSON Server is mandatory. Please use the provided JSON Server setup rather than creating your own backend.

**What should I use for styling?**  
Use **Tailwind CSS** and **shadcn/ui** for styling. You are expected to install, configure, and use both Tailwind CSS and shadcn/ui components in your implementation.

**Have more questions?**  
If you have any additional doubts, feel free to reach out at: `developer@camonk.com`.


Good luck! 🚀
