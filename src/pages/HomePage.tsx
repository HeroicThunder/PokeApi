import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemonList, getPokemonDetail } from '../services/pokemon.service';
import type { PokemonDetail } from '../types/pokemon.types';
import PokemonCard from '../components/PokemonCard';

function HomePage() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarPokemon() {
      try {
        const lista = await getPokemonList();
        const detalles = await Promise.all(
          lista.map((p) => getPokemonDetail(p.name))
        );
        setPokemonList(detalles);
      } catch (e) {
        setError('Hubo un error al cargar los Pokémon.');
      } finally {
        setLoading(false);
      }
    }

    cargarPokemon();
  }, []);

  if (loading) return <p>Cargando Pokémon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} onClick={() => navigate(`/pokemon/${pokemon.name}`)} style={{ cursor: 'pointer' }}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;