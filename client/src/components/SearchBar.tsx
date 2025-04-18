import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const searchParams = new URLSearchParams(location.search);

    if (searchValue) {
      searchParams.set('q[name_cont]', searchValue);
    } else {
      searchParams.delete('q[name_cont]');
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <InputGroup maxW="md">
      <InputLeftElement pointerEvents="none">
        <FiSearch />
      </InputLeftElement>
      <Input
        placeholder="Search surveys..."
        onChange={handleSearch}
        defaultValue={
          new URLSearchParams(location.search).get('q[name_cont]') || ''
        }
      />
    </InputGroup>
  );
}
