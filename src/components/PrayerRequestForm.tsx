import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Send, Heart, Loader2 } from "lucide-react";

interface PrayerFormData {
  name: string;
  email: string;
  phone: string;
  prayerRequest: string;
  isUrgent: boolean;
  allowContact: boolean;
}

export default function PrayerRequestForm() {
  const [formData, setFormData] = useState<PrayerFormData>({
    name: '',
    email: '',
    phone: '',
    prayerRequest: '',
    isUrgent: false,
    allowContact: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<PrayerFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PrayerFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.prayerRequest.trim()) {
      newErrors.prayerRequest = 'Prayer request is required';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      // Simulate form submission - in real implementation, this would send to your backend
      // For now, we'll create a mailto link with the prayer request
      const subject = encodeURIComponent(`Prayer Request from ${formData.name}`);
      const body = encodeURIComponent(`
Prayer Request Submission:

Name: ${formData.name}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Urgent Request: ${formData.isUrgent ? 'Yes' : 'No'}
Allow Follow-up Contact: ${formData.allowContact ? 'Yes' : 'No'}

Prayer Request:
${formData.prayerRequest}

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
        prayerRequest: '',
        isUrgent: false,
        allowContact: true
      });
      
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      alert('There was an error submitting your prayer request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof PrayerFormData, value: string | boolean) => {
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
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">Prayer Request</span>
          </div>
          <CardTitle className="text-3xl font-display font-bold text-gray-900">
            Submit Your Prayer Request
          </CardTitle>
          <p className="text-gray-600 leading-relaxed">
            We believe in the power of prayer and would be honored to pray for you. Share your prayer request with our pastoral team, and know that you are not alone in your journey.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
                  Your Name *
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
                  Email Address
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
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
                Phone Number (Optional)
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
              <Label htmlFor="prayerRequest" className="text-sm font-semibold text-gray-900">
                Your Prayer Request *
              </Label>
              <Textarea
                id="prayerRequest"
                value={formData.prayerRequest}
                onChange={(e) => handleInputChange('prayerRequest', e.target.value)}
                className={`min-h-32 ${errors.prayerRequest ? 'border-red-500' : ''}`}
                placeholder="Please share what you would like us to pray for. Your request will be kept confidential and handled with care."
              />
              {errors.prayerRequest && <p className="text-red-500 text-sm">{errors.prayerRequest}</p>}
            </div>
            
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isUrgent"
                  checked={formData.isUrgent}
                  onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <Label htmlFor="isUrgent" className="text-sm text-gray-700">
                  This is an urgent prayer request
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowContact"
                  checked={formData.allowContact}
                  onChange={(e) => handleInputChange('allowContact', e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <Label htmlFor="allowContact" className="text-sm text-gray-700">
                  It's okay to contact me for follow-up or encouragement
                </Label>
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
            
            <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              <p>
                Your prayer request will be confidentially shared with our pastoral team. 
                For urgent pastoral care, please call us directly at <strong>+91 9901613901</strong>.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Prayer Request Submitted
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for sharing your prayer request with us. Our pastoral team will be praying for you, and if you've allowed follow-up contact, someone may reach out to offer encouragement and support.
              <br /><br />
              Remember: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
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