import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; 
import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion'; 
import OtpInput from '../components/OtpInput';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../data/countryCodes';
import { useToast } from '../context/ToastContext'; 
import { useAuth } from '../context/AuthContext'; 
import { usePageMeta } from '../hooks/usePageMeta'; // 👈 换用支持 SEO 描述的新 Hook

export default function Login() {
  // 👈 增加 meta description 提升分享卡片质感
  usePageMeta(
    "Log in | Serasé", 
    "Log in to your Serasé account securely. Start making real connections today."
  );

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();
  
  const shouldReduceMotion = useReducedMotion();

  const slideVariants: Variants = {
    initial: { x: shouldReduceMotion ? 0 : 40, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: "spring", bounce: 0, duration: 0.4 } },
    exit: { x: shouldReduceMotion ? 0 : -40, opacity: 0, transition: { duration: 0.2 } }
  };

  const [step, setStep] = useState<'method' | 'phone' | 'email' | 'otp'>('method');
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [otpType, setOtpType] = useState<'phone' | 'email'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [isMyDigitalIdLoading, setIsMyDigitalIdLoading] = useState(false);
  
  const [otp, setOtp] = useState('');
  const [otpResetSignal, setOtpResetSignal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isErrorShake, setIsErrorShake] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSendCode = (e: React.FormEvent, type: 'phone' | 'email') => {
    e.preventDefault();
    
    // 🛡️ 严格表单正则校验
    const phoneRegex = /^\d{8,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (type === 'phone' && !phoneRegex.test(phone.replace(/\D/g, ''))) {
      showToast("Please enter a valid phone number (8-15 digits).");
      return;
    }
    if (type === 'email' && !emailRegex.test(email)) {
      showToast("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpType(type);
      setOtp('');
      setOtpResetSignal((n) => n + 1);
      setTimeLeft(60);
      setStep('otp');
      
      const target = type === 'phone' ? `${countryCode} ${phone}` : email;
      showToast(`Code sent to ${target}`);
    }, 800);
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return; 
    
    setOtp('');
    setOtpResetSignal((n) => n + 1);
    setTimeLeft(60); 
    
    const target = otpType === 'phone' ? `${countryCode} ${phone}` : email;
    showToast(`A new code was sent to ${target}`);
  };

  const handleAppleSignIn = () => {
    setIsAppleLoading(true);
    setTimeout(() => {
      setIsAppleLoading(false);
      login();
      showToast('Login Successful! Welcome back.');
      navigate('/'); 
    }, 1200);
  };

  const handleMyDigitalIdSignIn = () => {
    setIsMyDigitalIdLoading(true);
    setTimeout(() => {
      setIsMyDigitalIdLoading(false);
      login();
      showToast('Verified via MyDigital ID! Welcome.');
      navigate('/');
    }, 1200);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (otp === '123456') {
        login();
        showToast('Login Successful! Welcome back to Serasé.');
        navigate('/');
      } else {
        setIsErrorShake(true);
        setTimeout(() => setIsErrorShake(false), 500);
        showToast('Invalid code. Please try 123456 for demo.');
        setOtp('');
        setOtpResetSignal((n) => n + 1);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-accent/30 selection:text-primary">
      <div className="bg-card w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-3">Serasé</h1>
          <p className="text-muted-foreground font-medium text-sm">Real People. Real Connections.</p>
        </div>

        <div className="relative z-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* 步骤一：选择登录方式 */}
            {step === 'method' && (
              <motion.div 
                key="method" 
                variants={slideVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Welcome back</h2>
                
                <div className="space-y-4">
                  <button onClick={() => { setStep('phone'); setPhone(''); }} className="w-full flex items-center justify-center gap-3 bg-primary text-white font-bold py-4 rounded-full hover:bg-primary/90 shadow-md transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Continue with Phone
                  </button>

                  <button onClick={() => { setStep('email'); setEmail(''); }} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-accent/50 text-primary font-bold py-4 rounded-full hover:bg-background transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Continue with Email
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleAppleSignIn}
                    disabled={isAppleLoading}
                    aria-busy={isAppleLoading}
                    className="w-full flex items-center justify-center gap-3 bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 shadow-md transition-all disabled:opacity-70"
                  >
                    {isAppleLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Connecting to Apple...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 0-0.758 0.057-2.146 0.817-1.396 0.76-2.31 1.95-2.31 1.95s0.584-0.088 1.97-0.849c1.385-0.758 2.486-1.918 2.486-1.918zM17.34 3.738c-1.89-0.103-3.957 1.096-4.992 2.302-1.036 1.209-1.928 3.129-1.742 4.965 2.164-0.104 4.097-1.127 5.09-2.32 0.992-1.196 1.905-3.082 1.644-4.947zM16.924 10.963c-1.366-0.083-2.923 0.77-3.882 1.693-0.963 0.92-1.868 2.502-1.733 4.053 1.57-0.063 3.037-0.932 3.963-1.848 0.924-0.916 1.765-2.483 1.652-3.898zM21 21.056c-0.29-1.077-1.843-2.973-3.665-2.73-1.573 0.209-2.222 1.155-3.957 1.125-1.728-0.029-2.336-0.928-3.943-1.08-1.815-0.173-3.522 1.623-3.923 2.684-0.803 2.13-1.252 5.06-0.086 7.02 0.835 1.402 2.11 2.927 3.684 2.903 1.517-0.026 2.062-0.96 3.864-0.945 1.794 0.015 2.274 0.973 3.87 0.93 1.636-0.043 2.766-1.42 3.59-2.793 0.973-1.624 1.365-3.197 1.365-3.197s-0.012-0.017-0.012-0.02c-1.624-0.655-2.584-2.23-2.493-3.895z"/></svg>
                        Continue with Apple
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleMyDigitalIdSignIn}
                    disabled={isMyDigitalIdLoading}
                    aria-busy={isMyDigitalIdLoading}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-accent/80 text-primary font-bold py-4 rounded-full hover:shadow-lg shadow-md transition-all disabled:opacity-70"
                  >
                    {isMyDigitalIdLoading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Connecting to MyDigital ID...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        Continue with MyDigital ID
                      </>
                    )}
                  </button>
                </div>
                
                <div className="mt-8 text-center text-[13px] text-muted-foreground leading-relaxed">
                  By continuing, you agree to our <Link to="/terms" className="text-primary underline font-medium">Terms of Service</Link> and acknowledge our <Link to="/privacy" className="text-primary underline font-medium">Privacy Policy</Link>.
                </div>
              </motion.div>
            )}

            {/* 步骤二 (手机号) */}
            {step === 'phone' && (
              <motion.form 
                key="phone" 
                variants={slideVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onSubmit={(e) => handleSendCode(e, 'phone')}
              >
                <button type="button" onClick={() => setStep('method')} className="mb-6 text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg> Back
                </button>
                <h2 className="text-2xl font-bold text-foreground mb-2">My number is</h2>
                <p className="text-sm text-muted-foreground mb-8">We'll send a text with a verification code.</p>
                <div className="flex gap-3 mb-8">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country code"
                    className="bg-white border-2 border-accent/50 text-primary rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-primary"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.code}</option>
                    ))}
                  </select>
                  <input 
                    type="tel" 
                    placeholder="12-345-6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-white border-2 border-accent/50 text-foreground rounded-xl px-5 py-3 font-bold placeholder-muted-foreground focus:outline-none focus:border-primary"
                    autoFocus required
                  />
                </div>
                <button type="submit" disabled={!phone || isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-primary/90 shadow-md disabled:opacity-50">
                  {isLoading ? 'Sending...' : 'Continue'}
                </button>
              </motion.form>
            )}

            {/* 步骤二 (Email) */}
            {step === 'email' && (
              <motion.form 
                key="email" 
                variants={slideVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onSubmit={(e) => handleSendCode(e, 'email')}
              >
                <button type="button" onClick={() => setStep('method')} className="mb-6 text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg> Back
                </button>
                <h2 className="text-2xl font-bold text-foreground mb-2">My email is</h2>
                <p className="text-sm text-muted-foreground mb-8">We'll send an email with a verification code.</p>
                <div className="mb-8">
                  <input 
                    type="email" 
                    placeholder="hello@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-2 border-accent/50 text-foreground rounded-xl px-5 py-3 font-bold placeholder-muted-foreground focus:outline-none focus:border-primary"
                    autoFocus required
                  />
                </div>
                <button type="submit" disabled={!email || isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-primary/90 shadow-md disabled:opacity-50">
                  {isLoading ? 'Sending...' : 'Continue'}
                </button>
              </motion.form>
            )}

            {/* 步骤三：输入 OTP 验证码 */}
            {step === 'otp' && (
              <motion.form 
                key="otp" 
                variants={slideVariants} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                onSubmit={handleVerify}
              >
                 <button type="button" onClick={() => setStep(otpType)} className="mb-6 text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg> Back
                </button>
                <h2 className="text-2xl font-bold text-foreground mb-2">Enter your code</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Sent to <span className="font-bold text-primary">
                    {otpType === 'phone' ? `${countryCode} ${phone}` : email}
                  </span>
                </p>

                <motion.div 
                  animate={isErrorShake && !shouldReduceMotion ? { x: [-10, 10, -10, 10, 0] } : {}} 
                  transition={{ duration: 0.4 }}
                >
                  <OtpInput
                    idPrefix="login-otp"
                    length={6}
                    resetSignal={otpResetSignal}
                    onChange={setOtp}
                    className="flex justify-between gap-2 mb-8"
                  />
                </motion.div>

                <button type="submit" disabled={isLoading || otp.length < 6} className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-primary/90 shadow-md disabled:opacity-70">
                  {isLoading ? 'Verifying...' : 'Verify'}
                </button>
                
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={timeLeft > 0}
                    className={`text-sm font-semibold transition-colors ${timeLeft > 0 ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:text-accent'}`}
                  >
                    {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Didn't receive a code? Resend"}
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}