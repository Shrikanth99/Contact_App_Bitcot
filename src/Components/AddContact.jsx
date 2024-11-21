import { Button, Modal, ModalOverlay, ModalContent, ModalHeader,ModalCloseButton,ModalBody ,FormControl, FormLabel,Input, ModalFooter, useDisclosure, FormErrorMessage } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

const AddContact = (props) => {
    let {isOpen,onClose, handleAddContact, contact , updateContact} = props
    const navigate = useNavigate()

    console.log('sonc',contact)

    const [formData, setFormData] = useState({
        name: contact ? contact.name : '',
        email : contact ? contact.email : '',
        mobile: contact ? contact.mobile : '',
        address : contact ? contact.address : ''
    })

    const [formErr,setFormErr] = useState({})
    const errors = {}
    

    const handleChange = (e) => {
        const{name, value} = e.target
        setFormData({...formData,  [name]:value })

    }

    const runValidation = () => {
        if( formData.name.trim().length === 0 ){
            errors.name = 'Name is Required'
            

        }
        if(formData.email.trim().length === 0){
            errors.email = 'Email is required'
        }

        if(formData.mobile.trim().length === 0){
            errors.mobile = 'Mobile is required'
        }

        if(formData.address.trim().length === 0){
            errors.address = 'Address is required'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErr({})
            const newData = {
                ...formData,
                id: Date.now()
            }
            if(contact){
                console.log('if')
                let newContact = { ...formData,  id: contact?.id }
                updateContact(newContact)
            }else{
                console.log('else')
                handleAddContact(newData)
                setFormData({ // reset
                    name: '',
                    mobile:'',
                    email:'',
                    address :''
                })
            }
            onClose()
            navigate('/')
        }else{
            setFormErr(errors)
            isError = errors
            console.log(errors)
            // console.log(formErr)
        }
    }

    const handleClose = () => {
        console.log('modal-close')
        localStorage.removeItem('isModalOpen'  )
        localStorage.removeItem('isEditModalOpen'  )
        onClose()
        navigate('/')
    }

    useEffect(() => {
        const getContact = (JSON.parse(localStorage.getItem('contacts')))
        console.log('xxx');
        
       const findCon =  getContact.find((el) => el.id === contact?.id)
        console.log('ccc',findCon)
        if(getContact){
            let contact = getContact
        }else {
            console.log('err','find')
        }

    },[])

  return (
    <>
        {/* <FormControl>
            <FormLabel>First name</FormLabel>
            <Input ref={initialRef} placeholder='Enter Name' />
        </FormControl>
  
        <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Email' />
        </FormControl> */}
        <Modal
         
          isOpen={isOpen}
          onClose={handleClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add-Contact</ModalHeader>
            <ModalCloseButton onClick={handleClose} />
            <ModalBody pb={6}>
              <FormControl isInvalid={formErr.name} >
                <FormLabel>Name</FormLabel>
                <Input name='name' placeholder='Enter Name'
                    value={formData.name}
                    onChange={handleChange} 
                />
                <FormErrorMessage>{formErr.name}</FormErrorMessage>
                {/* { Object.keys(formErr).length > 0 && (
                    <FormErrorMessage>
                        {formErr.firstName}
                    </FormErrorMessage>
                ) } */}
              </FormControl>
  
              <FormControl mt={4} isInvalid={formErr.email} >
                <FormLabel>Email</FormLabel>
                <Input name='email' placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formErr.email}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={formErr.mobile} >
                <FormLabel>Mobile</FormLabel>
                <Input name='mobile' placeholder='Enter Email'
                    value={formData.mobile}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formErr.mobile}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={formErr.address} >
                <FormLabel>Address</FormLabel>
                <Input name='address' placeholder='Enter Email'
                    value={formData.address}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formErr.address}</FormErrorMessage>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
                { contact  ? (
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit} >
                    Update-Contact
                  </Button>
                ) : (
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit} >
                    Save
              </Button>
                ) }
              {/* <Button colorScheme='blue' mr={3} onClick={handleSubmit} >
                Save
              </Button> */}
              <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default AddContact
