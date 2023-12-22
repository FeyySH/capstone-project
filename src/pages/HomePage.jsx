import { useState } from "react";
import NewBooking from "./NewBooking";
import { Card } from 'react-bootstrap';

const HomePage = () => {
    const [bookings, setBookings] = useState([]);

    const handleBookingCreated = (newBooking) => {
        // Update the list of bookings in the state
        setBookings([...bookings, newBooking]);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Home Page</h1>
            <NewBooking onBookingCreated={handleBookingCreated} />

            {/* Display bookings as cards */}
            <div className="row mt-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="col-md-4 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{booking.description}</Card.Title>
                                <Card.Text>
                                    Date: {booking.date} - Time: {booking.time}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
