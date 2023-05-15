import React from 'react';

interface VerticalStepperProps {
  steps: string[];
  activeStep: number;
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({ steps, activeStep }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      {steps.map((step, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
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
        </div>
      ))}
    </div>
  );
};

export default VerticalStepper;
