import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './components/ui/alert-dialog';
import { AnimatedButton } from './components/ui/animated-button';
import { 
  ArrowLeft, 
  Send, 
  Heart, 
  Loader2, 
  Shield, 
  Clock,
  Users,
  Church,
  Mail,
  Phone
} from 'lucide-react';

interface PrayerRequestData {
  name: string;
  email: string;
  phone: string;
  category: string;
  urgency: string;
  message: string;
  isAnonymous: boolean;
  allowFollowUp: boolean;
  followUpMethod: string;
}

interface TestimonyData {
  name: string;
  email: string;
  phone: string;
  testimony: string;
}

const PrayerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prayer' | 'testimony'>('prayer');
  const [prayerData, setPrayerData] = useState<PrayerRequestData>({
    name: '',
    email: '',
    phone: '',
    category: '',
    urgency: 'normal',
    message: '',
    isAnonymous: false,
    allowFollowUp: true,
    followUpMethod: 'email'
  });
  
  const [testimonyData, setTestimonyData] = useState<TestimonyData>({
    name: '',
    email: '',
    phone: '',
    testimony: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<PrayerRequestData & TestimonyData>>({});

  const prayerCategories = [
    { value: 'general', label: 'General Prayer' },
    { value: 'health', label: 'Health & Healing' },
    { value: 'family', label: 'Family & Relationships' },
    { value: 'financial', label: 'Financial Needs' },
    { value: 'spiritual', label: 'Spiritual Growth' },
    { value: 'ministry', label: 'Ministry & Service' },
    { value: 'guidance', label: 'Guidance & Decisions' },
    { value: 'salvation', label: 'Salvation of Loved Ones' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyLevels = [
    { value: 'normal', label: 'Normal' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'emergency', label: 'Emergency' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update document meta tags for SEO
    document.title = 'Prayer Requests - Agape Bible Church Bangalore | Submit Prayer Request Online';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Submit prayer requests online to Agape Bible Church Bangalore. Our pastoral team prays for your needs. Share testimonies and experience God\'s love. Tamil Christian church serving Bangalore since 1990.');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'prayer requests, online prayer, Agape Bible Church, Bangalore prayer, Tamil church prayer, Christian prayer support, pastoral care, testimony sharing, prayer ministry');
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Prayer Requests - Agape Bible Church Bangalore');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Submit prayer requests online to Agape Bible Church Bangalore. Our pastoral team is committed to praying for your needs and supporting you in faith.');
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://agapebangalore.org/prayer');
    }
    
    return () => {
      // Reset title when leaving page
      document.title = 'Agape Bible Church Bangalore | Tamil Christian Church | Churches in Bangalore';
    };
  }, []);

  const validatePrayerForm = (): boolean => {
    const newErrors: Partial<PrayerRequestData> = {};
    
    if (!prayerData.message.trim()) {
      newErrors.message = 'Please share your prayer request';
    }
    
    if (prayerData.allowFollowUp && !prayerData.isAnonymous) {
      if (!prayerData.email.trim() && !prayerData.phone.trim()) {
        newErrors.email = 'Please provide email or phone for follow-up';
        newErrors.phone = 'Please provide email or phone for follow-up';
      }
      
      if (prayerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(prayerData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTestimonyForm = (): boolean => {
    const newErrors: Partial<TestimonyData> = {};
    
    if (!testimonyData.name.trim()) {
      newErrors.name = 'Name is required for testimonies';
    }
    
    if (!testimonyData.email.trim()) {
      newErrors.email = 'Email is required for testimonies';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testimonyData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!testimonyData.testimony.trim()) {
      newErrors.testimony = 'Please share your testimony';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePrayerForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('subject', `Prayer Request: ${prayerData.category ? prayerCategories.find(c => c.value === prayerData.category)?.label : 'General'} ${prayerData.urgency === 'urgent' ? '(Urgent)' : prayerData.urgency === 'emergency' ? '(EMERGENCY)' : ''}`);
      formData.append('name', prayerData.isAnonymous ? 'Anonymous' : (prayerData.name || 'Not provided'));
      formData.append('email', prayerData.isAnonymous ? 'anonymous@agapebangalore.org' : (prayerData.email || 'Not provided'));
      formData.append('phone', prayerData.isAnonymous ? 'Not provided' : (prayerData.phone || 'Not provided'));
      formData.append('category', prayerCategories.find(c => c.value === prayerData.category)?.label || 'Not specified');
      formData.append('urgency', urgencyLevels.find(u => u.value === prayerData.urgency)?.label || 'Normal');
      formData.append('follow_up', prayerData.allowFollowUp ? 'Yes' : 'No');
      formData.append('follow_up_method', prayerData.allowFollowUp ? prayerData.followUpMethod : 'Not applicable');
      formData.append('message', prayerData.message);
      formData.append('is_anonymous', prayerData.isAnonymous ? 'Yes' : 'No');
      formData.append('submission_date', new Date().toLocaleString());

      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        throw new Error('Failed to submit form');
      }
      
      // Reset form
      setPrayerData({
        name: '',
        email: '',
        phone: '',
        category: '',
        urgency: 'normal',
        message: '',
        isAnonymous: false,
        allowFollowUp: true,
        followUpMethod: 'email'
      });
      
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      alert('There was an error submitting your prayer request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestimonySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTestimonyForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const subject = encodeURIComponent(`Testimony Submission from ${testimonyData.name}`);
      
      const body = encodeURIComponent(`
TESTIMONY SUBMISSION
===================

Name: ${testimonyData.name}
Email: ${testimonyData.email}
Phone: ${testimonyData.phone || 'Not provided'}

TESTIMONY:
${testimonyData.testimony}

---
Submitted from Agape Bible Church Prayer Page
Date: ${new Date().toLocaleString()}
      `.trim());

      window.location.href = `mailto:jim@agapebangalore.org?subject=${subject}&body=${body}`;
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      
      // Reset form
      setTestimonyData({
        name: '',
        email: '',
        phone: '',
        testimony: ''
      });
      
    } catch (error) {
      console.error('Error submitting testimony:', error);
      alert('There was an error submitting your testimony. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (activeTab === 'prayer') {
      setPrayerData(prev => ({ ...prev, [field]: value }));
    } else {
      setTestimonyData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div className="container-wide mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <Button variant="ghost" className="flex items-center gap-2" aria-label="Back to Main Site">
                <ArrowLeft className="w-4 h-4" />
                <img src="/agape-bible-church-logo.png" alt="Agape Bible Church Logo" className="h-8 w-8 object-contain" />
                <span className="font-display text-sm sm:text-base lg:text-xl font-semibold text-gray-900">AGAPE BIBLE CHURCH</span>
              </Button>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <h1 className="text-xl font-bold text-gray-900">Prayer Ministry</h1>
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
        <section className="py-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
          <div className="container-wide mx-auto px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Prayer Ministry</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                  We're Here to Pray With You
                </h1>
                
                <div className="bg-primary/5 p-8 rounded-lg mb-8">
                  <p className="text-xl italic text-gray-700 leading-relaxed mb-4">
                    "Again, truly I tell you that if two of you on earth agree about anything they ask for, 
                    it will be done for them by my Father in heaven. For where two or three gather in my name, 
                    there am I with them."
                  </p>
                  <p className="text-lg font-semibold text-primary">— Matthew 18:19-20</p>
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  At Agape Bible Church, we believe in the power of prayer. Our pastoral team is committed to 
                  praying for your needs, celebrating your victories, and walking alongside you in faith. 
                  Share your prayer requests or testimonies with us—we would be honored to join you in prayer.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 bg-gray-50">
          <div className="container-wide mx-auto px-4 sm:px-6">
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab('prayer')}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'prayer'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  Prayer Request
                </button>
                <button
                  onClick={() => setActiveTab('testimony')}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'testimony'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  Share Testimony
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section className="py-16">
          <div className="container-wide mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              
              {activeTab === 'prayer' ? (
                <motion.div
                  key="prayer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-xl">
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-4xl md:text-5xl font-display font-black text-gray-900">
                        Submit Your Prayer Request
                      </CardTitle>
                      <p className="text-xl font-medium text-gray-700 leading-relaxed">
                        Share your prayer needs with us. Our pastoral team will pray for you and, if you'd like, 
                        follow up to support you during this time.
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <form onSubmit={handlePrayerSubmit} className="space-y-6">
                        
                        {/* Privacy Options */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-blue-900 mb-2">Privacy Options</h3>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={prayerData.isAnonymous}
                                    onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                  />
                                  <Label htmlFor="anonymous" className="text-base font-medium text-blue-800">
                                    Submit anonymously (we won't see your contact information)
                                  </Label>
                                </div>
                                
                                {!prayerData.isAnonymous && (
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="followUp"
                                      checked={prayerData.allowFollowUp}
                                      onChange={(e) => handleInputChange('allowFollowUp', e.target.checked)}
                                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <Label htmlFor="followUp" className="text-base font-medium text-blue-800">
                                      I'd like someone from the pastoral team to follow up with me
                                    </Label>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        {!prayerData.isAnonymous && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-base font-bold text-gray-900">
                                Name {prayerData.allowFollowUp ? '*' : '(Optional)'}
                              </Label>
                              <Input
                                id="name"
                                type="text"
                                value={prayerData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="border-gray-300 focus:border-primary focus:ring-primary/20"
                                placeholder="Your name"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-base font-bold text-gray-900">
                                Email {prayerData.allowFollowUp ? '*' : '(Optional)'}
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={prayerData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`border-gray-300 focus:border-primary focus:ring-primary/20 ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="your.email@example.com"
                              />
                              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-base font-bold text-gray-900">
                                Phone (Optional)
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={prayerData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`border-gray-300 focus:border-primary focus:ring-primary/20 ${errors.phone ? 'border-red-500' : ''}`}
                                placeholder="+91 98765 43210"
                              />
                              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            
                            {prayerData.allowFollowUp && (
                              <div className="space-y-2">
                                <Label htmlFor="followUpMethod" className="text-base font-bold text-gray-900">
                                  Preferred Contact Method
                                </Label>
                                <Select value={prayerData.followUpMethod} onValueChange={(value) => handleInputChange('followUpMethod', value)}>
                                  <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary/20">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                    <SelectItem value="email" className="hover:bg-gray-50">Email</SelectItem>
                                    <SelectItem value="phone" className="hover:bg-gray-50">Phone</SelectItem>
                                    <SelectItem value="either" className="hover:bg-gray-50">Either is fine</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Prayer Details */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-base font-bold text-gray-900">
                              Prayer Category
                            </Label>
                            <Select value={prayerData.category} onValueChange={(value) => handleInputChange('category', value)}>
                              <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary/20">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                {prayerCategories.map((category) => (
                                  <SelectItem key={category.value} value={category.value} className="hover:bg-gray-50">
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="urgency" className="text-base font-bold text-gray-900">
                              Urgency Level
                            </Label>
                            <Select value={prayerData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                              <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary/20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                {urgencyLevels.map((level) => (
                                  <SelectItem key={level.value} value={level.value} className="hover:bg-gray-50">
                                    {level.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-base font-bold text-gray-900">
                            Prayer Request *
                          </Label>
                          <Textarea
                            id="message"
                            value={prayerData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            className={`min-h-40 border-gray-300 focus:border-primary focus:ring-primary/20 ${errors.message ? 'border-red-500' : ''}`}
                            placeholder="Please share your prayer request with us. We are honored to pray for you..."
                          />
                          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                        
                        <div className="text-center pt-4">
                          <AnimatedButton 
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90 text-white px-10 py-5 text-xl rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            animationType="scale"
                            intensity="medium"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Submitting Prayer Request...
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5 mr-2" />
                                Submit Prayer Request
                              </>
                            )}
                          </AnimatedButton>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="testimony"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-xl">
                    <CardHeader className="text-center pb-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-4 justify-center">
                        <Users className="h-5 w-5 text-yellow-700" />
                        <span className="text-base font-semibold text-yellow-700">Testimony</span>
                      </div>
                      <CardTitle className="text-3xl font-display font-bold text-gray-900">
                        Share Your Testimony
                      </CardTitle>
                      <div className="bg-yellow-50 p-6 rounded-lg mb-4">
                        <p className="text-lg italic text-gray-700 leading-relaxed mb-2">
                          "They triumphed over him by the blood of the Lamb and by the word of their testimony"
                        </p>
                        <p className="text-base font-semibold text-yellow-700">— Revelation 12:11</p>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Has God moved in your life? We'd love to hear how He has blessed, healed, provided, 
                        or worked in your circumstances. Your testimony can encourage others in their faith journey.
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      <form onSubmit={handleTestimonySubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="testimonyName" className="text-base font-bold text-gray-900">
                              Full Name *
                            </Label>
                            <Input
                              id="testimonyName"
                              type="text"
                              value={testimonyData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className={`border-gray-300 focus:border-primary focus:ring-primary/20 ${errors.name ? 'border-red-500' : ''}`}
                              placeholder="Your full name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="testimonyEmail" className="text-base font-bold text-gray-900">
                              Email Address *
                            </Label>
                            <Input
                              id="testimonyEmail"
                              type="email"
                              value={testimonyData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={`border-gray-300 focus:border-primary focus:ring-primary/20 ${errors.email ? 'border-red-500' : ''}`}
                              placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="testimonyPhone" className="text-base font-bold text-gray-900">
                            Phone Number (Optional)
                          </Label>
                          <Input
                            id="testimonyPhone"
                            type="tel"
                            value={testimonyData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="border-gray-300 focus:border-primary focus:ring-primary/20"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="testimonyMessage" className="text-base font-bold text-gray-900">
                            Your Testimony *
                          </Label>
                          <Textarea
                            id="testimonyMessage"
                            value={testimonyData.testimony}
                            onChange={(e) => handleInputChange('testimony', e.target.value)}
                            className={`min-h-40 border-gray-300 focus:border-primary focus:ring-primary/20 ${errors.testimony ? 'border-red-500' : ''}`}
                            placeholder="Tell us how God has worked in your life, answered your prayers, or blessed you. Your story can be a blessing to others..."
                          />
                          {errors.testimony && <p className="text-red-500 text-sm">{errors.testimony}</p>}
                        </div>
                        
                        <div className="text-center pt-4">
                          <AnimatedButton 
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            animationType="scale"
                            intensity="medium"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Sharing Testimony...
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5 mr-2" />
                                Share Testimony
                              </>
                            )}
                          </AnimatedButton>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-gray-50">
          <div className="container-wide mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Church className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Prayer Support</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Commitment to You
              </h2>
              
              <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Immediate Prayer</h3>
                  <p className="text-gray-900">
                    Your prayer requests are prayed over immediately by our pastoral team when received.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Confidentiality</h3>
                  <p className="text-gray-900">
                    All prayer requests are kept strictly confidential within our pastoral team.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-gray-900">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ongoing Support</h3>
                  <p className="text-gray-900">
                    We continue praying for your needs and offer pastoral care as requested.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto text-gray-900"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Prayer?</h3>
              <p className="text-gray-900 mb-6">
                For urgent prayer needs, don't hesitate to call us directly. We're here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+919901613901" 
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +91 9901613901
                </a>
                <a 
                  href="mailto:jim@agapebangalore.org" 
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary/20 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  jim@agapebangalore.org
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-black font-black text-2xl md:text-3xl bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <Heart className="h-6 w-6 text-yellow-300" />
              {activeTab === 'prayer' ? 'Prayer Request Received' : 'Testimony Shared Successfully'}
            </AlertDialogTitle>
            <AlertDialogDescription className="bg-white p-6 rounded-lg shadow-inner border-l-4 border-blue-500">
              {activeTab === 'prayer' ? (
                <div className="space-y-4">
                  <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                    Thank you for sharing your prayer request with us. Our pastoral team has been notified and will begin praying for you immediately.
                    {prayerData.allowFollowUp && !prayerData.isAnonymous && (
                      <span className="text-blue-700 font-bold"> We will follow up with you as requested within 24-48 hours.</span>
                    )}
                  </p>
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="text-gray-900 font-bold italic text-center text-lg">
                      "And the prayer offered in faith will make the sick person well; the Lord will raise them up." 
                      <span className="block text-blue-800 font-semibold mt-2">- James 5:15</span>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  Thank you for sharing your testimony! Your story of God's faithfulness can be a tremendous blessing and encouragement to others in our church family.
                  <br /><br />
                  "Let the redeemed of the Lord tell their story—those he redeemed from the hand of the foe." - Psalm 107:2
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccess(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PrayerPage;