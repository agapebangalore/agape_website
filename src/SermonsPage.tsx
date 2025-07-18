import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { AnimatedGradientText } from './components/ui/animated-gradient-text';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Calendar, 
  Clock, 
  Youtube, 
  Search, 
  Filter,
  Menu,
  X,
  Heart,
  Users,
  Book
} from 'lucide-react';

// Sermon data structure
interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoId: string;
  category: string;
}

// Static sermon data - organized and curated
const sermonData: Sermon[] = [
  {
    id: "1",
    title: "UNITY, INTEGRITY, AND THE FEAR OF GOD",
    speaker: "Rev. Dr. Jim Reuben Elliot",
    date: "June 10, 2025",
    duration: "1:34 min",
    description: "A call to be builders, not breakers, in the church. Understanding the importance of unity in the body of Christ.",
    thumbnail: "/unity-integrity-sermon.jpg.avif",
    videoId: "AuSGBxGT-Hk",
    category: "Church Life & Unity"
  },
  {
    id: "2",
    title: "BE ZEALOUS FOR THE HOUSE OF GOD",
    speaker: "Bishop Dr. Reuben M. Sathiyaraj",
    date: "June 29, 2025",
    duration: "38 min",
    description: "Understanding our responsibility toward God's house and maintaining passion for His presence.",
    thumbnail: "/stand-united-sermon.jpg",
    videoId: "jlZ3ecEwTK8",
    category: "Church Life & Unity"
  },
  {
    id: "3",
    title: "Jesus Heals the Leper",
    speaker: "Rev. Dr. Jim Reuben Elliot",
    date: "March 2023",
    duration: "35 min",
    description: "A Gospel sermon from our open-air crusades in Bagalur Layout, demonstrating Christ's healing power.",
    thumbnail: "/jesus-heals-leper.jpg",
    videoId: "P5GCZwXUMh8",
    category: "Gospel & Healing"
  }
];

const categories = ["All", "Church Life & Unity", "Gospel & Healing", "Bible Study", "Testimonies"];

const SermonsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter sermons based on search and category
  const filteredSermons = sermonData.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        tabIndex={0}
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg" aria-label="Main Navigation">
        <div className="container-wide mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <Button variant="ghost" className="flex items-center gap-2" aria-label="Back to Main Site">
                <ArrowLeft className="w-4 h-4" />
                <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-8 w-8 object-contain" />
                                 <span className="font-display text-xl font-semibold text-gray-900">AGAPE BIBLE CHURCH</span>
              </Button>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <h1 className="text-xl font-bold text-gray-900">Sermons & Messages</h1>
            </div>
            
            <Button onClick={scrollToTop} variant="outline" size="sm" aria-label="Scroll to Top">
              Top
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} aria-label="Main Content">
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
          <div className="container-wide mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Play className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Sermons & Messages</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                  Life-Changing Messages
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                  Listen to biblical messages that transform hearts and renew minds. Watch our latest sermons, 
                  Bible studies, and inspirational teachings from Archbishop Dr. Reuben M. Sathiyaraj and Rev. Dr. Jim Reuben Elliot.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <a href="https://www.youtube.com/@AgapeBangalore" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-5 w-5 mr-2" />
                      Visit YouTube Channel
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300" asChild>
                    <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer">
                      <span className="mr-2">🎧</span>
                      Listen on Spotify
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-wide mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 mb-8"
              >
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search sermons by title, speaker, or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`${
                        selectedCategory === category 
                          ? 'bg-primary text-white' 
                          : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                      } transition-all duration-200`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </motion.div>
              
              {/* Results count */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                {filteredSermons.length} sermon{filteredSermons.length !== 1 ? 's' : ''} found
              </motion.p>
            </div>
          </div>
        </section>

        {/* Sermons Grid */}
        <section className="py-16">
          <div className="container-wide mx-auto px-6">
            {filteredSermons.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No sermons found</h3>
                <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.map((sermon, index) => (
                  <motion.div
                    key={sermon.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200 h-full">
                      <div className="relative overflow-hidden">
                        <img 
                          src={sermon.thumbnail} 
                          alt={sermon.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button size="lg" className="bg-white/90 text-primary hover:bg-white hover:scale-110 transition-all duration-200 rounded-full shadow-lg">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {sermon.duration}
                        </div>
                        <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {sermon.category}
                        </div>
                      </div>
                      
                      <CardHeader className="p-6">
                        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {sermon.title}
                        </CardTitle>
                        <CardDescription className="text-primary font-semibold">
                          {sermon.speaker}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-6 pb-6">
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {sermon.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {sermon.date}
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 transition-all duration-200"
                            asChild
                          >
                            <a 
                              href={`https://www.youtube.com/watch?v=${sermon.videoId}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Watch
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Podcast Section */}
        <section className="py-16 bg-black text-white">
          <div className="container-wide mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                <span className="text-2xl">🎧</span>
                                 <span className="text-sm font-semibold text-yellow-500">Podcast</span>
              </div>
              
                             <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                 Listen Anywhere, Anytime
               </h2>
              
              <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                Access our complete sermon library on Spotify. Perfect for your commute, workout, or quiet time.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="/agape-bible-church-logo.png" 
                    alt="Agape Bible Church Podcast" 
                    className="w-16 h-16 rounded-full shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Agape Bible Church Podcast</h3>
                    <p className="text-gray-300">Biblical messages for spiritual growth</p>
                  </div>
                </div>
                
                <iframe 
                  src="https://open.spotify.com/embed/show/45oJua9cpBUCHKeh2WoZMH?utm_source=generator&theme=0" 
                  width="100%" 
                  height="400" 
                  frameBorder="0" 
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="rounded-lg mb-6"
                  title="Agape Bible Church Podcast on Spotify"
                />
                
                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <a href="https://open.spotify.com/show/45oJua9cpBUCHKeh2WoZMH" target="_blank" rel="noopener noreferrer">
                      <span className="mr-2">🎧</span>
                      Listen on Spotify
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container-wide mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
                             <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                 Join Us for Worship
               </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Experience these messages live every Sunday. You're invited to join our church family for worship, 
                fellowship, and spiritual growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <Link to="/#contact">
                    <Users className="h-5 w-5 mr-2" />
                    Visit This Sunday
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300" asChild>
                  <Link to="/#about">
                    <Heart className="h-5 w-5 mr-2" />
                    Learn About Us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SermonsPage; 