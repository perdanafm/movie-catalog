export const Loading = () => {
  return (
    <div className='flex space-x-2'>
      <div className='w-5 h-5 bg-blue-500 rounded-full animate-bounce'></div>
      <div className='w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]'></div>
      <div className='w-5 h-5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]'></div>
    </div>
  );
};
