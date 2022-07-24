import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

function DialogBox({ isOpen, onClose, onOpen, timeElapsed }) {

    return (
      <>
        <AlertDialog
          motionPreset='slideInBottom'
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Congratulations!</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <p>You have completed the game in <b>{timeElapsed}</b> seconds.</p>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={onClose}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  export default DialogBox;