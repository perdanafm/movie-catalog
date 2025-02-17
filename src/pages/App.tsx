import { useGetListDiscoverMovie } from '@/services/hooks';

function App() {
  const data = useGetListDiscoverMovie();
  console.log(data.data?.results);
  return (
    <main>
      <h1>List Movie Catalog</h1>
    </main>
  );
}

export default App;
