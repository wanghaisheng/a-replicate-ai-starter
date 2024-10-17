import { protectServer } from '@/features/auth/utils';

const HomePage = async () => {
  await protectServer();

  return (
    <main>
      <h1>You are logged in!</h1>
    </main>
  );
};

export default HomePage;
