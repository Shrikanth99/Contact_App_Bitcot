import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader,ModalCloseButton,ModalBody ,FormControl, FormLabel,Input, ModalFooter, Text, Textarea } from "@chakra-ui/react"


const ViewContact = (props) => {
    const { isOpen,onClose, gotObj } = props

  return (
    <>
         <Modal

          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Text>Name :- {gotObj?.name}</Text>
                <Text>Email :- {gotObj.email}</Text>
                <Text>Mobile :- {gotObj.mobile}</Text>
                <Text>Address:-</Text><Textarea value={gotObj.address ?  gotObj.address : `NotFound`} ></Textarea>
  

            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default ViewContact
