import { ContactForm, ContactList, Filter, Section } from 'components';
import React from 'react'

const Contacts = () => {
  return (
    <div>
          <Section title="Phonebook">
            <ContactForm/>
          </Section>
          <Section title="Contacts">
            <Filter/>
            <ContactList/>
          </Section>
    </div>
  )
}

export default Contacts;
