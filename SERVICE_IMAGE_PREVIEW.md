# Service Image Preview Feature

## Overview
Services in the "Complete Wedding Solutions" section now support image previews. Each service can display either uploaded images or a default wedding logo.

## Features

### For Admin (admin.html)
1. **Upload Service Images**: 
   - Navigate to "Manage Services" section
   - Select service category (Beauty Parlour, Catering, Band, Music, Flower, Mehandi)
   - Upload one or multiple images for each service
   - Images are stored in browser's localStorage using base64 encoding

2. **Edit/Delete Services**:
   - View existing service images in the services table
   - Edit services to add/remove/update images
   - Delete services with their images

### For Users (index.html)
1. **Visual Preview**:
   - Each service card displays an image at the top
   - If admin uploaded images: Shows the first image
   - If no images uploaded: Shows default wedding emoji (💒)

2. **Interactive Effects**:
   - **Single Image**: Zoom effect on hover
   - **Multiple Images**: Automatic cycling through images on hover (changes every 800ms)
   - Smooth transitions and animations

3. **Responsive Design**:
   - Images automatically resize on different screen sizes
   - Maintains aspect ratio with object-fit: cover
   - Service cards now have a cleaner, more organized layout

## Technical Details

### Default Wedding Logo
- **Emoji**: 💒 (Wedding chapel emoji)
- **Styling**: Displayed on a gradient background matching the site theme
- **Size**: 4rem font-size for visibility

### Image Storage
- Images are converted to base64 and stored in localStorage
- Each service can have multiple images with optional subtitles
- Images persist across browser sessions

### CSS Enhancements
- New `.service-image` class for image container (180px height)
- Default emoji styling with `.service-image-default`
- Hover effects including scale transform and overlay gradients
- Flexbox layout for better card organization

## Usage Instructions

### Adding Images to Services (Admin):
1. Open `admin.html` in your browser
2. Scroll to "Manage Services" section
3. Fill in the service details
4. Click "Upload Images (optional)" 
5. Select one or more image files
6. Preview images will appear below
7. Click "Add Service" to save

### Viewing Services (Users):
1. Open `index.html` in your browser
2. Navigate to "Complete Wedding Solutions" section
3. Browse through different service categories
4. Hover over service cards to see interactive effects
5. Services with multiple images will automatically cycle through them on hover

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support
- Images are stored as base64 data URLs

## Performance Notes
- Large numbers of high-resolution images may impact localStorage limits (~5-10MB per domain)
- Consider optimizing images before upload
- Multiple images per service provide better visual experience but use more storage
