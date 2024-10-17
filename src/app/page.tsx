import { auth } from '@/auth';

const HomePage = async () => {
  const session = await auth();

  return <main>{JSON.stringify(session)}</main>;
};

export default HomePage;
