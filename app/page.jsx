"use client";

import { useMemo, useState } from 'react';

const locales = [
  { label: 'United States (.com)', value: 'amazon.com' },
  { label: 'United Kingdom (.co.uk)', value: 'amazon.co.uk' },
  { label: 'Canada (.ca)', value: 'amazon.ca' },
  { label: 'Germany (.de)', value: 'amazon.de' },
  { label: 'France (.fr)', value: 'amazon.fr' },
  { label: 'Spain (.es)', value: 'amazon.es' },
  { label: 'Italy (.it)', value: 'amazon.it' },
  { label: 'Japan (.co.jp)', value: 'amazon.co.jp' },
  { label: 'India (.in)', value: 'amazon.in' },
  { label: 'Australia (.com.au)', value: 'amazon.com.au' },
];

const categories = [
  { label: 'All Departments', value: '' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Computers & Accessories', value: 'computers' },
  { label: 'Camera & Photo', value: 'photo' },
  { label: 'Video Games', value: 'videogames' },
  { label: 'Home & Kitchen', value: 'garden' },
  { label: 'Clothing, Shoes & Jewelry', value: 'fashion' },
  { label: 'Industrial & Scientific', value: 'industrial' },
  { label: 'Sports & Outdoors', value: 'sporting' },
  { label: 'Health & Household', value: 'hpc' },
];

function buildAmazonUrl({ query, domain, category }) {
  const base = `https://${domain}/s`;
  const params = new URLSearchParams();
  params.set('k', query.trim());
  params.set('s', 'price-desc-rank');
  if (category) params.set('i', category);
  return `${base}?${params.toString()}`;
}

export default function Page() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState(locales[0].value);
  const [category, setCategory] = useState(categories[0].value);

  const url = useMemo(() => buildAmazonUrl({ query, domain, category }), [query, domain, category]);

  const canSearch = query.trim().length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSearch) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '40px' }}>
      <div style={{ width: '100%', maxWidth: 720 }}>
        <h1 style={{ fontSize: 32, margin: 0, letterSpacing: 0.5 }}>Find the most expensive items on Amazon</h1>
        <p style={{ color: '#A7B1C2', marginTop: 8 }}>Search any keyword and jump straight to results sorted by highest price.</p>

        <form onSubmit={onSubmit} style={{ marginTop: 24, display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label htmlFor="query" style={{ fontWeight: 600 }}>Search term</label>
            <input
              id="query"
              placeholder="e.g. luxury watch, gaming pc, 8k tv"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                border: '1px solid #26324A',
                background: '#0F172A',
                color: '#E6EAF2',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label htmlFor="locale" style={{ fontWeight: 600 }}>Amazon locale</label>
              <select
                id="locale"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid #26324A', background: '#0F172A', color: '#E6EAF2' }}
              >
                {locales.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <label htmlFor="category" style={{ fontWeight: 600 }}>Category (optional)</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid #26324A', background: '#0F172A', color: '#E6EAF2' }}
              >
                {categories.map((c) => (
                  <option key={c.value || 'all'} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
            <button
              type="submit"
              disabled={!canSearch}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #3B82F6',
                background: canSearch ? '#2563EB' : '#1E293B',
                color: '#E6EAF2',
                cursor: canSearch ? 'pointer' : 'not-allowed',
                fontWeight: 600
              }}
            >
              Open on Amazon →
            </button>

            <a
              href={canSearch ? url : '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#93C5FD' }}
              aria-disabled={!canSearch}
            >
              {canSearch ? 'Copy/share direct link' : 'Enter a search term'}
            </a>
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: '#94A3B8' }}>
            Tip: Amazon supports sorting with the <code>s=price-desc-rank</code> parameter. Some categories may not allow price sorting.
          </div>
        </form>
      </div>
    </main>
  );
}
