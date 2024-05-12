const handleClose = () => {
    setModalOpen(false);
  };
  
  const handleInputChange = (e) => {
    setNodeAttributes({ ...nodeAttributes, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === activeNode.id
          ? { ...node, data: { ...node.data, ...nodeAttributes } }
          : node
      )
    );
    handleClose();
  };
  
  
  <Modal isOpen={isModalOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit Node</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Label</FormLabel>
          <Input value={nodeAttributes.label} name="label" onChange={handleInputChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Attribute 1</FormLabel>
          <Input value={nodeAttributes.attribute1} name="attribute1" onChange={handleInputChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Attribute 2</FormLabel>
          <Input value={nodeAttributes.attribute2} name="attribute2" onChange={handleInputChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Attribute 3</FormLabel>
          <Input value={nodeAttributes.attribute3} name="attribute3" onChange={handleInputChange} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  