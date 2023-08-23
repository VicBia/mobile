import { Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { BoxSearch } from './styles';

export function SearchBar(props) {
  const searchRef = useRef<any>();
  const [value, setValue] = useState('');
  const { handleQuery } = props;
  
  useEffect(() => {
    handleQuery(value);
  }, [value]);

  return (
    <BoxSearch>
      <Pressable
        onPress={() => searchRef?.current?.focus()}
        style={{ display: 'flex', flexDirection: 'row', width: '70%', gap: 10 }}
      >
        <Image source={require('../../assets/search.png')} />
        <TextInput
          style={{ minWidth: 150, fontSize: 18 }}
          ref={searchRef}
          maxLength={25}
          autoCapitalize="none"
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      </Pressable>
      <TouchableOpacity onPress={() => setValue('')}>
        <Image source={require('../../assets/clear.png')} />
      </TouchableOpacity>
    </BoxSearch>
  );
}
