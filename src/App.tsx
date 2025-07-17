import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Play,
  Calendar,
  Users,
  Book,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Clock,
  ChevronRight,
  Cross,
  ArrowDown
} from "lucide-react";
import SermonsPage from './SermonsPage';

export default function AgapeChurch() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const churchInfo = {
    name: "AGAPE BIBLE CHURCH",
    address: "12 B Cross, Sonnappa Block, Pillanna Garden 3rd Stage",
    city: "Bangalore 560045, Karnataka, India",
    phone: "+91 9901613901",
    altPhone: "+91 9900167714",
    email: "abcabfindia@gmail.com",
    website: "agapebangalore.org",
    established: "August 5th, 1990",
    type: "Independent, Indigenous, Evangelical, and Charismatic Church",
    description: "An independent, non-denominational Tamil church dedicated to reaching the unreached, teaching the reached, and touching the untouched with the Gospel of Jesus Christ.",
    mission: "Our mission encompasses sending Church Planters throughout the state of Karnataka for the purpose of evangelism, Bible training, and supporting native missionaries. We extend love especially to marginalized individuals such as orphans, street children, rag pickers, eunuchs, and others who have been abandoned by society.",
    churches: "Currently, Agape directly oversees the operation of six churches, and many others receive guidance and support through discreet direction."
  };

  const sermonCategories = {
    "Church Life & Unity": [
      {
        title: "UNITY, INTEGRITY, AND THE FEAR OF GOD",
        speaker: "Rev. Dr. Jim Reuben Elliot",
        date: "June 10, 2025",
        duration: "1:34 min",
        description: "A call to be builders, not breakers, in the church",
        thumbnail: "/unity-integrity-sermon.jpg.avif",
        videoId: "AuSGBxGT-Hk"
      },
      {
        title: "BE ZEALOUS FOR THE HOUSE OF GOD",
        speaker: "Bishop Dr. Reuben M. Sathiyaraj",
        date: "June 29, 2025",
        duration: "38 min",
        description: "Understanding our responsibility toward God's house",
        thumbnail: "/stand-united-sermon.jpg",
        videoId: "jlZ3ecEwTK8"
      }
    ],
    "Gospel & Healing": [
      {
        title: "Jesus Heals the Leper",
        speaker: "Rev. Dr. Jim Reuben Elliot",
        date: "March 2023",
        duration: "35 min",
        description: "A Gospel sermon from our open-air crusades in Bagalur Layout",
        thumbnail: "/jesus-heals-leper.jpg",
        videoId: "P5GCZwXUMh8"
      }
    ]
  };

  const recentSermons = Object.values(sermonCategories).flat().slice(0, 3);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to Content Link (for accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        tabIndex={0}
      >
        Skip to main content
      </a>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50" aria-label="Main Navigation">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 font-serif text-xl font-medium hover:text-primary transition-colors"
            >
              <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-8 w-8 object-contain" />
              <span>AGAPE BIBLE CHURCH</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">About</button>
              <button onClick={() => scrollToSection('vision')} className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Vision</button>
              <button onClick={() => scrollToSection('pastor')} className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Pastor</button>
              <Link to="/sermons" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Sermons</Link>
              <button onClick={() => scrollToSection('ministry')} className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Ministry</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border/50 py-4">
              <div className="space-y-2">
                <button onClick={() => scrollToSection('about')} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">About</button>
                <button onClick={() => scrollToSection('vision')} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Vision</button>
                <button onClick={() => scrollToSection('pastor')} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Pastor</button>
                <Link to="/sermons" className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Sermons</Link>
                <button onClick={() => scrollToSection('ministry')} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Ministry</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-2 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} aria-label="Main Content">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative bg-background">
        <div className="hero-image-overlay" />
        <img 
          src="/authentic-church-worship.webp"
          srcSet="/authentic-church-worship.webp 1x, /authentic-church-worship.png 2x"
          alt="Agape Bible Church Hero Banner - Authentic Worship"
          width="1536"
          height="1024"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 image-overlay-center opacity-0 hover:opacity-100">
          <div className="text-center text-white px-6">
            <h3 className="text-2xl font-bold mb-2">Our Faithful Congregation</h3>
            <p className="text-lg opacity-90">United in worship and fellowship since 1990</p>
          </div>
        </div>
        <div className="container-wide relative z-10 text-center space-y-8">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              Established {churchInfo.established}
            </Badge>
              <h1 className="text-hero font-bold tracking-tight" id="site-title">{churchInfo.name}</h1>
              <p className="text-large text-foreground max-w-4xl mx-auto font-light">
              {churchInfo.description}
            </p>
            <Badge variant="outline" className="text-base px-6 py-2">
              {churchInfo.type}
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="text-lg px-8 py-3" onClick={() => scrollToSection('about')}>
              Learn Our Story
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover:bg-accent hover:text-accent-foreground" onClick={() => scrollToSection('contact')}>
              <MapPin className="h-5 w-5 mr-2" />
              Visit Us
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome & Vision Section */}
      <section id="vision" className="section-spacing bg-primary text-primary-foreground">
        <div className="container-wide">
          <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl font-semibold mb-6">Welcoming You Home</h2>
            <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-large text-foreground leading-relaxed">
                Agape Bible Church is an independent, non-denominational Tamil Church located in the heart of Bangalore city 
                proclaiming the gospel of Christ Jesus by all means, at any cost, without anymore delay!
              </p>
                <p className="text-large text-foreground leading-relaxed">
                You are welcomed to join us and share in our vision and run with us towards the goal, 
                Christ Jesus has called us towards.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-6">Our Vision & Mission</h3>
                  <div className="bg-card p-6 rounded-lg border border-primary-foreground/20">
                    <p className="text-xl text-foreground font-semibold mb-4">
                    Reaching the Unreached, teaching the Reached and touching the Untouched with the Gospel of Jesus Christ, 
                    by all means, at any cost, without anymore delay!
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                  <h4 className="text-xl text-foreground font-medium mb-1">UNCONDITIONAL LOVE OF CHRIST AND WE LIVE BY IT</h4>
                  <p className="text-foreground leading-relaxed">
                  We are a non denominational, community based, multi ethnic Church located in Bangalore city, Karnataka 
                  in the southern part of India. We are committed to teaching the word of God, training disciples, 
                  sending missionaries and Church planting in the remotest parts of Southern India.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
                <Card className="bg-card text-foreground border-border/50">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold text-primary-foreground mb-4">
                    Join Our Mission
                  </h4>
                  <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                    We hope you have a great time browsing our site to find out what God is doing through Agape 
                    in this part of the world. We would love for you to join us at one of our services or 
                    partner with us in some way for the kingdom work and God's glory.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      onClick={() => scrollToSection('contact')}
                      className="flex-1"
                    >
                      Visit This Sunday
                      <Calendar className="h-5 w-5 ml-2" />
                    </Button>
                    <Button 
                        variant="secondary" 
                      size="lg" 
                      onClick={() => scrollToSection('about')}
                        className="flex-1"
                    >
                      Read More
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="text-center space-y-2 p-4 bg-card rounded-lg">
                  <div className="text-2xl font-bold">1990</div>
                    <p className="text-sm text-foreground/80">Established</p>
                </div>
                  <div className="text-center space-y-2 p-4 bg-card rounded-lg">
                  <div className="text-2xl font-bold">Multi-Ethnic</div>
                    <p className="text-sm text-foreground/80">Community</p>
                </div>
                  <div className="text-center space-y-2 p-4 bg-card rounded-lg">
                  <div className="text-2xl font-bold">Tamil</div>
                    <p className="text-sm text-foreground/80">Heritage</p>
                </div>
                  <div className="text-center space-y-2 p-4 bg-card rounded-lg">
                  <div className="text-2xl font-bold">Bangalore</div>
                    <p className="text-sm text-foreground/80">Located</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
        <section id="about" className="section-spacing bg-card text-foreground">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl font-semibold mb-6">Our Journey Since 1990</h2>
              <p className="text-large text-foreground max-w-4xl mx-auto">
              Our journey commenced on {churchInfo.established}. We are an {churchInfo.type} located in Bangalore, India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                Manifesting Love Through Action
              </h3>
                <p className="text-lg text-foreground leading-relaxed">
                  At AGAPE BIBLE CHURCH, we believe that love is most meaningful when it's put into action; it's about helping others discover Jesus in the tapestry of our daily lives.
              </p>
                <p className="text-lg text-foreground leading-relaxed">
                Our congregation is dedicated to showcasing God's love through tangible acts of kindness, making us a practical and living testament to His grace.
              </p>
            </div>
            <div className="relative group ministry-image-container">
              <img 
                src="/community-fellowship.png" 
                alt="Community Fellowship and Bible Study" 
                className="w-full h-96 object-cover rounded-lg shadow-2xl image-hover-zoom"
              />
              <div className="ministry-overlay image-overlay-center opacity-0 group-hover:opacity-100">
                <div className="text-center text-white px-6">
                  <h4 className="text-2xl font-bold mb-2">Community Fellowship</h4>
                  <p className="text-lg opacity-90">Building relationships through Bible study and prayer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 group ministry-image-container">
              <img 
                src="/children-ministry-authentic.png" 
                  alt="Reaching Out to Bangalore - Children's Ministry" 
                className="w-full h-96 object-cover rounded-lg shadow-2xl image-hover-zoom"
              />
              <div className="ministry-overlay image-overlay-center opacity-0 group-hover:opacity-100">
                <div className="text-center text-white px-6">
                    <h4 className="text-2xl font-bold mb-2">Reaching Out to Bangalore</h4>
                    <p className="text-lg opacity-90">Serving the children and communities of Bangalore with love and hope</p>
                </div>
              </div>
              <div className="image-badge bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
                <h3 className="text-2xl font-semibold text-foreground">
                Reaching Out to Bangalore
              </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                Nestled in the heart of Bangalore, we hold a deep affection for this city's rich traditions, diverse cultures, and the warmth that people from all walks of life bring.
              </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                Our love for Bangalore stems from the fact that Jesus loves this city passionately, having given His life so that every resident may experience a transformative journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor Section */}
        <section id="pastor" className="section-spacing bg-background text-foreground">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl font-semibold text-foreground">Our Pastor</h2>
            <p className="text-large text-muted-foreground max-w-4xl mx-auto">
              From rebellion to redemption - the remarkable journey of our founding pastor.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
              <Card className="bg-card text-foreground border-border/50">
              <CardHeader className="text-center pb-6">
                  <CardTitle className="text-4xl font-bold">Archbishop Dr. Reuben M. Sathiyaraj</CardTitle>
                <CardDescription className="text-lg">Founding Senior Pastor - Established Agape Bible Fellowship 1990</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                  <div className="flex justify-center mb-8">
                    <img 
                      src="/pastor.png" 
                      alt="Archbishop Dr. Reuben M. Sathiyaraj - Founding Pastor" 
                      className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-primary"
                    />
                  </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-primary">35+</div>
                    <p className="text-sm text-muted-foreground">Years of Ministry</p>
                  </div>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-primary">1000+</div>
                    <p className="text-sm text-muted-foreground">Believers Served</p>
                  </div>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-primary">6</div>
                    <p className="text-sm text-muted-foreground">Churches Overseen</p>
                  </div>
                </div>
                <Separator className="opacity-50" />
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-xl font-medium mb-1">From Despair to Calling</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Born into poverty in Tamil Nadu, Reuben's journey began with rebellion against his mother's dedication of him to God's ministry. After being robbed and left destitute in Chennai, contemplating suicide, he heard God's call on a beach during a Gospel meeting.
                      </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-medium mb-1">Pioneer Missionary</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        At just 16, he began pioneering work in the Andaman & Nicobar Islands, reaching primitive tribal groups including the "Onge" and "Jarawa" tribes. Many churches were planted that continue expanding today.
                      </p>
                    </div>
                  </div>
                  <div className="bg-card/30 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-lg italic text-muted-foreground mb-2">
                      "For though I preach the gospel, I have nothing to glory of: for necessity is laid upon me; yea, woe is unto me, if I preach not the gospel!"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      - 1 Corinthians 9:16, Archbishop Sathiyaraj's life verse
                    </p>
                  </div>
                  <div className="text-center pt-6">
                    <Link to="/pastor-biography">
                      <Button size="lg" className="text-lg px-8 py-3">
                        Read Complete Biography
                        <Book className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
        <section id="sermons" className="section-spacing bg-card text-foreground">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl font-semibold text-foreground">
              Life-Changing Messages
            </h2>
              <p className="text-large text-muted-foreground max-w-4xl mx-auto">
              Listen to biblical messages that transform hearts and renew minds. Available on YouTube and all major podcast platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {recentSermons.map((sermon, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-card text-foreground border-border/50">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={sermon.thumbnail} 
                      alt={sermon.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="lg" className="bg-white/90 text-black hover:bg-white" aria-label="Play video">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {sermon.duration}
                    </div>
                  </div>
                </CardContent>
                <CardHeader>
                    <CardTitle className="text-lg text-foreground line-clamp-2">{sermon.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                    {sermon.speaker}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{sermon.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {sermon.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-8">
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                  <a href="https://www.youtube.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="h-4 w-4 mr-2 text-orangeBrand" />
                  YouTube
                </a>
              </Button>
                <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                  <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer" aria-label="Podcasts">
                  <span className="mr-2">🎧</span>
                  Podcasts
                </a>
              </Button>
                <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                  <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                  <span className="mr-2">🎵</span>
                  Spotify
                </a>
              </Button>
            </div>
            
            {/* Spotify Podcast Player */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Listen to Our Podcast</h3>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <iframe 
                  src="https://open.spotify.com/embed/show/45oJua9cpBUCHKeh2WoZMH?utm_source=generator&theme=0" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="rounded-lg"
                    title="Agape Bible Church Podcast on Spotify"
                ></iframe>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                  Listen to our latest messages and teachings directly from Spotify. 
                  New episodes published regularly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Street Children Ministry Section */}
        <section id="ministry" className="section-spacing bg-background text-foreground">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl font-semibold mb-6">Heart for the Marginalized</h2>
              <p className="text-large text-foreground max-w-4xl mx-auto">
              Our heart breaks for the 70,000 rag pickers and 65,000 street children in Bangalore. Through the Agape Children Centre, we provide hope, shelter, and Christ's love.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">70,000</div>
                <p className="text-foreground">Rag Pickers in Bangalore</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">65,000</div>
                <p className="text-foreground">Street Children</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">50%</div>
                <p className="text-foreground">Are Minors</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-bold text-primary">750</div>
                <p className="text-foreground">Slum Areas</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Agape Children Centre</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide a safe haven for abandoned children aged 5-12, offering shelter, hygiene facilities, nutritious meals, and most importantly - unconditional love and protection from exploitation.
              </p>
              <div className="space-y-3">
                  <h4 className="text-xl font-medium mb-1">Their Hidden Value</h4>
                <p className="text-muted-foreground">
                  25% of recycled materials in our homes come from their work - contributing significantly to environmental protection while society overlooks their value.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3 text-center p-6 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary">25-75</div>
                <p className="text-sm text-muted-foreground">Rupees earned daily</p>
              </div>
                <div className="space-y-3 text-center p-6 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary">20km</div>
                <p className="text-sm text-muted-foreground">Traveled daily for collections</p>
              </div>
                <div className="space-y-3 text-center p-6 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary">25%</div>
                <p className="text-sm text-muted-foreground">Of recycled materials</p>
              </div>
                <div className="space-y-3 text-center p-6 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary">6</div>
                <p className="text-sm text-muted-foreground">Churches directly overseen</p>
              </div>
            </div>
          </div>

            <div className="bg-card p-8 rounded-lg border-l-4 border-primary">
            <h4 className="text-xl font-semibold text-primary mb-4">Our Mission Work</h4>
            <p className="text-muted-foreground mb-4">
              Since we believe the main task of the Church is evangelizing its own community, we send native missionaries and support them through prayer and financial provision. We have sent out hundreds of missionaries to plant Churches across Karnataka.
            </p>
            <p className="text-muted-foreground mb-6">
              {churchInfo.churches}
            </p>
            <div className="text-center">
              <Link to="/ministry">
                <Button size="lg" className="text-lg px-8 py-3">
                  Learn More About Our Ministries
                  <Book className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
        <section id="contact" className="section-spacing bg-card text-foreground">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl font-semibold text-foreground">Visit Us This Sunday</h2>
              <p className="text-large text-foreground max-w-4xl mx-auto">
              Experience worship, fellowship, and biblical teaching in a welcoming environment. You are always welcome at Agape Bible Church.
            </p>
          </div>

            {/* Enhanced Contact Card for better visibility */}
            <div className="rounded-2xl bg-card border border-border/50 shadow-lg p-8 mb-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  Location
                </h3>
                <div className="space-y-2">
                      <p className="text-lg font-medium text-foreground">{churchInfo.name}</p>
                      <p className="text-muted-foreground">{churchInfo.address}</p>
                      <p className="text-muted-foreground">{churchInfo.city}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  Service Times
                </h3>
                <div className="space-y-2">
                      <p className="text-lg text-foreground">Sunday Worship: 9:00 AM & 11:00 AM</p>
                      <p className="text-lg text-foreground">Wednesday Bible Study: 7:00 PM</p>
                      <p className="text-lg text-foreground">Saturday Youth Fellowship: 6:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                  Get In Touch
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-lg">
                    <Phone className="h-5 w-5 text-gray-500" />
                        <span className="text-foreground">{churchInfo.altPhone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <span className="text-foreground">{churchInfo.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Connect With Us</h3>
                <div className="flex gap-4">
                      <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                        <a href="https://facebook.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                          <Facebook className="h-5 w-5 text-orangeBrand" />
                    </a>
                  </Button>
                      <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                        <a href="https://instagram.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                          <Instagram className="h-5 w-5 text-orangeBrand" />
                    </a>
                  </Button>
                      <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                        <a href="https://twitter.com/abcabfindia" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                          <Twitter className="h-5 w-5 text-orangeBrand" />
                    </a>
                  </Button>
                      <Button variant="outline" size="lg" className="text-foreground border-gray-300 hover:bg-gray-50" asChild>
                        <a href="https://www.youtube.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                          <Youtube className="h-5 w-5 text-orangeBrand" />
                    </a>
                  </Button>
                </div>
              </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed - Larger */}
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-4xl aspect-[3/2] rounded-2xl overflow-hidden border border-gray-300 shadow-xl">
                <iframe
                  title="Agape Bible Church Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.241964073964!2d77.620333!3d13.0132357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16e2a094bf89%3A0xa0896909de2109f4!2sAgape%20Bible%20Church!5e0!3m2!1sen!2sin!4v1718030000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>
          
          <div className="text-center">
              <Button size="lg" className="text-lg px-8 py-3 bg-accent text-foreground"
                onClick={() => scrollToSection('hero')}
                onMouseOver={e => e.currentTarget.classList.add('bg-orange-600')}
                onMouseOut={e => e.currentTarget.classList.remove('bg-orange-600')}
              >
              Plan Your Visit
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="section-spacing bg-background border-t border-border/50" aria-label="Site Footer">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-8 w-8 object-contain" />
                <span className="font-serif text-xl font-medium">AGAPE BIBLE CHURCH</span>
              </div>
              <p className="text-foreground leading-relaxed">
                An {churchInfo.type} located in Bangalore, India. Reaching the unreached, teaching the reached, and touching the untouched with the Gospel of Jesus Christ since {churchInfo.established}.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('about')} className="block text-muted-foreground hover:text-primary transition-colors">About Us</button>
                <button onClick={() => scrollToSection('vision')} className="block text-muted-foreground hover:text-primary transition-colors">Our Vision</button>
                <button onClick={() => scrollToSection('pastor')} className="block text-muted-foreground hover:text-primary transition-colors">Our Pastor</button>
                <button onClick={() => scrollToSection('sermons')} className="block text-muted-foreground hover:text-primary transition-colors">Sermons</button>
                <button onClick={() => scrollToSection('ministry')} className="block text-muted-foreground hover:text-primary transition-colors">Ministry Work</button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>{churchInfo.address}</p>
                <p>{churchInfo.city}</p>
                <p>{churchInfo.altPhone}</p>
                <p>{churchInfo.phone}</p>
                <p>{churchInfo.email}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 opacity-30" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Agape Bible Church Bangalore. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Part of Agape Bible Fellowship - Registered Charitable Trust
            </p>
          </div>
        </div>
      </footer>

      {/* Built by ELI */}
      <aside aria-label="Site Info" className="fixed bottom-4 right-4 z-50">
        <span
          className="inline-flex items-center px-4 py-2 rounded-full bg-card text-foreground text-xs font-semibold shadow-lg"
        >
          ✨ Built by ELI
        </span>
      </aside>
    </div>
  );
}
