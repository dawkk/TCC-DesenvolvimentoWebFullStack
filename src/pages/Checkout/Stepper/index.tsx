import React from 'react';

interface StaticStepperProps {
  steps: string[];
  activeStep: number;
}

const StaticStepper: React.FC<StaticStepperProps> = ({ steps, activeStep }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop:'3%', paddingBottom:'3%' }}>
      {steps.map((step, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: index === activeStep ? '#e95b2d' : 'gray',
              color: index === activeStep ? 'white' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {index + 1}
          </div>
          <div
            style={{
              marginLeft: 5,
              fontWeight: index === activeStep ? 'bold' : 'normal',
            }}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                width: 50,
                height: 1,
                background: index < activeStep ? 'gray' : 'gray',
                margin: '0 10px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StaticStepper;
