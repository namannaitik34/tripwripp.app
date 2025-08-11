import { promises as fs } from 'fs';
import { join } from 'path';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  userAgent?: string;
  archived?: boolean;
}

const dataDir = join(process.cwd(), '.data');
const filePath = join(dataDir, 'contact-submissions.json');

async function ensureFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

export async function addSubmission(sub: Omit<ContactSubmission, 'id' | 'createdAt'> & Partial<Pick<ContactSubmission, 'userAgent'>>) {
  await ensureFile();
  const raw = await fs.readFile(filePath, 'utf-8');
  const list: ContactSubmission[] = JSON.parse(raw || '[]');
  const record: ContactSubmission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...sub
  } as ContactSubmission;
  list.push(record);
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf-8');
  return record;
}

export async function getSubmissions(includeArchived = false): Promise<ContactSubmission[]> {
  try {
    await ensureFile();
    const raw = await fs.readFile(filePath, 'utf-8');
    const list: ContactSubmission[] = JSON.parse(raw || '[]').map((r: ContactSubmission) => ({ ...r, archived: r.archived ?? false }));
    return includeArchived ? list : list.filter(r => !r.archived);
  } catch {
    return [];
  }
}

export async function setArchived(id: string, archived: boolean) {
  await ensureFile();
  const raw = await fs.readFile(filePath, 'utf-8');
  const list: ContactSubmission[] = JSON.parse(raw || '[]').map((r: ContactSubmission) => ({ ...r, archived: r.archived ?? false }));
  const idx = list.findIndex(r => r.id === id);
  if (idx === -1) return false;
  list[idx].archived = archived;
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), 'utf-8');
  return true;
}

export function toCSV(rows: ContactSubmission[]) {
  const headers = ['id','name','email','subject','message','createdAt','userAgent','archived'];
  const escape = (val: string | undefined) => {
    if (val == null) return '';
    const needsQuotes = /[",\n]/.test(val);
    const escaped = val.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };
  const lines = [headers.join(',')];
  for (const r of rows) {
    const rec: Record<string, string | undefined> = {
      id: r.id,
      name: r.name,
      email: r.email,
      subject: r.subject,
      message: r.message,
      createdAt: r.createdAt,
      userAgent: r.userAgent,
      archived: r.archived ? 'true' : 'false'
    };
    lines.push(headers.map(h => escape(rec[h])).join(','));
  }
  return lines.join('\n');
}
