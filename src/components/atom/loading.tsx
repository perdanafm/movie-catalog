export const Loading = () => {
  return (
    <div className='flex space-x-2 mt-48'>
      <div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></div>
      <div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]'></div>
      <div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]'></div>
    </div>
  );
};
