"use client";
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome to ChefScript</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Enter your email" className="w-full p-4 border rounded-xl" value={email} onChange={e => setEmail(e.target.value)} required />
          <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">{loading ? 'Sending...' : 'Send Magic Login Link'}</button>
        </form>
      </div>
    </div>
  );
}
