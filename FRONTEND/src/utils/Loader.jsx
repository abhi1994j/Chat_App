import { LuLoader } from 'react-icons/lu';

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LuLoader className="size-6 animate-spin" />
    </div>
  );
};

export { Loader };
