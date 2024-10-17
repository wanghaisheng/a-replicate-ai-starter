import { auth } from '@/auth';
import { protectServer } from '@/features/auth/utils';

const HomePage = async () => {
  await protectServer();

  const session = await auth();

  return (
    <main>
      <h1>{JSON.stringify(session)}</h1>
    </main>
  );
};

export default HomePage;
