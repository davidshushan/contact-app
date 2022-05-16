import React, {useState} from 'react';
import { Keyboard, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from './assets/Colors';
import SearchBar from './components/SearchBar';
import ContactInputField from './components/ContactInputField';
import ContactItem from './components/ContactItem';
import contacts from './.expo/database/Database';

export default function App() {

  //search bar
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const searchBarText = searchPhrase => {

    const tempContact= contacts;
    if (clicked && searchPhrase != "") {
      setContacts([...tempContact.filter(e => e.includes(searchPhrase))]);
      setClicked(false)
    }
        // not finished!
       // when i search with empty string it doesnt show all the list
    if (clicked && searchPhrase == ""){
      setContacts([contacts]);
      setClicked(false)
      
    }  
  };

  const [contacts, setContacts] = useState([]);

  const addContact = (contact) =>{
    if (contact == null) return;
    setContacts([...contacts, contact]);
    console.log(contacts)
    Keyboard.dismiss();
  }

  const deleteContact = (deleteIndex) =>{
    setContacts(contacts.filter((value, index) => index != deleteIndex));
  }

  return (
    <View style={styles.container}>
       <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <TouchableOpacity style={ {
        width:80, left:150, alignItems:'center', justifyContent: 'center', borderWidth: 2, borderRadius:5, borderColor: Colors.black, paddingHorizontal:15, backgroundColor: Colors.Aqua,
        }}  onPress={() => {Keyboard.dismiss(); setClicked(true); searchBarText(searchPhrase);}}>
          <Text style={{ width:70, padding:5,}}> Search</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>contact list:</Text>

        <ScrollView style={styles.scrollView}>
        {
        contacts.map((contact, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <ContactItem  index={index + 1} contact={contact} deleteContact={() => deleteContact(index)}/>
            </View>
          );
        })
      }
      </ScrollView>
      <ContactInputField addContact={addContact}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },

  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});
