import './App.scss';
import ResizeObserver from 'react-resize-observer';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useState } from 'react';

export default function () {
  const giphyFetch = new GiphyFetch('D31L73ySufmBJ3YBDkmbVnH9TuWXuvMa');
  const [gridWidth, setGridWidth] = useState(document.getElementById('root').offsetWidth);
  const [currentAnimals, setCurrentAnimals] = useState('cats');

  const fetchGifs = offset => {
    return giphyFetch.search(currentAnimals, { offset, limit: 10 });
  };

  return (
    <>
      <header>Choose your Fighters</header>
      <div className="menu">
        {['cats', 'dogs', 'elephants', 'lions', 'monkeys'].map(d => (
          <button className={currentAnimals === d ? 'active' : null} key={d} onClick={() => setCurrentAnimals(d)}>{d}</button>
        ))}
      </div>

      <Grid key={currentAnimals} width={gridWidth} columns={3} fetchGifs={fetchGifs} gutter={6} />
      <ResizeObserver
        onResize={({ width }) => {
          setGridWidth(width);
        }}
      />
    </>
  );
}
