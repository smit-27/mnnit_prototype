import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, ScanFace, KeyRound, CheckCircle2, Loader2, X } from 'lucide-react';
import { useBehavior } from '../../context/BehaviorContext';

const steps = {
  otp: [
    { id: 'otp', label: 'OTP Verification', icon: Smartphone, description: 'Enter the OTP sent to your registered mobile' },
  ],
  adaptive: [
    { id: 'otp', label: 'OTP Verification', icon: Smartphone, description: 'Enter the OTP sent to your registered mobile' },
    { id: 'face', label: 'Face Verification', icon: ScanFace, description: 'Quick facial recognition check' },
    { id: 'device', label: 'Device Trust', icon: KeyRound, description: 'Verify this device is trusted' },
  ],
};

export default function MFAModal() {
  const { mfaRequired, mfaType, completeMFA } = useBehavior();
  const [currentStep, setCurrentStep] = useState(0);
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [stepComplete, setStepComplete] = useState(false);
  const [faceProgress, setFaceProgress] = useState(0);

  const currentSteps = mfaType ? steps[mfaType] || steps.otp : steps.otp;

  useEffect(() => {
    if (mfaRequired) {
      setCurrentStep(0);
      setOtpValue(['', '', '', '', '', '']);
      setVerifying(false);
      setStepComplete(false);
      setFaceProgress(0);
    }
  }, [mfaRequired]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (newOtp.every(v => v !== '')) {
      handleVerifyStep();
    }
  };

  const handleVerifyStep = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setStepComplete(true);
      setTimeout(() => {
        if (currentStep < currentSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
          setStepComplete(false);
          setOtpValue(['', '', '', '', '', '']);
          setFaceProgress(0);
        } else {
          completeMFA();
        }
      }, 800);
    }, 1500);
  };

  const startFaceVerification = () => {
    setVerifying(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setFaceProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setVerifying(false);
        setStepComplete(true);
        setTimeout(() => {
          if (currentStep < currentSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
            setStepComplete(false);
            setFaceProgress(0);
          } else {
            completeMFA();
          }
        }, 800);
      }
    }, 80);
  };

  if (!mfaRequired) return null;

  const step = currentSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-base">Security Verification Required</h2>
                <p className="text-blue-100 text-xs mt-0.5">Behavioral anomaly detected - additional verification needed</p>
              </div>
            </div>
            {/* Step indicators */}
            {currentSteps.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                {currentSteps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      i < currentStep ? 'bg-white text-blue-600' :
                      i === currentStep ? 'bg-white/90 text-blue-600' :
                      'bg-white/20 text-white/60'
                    }`}>
                      {i < currentStep ? '✓' : i + 1}
                    </div>
                    {i < currentSteps.length - 1 && (
                      <div className={`flex-1 h-0.5 ${i < currentStep ? 'bg-white' : 'bg-white/20'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{step.label}</h3>
                    <p className="text-xs text-slate-400">{step.description}</p>
                  </div>
                </div>

                {stepComplete ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center py-6"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    <p className="text-sm font-semibold text-emerald-700 mt-3">Verified Successfully</p>
                  </motion.div>
                ) : step.id === 'otp' ? (
                  <div>
                    <div className="flex justify-center gap-2 mb-4">
                      {otpValue.map((val, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          value={val}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-11 h-12 text-center text-lg font-semibold border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 text-center mb-4">OTP sent to +91 98765 ***10</p>
                    {verifying && (
                      <div className="flex items-center justify-center gap-2 text-blue-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Verifying...</span>
                      </div>
                    )}
                  </div>
                ) : step.id === 'face' ? (
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-blue-200 flex items-center justify-center mb-4 relative overflow-hidden bg-blue-50">
                      <ScanFace className="w-16 h-16 text-blue-300" />
                      {verifying && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 bg-blue-400/30"
                          initial={{ height: '0%' }}
                          animate={{ height: `${faceProgress}%` }}
                        />
                      )}
                    </div>
                    {!verifying ? (
                      <button onClick={startFaceVerification}
                        className="px-6 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
                        Start Face Scan
                      </button>
                    ) : (
                      <p className="text-sm text-blue-500 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Scanning... {faceProgress}%
                      </p>
                    )}
                  </div>
                ) : step.id === 'device' ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                      <KeyRound className="w-10 h-10 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-600 mb-4 text-center">Confirm this device is authorized for transactions</p>
                    <button onClick={handleVerifyStep}
                      className="px-6 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
                      {verifying ? (
                        <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</span>
                      ) : 'Confirm Device Trust'}
                    </button>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
