import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { PerformanceMonitor } from "./components/ui/performance-monitor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Typewriter } from "@/components/ui/typewriter-text";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AnimatedButton, PrimaryAnimatedButton, SecondaryAnimatedButton } from "@/components/ui/animated-button";
import { StatCard } from "@/components/ui/animated-counter";
import { ParallaxBackground, FloatingElement } from "@/components/ui/parallax-elements";
import { MorphingCard } from "@/components/ui/advanced-cards";
import { TextReveal } from "@/components/ui/micro-interactions";
import { ScrollRevealSection, StaggerContainer, StaggerItem, AnimatedDivider } from "@/components/ui/scroll-orchestration";
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
  Clock,
  ChevronRight,
  ArrowDown,
  ArrowRight,
  Church,
  TrendingUp,
  ExternalLink
} from "lucide-react";

const AnimatedVisionText = React.memo(() => {
  const [visionIndex, setVisionIndex] = useState(0);
  
  const visionPhrases = useMemo(
    () => [
      { text: "Reaching the unreached", color: "text-primary", bgColor: "bg-primary/10" },
      { text: "Teaching the reached", color: "text-gold-600", bgColor: "bg-gold-500/10" },
      { text: "Touching the untouched", color: "text-burgundy-600", bgColor: "bg-burgundy-500/10" }
    ],
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisionIndex((prevIndex) => (prevIndex + 1) % visionPhrases.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [visionPhrases.length]);

  return (
    <div className="w-full text-center space-y-2 sm:space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="space-y-2 sm:space-y-3"
        >
          <div className="space-y-2 sm:space-y-3">
            {/* First part of the heading */}
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-display font-bold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
              <motion.span 
                className="inline-block mr-2 sm:mr-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                An independent,
              </motion.span>
              <motion.span 
                className="inline-block mr-2 sm:mr-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                non-denominational
              </motion.span>
              <motion.span 
                className="inline-block text-primary mr-2 sm:mr-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Tamil church
              </motion.span>
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                dedicated to
              </motion.span>
            </h1>
            
            {/* Animated vision text */}
            <div className="relative h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 flex items-center justify-center overflow-hidden my-2 sm:my-3">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-black leading-none">
                {visionPhrases.map((phrase, index) => (
                  <motion.div
                    key={`${index}-${phrase.text}`}
                    className={`absolute inset-0 flex items-center justify-center ${phrase.color}`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={
                      visionIndex === index
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: visionIndex > index ? -50 : 50, scale: 0.9 }
                    }
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.4 }
                    }}
                  >
                    <span className="text-center leading-none tracking-tight drop-shadow-lg">
                      {phrase.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Second part of the heading - same size as first part */}
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-display font-bold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                with the Gospel of Jesus Christ.
              </motion.span>
            </h1>
          </div>
        </motion.div>
    </div>
  );
});

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
    description: "An independent, non-denominational Tamil church dedicated to Reaching the unreached, Teaching the reached, and Touching the untouched with the Gospel of Jesus Christ.",
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
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Announcement Bar */}
      <div className="w-full fixed top-0 left-0 z-[100] bg-primary text-white flex items-center justify-center py-2 px-4 shadow-md text-sm font-medium overflow-hidden" style={{letterSpacing: '0.01em'}}>
        <div className="container-wide flex justify-center">
          <Typewriter 
            text="For prayer requests or assistance, reach out to us at +91 9901613901 or abcabfindia@gmail.com. Agape Bible Church cares for you."
            speed={40}
            cursor="|"
            loop={true}
            className="text-center max-w-full text-xs sm:text-sm"
          />
        </div>
      </div>
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg" aria-label="Main Navigation">
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 font-sans text-xl font-semibold text-navy-950 hover:text-primary transition-colors duration-200"
            >
              <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
              <span className="text-sm sm:text-base lg:text-xl">AGAPE BIBLE CHURCH</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={() => scrollToSection('about')} className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700">About</button>
              <button onClick={() => scrollToSection('vision')} className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700">Vision</button>
              <button onClick={() => scrollToSection('pastor')} className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700">Pastor</button>
              <Link to="/sermons" className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700">Sermons</Link>
              <button onClick={() => scrollToSection('ministry')} className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700">Ministry</button>
              <button onClick={() => scrollToSection('contact')} className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700">Contact</button>
              <AnimatedButton 
                size="sm" 
                className="ml-4 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg"
                onClick={() => scrollToSection('contact')}
                animationType="scale"
                intensity="subtle"
              >
                Visit Us
              </AnimatedButton>
            </div>

            {/* Mobile Menu Button - Enhanced for better touch targets */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-md hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>

          {/* Mobile Navigation - Enhanced spacing and touch targets */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-6 bg-white/98 backdrop-blur-md">
              <div className="space-y-2 px-2">
                <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700 min-h-[44px]">About</button>
                <button onClick={() => scrollToSection('vision')} className="block w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700 min-h-[44px]">Vision</button>
                <button onClick={() => scrollToSection('pastor')} className="block w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700 min-h-[44px]">Pastor</button>
                <Link to="/sermons" className="block w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700 min-h-[44px]">Sermons</Link>
                <button onClick={() => scrollToSection('ministry')} className="block w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700 min-h-[44px]">Ministry</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 rounded-md text-gray-700 min-h-[44px]">Contact</button>
                <div className="pt-6 border-t border-gray-200 mt-6 px-2">
                  <AnimatedButton 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-base rounded-full font-medium shadow-md min-h-[44px]"
                    onClick={() => scrollToSection('contact')}
                    animationType="scale"
                    intensity="subtle"
                  >
                    Visit Us
                  </AnimatedButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <main id="main-content" tabIndex={-1} aria-label="Main Content">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden mt-10">
        {/* Enhanced Background with Parallax */}
        <ParallaxBackground className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        </ParallaxBackground>
        
        {/* Floating Elements */}
        <FloatingElement delay={0} duration={6} className="top-1/4 left-1/4 opacity-20">
          <Heart className="h-16 w-16 text-primary" />
        </FloatingElement>
        <FloatingElement delay={2} duration={8} className="top-1/3 right-1/4 opacity-15">
          <Users className="h-12 w-12 text-secondary" />
        </FloatingElement>
        <FloatingElement delay={4} duration={5} className="bottom-1/3 left-1/6 opacity-10">
          <Book className="h-14 w-14 text-accent" />
        </FloatingElement>
        
        {/* Founding Father Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/1.jpg"
            alt="Founding Father of Agape Bible Church"
            width="2251"
            height="1500"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          {/* Optimized overlay for better text readability and alignment */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/60" />
        </div>
        
        {/* Content - Centered Overlay */}
        <div className="w-full relative z-10 text-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            {/* Established Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg"
            >
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-gray-700 tracking-wide">ESTABLISHED {churchInfo.established}</span>
            </motion.div>
            
            {/* Animated Church Vision - Full Width */}
            <div className="w-full">
              <AnimatedVisionText />
            </div>
            
            {/* Church Type Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-flex items-center justify-center"
            >
              <AnimatedGradientText className="text-base font-medium text-center leading-relaxed">
                {churchInfo.type}
              </AnimatedGradientText>
            </motion.div>
            
            {/* Call to Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-2"
            >
              <PrimaryAnimatedButton 
                size="lg" 
                className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-full font-semibold text-white"
                onClick={() => scrollToSection('about')}
                animationType="lift"
                intensity="medium"
              >
                Discover Our Story
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </PrimaryAnimatedButton>
              
              <SecondaryAnimatedButton 
                size="lg" 
                className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-full font-semibold"
                onClick={() => scrollToSection('contact')}
                animationType="bounce"
                intensity="medium"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Visit This Sunday
              </SecondaryAnimatedButton>
            </motion.div>
            
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 bg-white/80 rounded-full shadow-lg"
          >
            <ArrowDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider type="line" className="my-4 sm:my-6" />

      {/* Welcome & Vision Section */}
      <section id="vision" className="section-spacing bg-black text-white">
        <div className="container-wide">
          <div className="text-center space-y-8 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <Heart className="h-4 w-4 text-gold-500" />
                <span className="text-sm font-semibold text-gold-500">Our Vision</span>
              </div>
              <h2 className="text-section-title font-display font-bold text-white mb-6">Welcoming You Home</h2>
            <div className="max-w-4xl mx-auto space-y-6">
                <TextReveal 
                  text="Agape Bible Church is an independent, non-denominational Tamil Church located in the heart of Bangalore city proclaiming the gospel of Christ Jesus by all means, at any cost, without anymore delay!"
                  className="text-xl text-gray-200 leading-relaxed"
                />
                <TextReveal 
                  text="You are welcomed to join us and share in our vision and run with us towards the goal, Christ Jesus has called us towards."
                  delay={0.5}
                  className="text-xl text-gray-200 leading-relaxed"
                />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              <div className="space-y-6">
                  <h3 className="text-3xl font-display font-bold text-white mb-6">Our Vision & Mission</h3>
                  <div className="bg-black/80 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-2xl text-white font-semibold mb-4 leading-relaxed">
                    Reaching the unreached, Teaching the reached and Touching the untouched with the Gospel of Jesus Christ, 
                    by all means, at any cost, without anymore delay!
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                  <h4 className="text-xl text-gold-500 font-bold mb-4">UNCONDITIONAL LOVE OF CHRIST AND WE LIVE BY IT</h4>
                  <p className="text-gray-200 leading-relaxed text-lg">
                  We are a non denominational, community based, multi ethnic Church located in Bangalore city, Karnataka 
                  in the southern part of India. We are committed to teaching the word of God, training disciples, 
                  sending missionaries and Church planting in the remotest parts of Southern India.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
                <Card className="bg-black/90 text-white border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-display font-bold text-gold-500 mb-6">
                    Join Our Mission
                  </h4>
                  <p className="text-gray-200 mb-8 leading-relaxed text-lg">
                    We hope you have a great time browsing our site to find out what God is doing through Agape 
                    in this part of the world. We would love for you to join us at one of our services or 
                    partner with us in some way for the kingdom work and God's glory.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => scrollToSection('contact')}
                      className="flex-1 bg-gold-500 hover:bg-gold-600 text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                      Visit This Sunday
                      <Calendar className="h-5 w-5 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => scrollToSection('about')}
                      className="flex-1 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 font-semibold w-full sm:w-auto"
                    >
                      Read More
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="text-center space-y-2 p-6 bg-black/80 rounded-2xl border border-white/10">
                  <div className="text-3xl font-display font-bold text-gold-500">1990</div>
                    <p className="text-sm text-gray-300">Established</p>
                </div>
                  <div className="text-center space-y-2 p-6 bg-black/80 rounded-2xl border border-white/10">
                  <div className="text-3xl font-display font-bold text-gold-500">Multi-Ethnic</div>
                    <p className="text-sm text-gray-300">Community</p>
                </div>
                  <div className="text-center space-y-2 p-6 bg-black/80 rounded-2xl border border-white/10">
                  <div className="text-3xl font-display font-bold text-gold-500">Tamil</div>
                    <p className="text-sm text-gray-300">Heritage</p>
                </div>
                  <div className="text-center space-y-2 p-6 bg-black/80 rounded-2xl border border-white/10">
                  <div className="text-3xl font-display font-bold text-gold-500">Bangalore</div>
                    <p className="text-sm text-gray-300">Located</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider type="dots" className="my-12" />

      {/* About Section - Our Journey Since 1990 */}
      <section id="about" className="section-spacing bg-gradient-to-br from-gray-50 to-white">
        <div className="container-wide">
          {/* Enhanced Header */}
          <ScrollRevealSection className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Since 1990</span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Our Journey of <span className="text-primary">Faith</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Our journey commenced on <span className="font-semibold text-primary">{churchInfo.established}</span>. We are an {churchInfo.type} located in Bangalore, India, committed to spreading God's love through action.
            </motion.p>
          </ScrollRevealSection>

          {/* Timeline Visual */}
          <div className="relative mb-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16 lg:space-y-20">
              {/* 1990 - Foundation */}
              <StaggerContainer>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative">
                  {/* Mobile Timeline Indicator */}
                  <div className="lg:hidden w-full flex justify-center mb-8">
                    <div className="w-6 h-6 bg-primary border-4 border-white rounded-full shadow-lg"></div>
                  </div>
                  
                  <StaggerItem>
                    <div className="text-center lg:text-right space-y-6 lg:pr-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-sm font-semibold mb-4">
                        <Church className="h-4 w-4" />
                        1990
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        Humble Beginnings
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Founded with just 3 families, Archbishop Dr. Reuben Sathiyaraj planted the seeds of what would become a thriving church community in Bangalore. From the very beginning, our mission was clear: to reach the unreached, teach the reached, and touch the untouched.
                      </p>
                      <div className="flex items-center gap-4 justify-center lg:justify-end">
                        <div className="flex items-center gap-2 text-primary">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold">3 Families</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <MapPin className="h-4 w-4" />
                          <span className="font-semibold">Bangalore</span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <MorphingCard className="bg-white border border-gray-200 shadow-xl">
                      <div className="relative group overflow-hidden rounded-lg">
                        <img 
                          src="/original-church-photo.jpg" 
                          alt="Original Church Building - 1990" 
                          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="text-xl font-bold mb-1">Our First Home</h4>
                            <p className="text-sm opacity-90">Where it all began in 1990</p>
                          </div>
                        </div>
                      </div>
                    </MorphingCard>
                  </StaggerItem>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary border-4 border-white rounded-full shadow-lg z-10 hidden lg:block"></div>
                </div>
              </StaggerContainer>

              {/* Present Day - Growth */}
              <StaggerContainer>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative">
                  {/* Mobile Timeline Indicator */}
                  <div className="lg:hidden w-full flex justify-center mb-8">
                    <div className="w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
                  </div>
                  
                  <StaggerItem>
                    <MorphingCard className="bg-white border border-gray-200 shadow-xl lg:order-1">
                      <div className="relative group overflow-hidden rounded-lg">
                        <img 
                          src="/authentic-church-worship.png" 
                          alt="Modern Church Worship - Growing Community" 
                          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="text-xl font-bold mb-1">Thriving Community</h4>
                            <p className="text-sm opacity-90">1000+ believers worshipping together</p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Today
                        </div>
                      </div>
                    </MorphingCard>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="text-center lg:text-left space-y-6 lg:pl-12 lg:order-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                        <TrendingUp className="h-4 w-4" />
                        2024
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        Growing in Grace
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Today, we serve over 1000 believers and 250 children across 6 churches. Our ministry extends beyond our walls through rehabilitation homes for street children, training programs for pastors, and community outreach initiatives throughout Bangalore.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-primary/5 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary">1000+</div>
                          <div className="text-sm text-gray-600">Believers</div>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary">6</div>
                          <div className="text-sm text-gray-600">Churches</div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg z-10 hidden lg:block"></div>
                </div>
              </StaggerContainer>
            </div>
          </div>

          {/* Mission Cards */}
          <StaggerContainer>
            <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
              <StaggerItem>
                <Card className="bg-white border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Manifesting Love</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      At AGAPE BIBLE CHURCH, we believe that love is most meaningful when it's put into action. We help others discover Jesus through practical demonstrations of His love in our daily lives.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <ArrowRight className="h-4 w-4" />
                      <span>Love in Action</span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="bg-white border-2 border-primary/20 hover:border-primary/40 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Reaching Bangalore</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Nestled in the heart of Bangalore, we embrace this city's rich traditions and diverse cultures. Our love for Bangalore stems from Jesus's passionate love for every resident of this great city.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <ArrowRight className="h-4 w-4" />
                      <span>City-Wide Impact</span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>

          {/* Community Gallery */}
          <ScrollRevealSection>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Community in Action</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how God is working through our church family to impact lives across Bangalore
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <MorphingCard className="bg-white border border-gray-200 shadow-lg">
                <div className="relative group overflow-hidden">
                  <img 
                    src="/community-fellowship.png" 
                    alt="Community Fellowship and Bible Study" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">Fellowship</h4>
                      <p className="text-sm opacity-90">Building lasting relationships</p>
                    </div>
                  </div>
                </div>
              </MorphingCard>

              <MorphingCard className="bg-white border border-gray-200 shadow-lg">
                <div className="relative group overflow-hidden">
                  <img 
                    src="/children-ministry-authentic.png" 
                    alt="Children's Ministry Program" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">Children's Ministry</h4>
                      <p className="text-sm opacity-90">Nurturing young hearts</p>
                    </div>
                  </div>
                </div>
              </MorphingCard>

              <MorphingCard className="bg-white border border-gray-200 shadow-lg">
                <div className="relative group overflow-hidden">
                  <img 
                    src="/community-outreach.jpg" 
                    alt="Community Outreach Programs" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold mb-1">Outreach</h4>
                      <p className="text-sm opacity-90">Serving our community</p>
                    </div>
                  </div>
                </div>
              </MorphingCard>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Pastor Section */}
        <section id="pastor" className="section-spacing bg-black text-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <Users className="h-4 w-4 text-gold-500" />
                <span className="text-sm font-semibold text-gold-500">Leadership</span>
              </div>
              <h2 className="text-section-title text-white">Our Pastor</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              From rebellion to redemption - the remarkable journey of our founding pastor.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
              <MorphingCard className="bg-black/90 text-white border-white/10 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <TextReveal 
                    text="Archbishop Dr. Reuben M. Sathiyaraj"
                    className="text-5xl font-display font-bold text-white mb-4"
                  />
                  <CardDescription className="text-xl text-gold-500 font-semibold">Founding Senior Pastor - Established Agape Bible Fellowship 1990</CardDescription>
                </CardHeader>
              <CardContent className="space-y-10">
                  <div className="flex justify-center mb-12">
                    <div className="relative">
                      <img 
                        src="/pastor.png" 
                        alt="Archbishop Dr. Reuben M. Sathiyaraj - Founding Pastor" 
                        className="w-56 h-56 object-cover rounded-full shadow-2xl border-4 border-gold-500"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <StatCard value={35} suffix="+" label="Years of Ministry" className="text-gold-500" />
                  <StatCard value={1000} suffix="+" label="Believers Served" className="text-gold-500" />
                  <StatCard value={6} label="Churches Overseen" className="text-gold-500" />
                </div>
                <div className="border-t border-white/10 pt-8" />
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-gold-500 mb-4">From Despair to Calling</h4>
                      <p className="text-gray-200 leading-relaxed text-lg">
                        Born into poverty in Tamil Nadu, Reuben's journey began with rebellion against his mother's dedication of him to God's ministry. After being robbed and left destitute in Chennai, contemplating suicide, he heard God's call on a beach during a Gospel meeting.
                      </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-gold-500 mb-4">Pioneer Missionary</h4>
                      <p className="text-gray-200 leading-relaxed text-lg">
                        At just 16, he began pioneering work in the Andaman & Nicobar Islands, reaching primitive tribal groups including the "Onge" and "Jarawa" tribes. Many churches were planted that continue expanding today.
                      </p>
                    </div>
                  </div>
                  <div className="bg-black/80 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-2xl italic text-white mb-4 leading-relaxed font-serif">
                      "For though I preach the gospel, I have nothing to glory of: for necessity is laid upon me; yea, woe is unto me, if I preach not the gospel!"
                    </p>
                    <p className="text-gold-500 font-medium">
                      - 1 Corinthians 9:16, Archbishop Sathiyaraj's life verse
                    </p>
                  </div>
                  <div className="text-center pt-8">
                    <Link to="/pastor-biography">
                      <PrimaryAnimatedButton size="lg" className="text-lg px-8 py-4 rounded-full font-semibold" animationType="lift">
                        Read Complete Biography
                        <Book className="h-5 w-5 ml-2" />
                      </PrimaryAnimatedButton>
                    </Link>
                  </div>
                </div>
              </CardContent>
              </MorphingCard>
          </div>
        </div>
      </section>

      {/* Sermons Section */}
        <section id="sermons" className="section-spacing bg-gradient-to-b from-white to-gray-50">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Play className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Recent Sermons</span>
              </div>
              <h2 className="text-section-title text-gray-900 mb-6">
              Life-Changing Messages
            </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Listen to biblical messages that transform hearts and renew minds. Available on YouTube and all major podcast platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {recentSermons.map((sermon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={sermon.thumbnail} 
                      alt={sermon.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button size="lg" className="bg-white/90 text-primary hover:bg-white hover:scale-110 transition-all duration-200 rounded-full shadow-lg" aria-label="Play video">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {sermon.duration}
                    </div>
                    <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs px-3 py-1 rounded-full font-medium">
                      New
                    </div>
                  </div>
                </CardContent>
                <CardHeader className="p-6">
                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">{sermon.title}</CardTitle>
                    <CardDescription className="text-primary font-semibold">
                    {sermon.speaker}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                    <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{sermon.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {sermon.date}
                  </div>
                </CardContent>
              </Card>
                </motion.div>
            ))}
          </div>

          <div className="text-center space-y-6 sm:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Button variant="outline" size="lg" className="text-gray-700 border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 rounded-xl py-3 shadow-md hover:shadow-lg" asChild>
                  <a href="https://www.youtube.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <ExternalLink className="h-5 w-5 mr-2 text-red-500" />
                  YouTube
                </a>
              </Button>
                <Button variant="outline" size="lg" className="text-gray-700 border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 rounded-xl py-3 shadow-md hover:shadow-lg" asChild>
                  <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer" aria-label="Podcasts">
                  <span className="mr-2 text-lg">🎧</span>
                  Podcasts
                </a>
              </Button>
                <Button variant="outline" size="lg" className="text-gray-700 border-2 border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-200 rounded-xl py-3 shadow-md hover:shadow-lg" asChild>
                  <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                  <span className="mr-2 text-lg">🎵</span>
                  Spotify
                </a>
              </Button>
            </div>
            
            {/* Spotify Podcast Player */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">Listen to Our Podcast</h3>
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <iframe 
                  src="https://open.spotify.com/embed/show/45oJua9cpBUCHKeh2WoZMH?utm_source=generator&theme=0" 
                  width="100%" 
                  height="352" 
                  style={{ border: 0 }} 
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
        <section id="ministry" className="section-spacing bg-black text-white">
        <div className="container-wide">
          <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <Heart className="h-4 w-4 text-gold-500" />
                <span className="text-sm font-semibold text-gold-500">Our Ministry</span>
              </div>
              <h2 className="text-section-title text-white mb-6">Heart for the Marginalized</h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Our heart breaks for the 70,000 rag pickers and 65,000 street children in Bangalore. Through the Agape Children Centre, we provide hope, shelter, and Christ's love.
            </p>
          </div>

          {/* Statistics */}
          <ScrollRevealSection>
            <StaggerContainer staggerDelay={0.15}>
              <div className="grid md:grid-cols-4 gap-6 mb-20">
                <StaggerItem>
                  <StatCard
                    value={70000}
                    label="Rag Pickers in Bangalore"
                    className="text-primary"
                    icon={<Users className="h-8 w-8 text-primary" />}
                  />
                </StaggerItem>
                <StaggerItem>
                  <StatCard
                    value={65000}
                    label="Street Children"
                    className="text-gold-500"
                    icon={<Heart className="h-8 w-8 text-gold-500" />}
                  />
                </StaggerItem>
                <StaggerItem>
                  <StatCard
                    value={50}
                    label="Are Minors"
                    suffix="%"
                    className="text-accent"
                    icon={<Users className="h-8 w-8 text-accent" />}
                  />
                </StaggerItem>
                <StaggerItem>
                  <StatCard
                    value={750}
                    label="Slum Areas"
                    className="text-green-400"
                    icon={<MapPin className="h-8 w-8 text-green-400" />}
                  />
                </StaggerItem>
              </div>
            </StaggerContainer>
          </ScrollRevealSection>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
                <h3 className="text-4xl font-display font-bold text-white mb-6">Agape Children Centre</h3>
              <p className="text-xl text-gray-200 leading-relaxed">
                We provide a safe haven for abandoned children aged 5-12, offering shelter, hygiene facilities, nutritious meals, and most importantly - unconditional love and protection from exploitation.
              </p>
              <div className="space-y-4 p-8 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h4 className="text-2xl font-bold text-gold-500 mb-4">Their Hidden Value</h4>
                <p className="text-gray-200 leading-relaxed text-lg">
                  25% of recycled materials in our homes come from their work - contributing significantly to environmental protection while society overlooks their value.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4 text-center p-8 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-all">
                <div className="text-4xl font-display font-bold text-primary">25-75</div>
                <p className="text-gray-200 font-medium">Rupees earned daily</p>
              </div>
                <div className="space-y-4 text-center p-8 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-all">
                <div className="text-4xl font-display font-bold text-gold-500">20km</div>
                <p className="text-gray-200 font-medium">Traveled daily for collections</p>
              </div>
                <div className="space-y-4 text-center p-8 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-all">
                <div className="text-4xl font-display font-bold text-accent">25%</div>
                <p className="text-gray-200 font-medium">Of recycled materials</p>
              </div>
                <div className="space-y-4 text-center p-8 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-black/70 transition-all">
                <div className="text-4xl font-display font-bold text-green-400">6</div>
                <p className="text-gray-200 font-medium">Churches directly overseen</p>
              </div>
            </div>
          </div>

            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h4 className="text-3xl font-display font-bold text-gold-500 mb-8">Our Mission Work</h4>
            <p className="text-gray-200 mb-8 leading-relaxed text-lg">
              Since we believe the main task of the Church is evangelizing its own community, we send native missionaries and support them through prayer and financial provision. We have sent out hundreds of missionaries to plant Churches across Karnataka.
            </p>
            <p className="text-gray-200 mb-10 leading-relaxed text-lg">
              {churchInfo.churches}
            </p>
            <div className="text-center">
              <Link to="/ministry">
                <Button size="lg" className="text-lg px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span className="text-white">Learn More About Our Ministries</span>
                  <Book className="h-5 w-5 ml-2 text-white" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
        <section id="contact" className="section-spacing bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center space-y-8 mb-20">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full mb-6">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold text-primary">Join Our Community</span>
              </div>
              <h2 className="text-section-title text-gray-900 mb-6">Visit Us This Sunday</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience authentic worship, meaningful fellowship, and biblical teaching in a warm, welcoming environment. 
                Whether you're exploring faith or looking for a church home, you'll find a place at Agape Bible Church.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Sunday Services: 9:00 AM & 11:00 AM</span>
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-5 w-5 text-secondary" />
                  <span className="font-medium">All are welcome</span>
                </div>
              </div>
          </div>

            {/* Enhanced Contact Card with better organization */}
            <div className="rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 md:p-12 mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                {/* Location Information */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      Location
                    </h3>
                    <div className="space-y-3">
                      <p className="text-xl font-semibold text-gray-900">{churchInfo.name}</p>
                      <p className="text-gray-600 leading-relaxed">{churchInfo.address}</p>
                      <p className="text-gray-600 font-medium">{churchInfo.city}</p>
                    </div>
                  </div>
                </div>

                {/* Service Times */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-3 bg-secondary/10 rounded-full">
                        <Clock className="h-6 w-6 text-secondary" />
                      </div>
                      Service Times
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
                        <p className="text-lg font-semibold text-gray-900">Sunday Worship</p>
                        <p className="text-gray-600">9:00 AM & 11:00 AM</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-secondary">
                        <p className="text-lg font-semibold text-gray-900">Wednesday Bible Study</p>
                        <p className="text-gray-600">7:00 PM</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-accent">
                        <p className="text-lg font-semibold text-gray-900">Saturday Youth Fellowship</p>
                        <p className="text-gray-600">6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Social */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-3 bg-accent/10 rounded-full">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      Contact
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Primary</p>
                          <p className="text-gray-700 font-medium">{churchInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Alternative</p>
                          <p className="text-gray-700 font-medium">{churchInfo.altPhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-display font-bold text-gray-900">Follow Us</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 rounded-xl p-3 shadow-sm hover:shadow-md" asChild>
                        <a href="https://facebook.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium">Facebook</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-700 border-2 border-gray-200 hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 rounded-xl p-3 shadow-sm hover:shadow-md" asChild>
                        <a href="https://instagram.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-pink-600" />
                          <span className="text-xs font-medium">Instagram</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-700 border-2 border-gray-200 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-xl p-3 shadow-sm hover:shadow-md" asChild>
                        <a href="https://twitter.com/abcabfindia" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-sky-600" />
                          <span className="text-xs font-medium">Twitter</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-700 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl p-3 shadow-sm hover:shadow-md" asChild>
                        <a href="https://www.youtube.com/agapebangalore" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-red-600" />
                          <span className="text-xs font-medium">YouTube</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Section */}
            <div className="bg-gray-50 rounded-3xl p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Find Us on the Map</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We're conveniently located in Bangalore. Click on the map for directions, or use the contact information above to reach us.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-5xl aspect-[3/2] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
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
            </div>
          
          <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Ready to Join Us?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the next step in your faith journey. We'd love to welcome you into our church family this Sunday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => scrollToSection('hero')}
              >
                Plan Your Visit
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                onClick={() => scrollToSection('contact')}
              >
                Get Directions
                <MapPin className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16" aria-label="Site Footer">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-12 w-12 object-contain" />
                <span className="font-display text-2xl font-bold">AGAPE BIBLE CHURCH</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                An {churchInfo.type} located in Bangalore, India. Reaching the unreached, Teaching the reached, and Touching the untouched with the Gospel of Jesus Christ since {churchInfo.established}.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-display font-bold text-xl text-white">Quick Links</h4>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-primary transition-colors duration-200">About Us</button>
                <button onClick={() => scrollToSection('vision')} className="block text-gray-300 hover:text-primary transition-colors duration-200">Our Vision</button>
                <button onClick={() => scrollToSection('pastor')} className="block text-gray-300 hover:text-primary transition-colors duration-200">Our Pastor</button>
                <button onClick={() => scrollToSection('sermons')} className="block text-gray-300 hover:text-primary transition-colors duration-200">Sermons</button>
                <button onClick={() => scrollToSection('ministry')} className="block text-gray-300 hover:text-primary transition-colors duration-200">Ministry Work</button>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-display font-bold text-xl text-white">Contact Info</h4>
              <div className="space-y-3 text-gray-200">
                <p className="flex items-center gap-2 text-gray-200">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-gray-200">{churchInfo.address}</span>
                </p>
                <p className="pl-6 text-gray-200">{churchInfo.city}</p>
                <p className="flex items-center gap-2 text-gray-200">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-gray-200">{churchInfo.altPhone}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-200">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-gray-200">{churchInfo.phone}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-200">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-gray-200">{churchInfo.email}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                © 2025 Agape Bible Church Bangalore. All rights reserved.
              </p>
              <p className="text-sm text-gray-400">
                Part of Agape Bible Fellowship - Registered Charitable Trust
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Built by Agape Family */}
      <aside aria-label="Site Info" className="fixed bottom-4 right-4 z-50">
        <span
          className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-xs font-semibold shadow-lg border border-gray-200"
        >
          ✨ Built by Agape Family
        </span>
      </aside>
      
      {/* Vercel Analytics */}
      <Analytics />
      {/* Vercel Speed Insights */}
      <SpeedInsights />
      {/* Performance Monitoring */}
      <PerformanceMonitor />
    </div>
  );
}