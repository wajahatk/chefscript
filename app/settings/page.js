"use client";
import { useState } from 'react';

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">Kitchen Settings</h1>
        <div className="space-y-4">
          <div><label className="block text-sm font-bold mb-1">City</label><input type="text" placeholder="Karachi" className="w-full p-3 border rounded-lg"/></div>
          <div><label className="block text-sm font-bold mb-1">Delivery Fee</label><input type="number" placeholder="150" className="w-full p-3 border rounded-lg"/></div>
          <div><label className="block text-sm font-bold mb-1">Min Order for Free Delivery</label><input type="number" placeholder="2000" className="w-full p-3 border rounded-lg"/></div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-4">Save Information</button>
        </div>
      </div>
    </div>
  );
}
