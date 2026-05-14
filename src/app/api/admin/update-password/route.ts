import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const body = await request.json();
  const { currentPassword, newPassword } = body;

  const filePath = path.join(process.cwd(), 'src/settings/admin.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const settings = JSON.parse(fileData);

  // Security check: must provide current password to change to a new one
  if (currentPassword !== settings.admin.password) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  settings.admin.password = newPassword;

  fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));

  return NextResponse.json({ success: true });
}
