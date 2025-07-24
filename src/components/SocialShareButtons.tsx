import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, MessageCircle, Link, Copy } from "lucide-react";
import { useState } from 'react';

interface SocialShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
}

export default function SocialShareButtons({ 
  title, 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  description = "Watch this inspiring sermon from Agape Bible Church Bangalore", 
  className = "" 
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: `${title} - Agape Bible Church Bangalore`,
    text: description,
    url: url
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(shareData.title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=agapebangalore`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Share2 className="h-4 w-4" />
        <span>Share:</span>
      </div>
      
      {/* Native Share Button (mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleNativeShare}
          className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-gray-900 text-xs px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Share2 className="h-3 w-3 mr-1" />
          Share
        </Button>
      )}

      {/* Facebook */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleSocialShare('facebook')}
        className="bg-white hover:bg-blue-50 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 text-xs px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Facebook className="h-3 w-3 mr-1" />
        Facebook
      </Button>

      {/* Twitter */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleSocialShare('twitter')}
        className="bg-white hover:bg-sky-50 border-gray-300 hover:border-sky-300 text-gray-700 hover:text-sky-600 text-xs px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Twitter className="h-3 w-3 mr-1" />
        Twitter
      </Button>

      {/* WhatsApp */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleSocialShare('whatsapp')}
        className="bg-white hover:bg-green-50 border-gray-300 hover:border-green-300 text-gray-700 hover:text-green-600 text-xs px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      >
        <MessageCircle className="h-3 w-3 mr-1" />
        WhatsApp
      </Button>

      {/* Copy Link */}
      <Button
        size="sm"
        variant="outline"
        onClick={handleCopyLink}
        className={`bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-gray-900 text-xs px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 ${
          copied ? 'bg-green-50 border-green-300 text-green-600' : ''
        }`}
      >
        {copied ? (
          <>
            <Copy className="h-3 w-3 mr-1" />
            Copied!
          </>
        ) : (
          <>
            <Link className="h-3 w-3 mr-1" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
}