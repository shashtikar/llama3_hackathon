import { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'The bus stop' } },
  { id: '2', position: { x: 200, y: 0 }, data: { label: '?' } },
  { id: '3', position: { x: 400, y: 0 }, data: { label: 'The dock yard' } },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: false,
    style: { stroke: '#000', strokeWidth: 2 }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: false,
    style: { stroke: '#000', strokeWidth: 2 }
  }

];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nextNodeId, setNextNodeId] = useState(3);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [nodeAttributes, setNodeAttributes] = useState({ label: '', attribute1: '', attribute2: '', attribute3: '', attribute4: '', attribute5: ''});

  const onConnect = useCallback((params) => {
    const newEdge = addEdge({ ...params, style: { stroke: '#000', strokeWidth: 2 } }, edges);
    setEdges(newEdge);
  }, [setEdges, edges]);

  const addNode = useCallback(() => {
    const newNode = {
      id: nextNodeId.toString(),
      position: { x: Math.random() * window.innerWidth / 2, y: Math.random() * window.innerHeight / 2 },
      data: { label: `Node ${nextNodeId}` },
    };
    setNodes((nds) => nds.concat(newNode));
    setNextNodeId(nextNodeId + 1);
  }, [setNodes, nextNodeId]);

  const onNodeDoubleClick = useCallback((event, node) => {
    setActiveNode(node);
    setNodeAttributes({
      label: node.data.label,
      attribute1: node.data.attribute1 || '',
      attribute2: node.data.attribute2 || '',
      attribute3: node.data.attribute3 || '',
    });
    setModalOpen(true);
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleInfer = useCallback(() => {
    const attributes = [nodeAttributes.attribute1, nodeAttributes.attribute2, nodeAttributes.attribute3, nodeAttributes.attribute4, nodeAttributes.attribute5].join(",");
    console.log(JSON.stringify({ question: "which place has the folling attributes - " +attributes + "?" }))
    fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: "which place has the folling attributes - " +attributes + "?" })
    })
    .then(response => response.json())
    .then(data => {
      alert(JSON.stringify(data));
    })
    .catch(error => {
      alert('Error: ' + error);
    });
  }, [nodeAttributes]);

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

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Button onClick={addNode} colorScheme='blue' style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000 }}>Add Node</Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        style={{ width: 'calc(100% - 50px)', height: '85%' }}
      >
        <MiniMap nodeColor={(n) => {
          if (n.type === 'input') return 'blue';
          if (n.type === 'output') return 'green';
          return '#000000';
        }} />
        <Controls />
        <Background color="#FFFFFF" gap={16} />
      </ReactFlow>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent   sx={{
    width: '400px',
    height: '600px',
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: '15px',
    pl: '10px',
    pr: '10px',
    pt: '10px',
    pb: '10px',
  }}>
          <ModalHeader>Edit Node</ModalHeader>
          <ModalCloseButton sx={{
            position: 'absolute',
            top: 2,  // Adjust the top positioning to align with your modal's header
            right: 2  // Adjust right to keep it within a reasonable boundary from the edges
            }} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input variant='outline' value={nodeAttributes.label} name="label" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Attribute 1</FormLabel>
              <Input variant='outline' value={nodeAttributes.attribute1} name="attribute1" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Attribute 2</FormLabel>
              <Input variant='outline' value={nodeAttributes.attribute2} name="attribute2" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Attribute 3</FormLabel>
              <Input variant='outline' value={nodeAttributes.attribute3} name="attribute3" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Attribute 4</FormLabel>
              <Input variant='outline' value={nodeAttributes.attribute4} name="attribute4" onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Attribute 5</FormLabel>
              <Input variant='outline' value={nodeAttributes.attribute5} name="attribute5" onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme='green' onClick={handleInfer}>Infer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Flow;

