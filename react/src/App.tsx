import { useEffect, useState } from 'react';

interface DataI {
  message: string
}

function App() {
  const [data, setdata] = useState<DataI | null>(null)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const url = '/api/welcome';
        const resp = await fetch(url);
        const json = await resp.json()
        setdata(json);
      } catch(e) {
        console.log(e);
      }
    }
    fetchData();
   }, [])

   console.log(data);

  return (
    <div>
      {data?.message ? <p>{data?.message}</p> : <p>No message yet!</p>}
    </div>
  )
}

export default App
