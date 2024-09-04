import API_URL from '@/config/api';

import User from '../models/user';
import LoginParams from '../params/login-params';

export async function login(user: LoginParams): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/session/${user.as}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    if (response.status !== 200) {
      throw Error('These credentials do not match our records.');
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.nama,
      username: data.username,
      token: data.token,
      role: user.as,
      classId: data.class_id,
      guruId: data.guru_id,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('An error occurred while logging in. Please try again.');
  }
}
