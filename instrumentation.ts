export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initCrons } = await import('./app/server/index');
    initCrons();
  }
}