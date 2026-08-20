import { useState, FormEvent } from 'react';
import { Mail, CheckCircle2, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function DevotionalSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { data: existing } = await supabase
        .from('devotional_subscribers')
        .select('id, is_active')
        .eq('email', trimmed)
        .maybeSingle();

      if (existing) {
        if (existing.is_active) {
          setStatus('success');
          setMessage("You're already subscribed! Look for daily devotionals in your inbox.");
          setEmail('');
          setName('');
          return;
        }
        setStatus('error');
        setMessage('This email was previously unsubscribed. Please contact us to resubscribe.');
        return;
      }

      const { error } = await supabase
        .from('devotional_subscribers')
        .insert({ email: trimmed, name: name.trim() || null });

      if (error) {
        if (error.code === '23505') {
          setStatus('success');
          setMessage("You're already subscribed! Look for daily devotionals in your inbox.");
          setEmail('');
          setName('');
          return;
        }
        throw error;
      }

      setStatus('success');
      setMessage("You're subscribed! You'll receive daily devotionals starting tomorrow.");
      setEmail('');
      setName('');
    } catch (err) {
      setStatus('error');
      setMessage(
        err instanceof Error && err.message.includes('devotional_subscribers')
          ? 'Subscription is being set up. Please try again in a moment.'
          : 'Something went wrong. Please try again.'
      );
    }
  }

  function dismiss() {
    setStatus('idle');
    setMessage('');
  }

  return (
    <div className="mt-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Get Daily Devotionals by Email
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Receive a new devotional each day, straight to your inbox.
          </p>

          {status === 'success' ? (
            <div className="flex items-start gap-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-800 dark:text-emerald-200 flex-1">{message}</p>
              <button onClick={dismiss} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
              {status === 'error' && (
                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                  <p className="text-sm text-red-700 dark:text-red-300 flex-1">{message}</p>
                  <button onClick={dismiss} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
