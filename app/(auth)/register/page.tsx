'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, User, ArrowRight, Loader2, KeyRound, CheckCircle, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'code' | 'success'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeHash, setCodeHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, type: 'register' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis');
      }

      setCodeHash(data.codeHash);
      setStep('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, codeHash }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis');
      }

      setStep('success');
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">Vind</span>
              <span className="text-2xl font-bold text-orange-400">Loodgieter</span>
            </div>
          </Link>
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Uw loodgietersbedrijf
            <br />
            <span className="text-orange-300">online zichtbaar.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Maak een account aan en beheer uw bedrijfsvermelding. Help klanten u te vinden.
          </p>

          {/* Benefits on desktop */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-white/80">Claim uw bedrijfsvermelding</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-white/80">Beheer uw bedrijfsgegevens</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-white/80">Bekijk statistieken en berichten</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Wrench className="w-8 h-8 text-blue-600" />
              <div>
                <span className="text-xl font-bold text-blue-600">Vind</span>
                <span className="text-xl font-bold text-orange-500">Loodgieter</span>
              </div>
            </Link>
          </div>

          <Card className="p-6 sm:p-8 shadow-soft">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {step === 'success' ? 'Account aangemaakt!' : 'Account aanmaken'}
              </h1>
              <p className="text-muted-foreground">
                {step === 'details' && 'Maak een account aan om uw bedrijf te claimen'}
                {step === 'code' && 'Voer de verificatiecode in'}
                {step === 'success' && 'U wordt doorgestuurd naar uw dashboard'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {step === 'details' && (
              <form onSubmit={handleSendCode} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Naam
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jan Jansen"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    E-mailadres
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="naam@voorbeeld.nl"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Account aanmaken
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {step === 'code' && (
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                    Verificatiecode
                  </label>
                  <p className="text-sm text-muted-foreground mb-3">
                    We hebben een 6-cijferige code gestuurd naar <strong className="text-foreground">{email}</strong>
                  </p>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="123456"
                      required
                      maxLength={6}
                      pattern="\d{6}"
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center text-2xl tracking-widest font-mono"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || code.length !== 6}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verifieer
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('details');
                    setCode('');
                    setError('');
                  }}
                  className="w-full text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
                >
                  Terug naar gegevens
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Welkom, {name}!</h2>
                <p className="text-muted-foreground mb-4">
                  Uw account is succesvol aangemaakt. U wordt nu doorgestuurd naar uw dashboard.
                </p>
                <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
              </div>
            )}

            {/* Footer */}
            {step !== 'success' && (
              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground">
                  Heeft u al een account?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Inloggen
                  </Link>
                </p>
              </div>
            )}
          </Card>

          {/* Benefits - Mobile only */}
          {step === 'details' && (
            <div className="lg:hidden mt-8 space-y-3">
              <h3 className="text-sm font-semibold text-foreground text-center mb-4">
                Met een account kunt u:
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-foreground">Uw bedrijfsvermelding claimen</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-foreground">Uw bedrijfsgegevens beheren</span>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-foreground">Statistieken en berichten bekijken</span>
                </div>
              </div>
            </div>
          )}

          {/* Privacy note */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Door te registreren gaat u akkoord met ons{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              privacybeleid
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
