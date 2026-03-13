import db from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const results = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (results.length === 0) {
      return Response.json(
        { error: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

    return Response.json({
      message: 'Login realizado com sucesso',
      user: {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email
      }
    });
  } catch (error) {
    return Response.json(
      { error: 'Erro no servidor: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: 'Método GET não permitido' }, { status: 405 });
}
