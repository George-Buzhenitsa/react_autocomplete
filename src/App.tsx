import React, { useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { DropdownList } from './components/DropdownList';
import { Person } from './types/Person';

function debounce(callback: Function, delay: number) {
  let timerId = 0;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay)
  }
}

export const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { name, born, died } = selectedPerson || {};

  const [people] = useState(peopleFromServer);
  const [searchValue, setSearchValue] = useState<string>('');
  const [delayTime, setDelayTime] = useState(300);

  const suggestedPeople = useMemo(() => {
    return people.filter((person: Person) => {
      return person.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue]);

  const searchDebouncer = debounce(setSearchValue, delayTime);

  const handleSearchValue = (value: string) => {
    searchDebouncer(value);
  }

  const onSelected = (person: Person) => {
    setSelectedPerson(person);
  }

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selectedPerson
            ? `${name} (${born} - ${died})`
            : 'No selected person'}
        </h1>

        <DropdownList
          people={suggestedPeople}
          handleSearchValue={handleSearchValue}
          onSelected={onSelected}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
        />
      </main>
    </div>
  );
};
