import { useState, useEffect, useContext } from "react";
import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function AuthPage() {
    const loginImage = "https://c8.alamy.com/comp/T9NKRM/manchester-19th-may-2019-cubas-rafael-alba-l-competes-against-mexicos-carlos-sansores-during-the-mens-87kg-final-at-the-world-taekwondo-championships-2019-in-manchester-britain-on-may-19-2019-alba-won-the-fight-9-5-credit-jon-superxinhuaalamy-live-news-T9NKRM.jpg";

    const [modalShow, setModalShow] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { currentUser, login, logout } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, [currentUser, navigate]);

    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("Handle sign up logic here");
        handleClose();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Call your authentication API to obtain a token
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                login(token);
                handleClose();
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleClose = () => setModalShow(null);

    const handleLogout = () => {
        logout();
    };

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold " }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Login to your account"}
                        </h2>
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button className="rounded-pill" type="submit">
                                {modalShow === "SignUp" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    {currentUser ? (
                        <Button className="rounded-pill" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>
                            Sign In
                        </Button>
                    )}
                </Col>
            </Col>
        </Row>
    );
}
