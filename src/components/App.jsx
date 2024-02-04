import { ContactForm, ContactList, Section, Filter } from 'components';

export const App = () => {    
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm ></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter></Filter>
          <ContactList></ContactList>
        </Section>
      </div>
    )
};


// export const OLD App = () => {
//   const dispatch = useDispatch();
//   const state = useSelector(store => store)
//   console.log(state)
//   const contacts = useSelector(store => store.contacts.contacts);
//   const filter = useSelector(store => store.contacts.filter);

//   // const [contacts, setContacts] = useState([]);
//   // const [filter, setFilter] = useState('');
//   // const [name, setName] = useState('')
//   // const [number, setNumber] = useState('')

//   useEffect(() => {
//     const storedContacts = JSON.parse(localStorage.getItem('contacts'))
//     if (storedContacts && storedContacts.length > 0) {
//       // setContacts(storedContacts)
//     }
//   }, []);
  
//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts))
//   }, [contacts])
  
//   const onNameChange = e => {
//     setName(e.target.value)
//   }

//   const onNumberChange = e => {
//     setNumber(e.target.value)
//   }

//   const onFilterChange = e => {
//     setFilter(e.target.value)
//   }

//   const onSubmit = e => {
//     e.preventDefault()
//     const alreadyInContacts = contacts.some(contact => contact.name.toLowerCase() === name.trim().toLowerCase())
//     if (alreadyInContacts) {
//       alert(`Contact ${name} is already in List.`)
//       return;
//     }

//     const newContact = { id: nanoid(), name, number }
//     setContacts(prevContacts =>  [...prevContacts, newContact]
//     )
//     e.currentTarget.reset();
//   }

//   const onDeleteContact = idToDelete => {
//     const isConfirmed = window.confirm('Are you sure want to delete this contact?');
//     if (isConfirmed) {
//       setContacts(prevContacts => prevContacts.filter(contactElement => contactElement.id !== idToDelete))
//     }
//   }

//   const filteredContacts = contacts.filter(contactEl => contactEl.name.toLowerCase().includes(filter.trim().toLowerCase()))
    
//     return (
//       <div>
//         <Section title="Phonebook">
//           <ContactForm onNameChange={onNameChange} onNumberChange={onNumberChange} onSubmit={onSubmit}></ContactForm>
//         </Section>
//         <Section title="Contacts">
//           <Filter filterValue ={filter} onFilterChange = {onFilterChange}></Filter>
//           <ContactList contactsList={filteredContacts} onDeleteContact = {onDeleteContact}></ContactList>
//         </Section>
//       </div>
      
//     )
// };