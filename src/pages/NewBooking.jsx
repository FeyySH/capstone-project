import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { PencilSquare, Trash } from "react-bootstrap-icons";

const NewBooking = ({ onBookingCreated }) => {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
        date: "",
        time: "",
        description: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);

    useEffect(() => {
        axios.get("https://booking-system-api-feyyshhd.sigma-school-full-stack.repl.co/bookings")
            .then(response => setBookings(response.data))
            .catch(error => console.error("Error fetching bookings", error));
    }, []);

    const handleCreateBooking = () => {
        axios.post("https://booking-system-api-feyyshhd.sigma-school-full-stack.repl.co/bookings", newBooking)
            .then(response => {
                const createdBooking = response.data;
                setBookings([...bookings, createdBooking]);
                onBookingCreated(createdBooking); // Notify the parent component
                setNewBooking({
                    date: "",
                    time: "",
                    description: "",
                });
            })
            .catch(error => console.error("Error creating booking", error));
    };

    const handleUpdateBooking = () => {
        if (editingBooking) {
            axios.put(`https://booking-system-api-feyyshhd.sigma-school-full-stack.repl.co/bookings/${editingBooking.id}`, newBooking)
                .then(response => {
                    const updatedBookings = bookings.map(booking =>
                        booking.id === editingBooking.id ? response.data : booking
                    );
                    setBookings(updatedBookings);
                    handleCloseModal();
                    setEditingBooking(null);
                })
                .catch(error => console.error("Error updating booking", error));
        }
    };

    const handleDeleteBooking = (id) => {
        axios.delete(`https://booking-system-api-feyyshhd.sigma-school-full-stack.repl.co/bookings/${id}`)
            .then(() => {
                const updatedBookings = bookings.filter(booking => booking.id !== id);
                setBookings(updatedBookings);
            })
            .catch(error => console.error("Error deleting booking", error));
    };

    const handleShowModal = (booking) => {
        setEditingBooking(booking);
        setNewBooking({
            date: booking.date,
            time: booking.time,
            description: booking.description,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBooking(null);
        setNewBooking({
            date: "",
            time: "",
            description: "",
        });
    };

    return (
        <div className="mt-4">
            <h2 className="mb-3">New Booking Page</h2>
            <Form>
                <Row>
                    <Col md={6} lg={4}>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter date"
                                value={newBooking.date}
                                onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4}>
                        <Form.Group controlId="formTime">
                            <Form.Label>Time:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter time"
                                value={newBooking.time}
                                onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12} lg={4}>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={newBooking.description}
                                onChange={(e) => setNewBooking({ ...newBooking, description: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" onClick={handleCreateBooking} className="mr-2">
                    Create Booking
                </Button>
            </Form>

            <ul className="list-group mt-3">
                {bookings.map(booking => (
                    <li key={booking.id} className="list-group-item">
                        {booking.description} - {booking.date} - {booking.time}
                        <Button onClick={() => handleShowModal(booking)} className="btn btn-warning ml-2">
                            <PencilSquare /> Edit
                        </Button>
                        <Button onClick={() => handleDeleteBooking(booking.id)} className="btn btn-danger ml-2">
                            <Trash /> Delete
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Modal for Editing */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6} lg={4}>
                                <Form.Group controlId="formDateEdit">
                                    <Form.Label>Date:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newBooking.date}
                                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} lg={4}>
                                <Form.Group controlId="formTimeEdit">
                                    <Form.Label>Time:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newBooking.time}
                                        onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={4}>
                                <Form.Group controlId="formDescriptionEdit">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newBooking.description}
                                        onChange={(e) => setNewBooking({ ...newBooking, description: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateBooking}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewBooking;
