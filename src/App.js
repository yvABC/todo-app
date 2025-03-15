// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: [],
            loading: true,
            priority: "Medium",
            completed: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Set priority value
    updatePriority(value) {
        this.setState({
            priority: value,
        });
    }

    // Set completed value
    updateCompleted(value) {
        this.setState({
            completed: value,
        });
    }

    // Add item if user input is not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,

                // Add priority
                priority: this.state.priority,

                // Add completed status
                completed: this.state.completed,
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
                priority: "Medium",
                completed: false,
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    editItem = (index) => {
        const todos = [...this.state.list];
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo !== null && editedTodo.trim() !== '') {
            let updatedTodos = [...todos];
            updatedTodos[index].value = editedTodo;
            this.setState({
                list: updatedTodos,
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark">
                    <Spinner animation="border" variant="light" className="mb-3" />
                    <h2 className="text-white">Loading...</h2>
                </div>
            );
        }

        return (
            <div
                style={{
                    backgroundImage: "url('/MEDIA/IP 98 Love ❤.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    padding: "20px",
                }}
            >
                <Container>
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "3rem",
                            fontWeight: "bolder",
                        }}
                    >
                        TODO LIST
                    </Row>

                    <hr />
                    <Row>
                        <Col md={{ span: 5, offset: 4 }}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="add item . . . "
                                    size="lg"
                                    value={this.state.userInput}
                                    onChange={(item) =>
                                        this.updateInput(item.target.value)
                                    }
                                    aria-label="add something"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup>
                                    <Button
                                        variant="dark"
                                        className="mt-2"
                                        onClick={() => this.addItem()}
                                    >
                                        ADD
                                    </Button>
                                </InputGroup>
                            </InputGroup>
                            <Form.Group className="mb-3">
                                <Form.Label>Priority</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="High"
                                        type="radio"
                                        name="priority"
                                        value="High"
                                        checked={this.state.priority === "High"}
                                        onChange={(e) => this.updatePriority(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="Medium"
                                        type="radio"
                                        name="priority"
                                        value="Medium"
                                        checked={this.state.priority === "Medium"}
                                        onChange={(e) => this.updatePriority(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="Low"
                                        type="radio"
                                        name="priority"
                                        value="Low"
                                        checked={this.state.priority === "Low"}
                                        onChange={(e) => this.updatePriority(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Completed"
                                    checked={this.state.completed}
                                    onChange={(e) => this.updateCompleted(e.target.checked)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 5, offset: 4 }}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="add another item . . . "
                                    size="lg"
                                    value={this.state.userInput}
                                    onChange={(item) =>
                                        this.updateInput(item.target.value)
                                    }
                                    aria-label="add something"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup>
                                    <Button
                                        variant="dark"
                                        className="mt-2"
                                        onClick={() => this.addItem()}
                                    >
                                        ADD
                                    </Button>
                                </InputGroup>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 5, offset: 4 }}>
                            <ListGroup>
                                {/* map over and print items */}
                                {this.state.list.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <ListGroup.Item
                                                variant="dark"
                                                action
                                                style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <div>
                                                    {item.value} - {item.priority} - {item.completed ? "Completed" : "Not Completed"}
                                                </div>
                                                <span>
                                                    <Button style={{ marginRight: "10px" }}
                                                        variant="light"
                                                        onClick={() => this.deleteItem(item.id)}>
                                                        Delete
                                                    </Button>
                                                    <Button variant="light"
                                                        onClick={() => this.editItem(index)}>
                                                        Edit
                                                    </Button>
                                                </span>
                                            </ListGroup.Item>
                                        </div>
                                    );
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
