
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    currentRevenue: '',
    serviceType: '',
    investmentAmount: '',
    timeframe: '12'
  });
  
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const serviceTypes = [
    { value: 'consulting', label: 'Business Consulting', multiplier: 3.2 },
    { value: 'development', label: 'Software Development', multiplier: 4.1 },
    { value: 'marketing', label: 'Digital Marketing', multiplier: 2.8 },
    { value: 'design', label: 'Design Services', multiplier: 2.5 },
    { value: 'automation', label: 'Process Automation', multiplier: 5.2 },
    { value: 'training', label: 'Training & Development', multiplier: 2.1 }
  ];

  const timeframeOptions = [
    { value: '6', label: '6 months' },
    { value: '12', label: '12 months' },
    { value: '18', label: '18 months' },
    { value: '24', label: '24 months' }
  ];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateROI = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const revenue = parseFloat(inputs?.currentRevenue) || 0;
      const investment = parseFloat(inputs?.investmentAmount) || 0;
      const timeframe = parseInt(inputs?.timeframe) || 12;
      const serviceMultiplier = serviceTypes?.find(s => s?.value === inputs?.serviceType)?.multiplier || 3.0;
      
      // ROI Calculation Logic
      const monthlyRevenue = revenue / 12;
      const projectedIncrease = (investment * serviceMultiplier) / 100;
      const monthlyIncrease = projectedIncrease * monthlyRevenue;
      const totalIncrease = monthlyIncrease * timeframe;
      const roi = ((totalIncrease - investment) / investment) * 100;
      const paybackPeriod = investment / monthlyIncrease;
      
      setResults({
        totalIncrease: totalIncrease?.toFixed(0),
        roi: roi?.toFixed(1),
        paybackPeriod: paybackPeriod?.toFixed(1),
        monthlyIncrease: monthlyIncrease?.toFixed(0),
        projectedRevenue: (revenue + totalIncrease)?.toFixed(0)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setInputs({
      currentRevenue: '',
      serviceType: '',
      investmentAmount: '',
      timeframe: '12'
    });
    setResults(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl shadow-professional p-6 mb-8"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-primary rounded-xl">
          <Icon name="Calculator" size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">ROI Calculator</h3>
          <p className="text-muted-foreground">Calculate your potential return on investment</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <Input
              label="Current Annual Revenue"
              type="number"
              placeholder="e.g., 500000"
              value={inputs?.currentRevenue}
              onChange={(e) => handleInputChange('currentRevenue', e?.target?.value)}
              description="Enter your current annual revenue in USD"
            />
          </div>

          <div>
            <Select
              label="Service Type"
              placeholder="Select a service"
              options={serviceTypes}
              value={inputs?.serviceType}
              onChange={(value) => handleInputChange('serviceType', value)}
              description="Choose the service you're interested in"
            />
          </div>

          <div>
            <Input
              label="Investment Amount"
              type="number"
              placeholder="e.g., 25000"
              value={inputs?.investmentAmount}
              onChange={(e) => handleInputChange('investmentAmount', e?.target?.value)}
              description="Estimated investment in the service"
            />
          </div>

          <div>
            <Select
              label="Timeframe"
              options={timeframeOptions}
              value={inputs?.timeframe}
              onChange={(value) => handleInputChange('timeframe', value)}
              description="Period to calculate ROI over"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              variant="default"
              iconName="Calculator"
              iconPosition="left"
              onClick={calculateROI}
              loading={isCalculating}
              disabled={!inputs?.currentRevenue || !inputs?.serviceType || !inputs?.investmentAmount}
              className="flex-1"
            >
              Calculate ROI
            </Button>
            <Button
              variant="outline"
              iconName="RotateCcw"
              onClick={resetCalculator}
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-foreground mb-4">Your ROI Projection</h4>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success">{results?.roi}%</div>
                  <div className="text-sm text-muted-foreground">ROI</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{results?.paybackPeriod}</div>
                  <div className="text-sm text-muted-foreground">Months to Payback</div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Monthly Revenue Increase</span>
                  <span className="text-sm font-bold text-success">+${parseInt(results?.monthlyIncrease)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Total Revenue Increase</span>
                  <span className="text-sm font-bold text-success">+${parseInt(results?.totalIncrease)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Projected Annual Revenue</span>
                  <span className="text-sm font-bold text-primary">${parseInt(results?.projectedRevenue)?.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  variant="default"
                  fullWidth
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Discuss These Results
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Report
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="p-4 bg-muted/50 rounded-full mb-4">
                <Icon name="TrendingUp" size={32} className="text-muted-foreground" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Ready to Calculate?</h4>
              <p className="text-muted-foreground text-sm max-w-sm">
                Fill in your details on the left to see your potential return on investment with our services.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
            <Icon name="Info" size={14} className="inline mr-1" />
            Results are estimates based on industry averages and historical data. Actual results may vary.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ROICalculator;