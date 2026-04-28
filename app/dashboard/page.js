"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState([{ name: '', price: '' }]);
  const [settings, setSettings] = useState({
    kitchen_name: "Ammi's Kitchen",
    city: "Karachi",
    delivery_areas: "DHA, Clifton",
    delivery_fee: "150",
    min_free_delivery: "2000",
    phone_number: "923001234567"
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ menuItems: items, settings }),
    });
    const data = await res.json();
    setOutput(data.text);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Kitchen Settings</h2>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Kitchen Name" onChange={e => setSettings({...settings, kitchen_name: e.target.value})} />
          <input className="w-full mb-2 p-2 border rounded" placeholder="WhatsApp Number (923...)" onChange={e => setSettings({...settings, phone_number: e.target.value})} />
          <textarea className="w-full mb-2 p-2 border rounded" placeholder="Delivery Areas" onChange={e => setSettings({...settings, delivery_areas: e.target.value})} />
        </div>

        {/* Menu Builder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Today's Menu</h2>
          {items.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input className="flex-1 p-2 border rounded" placeholder="Dish" onChange={e => {
                const newItems = [...items];
                newItems[i].name = e.target.value;
                setItems(newItems);
              }} />
              <input className="w-20 p-2 border rounded" placeholder="Rs" onChange={e => {
                const newItems = [...items];
                newItems[i].price = e.target.value;
                setItems(newItems);
              }} />
            </div>
          ))}
          <button onClick={() => setItems([...items, {name:'', price:''}])} className="text-green-600 font-bold">+ Add Item</button>
          <button onClick={generate} className="w-full bg-green-600 text-white py-3 rounded-xl mt-4 font-bold">
            {loading ? "AI is writing..." : "Generate Broadcast"}
          </button>
        </div>
      </div>

      {output && (
        <div className="max-w-4xl mx-auto mt-8 bg-slate-900 text-green-400 p-6 rounded-2xl">
          <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-bold">Copy Message</button>
        </div>
      )}
    </div>
  );
}
