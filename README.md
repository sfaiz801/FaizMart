# 🛍️ FaizMart - Modern E-Commerce Platform

A full-featured e-commerce web application built with **Next.js 14**, **React**, and **Redux**. FaizMart provides a seamless shopping experience with product browsing, cart management, wishlists, and user authentication.

---

## 📋 Project Overview

**FaizMart** is a modern online store platform designed to showcase and sell products across multiple categories including:
- Electronics
- Fashion & Apparel
- Home & Garden
- Beauty Products
- And more...

The platform features a responsive design, smooth user experience, and complete e-commerce functionality.

---

## ✨ Key Features

### User Features
- 🔐 **User Authentication** - Sign up, sign in, forgot password functionality
- 🛒 **Shopping Cart** - Add/remove items, quantity management, persistent storage
- ❤️ **Wishlist** - Save favorite products for later
- 🔍 **Advanced Search** - Real-time product search with live suggestions
- 📦 **Product Filtering** - Browse by category, price, and more
- 👤 **User Dashboard** - View profile, manage orders, change password
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Store Features
- 🏪 **Product Catalog** - Browse thousands of products
- 📂 **Category Navigation** - Easy product discovery by category
- 🎯 **Featured Products** - Highlighted deals and new arrivals
- 💰 **Pricing & Deals** - Special promotions and discounts
- 📰 **Newsletter Signup** - Stay updated with latest deals
- 💬 **Testimonials** - Customer reviews and ratings

---

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14.2.3** - React framework with SSR/SSG support
- **React 18.3.1** - UI library for component-based development
- **React DOM 18.3.1** - DOM rendering for React

### State Management
- **Redux Toolkit 2.2.3** - Efficient state management
- **React-Redux 9.1.2** - Redux integration with React

### Styling & UI
- **Bootstrap 5.3.3** - Responsive CSS framework
- **CSS Modules** - Component-scoped styling
- **Custom CSS** - Modern design with gradients and animations

### Forms & Validation
- **React Hook Form 7.51.5** - Lightweight form library with validation
- **Custom Validators** - Email, password, and field validation

### Notifications & UX
- **React Toastify 10.0.5** - Toast notifications for user feedback
- **Loading States** - Skeleton loaders and spinner animations

### HTTP Client
- **Axios 1.7.2** - API communication and data fetching

---

## 📡 APIs Used

### 1. **DummyJSON API** - Product Data
   - **Endpoint**: `https://dummyjson.com`
   - **Used For**:
     - Fetching product catalog
     - Product search functionality
     - Category browsing
     - Individual product details
   - **Endpoints**:
     - `GET /products` - List all products with pagination
     - `GET /products/search?q={query}` - Search products
     - `GET /products/category/{category}` - Filter by category
     - `GET /products/categories` - Get all categories
     - `GET /products/{id}` - Get single product details

### 2. **MockAPI** - User & Order Management
   - **Endpoint**: `https://69dcc5a784f912a264042731.mockapi.io`
   - **Used For**:
     - User authentication (sign up, login)
     - User profile management
     - Order history tracking
     - User data persistence
   - **Collections**:
     - Users - Registration & authentication
     - Orders - Order history & tracking

---

## 📁 Project Structure

```
faizmart/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.jsx                  # Home page
│   │   ├── layout.jsx                # Root layout with metadata
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── forgot-password/
│   │   ├── shop/                     # Product browsing page
│   │   ├── product/[id]/             # Product details page
│   │   ├── cart/                     # Shopping cart page
│   │   ├── checkout/                 # Checkout process
│   │   ├── wishlist/                 # Saved items page
│   │   └── account/                  # User account pages
│   │       ├── dashboard/
│   │       ├── profile/
│   │       ├── orders/
│   │       └── change-password/
│   │
│   ├── components/                   # Reusable React components
│   │   ├── layout/                   # Layout components
│   │   │   ├── Navbar.jsx            # Header navigation
│   │   │   ├── Footer.jsx            # Footer section
│   │   │   └── StoreProvider.jsx     # Redux provider wrapper
│   │   ├── home/                     # Home page sections
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── CategoryStrip.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── DealBanner.jsx
│   │   │   ├── NewArrivals.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── NewsletterBanner.jsx
│   │   ├── shop/                     # Shop page components
│   │   │   ├── ShopView.jsx
│   │   │   ├── ProductRow.jsx
│   │   │   └── ShopSidebar.jsx
│   │   ├── product/                  # Product components
│   │   │   └── ProductDetail.jsx
│   │   ├── cart/                     # Cart components
│   │   ├── checkout/                 # Checkout components
│   │   ├── account/                  # Account components
│   │   │   └── AccountLayout.jsx
│   │   └── ui/                       # Reusable UI components
│   │       └── ProductCard.jsx
│   │
│   ├── store/                        # Redux state management
│   │   ├── index.js                  # Store configuration
│   │   └── slices/
│   │       ├── cartSlice.js          # Cart state logic
│   │       ├── wishlistSlice.js      # Wishlist state logic
│   │       └── authSlice.js          # Authentication state
│   │
│   ├── styles/                       # Global styles
│   │   └── globals.css
│   │
│   └── utils/                        # Utility functions
│       ├── api.js                    # API call functions
│       └── helpers.js                # Helper utilities
│
├── public/                           # Static assets
├── package.json                      # Dependencies & scripts
├── next.config.mjs                   # Next.js configuration
└── jsconfig.json                     # JavaScript path aliases
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/sfaiz801/FaizMart.git
cd faizmart

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
\`\`\`

### Build for Production

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

---

## 📊 State Management (Redux Slices)

### Cart Slice
- Add/remove items from cart
- Update quantities
- Calculate totals
- Persist cart data

### Wishlist Slice
- Add/remove items from wishlist
- View saved products
- Move wishlist items to cart

### Auth Slice
- User login/logout
- User registration
- Password reset
- User profile management
- Session persistence

---

## 🎨 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Homepage with featured products & promotions |
| Shop | `/shop` | Browse all products with filters |
| Product Details | `/product/:id` | Detailed view of single product |
| Sign In | `/auth/sign-in` | User login |
| Sign Up | `/auth/sign-up` | New user registration |
| Forgot Password | `/auth/forgot-password` | Password reset |
| Cart | `/cart` | View and manage shopping cart |
| Checkout | `/checkout` | Complete purchase process |
| Wishlist | `/wishlist` | View saved items |
| User Dashboard | `/account/dashboard` | User overview |
| Profile | `/account/profile` | Edit user information |
| Orders | `/account/orders` | View order history |
| Change Password | `/account/change-password` | Update password |

---

## 🔒 Security Features

- ✅ Input validation using React Hook Form
- ✅ Password strength requirements
- ✅ Secure authentication flow
- ✅ Protected routes for authenticated users
- ✅ HTTPS-ready API integration

---

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Enhanced tablet experience
- **Desktop Optimized** - Full-featured desktop layout
- **Bootstrap Grid** - Flexible responsive layout system

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**FaizMart Development Team**

---

## 📞 Support

For support, email: support@faizmart.com

---

**Last Updated**: April 2026