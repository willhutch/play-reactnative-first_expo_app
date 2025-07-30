# React Native Boilerplate Template

A modern React Native boilerplate with Expo, TypeScript, and comprehensive tooling for building production-ready mobile applications.

## 🚀 Features

### **Core Technologies**
- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS) for styling
- **Zustand** for state management with MMKV persistence
- **React Hook Form** with **Zod** validation
- **Better Auth** for authentication
- **Axios** for API communication

### **Navigation & UI**
- **React Navigation** (Stack, Bottom Tabs, Drawer)
- **React Native Reanimated** for smooth animations
- **React Native Vector Icons** for icons
- **React Native SVG** for vector graphics
- **React Native Linear Gradient** for gradients

### **Development Tools**
- **ESLint** with Expo configuration
- **Prettier** for code formatting
- **Jest** with React Native Testing Library
- **TypeScript** for type checking

### **Storage & Persistence**
- **MMKV** for fast local storage (10x faster than AsyncStorage)
- **Expo Secure Store** for sensitive data
- **Zustand** with MMKV persistence

### **API & Networking**
- **Axios** with interceptors for API calls
- **React Query** for server state management
- **Network connectivity** monitoring

## 📱 Architecture

This React Native app is designed as a **frontend** that connects to your **Next.js backend**:

```
React Native App (Frontend)
├── Makes API calls to Next.js backend
├── Stores data in MMKV (local cache)
├── Handles UI and user interactions
└── No direct database access

Next.js App (Backend)
├── Has Prisma for database access
├── Exposes API endpoints
├── Handles authentication
└── Manages all business logic
```

## 🛠️ Setup

### **Prerequisites**
- Node.js 18+ and pnpm
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### **Installation**

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd react-native-boilerplate
pnpm install
```

2. **Set up environment variables:**
```bash
cp env.example .env
```

Update `.env` with your configuration:
```env
# API Configuration
EXPO_PUBLIC_API_URL="http://localhost:3000/api"

# Better Auth (handled by backend)
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# App Configuration
EXPO_PUBLIC_APP_NAME="React Native Boilerplate"
```

3. **Start the development server:**
```bash
pnpm start
```

## 🏃‍♂️ Development

### **Available Scripts**
```bash
# Development
pnpm start          # Start Expo development server
pnpm android        # Run on Android
pnpm ios           # Run on iOS
pnpm web           # Run on web

# Code Quality
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint errors
pnpm type-check    # Run TypeScript check
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting

# Testing
pnpm test          # Run tests
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

### **Project Structure**
```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Base UI components
│   ├── auth/      # Authentication components
│   └── dashboard/ # Dashboard components
├── lib/           # Utilities and configurations
│   ├── api/       # API client and endpoints
│   ├── hooks/     # Custom React hooks
│   ├── stores/    # Zustand stores
│   └── utils/     # Utility functions
├── screens/       # Screen components
└── types/         # TypeScript type definitions
```

## 🔌 Backend Integration

### **API Endpoints**
The app connects to your Next.js backend via these endpoints:

- `GET /api/revenue` - Fetch revenue data
- `GET /api/invoices/latest` - Fetch latest invoices
- `GET /api/invoices` - Fetch filtered invoices
- `GET /api/customers` - Fetch customers
- `GET /api/auth/session` - Get current session

### **Data Seeding**
All database seeding and initialization is handled by your Next.js backend:
- User creation and authentication
- Sample data population
- Database migrations
- Initial setup scripts

### **Authentication**
- Uses Better Auth for authentication
- Tokens stored securely in MMKV
- Automatic token refresh and logout

### **Data Flow**
1. **API Call** → Next.js backend
2. **Database Query** → Prisma (in Next.js)
3. **Response** → React Native app
4. **Local Storage** → MMKV for caching

## 🎨 Styling

### **NativeWind (Tailwind CSS)**
```typescript
import { View, Text } from 'react-native'
import { cn } from '@/lib/utils'

export function MyComponent() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold text-gray-900">
        Hello World
      </Text>
    </View>
  )
}
```

### **Theme Support**
```typescript
import { useUIStore } from '@/lib/stores/ui-store'

export function ThemedComponent() {
  const { theme, toggleTheme } = useUIStore()
  
  return (
    <View className={cn(
      'p-4 rounded-lg',
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    )}>
      <Text className={cn(
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      )}>
        Themed Content
      </Text>
    </View>
  )
}
```

## 📊 State Management

### **Zustand with MMKV Persistence**
```typescript
import { useUIStore } from '@/lib/stores/ui-store'

export function MyComponent() {
  const { theme, toggleTheme, addNotification } = useUIStore()
  
  const handleAction = () => {
    addNotification({
      type: 'success',
      title: 'Success',
      message: 'Action completed!'
    })
  }
  
  return (
    <Button onPress={toggleTheme}>
      Toggle Theme ({theme})
    </Button>
  )
}
```

## 🔐 Authentication

### **Better Auth Integration**
```typescript
import { useSession, signIn, signOut } from '@/lib/auth-client'

export function AuthComponent() {
  const { data: session, isLoading } = useSession()
  
  if (isLoading) return <LoadingSpinner />
  
  if (!session) {
    return <LoginForm />
  }
  
  return (
    <View>
      <Text>Welcome, {session.user.email}</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  )
}
```

## 🧪 Testing

### **Component Testing**
```typescript
import { render, fireEvent } from '@testing-library/react-native'
import { MyComponent } from './MyComponent'

test('renders correctly', () => {
  const { getByText } = render(<MyComponent />)
  expect(getByText('Hello World')).toBeTruthy()
})
```

### **API Testing**
```typescript
import { fetchRevenue } from '@/lib/data'

test('fetches revenue data', async () => {
  const revenue = await fetchRevenue()
  expect(revenue).toHaveLength(12)
  expect(revenue[0]).toHaveProperty('month')
  expect(revenue[0]).toHaveProperty('revenue')
})
```

## 📦 Building for Production

### **Expo Build**
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

### **Environment Configuration**
```env
# Production
EXPO_PUBLIC_API_URL="https://your-backend.com/api"
EXPO_PUBLIC_APP_ENV="production"
```

## 🚀 Deployment

### **EAS Build (Recommended)**
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for production
eas build --platform ios
eas build --platform android
```

### **App Store Deployment**
1. Build with EAS
2. Submit to App Store Connect
3. Submit to Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: Check the inline comments and JSDoc
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🔄 Updates

This boilerplate is regularly updated with:
- Latest React Native and Expo versions
- Security updates
- Performance improvements
- New features and best practices 