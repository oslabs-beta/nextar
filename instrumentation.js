export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('./instrumentation.node.js')
      const {startTrace} = await import('@nextar/tracer');
      startTrace();
    }
  }