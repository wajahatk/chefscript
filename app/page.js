"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState([{ name: '', price: '' }]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuItems: items, settings: { kitchen_name: "Ammi's Kitchen" } }),
      });
      const data = await res.json();
      setOutput(data.text);
    } catch (err) {
      console.error("AI Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 italic">ChefScript</h1>
          <p className="text-slate-500 mt-2">Manage your kitchen and generate broadcasts</p>
        </header>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-green-600 text-white">
            <h2 className="text-xl font-bold">Today's Menu Builder</h2>
          </div>
          
          <div className="p-8 space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input 
                  placeholder="Dish Name (e.g. Biryani)" 
                  className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                  onChange={e => {
                    const n = [...items]; n[i].name = e.target.value; setItems(n);
                  }}
                />
                <input 
                  placeholder="Price" 
                  className="w-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                  onChange={e => {
                    const n = [...items]; n[i].price = e.target.value; setItems(n);
                  }}
                />
              </div>
            ))}
            
            <button onClick={() => setItems([...items, {name:'', price:''}])} className="text-green-600 font-bold hover:underline transition">
              + Add Item
            </button>

            <button 
              onClick={generate}
              disabled={loading}
              className="w-full mt-6 bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition transform hover:scale-[1.01]"
            >
              {loading ? "AI is crafting your menu..." : "Generate WhatsApp Draft"}
            </button>
          </div>
        </div>

        {output && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Final Copy (WhatsApp Ready)</p>
              <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm leading-relaxed">{output}</pre>
              <button 
                onClick={() => navigator.clipboard.writeText(output)}
                className="w-full mt-6 bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-100 transition"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
