import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Schedule Meeting",
      description: "Book a consultation with your team",
      icon: "Calendar",
      variant: "default",
      action: () => console.log("Schedule meeting")
    },
    {
      id: 2,
      title: "Upload Documents",
      description: "Share files with your project team",
      icon: "Upload",
      variant: "outline",
      action: () => console.log("Upload documents")
    },
    {
      id: 3,
      title: "Request Support",
      description: "Get help from our support team",
      icon: "HelpCircle",
      variant: "secondary",
      action: () => console.log("Request support")
    },
    {
      id: 4,
      title: "View Invoices",
      description: "Access billing and payment history",
      icon: "Receipt",
      variant: "outline",
      action: () => console.log("View invoices")
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-professional">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="group">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.action}
              className="h-auto p-4 flex-col items-start text-left animate-elastic-hover group-hover:shadow-professional"
            >
              <div className="w-full">
                <div className="font-medium mb-1">{action?.title}</div>
                <div className="text-xs opacity-80 font-normal">{action?.description}</div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;