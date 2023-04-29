import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  ButtonGroup,
  FormControl,
  Grid,
  GridItem,
  FormLabel,
  Input,
  Text,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const AddTaskModal = ({onSubmit,button}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });





  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text cursor="pointer" onClick={onOpen}>{button}</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input mb={8}
                      placeholder="Title"
                      {...register("title", {
                        required: "Title is required",
                        minLength: {
                          value: 2,
                          message: "Title is not valid",
                        },
                      })}
                    />
                    <Text color="tomato">
                      {errors?.title && errors?.title?.message}
                    </Text>
                    <FormLabel>Description</FormLabel>
                    <Textarea mb={8 }
                      placeholder="Description"
                      {...register(
                        "description",
                        {
                          required: "Description is required",
                          minLength: {
                            value: 3,
                            message: "Description is not valid",
                          },
                        }
                      )}
                    />
                    <Text color="tomato">
                      {errors?.description && errors?.description?.message}
                    </Text>
                <FormLabel>User Name</FormLabel>
                
                <Select mb={5} placeholder="Select option"  {...register("assignedUser")}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Center>
                  <Button
                    borderColor="#08BDA9"
                    bg="#08BDA9"
                    px={20}
                    py={5}
                    type="submit"
                  >
                    ADD TASK
                  </Button>
                </Center>
              </FormControl>
            </form>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
