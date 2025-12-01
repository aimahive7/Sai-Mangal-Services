# 🎊 Shubham Mangal Services - Wedding Booking Website

A premium, fully responsive wedding hall and event services booking website for Nanded City.

## ✨ Features

### 🔐 Authentication System
- **Login/Signup** with email and mobile number
- **Password-protected** user accounts
- **Session management** using localStorage
- **Protected contact information** (visible only after login)

### 🏛️ Function Halls
- **3 Premium Halls** with detailed specifications
- Hall area, capacity, dining area, and parking information
- **Interactive hall cards** with view details and booking options
- **Google Maps integration** for location
- **Contact numbers** visible only to logged-in users

### 💄 Service Categories
1. **Beauty Parlour Services** (4 vendors)
2. **Catering & Aachai Services** (3 vendors)
3. **Band Services** (1 vendor)
4. **Music/Bhajan/Song Groups** (2 vendors)

### 🎨 Design Features
- **Royal Gold & Maroon Theme** - Traditional wedding colors
- **Glassmorphism effects** for modern UI
- **Smooth animations** and transitions
- **Fully responsive** - Mobile, tablet, and desktop
- **Premium typography** using Google Fonts (Playfair Display, Poppins)
- **Interactive hover effects**
- **Scroll-based animations**

### 📱 Additional Features
- **WhatsApp integration** for quick contact
- **Contact form** for inquiries
- **User profile dropdown** when logged in
- **My Bookings** page to track reservations
- **Real-time notifications** for user actions
- **Smooth scroll navigation**
- **Mobile-friendly hamburger menu**

## 🚀 How to Use

### For Users:
1. **Browse** halls and services without logging in
2. **Sign up** to view contact numbers and book services
3. **Login** to access full features
4. **View hall details** with specifications and location
5. **Book halls** and services
6. **Track bookings** in "My Bookings"
7. **Contact via WhatsApp** for immediate assistance

### For Developers:
1. Open `index.html` in any modern browser
2. All data is stored in **localStorage** (demo purposes)
3. No backend required - fully client-side

## 📊 Data Structure

### Halls Data
```javascript
{
    id: 1,
    name: "Hall Name",
    location: "Location",
    area: "Area in sq ft",
    capacity: "Number of people",
    diningArea: "Area",
    parking: "Parking space",
    contact: "Phone number",
    mapLink: "Google Maps URL"
}
```

### Services Data
```javascript
{
    name: "Service Name",
    beautician/detail: "Additional info",
    contact: "Phone number"
}
```

### User Data (localStorage)
```javascript
{
    name: "Full Name",
    email: "Email",
    mobile: "Mobile Number",
    password: "Password"
}
```

### Bookings Data (localStorage)
```javascript
{
    user: "User email",
    hall: "Hall name",
    date: "Booking date",
    status: "pending/confirmed/cancelled"
}
```

## 🎯 Key Functionality

### Authentication
- Users stored in `localStorage` under key `users`
- Current session in `localStorage` under key `currentUser`
- Password protection (in production, use proper encryption)

### Contact Protection
- Contact numbers hidden behind login
- Click on locked contacts prompts login modal
- Automatic re-render after login to show contacts

### Booking System
- Simple booking request system
- Bookings stored in `localStorage`
- View booking history in user profile

## 🎨 Color Palette

```css
Royal Gold: #D4AF37
Deep Maroon: #8B0000
Bright Gold: #FFD700
Dark: #1a0a0a
Light: #ffffff
```

## 📱 Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🔧 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Google Fonts** - Playfair Display, Poppins
- **LocalStorage** - Client-side data persistence

## 🌟 Future Enhancements

Potential additions for production version:

1. **Backend Integration**
   - Real database (MongoDB/PostgreSQL)
   - RESTful API
   - Secure authentication (JWT)

2. **Payment Gateway**
   - UPI integration
   - Credit/Debit card payment
   - Online booking confirmation

3. **Admin Panel**
   - Manage halls and services
   - View and approve bookings
   - Upload hall photos
   - Analytics dashboard

4. **Advanced Features**
   - Email/SMS OTP verification
   - Image gallery for halls
   - Review and rating system
   - Booking calendar
   - Price management
   - Multi-language support (Marathi + English)

5. **SEO & Marketing**
   - Meta tags optimization
   - Schema markup
   - Blog section
   - Social media integration

## 📞 Contact Information

**Shubham Mangal Services**
- 📍 Location: Nanded City, Nanded, Maharashtra
- 📧 Email: info@shubhammangal.com
- 📱 WhatsApp: +91 78288 20292

---

## 🎉 Demo Credentials

For testing, you can create a new account or use:
- Any email/mobile and password you create will be saved locally

---

**Made with ❤️ for perfect celebrations**
