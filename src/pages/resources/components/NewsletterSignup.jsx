import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    weeklyDigest: true,
    resourceUpdates: true,
    industryInsights: false,
    exclusiveContent: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Mock submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handlePreferenceChange = (key, checked) => {
    setPreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-accent rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-accent-foreground mb-2">
          Welcome to ServiceHub Pro!
        </h3>
        <p className="text-accent-foreground/80">
          Thank you for subscribing. Check your email for a welcome message with exclusive resources.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={24} className="text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Stay Updated with Premium Resources
        </h3>
        <p className="text-muted-foreground">
          Get exclusive access to new templates, tools, and industry insights delivered to your inbox
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your professional email"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          required
        />

        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">
            Subscription Preferences
          </h4>
          <div className="space-y-3">
            <Checkbox
              label="Weekly Resource Digest"
              description="Curated collection of new resources and tools"
              checked={preferences?.weeklyDigest}
              onChange={(e) => handlePreferenceChange('weeklyDigest', e?.target?.checked)}
            />
            <Checkbox
              label="Resource Updates"
              description="Notifications when new resources are added"
              checked={preferences?.resourceUpdates}
              onChange={(e) => handlePreferenceChange('resourceUpdates', e?.target?.checked)}
            />
            <Checkbox
              label="Industry Insights"
              description="Market trends and professional insights"
              checked={preferences?.industryInsights}
              onChange={(e) => handlePreferenceChange('industryInsights', e?.target?.checked)}
            />
            <Checkbox
              label="Exclusive Premium Content"
              description="Early access to premium templates and tools"
              checked={preferences?.exclusiveContent}
              onChange={(e) => handlePreferenceChange('exclusiveContent', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            type="submit"
            variant="default"
            iconName="Send"
            iconPosition="left"
            className="flex-1"
          >
            Subscribe Now
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="Gift"
            iconPosition="left"
          >
            View Sample
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Privacy Protected</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Zap" size={12} />
            <span>Instant Access</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="X" size={12} />
            <span>Unsubscribe Anytime</span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSignup;