import bcrypt from 'bcrypt';
import { supabase } from '../db/connectSupaBase.js';

export async function signupController(req, res) {
  const { username, password, role } = req.body;

  try {
    // בדיקה אם המשתמש כבר קיים
    const { data: existingUsers, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    if (findError) throw findError;

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // הכנסת המשתמש למסד
    const { error: insertError } = await supabase.from('users').insert([
      {
        username,
        hash_password: hashedPassword,
        role: role || 'admin',
      },
    ]);

    if (insertError) throw insertError;

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Signup failed' });
  }
}
