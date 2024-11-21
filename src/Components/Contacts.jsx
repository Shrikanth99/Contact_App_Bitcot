import { Flex, Text, Stack, Box } from '@chakra-ui/react'
import { faTrash, faEye, faEdit, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  Link } from 'react-router-dom'
import React from 'react'

const Contacts = ({onOpenV,getContact, catchObjV, contacts, handleDelContact, onCloseEdit, onOpen, isOpenEdit}) => {
    // const {contacts} = props

    const handleDel = (id) => {
        console.log(id)
        handleDelContact(id)
    }

    const handleEdit = (obj) => {
        console.log('edit',obj)
        getContact(obj.id)
        localStorage.setItem('isEditModalOpen','true')
        onOpen()
        

    }

    const handleView = (obj) => {
        catchObjV(obj) 
        onOpenV()      
    }

  return (
    <>
    { contacts.map((el) => (
    <div key={el.id}>
        <Flex key={el.id} mb='4' justify='space-between' bg='purple.500' p='4' borderRadius='lg' boxShadow='xl' >
        <Flex align='center'  >
        <FontAwesomeIcon icon={faUser} size="2x" />
        <Stack ml='4' >
        <Text>{el.name}</Text>
        <Text>{ el.mobile }</Text>
        </Stack>
        </Flex>
        <Flex align='cz' mr='5' >
            <Box mr='5' onClick={() => handleView(el) } >
                <Link to='/view' >
                <FontAwesomeIcon icon={faEye} size="2x" />
                </Link>
            </Box>
            <Box mr='5' onClick={() => handleEdit(el)} >
                <Link to='/edit'>
                <FontAwesomeIcon icon={faEdit} size="2x"  />
                </Link>
            </Box>
            <Box>
                <FontAwesomeIcon icon={faTrash} size='2x' onClick={() => handleDel(el.id)} />
            </Box>
        </Flex>
        </Flex>
        </div>
    )) }
    </>
//     <Flex mb='4' justify='space-between' bg='purple.500' p='4' borderRadius='lg' boxShadow='xl' >
//     <Flex align='center' gap='6' >
//       <FontAwesomeIcon icon={faUser} size="2x" />
//       <Stack>
//       <Text>Name</Text>
//       <Text>Phone-Num</Text>
//       </Stack>
//     </Flex>
//     <Flex align='center' gap='5' >
//     <FontAwesomeIcon icon={faEye} size="2x" />
//     <FontAwesomeIcon icon={faEdit} size="2x" />
//     <FontAwesomeIcon icon={faTrash} size='2x' />
//     </Flex>
//   </Flex>
  )
}

export default Contacts
