"use client";
import useSWR from 'swr';
import { destinations, liveDestinations } from '@/data/travelData';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Filter } from 'lucide-react';

interface ContactSubmission { id: string; name: string; email: string; subject: string; message: string; createdAt: string; userAgent?: string; archived?: boolean; }
interface BookingRecord { id: string; destinationId: string; name: string; email: string; phone?: string; gender: string; ageRange: string; createdAt: string; userAgent?: string; archived?: boolean; }
interface ContactResponse { submissions?: ContactSubmission[]; count?: number; error?: string; page?: number; pageSize?: number; total?: number; }
interface BookingsResponse { bookings?: BookingRecord[]; count?: number; error?: string; page?: number; pageSize?: number; total?: number; }

// All fetching goes through authFetcher; removed unused generic fetcher.

type TabKey = 'contact' | 'bookings';

export default function AdminDataDashboard() {
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('contact');
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [includeArchived, setIncludeArchived] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  // persist token
  useEffect(() => {
    const saved = localStorage.getItem('adminToken');
    if (saved) setToken(saved);
  }, []);
  useEffect(() => { if (token) localStorage.setItem('adminToken', token); }, [token]);

  const baseParams = `page=${page}&pageSize=${pageSize}&q=${encodeURIComponent(search)}&from=${fromDate}&to=${toDate}&includeArchived=${includeArchived}`;
  const contactKey = token ? `/api/contact?${baseParams}` : null;
  const bookingsKey = token ? `/api/bookings?${baseParams}&destination=${destinationFilter}` : null;
  const authFetcher = (url: string) => fetch(url, { headers: { Authorization: `Bearer ${token}` }}).then(r=>r.json());
  const { data: contactData, isLoading: loadingContacts, mutate: refreshContacts, error: contactError } = useSWR<ContactResponse>(contactKey, authFetcher);
  const { data: bookingData, isLoading: loadingBookings, mutate: refreshBookings, error: bookingsError } = useSWR<BookingsResponse>(bookingsKey, authFetcher);

  // Direct lists (memo not required; arrays small and SWR already memoizes data objects)
  const contactList = contactData?.submissions || [];
  const bookingList = bookingData?.bookings || [];

  // date filtering occurs server-side now

  // server already filtered/paginated; just show list
  const filteredContacts = contactList;
  const filteredBookings = bookingList;

  const activeTotal = activeTab === 'contact' ? (contactData?.total || 0) : (bookingData?.total || 0);

  const uniqueDestinationIds = useMemo(() => Array.from(new Set(bookingList.map(b => b.destinationId))).sort(), [bookingList]);

  // destination name mapping (client-side lightweight static import via dynamic) - simplified manual list to avoid large import
  const destinationNameMap = useMemo<Record<string,string>>(()=>{
    const map: Record<string,string> = {};
    destinations.forEach(d => { map[d.id] = d.name; });
    liveDestinations.forEach(d => { map[d.id] = d.name; });
    bookingList.forEach(b => { if (!map[b.destinationId]) map[b.destinationId] = b.destinationId; });
    return map;
  },[bookingList]);

  const authedContacts = !!contactData?.submissions;
  const authedBookings = !!bookingData?.bookings;
  const unauthorized = token && ((activeTab === 'contact' && !authedContacts) || (activeTab === 'bookings' && !authedBookings));

  const loading = activeTab === 'contact' ? loadingContacts : loadingBookings;
  const error = activeTab === 'contact' ? contactError : bookingsError;

  const refreshAll = () => { refreshContacts(); refreshBookings(); };

  function toggleArchive(tab: TabKey, id: string, archived: boolean) {
    if (!token) return;
    const base = tab === 'contact' ? '/api/contact' : '/api/bookings';
    fetch(`${base}?id=${id}&archived=${archived}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } })
      .then(()=>refreshAll());
  }

  useEffect(()=>{ setPage(1); }, [search, fromDate, toDate, destinationFilter, includeArchived, activeTab]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      <section className="py-14" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-6xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-2">Admin Data Dashboard</h1>
          <p className="opacity-80">Contacts & Bookings • Secure token access.</p>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Token + Tabs */}
        <div className="rounded-2xl p-6 shadow-xl border border-gray-700 space-y-6" style={{backgroundColor:'#0d1d30'}}>
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-white">Admin Token</label>
              <input value={token} onChange={e => setToken(e.target.value)} placeholder="Enter CONTACT_ADMIN_TOKEN" className="w-full rounded-xl border border-gray-600 bg-[#14263a] hover:bg-[#193149] px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-400 outline-none transition shadow-sm text-white placeholder-gray-400" />
            </div>
            <div className="flex gap-3">
              <button onClick={refreshAll} disabled={!token} className="bg-orange-500 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-orange-600 transition shadow-sm hover:shadow"><RefreshCw className="h-4 w-4"/> Refresh</button>
              <button
                onClick={async ()=>{
                  if(!token) return;
                  const type = activeTab==='contact' ? 'contact' : 'bookings';
                  const url = `/api/admin/export?type=${type}&archived=${includeArchived}`;
                  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});
                  if(!res.ok){ alert('Export failed'); return; }
                  const blob = await res.blob();
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = `${type}.csv`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
                }}
                disabled={!token}
                className="bg-[#14263a] disabled:opacity-50 border border-gray-600 px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#193149] transition text-gray-200 shadow-sm"
                title="Download CSV (Authorization header)"
              ><Download className="h-4 w-4"/> CSV</button>
            </div>
          </div>
          {(token) && (
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2 bg-[#14263a] border border-gray-600 rounded-lg p-1">
              <button onClick={() => setActiveTab('contact')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab==='contact' ? 'bg-orange-500 text-white shadow' : 'text-gray-300 hover:text-white'}`}>Contacts</button>
              <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab==='bookings' ? 'bg-orange-500 text-white shadow' : 'text-gray-300 hover:text-white'}`}>Bookings</button>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm"><Filter className="h-4 w-4"/> Filters</div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded-lg border border-gray-600 bg-[#14263a] text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-gray-100 placeholder-gray-400" />
            <input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-600 bg-[#14263a] text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-gray-100 placeholder-gray-400" />
            <input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-600 bg-[#14263a] text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-gray-100 placeholder-gray-400" />
            {activeTab==='bookings' && (
              <select value={destinationFilter} onChange={e=>setDestinationFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-600 bg-[#14263a] text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-400 text-gray-100">
                <option value="">All Destinations</option>
                {uniqueDestinationIds.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
            )}
            <label className="flex items-center gap-1 text-xs text-gray-300">
              <input type="checkbox" checked={includeArchived} onChange={e=>setIncludeArchived(e.target.checked)} className="accent-orange-500" /> Archived
            </label>
            {(fromDate || toDate || search || destinationFilter || includeArchived) && (
              <button onClick={()=>{setSearch('');setFromDate('');setToDate('');setDestinationFilter('');setIncludeArchived(false);}} className="text-xs text-gray-400 underline hover:text-gray-200">Clear</button>
            )}
            <div className="ml-auto text-xs text-gray-300">Page {page} / {Math.max(1, Math.ceil(activeTotal / pageSize))} • {activeTotal} total</div>
          </div>
          )}
        </div>

        {/* Data Table */}
  <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-white/60">
            <h2 className="font-semibold" style={{ color: '#0d1d30' }}>{activeTab === 'contact' ? 'Contact Submissions' : 'Bookings'}</h2>
            {unauthorized && <span className="text-xs text-red-600">Unauthorized (check token)</span>}
          </div>
          {!token && (
            <div className="p-6 text-center text-sm text-gray-600">Enter your admin token above to view data.</div>
          )}
          {token && <div className="divide-y max-h-[60vh] overflow-auto text-sm">
            {loading && <p className="p-4 text-gray-500">Loading...</p>}
            {error && <p className="p-4 text-red-600">Failed to load.</p>}
            {!loading && !unauthorized && activeTab==='contact' && filteredContacts.map(c => (
              <motion.div key={c.id} initial={{opacity:0}} animate={{opacity:1}} className={`p-4 space-y-1 ${c.archived ? 'opacity-60' : ''}`}>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <span><strong>Name:</strong> {c.name}</span>
                  <span><strong>Email:</strong> {c.email}</span>
                  <span><strong>Subject:</strong> {c.subject}</span>
                  <span><strong>Date:</strong> {new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">{c.message}</p>
                <div className="pt-1">
                  <button onClick={()=>toggleArchive('contact', c.id, !c.archived)} className="text-xs underline text-orange-600 hover:text-orange-700">{c.archived ? 'Unarchive' : 'Archive'}</button>
                </div>
              </motion.div>
            ))}
            {!loading && !unauthorized && activeTab==='bookings' && filteredBookings.map(b => (
              <motion.div key={b.id} initial={{opacity:0}} animate={{opacity:1}} className={`p-4 space-y-1 ${b.archived ? 'opacity-60' : ''}`}>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <span><strong>Name:</strong> {b.name}</span>
                  <span><strong>Email:</strong> {b.email}</span>
                  <span><strong>Destination:</strong> {destinationNameMap[b.destinationId] || b.destinationId}</span>
                  <span><strong>Gender:</strong> {b.gender}</span>
                  <span><strong>Age:</strong> {b.ageRange}</span>
                  <span><strong>Date:</strong> {new Date(b.createdAt).toLocaleString()}</span>
                </div>
                {b.phone && <p className="text-gray-600"><strong>Phone:</strong> {b.phone}</p>}
                <div className="pt-1">
                  <button onClick={()=>toggleArchive('bookings', b.id, !b.archived)} className="text-xs underline text-orange-600 hover:text-orange-700">{b.archived ? 'Unarchive' : 'Archive'}</button>
                </div>
              </motion.div>
            ))}
            {!loading && !unauthorized && activeTab==='contact' && filteredContacts.length === 0 && <p className="p-4 text-gray-500">No submissions on this page.</p>}
            {!loading && !unauthorized && activeTab==='bookings' && filteredBookings.length === 0 && <p className="p-4 text-gray-500">No bookings on this page.</p>}
            {unauthorized && <p className="p-4 text-gray-500">Enter a valid token to view data.</p>}
          </div>}
          {token && !loading && !unauthorized && (
            <div className="p-4 flex justify-between items-center bg-white/70 text-xs">
              <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 rounded bg-gray-100 disabled:opacity-40 hover:bg-gray-200">Prev</button>
              <div>Page {page} / {Math.max(1, Math.ceil(activeTotal / pageSize))}</div>
              <button disabled={page >= Math.ceil(activeTotal / pageSize)} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 rounded bg-gray-100 disabled:opacity-40 hover:bg-gray-200">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
