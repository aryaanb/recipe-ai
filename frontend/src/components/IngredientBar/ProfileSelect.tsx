import React from 'react';

type Props = {
  setProfile: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileSelect = ({ setProfile }: Props) => {
  let profileOptions = [
    { label: 'Indian', value: 'indian' },
    { label: 'Italian', value: 'italian' },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfile(e.target.value);
  };
  return (
    <select
      onChange={handleChange}
      className='select select-bordered w-full  mb-2'
      defaultValue={'default'}
    >
      <option disabled value='default'>
        Select a recipe assistant...
      </option>
      {profileOptions.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ProfileSelect;
