import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/pokemon.service';
import type { PokemonDetail } from '../types/pokemon.types';

function DetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarDetalle() {
      try {
        const data = await getPokemonDetail(name!);
        setPokemon(data);
      } catch (e) {
        setError('No se encontró el Pokémon.');
      } finally {
        setLoading(false);
      }
    }

    cargarDetalle();
  }, [name]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return null;

  const imagen = pokemon.sprites.other['official-artwork'].front_default;
  const tipos = pokemon.types.map((t) => t.type.name).join(', ');
  const habilidades = pokemon.abilities.map((a) => a.ability.name).join(', ');

  return (
    <div>
      <button onClick={() => navigate('/')}>← Regresar</button>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <h1 style={{ textTransform: 'capitalize' }}>#{pokemon.id} {pokemon.name}</h1>
        <img src={imagen} alt={pokemon.name} width={200} />

        <p><strong>Tipos:</strong> {tipos}</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Habilidades:</strong> {habilidades}</p>

        <h2>Estadísticas</h2>
        {pokemon.stats.map((s) => (
          <div key={s.stat.name} style={{ marginBottom: '0.5rem' }}>
            <span style={{ textTransform: 'capitalize' }}>{s.stat.name}: </span>
            <strong>{s.base_stat}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailPage;