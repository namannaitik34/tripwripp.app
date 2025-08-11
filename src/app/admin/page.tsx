import { redirect } from 'next/navigation';

export default function AdminIndex() {
  // Redirect root /admin to the submissions dashboard
  redirect('/admin/submissions');
}
