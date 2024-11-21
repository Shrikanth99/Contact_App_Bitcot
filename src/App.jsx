import { Box, Button, Input, Flex, Heading, Image, Stack, useDisclosure } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus,  } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Routes,Route, Link,  } from "react-router-dom";
import Contacts from "./Components/Contacts";
import AddContact from "./Components/AddContact";
import ViewContact from "./Components/ViewContact";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen : isOpenV, onOpen : onOpenV, onClose : onCloseV } = useDisclosure()
  const { isOpen : isOpenEdit, onOpen : onOpenEdit, onClose: onCloseEdit} = useDisclosure()
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [gotObj, setGotObj] = useState({})

  const handleModalOpen = () => { // for persist Modal
    localStorage.setItem('isModalOpen', 'true')
    onOpen()
  }

  const handleAddContact = (newContact) => {  // to add new contact
    const addContact = [...contacts, newContact]
      setContacts(addContact)
      localStorage.setItem('contacts', JSON.stringify(addContact))
  }

  const handleSearch = (e) => { // handle search
    setSearchQuery(e.target.value)
  }

  const updateContact = (obj) => { // update exist obj
    console.log('newObj',obj)
    let result = contacts.map((ele) => {
      if( ele.id === obj.id){
        return { ...ele, ...obj }
      }else {
        return { ...ele }
      }
    })
    setContacts(result)
    localStorage.setItem('contacts', JSON.stringify(result))
    // setContacts((prev) => [
    //   ...contacts, contacts.map((el) => {
    //     if(el.id === obj.id){
    //       return {...el, ...obj}
    //     }else{
    //       return {...el}
    //     }
    //   })
    // ])
  }

  const getContact = (id) => { // to catch id
    setContactId(id)
  }

  const catchObjV = (obj) => {
    setGotObj(obj)
  }

  const handleDelContact = (id) => { // handle DelteFunc
    console.log(id)
    const latestContact = contacts.filter(ele => ele.id !== id )
    // setContacts((prev) => [
    //   ...contacts.filter( contact => contact.id !== id )
    // ])
    setContacts(latestContact)
    localStorage.setItem('contacts', JSON.stringify(latestContact))

  }

  let filterContacts = contacts.filter( contact => {
    return (
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.email.toLowerCase().includes(searchQuery.toLowerCase()) || contact.mobile.includes(searchQuery)
    )
  } )

  let contact = contacts.find(el => el.id === contactId)

  useEffect(() => {
    // for Persisting Modal
    const isModalOpen = localStorage.getItem('isModalOpen')
    const isEditModalOpen = localStorage.getItem('isEditModalOpen')
    
    if( isModalOpen ){
        onOpen()
    }
    if(isEditModalOpen){
      onOpenEdit()
    }
  },[])

  useEffect(() => {
    // store in local storage
    const savedContacts = JSON.parse(localStorage.getItem('contacts'))
    if(savedContacts && savedContacts.length > 0 ){
    console.log('Loaded contacts from local storage:', savedContacts);
    setContacts(savedContacts);
    }else{
      (async () => {
        try {
          const res= await fetch(`https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json`)
          const result = await res.json()
          setContacts(result)
           localStorage.setItem('contacts', JSON.stringify(result))
        } catch (e) {
          console.log('err',e)
          alert(`${e.message}`)
        }
      })()
    }
  }, []);

  return (
    <Box p='2'>
      <Flex p="10"  justify="center" align="center">
        <Image src="/Contacts.png" w="150px" h="150px" />
        <Heading as="h1" fontSize={35} textTransform="uppercase" p="20">
          Contacts-App
        </Heading>
      </Flex>
      <Box>
        <Link to='/add-contact'>
        <Button  p="6" bg="purple.700" color="white" w="full" fontWeight="bold" fontSize='xl'
        colorScheme='purple'
        component={Link}
        to='/add-contact'
        onClick={handleModalOpen}
        >
        <FontAwesomeIcon icon={faPlus} size="2x" /> 
          Add-Contacts
        </Button>
        </Link>
      </Box>
      <Box p='4'>

        <Input value={searchQuery} onChange={ handleSearch}  placeholder="Search contacts" />

      </Box>
      <Box p='4'>
        <Contacts catchObjV={catchObjV} onOpenV={onOpenV} contacts={ searchQuery ? filterContacts : contacts} handleDelContact={handleDelContact} getContact={getContact}  onOpen={onOpenEdit}  />
      </Box>

      <Routes>
        <Route path="/add-contact" element={<AddContact isOpenEdit={isOpenEdit} isOpen={isOpen} onClose={onClose} handleAddContact={handleAddContact} />} />
        <Route path="/edit" element={<AddContact updateContact={updateContact} contact={contact} isOpen={isOpenEdit} onOpen={onOpenEdit}  onClose={onCloseEdit} />} />
        <Route path="/view" element={<ViewContact gotObj={gotObj} isOpen={isOpenV} onOpen={onOpenV} onClose={onCloseV} /> } />
      </Routes>

    </Box>
  );
};

export default App;
