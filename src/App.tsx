import React, { useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { DropdownList } from './components/DropdownList';
import { Person } from './types/Person';

export const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { name, born, died } = selectedPerson || {};

  const [people] = useState(peopleFromServer);
  const [searchValue, setSearchValue] = useState<string>('');
  const [delay, setDelay] = useState(300);

  const suggestedPeople = useMemo(() => {
    if (/\s+/.test(searchValue)) {
      return people;
    }

    return people.filter((person: Person) => {
      return person.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, people]);

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  }

  const onSelected = (person: Person) => {
    setSelectedPerson(person);
  }

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-qa="title">
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
          delay={delay}
        />
      </main>
    </div>
  );
};
