import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Send, Mail, Loader2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  preferredContact: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
    preferredContact: 'email'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'visit', label: 'Planning to Visit' },
    { value: 'ministry', label: 'Ministry Information' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'events', label: 'Events & Programs' },
    { value: 'pastoral', label: 'Pastoral Care' },
    { value: 'donation', label: 'Donation Information' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create email content
      const subject = encodeURIComponent(`Website Contact: ${formData.subject}`);
      const body = encodeURIComponent(`
Contact Form Submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${inquiryTypes.find(type => type.value === formData.inquiryType)?.label || 'Not specified'}
Preferred Contact Method: ${formData.preferredContact}

Subject: ${formData.subject}

Message:
${formData.message}

---
Submitted from Agape Bible Church website
Date: ${new Date().toLocaleString()}
      `.trim());

      // Open default email client
      window.location.href = `mailto:abcabfindia@gmail.com?subject=${subject}&body=${body}`;
      
      // Simulate delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: '',
        message: '',
        preferredContact: 'email'
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 justify-center">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">Contact Us</span>
          </div>
          <CardTitle className="text-3xl font-display font-bold text-gray-900">
            Get in Touch
          </CardTitle>
          <p className="text-gray-600 leading-relaxed">
            We'd love to hear from you! Whether you have questions about our church, want to plan a visit, or need more information about our ministries, we're here to help.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inquiryType" className="text-sm font-semibold text-gray-900">
                  Inquiry Type
                </Label>
                <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-semibold text-gray-900">
                Subject *
              </Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`${errors.subject ? 'border-red-500' : ''}`}
                placeholder="Brief description of your inquiry"
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold text-gray-900">
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`min-h-32 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Please provide more details about your inquiry or how we can help you..."
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-semibold text-gray-900">
                Preferred Contact Method
              </Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="contact-email"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="contact-email" className="text-sm text-gray-700">
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="contact-phone"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="contact-phone" className="text-sm text-gray-700">
                    Phone
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <AnimatedButton 
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                animationType="scale"
                intensity="medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </AnimatedButton>
            </div>
            
            <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              <p>
                We typically respond to inquiries within 24-48 hours. For urgent matters, 
                please call us directly at <strong>+91 9901613901</strong>.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Message Sent Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for reaching out to us! We've received your message and will get back to you within 24-48 hours. 
              <br /><br />
              If you have an urgent inquiry, please don't hesitate to call us directly at +91 9901613901.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccess(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}