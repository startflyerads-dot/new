import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfficeLocations = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = [
    {
      id: 1,
      name: 'New York Headquarters',
      address: '123 Business Avenue, Suite 500',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@servicehubpro.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST',
      timezone: 'Eastern Time',
      lat: 40.7128,
      lng: -74.0060,
      description: 'Our flagship office in the heart of Manhattan, serving clients across the East Coast.',
      team: '25+ consultants',
      specialties: ['Strategy Consulting', 'Digital Transformation', 'Operations']
    }
  ];

  const currentLocation = locations?.[selectedLocation];

  return (
    <section className="py-20 bg-[#2A2A42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Visit Our Offices
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our team in person at one of our strategically located offices across the United States.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4 mb-8">
              {locations?.map((location, index) => (
                <button
                  key={location?.id}
                  onClick={() => setSelectedLocation(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 animate-elastic-hover ${
                    selectedLocation === index
                      ? 'bg-white/10 backdrop-blur-lg border-2 border-[#e57b46] shadow-professional-lg'
                      : 'bg-white/5 hover:bg-white/10 border-2 border-transparent hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 ${
                        selectedLocation === index ? 'text-primary' : 'text-foreground'
                      }`}>
                        {location?.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-1">{location?.address}</p>
                      <p className="text-muted-foreground text-sm">{location?.city}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedLocation === index ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <Icon 
                        name="MapPin" 
                        size={16} 
                        color={selectedLocation === index ? 'white' : 'var(--color-muted-foreground)'} 
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Location Details */}
            <motion.div
              key={selectedLocation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-professional border border-white/20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">{currentLocation?.name}</h3>
              <p className="text-muted-foreground mb-6">{currentLocation?.description}</p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{currentLocation?.address}</p>
                    <p className="text-muted-foreground">{currentLocation?.city}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <p className="text-foreground">{currentLocation?.phone}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <p className="text-foreground">{currentLocation?.email}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <Icon name="Clock" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground">{currentLocation?.hours}</p>
                    <p className="text-muted-foreground text-sm">{currentLocation?.timezone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={20} className="text-primary" />
                  <p className="text-foreground">{currentLocation?.team}</p>
                </div>

                <div className="flex items-start space-x-3">
                  <Icon name="Star" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentLocation?.specialties?.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#e57b46]/10 text-[#e57b46] text-sm rounded-full border border-[#e57b46]/20"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="default"
                  iconName="Navigation"
                  iconPosition="left"
                  className="mr-4 mb-4 sm:mb-0"
                >
                  Get Directions
                </Button>
                <Button
                  variant="outline"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Visit
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-professional-lg overflow-hidden border border-white/20">
              <div className="h-96 lg:h-[600px] relative">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={currentLocation?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=14&output=embed`}
                  className="border-0"
                />
                
                {/* Map Overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-professional">
                    <h4 className="font-semibold text-foreground mb-1">{currentLocation?.name}</h4>
                    <p className="text-sm text-muted-foreground">{currentLocation?.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                fullWidth
                className="justify-center"
              >
                Call Now
              </Button>
              <Button
                variant="outline"
                iconName="Mail"
                iconPosition="left"
                fullWidth
                className="justify-center"
              >
                Send Email
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;