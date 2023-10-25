import { useEffect, useState } from "react";
import  Button  from "react-bootstrap/Button";
import  Modal  from "react-bootstrap/Modal";
import InputGroup  from "react-bootstrap/esm/InputGroup";
import { Form } from "react-bootstrap";
import { collection, addDoc, serverTimestamp,getDoc, FieldValue,doc, getDocs} from 'firebase/firestore'
import { db } from "../Services/firebase.config";
import { Card } from "react-bootstrap";

function Todo() {
  const [show, setShow] = useState(false);
  const [todo,setTodo] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // const collectionRef = collection(db, 'todo');
  const [createTodo, setcreateTodo] = useState();
  let i = 0;
  var newData = "";
  const submitTodo = async (e) => {
    const DocRef = addDoc(collection(db, "todo"), {
      task: createTodo,
      taskid: i+1,
      timestamp:serverTimestamp()
    });
    DocRef.then(async (result) => {
      const docID = result.id;
      console.log(docID);
      setShow(false);
      const iddocRef = doc(db,"todo",docID);
      const docData = await getDoc(iddocRef);
      const newTodo = { id: DocRef.id, ...docData.data()};
      // console.log(newTodo);
      setTodo([...todo,newTodo]);
    })
  }   

    useEffect(() => {
      // Fetch todos from Firebase on component mount
      const fetchTodos = async () => {
        const todoCollection = collection(db, "todo");
        const todoSnapshot = await getDocs(todoCollection);
        const todoList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodo(todoList);
      }
  
      fetchTodos();
    }, []);
  
  return (
  // const newData =   
    <>
      <h1>TODO LIST</h1>
      <Button variant="primary" onClick={handleShow}>
        Create
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Todo List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup onChange={(e) => setcreateTodo(e.target.value)} className="mb-3">
            <Form.Control placeholder="" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitTodo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="card" style={{ width: "18rem" }}>
          {
                    todo && todo.map((todo) => {
                        return  <Card key={todo.id} style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title>{todo.timestamp.toDate().toLocaleString()}{todo.task}</Card.Title>
                        </Card.Body>
                      </Card>                        
                    })
                  }
        </Card>
    </>
  );
}

export default Todo;
