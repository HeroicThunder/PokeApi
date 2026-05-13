import type { PokemonDetail } from '../types/pokemon.types';

interface Props {
  pokemon: PokemonDetail;
}

function PokemonCard({ pokemon }: Props) {
  const imagen = pokemon.sprites.other['official-artwork'].front_default;
  const tipos = pokemon.types.map((t) => t.type.name).join(', ');

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '150px', textAlign: 'center' }}>
      <p>#{pokemon.id}</p>
      <img src={imagen} alt={pokemon.name} width={100} />
      <p style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{pokemon.name}</p>
      <p style={{ color: 'gray', fontSize: '0.85rem' }}>{tipos}</p>
    </div>
  );
}

export default PokemonCard;