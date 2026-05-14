import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const filePath = path.join(process.cwd(), 'src/settings/admin.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const settings = JSON.parse(fileData);

  if (username === settings.admin.username && password === settings.admin.password) {
    // In a real app, we would set a secure cookie/session here
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
