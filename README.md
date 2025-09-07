# ORIGO - Smart Socialising for Campus Life 🎓✨

A community-first social platform exclusively for verified college students, designed to break social barriers and build authentic campus connections.

## ✨ What Makes ORIGO Special

### 🏫 Campus-Verified Community
- **Institutional Email Verification** - Only verified students can join
- **Student ID Verification** - Manual verification for authenticity
- **Cross-Campus Networking** - Connect across premier institutions
- **Safe Environment** - Verified community with zero tolerance for fake profiles

### 🤝 Smart Socialising Features
- **AI-Powered Matching** - Find compatible study buddies, activity partners, and friends
- **Interest Communities** - Join groups based on hobbies, academics, and campus life
- **Friend Introductions** - Let friends play wingman and introduce compatible people
- **Rizz in 5 System** - Quality conversations with 5-message starter limit
- **Daily Discover** - Fresh connections and campus highlights every day

### 🎯 Core Platforms

#### 1. **COMMUNITIES** - Join Your Tribe
- Study groups by subject and semester
- Hobby circles (music, sports, gaming, art)
- Event planning committees
- Support groups and mentorship circles
- Cultural and regional communities

#### 2. **SMART MATCHING** - AI-Powered Connections
- Compatibility scoring based on interests and personality
- Study buddy finder for academic collaboration
- Activity partner matching for campus events
- Quality-focused dating with meaningful connections

#### 3. **FRIEND INTRODUCTIONS** - Social Wingman
- Anonymous friend introductions
- Compatibility analysis for potential connections
- Social proof through mutual friends
- Gamified matchmaking with success tracking

#### 4. **RIZZ IN 5** - Quality Conversations
- 5-message conversation starters
- AI-powered icebreaker suggestions
- Seamless transition to preferred messaging platforms
- Focus on meaningful interactions over endless chatting

#### 5. **DAILY DISCOVER** - Campus Serendipity
- Daily featured students and communities
- Campus event highlights and recommendations
- Random coffee chat pairings
- Streak rewards for consistent engagement

#### 6. **CAMPUS EVENTS** - Real-World Meetups
- Event creation and management tools
- RSVP tracking and attendee matching
- Study session coordination
- Social gathering organization

## 🏛️ Supported Institutions

### Current Support
- **BITS Pilani** - All campuses (Pilani, Goa, Hyderabad, Dubai)
- **IITs** - Delhi, Bombay, Kharagpur (expanding)
- **NITs** - Karnataka, Trichy (expanding)

### Expansion Pipeline
- Top engineering colleges
- Premier management institutes
- Leading liberal arts universities
- Medical and law schools

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Quick Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd origo-campus-social
npm install
```

2. **Environment Configuration**
Create `.env` file:
```env
VITE_SUPABASE_URL=https://pzeftkaxveltnfuorwqn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZWZ0a2F4dmVsdG5mdW9yd3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzAyNTUsImV4cCI6MjA3MTU0NjI1NX0.TdYIonPgwo2ZpNOH3OS09gjAYqoy0rUtIclnxqPdMeQ
```

3. **Start Development**
```bash
npm run dev
```

4. **Access Application**
- Local: http://localhost:3000
- Features: All core features with Supabase backend

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for client-side routing
- **Zustand** for state management

### Backend Infrastructure
- **Supabase** for database, auth, and real-time features
- **PostgreSQL** for robust data storage
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates
- **Edge Functions** for serverless computing

### AI & Recommendations
- **Local Algorithm** for privacy-first matching
- **Vector Similarity** for interest-based recommendations
- **Collaborative Filtering** for improved suggestions
- **Fallback System** for reliable performance

## 🎨 Design Philosophy

### Inspired by Modern Leaders
- **Schmooze.in** - Clean, community-focused design
- **Discord** - Community organization and engagement
- **Notion** - Intuitive information architecture
- **Linear** - Smooth animations and micro-interactions

### Design Principles
- **Community First** - Groups and connections over individual profiles
- **Authentic Interactions** - Real conversations over superficial swiping
- **Campus Context** - Features designed for student life
- **Inclusive Design** - Accessible to all students regardless of background
- **Privacy Conscious** - Transparent data usage and strong privacy controls

## 🔒 Security & Privacy

### Multi-Layer Security
- **Email Domain Validation** - Only verified institutional emails
- **Student ID Verification** - Manual review process
- **JWT Authentication** - Secure token-based auth
- **Row Level Security** - Database-level access control
- **Content Moderation** - AI + human review system

### Privacy Features
- **Granular Controls** - Choose who can find and contact you
- **Anonymous Options** - Anonymous introductions and community participation
- **Data Minimization** - Collect only essential information
- **Right to Delete** - Complete data removal on request

## 💰 Monetization Strategy

### Freemium Model
- **Free Tier**: Full campus access with basic features
- **Premium (₹399/month)**: Cross-campus networking, advanced filters, priority matching
- **Digital Goods**: Custom themes, stickers, profile boosts
- **Pay-Per-Use**: Friend introductions, event promotions, community boosts

### Revenue Streams
1. **Subscription Revenue** (60%) - Premium memberships
2. **In-App Purchases** (25%) - Digital goods and boosts
3. **Enterprise Partnerships** (10%) - Campus integrations
4. **Sponsored Content** (5%) - Brand partnerships

## 📊 Success Metrics

### User Engagement
- **Daily Active Users** - Core engagement tracking
- **Community Participation** - Group activity and contribution
- **Connection Quality** - Successful long-term relationships
- **Campus Event Attendance** - Real-world engagement

### Business Metrics
- **Premium Conversion Rate** - Target: 10-15%
- **Average Revenue Per User** - Target: ₹350-450/month
- **Customer Lifetime Value** - Target: ₹4000-6000
- **Churn Rate** - Target: <5% monthly

## 🚀 Development Status

### ✅ Completed Features
- Authentication system with Google OAuth
- Basic profile creation and onboarding
- Community discovery interface
- Smart matching algorithm (local)
- Real-time messaging foundation
- Responsive design system

### 🚧 In Development
- Advanced community features
- Event planning and management
- Friend introduction system
- Premium subscription integration
- Mobile app development

### 📋 Upcoming Features
- Video integration for virtual events
- Advanced AI personality matching
- Cross-campus networking tools
- Enterprise campus partnerships
- Analytics dashboard for insights

## 🤝 Contributing

We welcome contributions from the student developer community! 

### Development Guidelines
- **Code Quality** - TypeScript strict mode, ESLint, Prettier
- **Testing** - Comprehensive test coverage for critical features
- **Documentation** - Clear documentation for all new features
- **Security** - Security-first development practices

### Getting Involved
1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests and documentation
5. Submit a pull request

## 📞 Support & Community

### Getting Help
- **Documentation** - Comprehensive guides and API docs
- **Community Discord** - Join our developer community
- **Email Support** - support@origo.app
- **Campus Ambassadors** - Student representatives at each institution

### Feedback & Suggestions
- **Feature Requests** - Submit ideas through GitHub issues
- **Bug Reports** - Help us improve the platform
- **User Research** - Participate in user experience studies
- **Beta Testing** - Early access to new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Student Communities** - For inspiration and continuous feedback
- **Campus Partners** - Educational institutions supporting our mission
- **Open Source Community** - For the amazing tools and libraries
- **Mental Health Advocates** - For highlighting the importance of student wellbeing

---

**Made with ❤️ for students, by students**

*Smart socialising for campus life - where authentic connections begin! 🎓✨*