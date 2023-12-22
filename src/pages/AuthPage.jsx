import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function AuthPage() {
    const loginImage = "https://th.bing.com/th/id/R.bc5ae15a6c08f2e1d85f524070950d74?rik=kZIcQ9hN2frMfQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-tbFY_gQmHlQ%2fTfccm-24w-I%2fAAAAAAAAAO0%2fxgHFzHQG-jg%2fs1600%2fBeltHierarchy.gif.png&ehk=QdQskvcswOf3sO%2b40rtOq3JWIBPjynL5VrqJBOHTFew%3d&risl=&pid=ImgRaw&r=0";

    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, [currentUser, navigate]);


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(username)
            console.log(password)
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            console.error(error)
        }
    }

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }
    const handleClose = () => setModalShow(null);
    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">

                <p className="mt-5" color="danger" style={{ fontSize: 64 }}>Feyy Taek</p>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-facebook"></i> Sign up with Facebook
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, you agree to the Terms of Services and Privacy Policy including Cookie Use.
                    </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign In</Button>
                </Col>
                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold " }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Login to your account"}
                        </h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
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
                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy,
                                including Cookie Use. SigmaTweets may use your contact information,
                                including your email address and phone number for purposes outlined
                                in our Privacy Policy, like keeping your account secure and personalizing
                                our services, including ads. Learn more. Others will be able to find you
                                by email or phone number when provided, unless you choose otherwise here.
                            </p>

                            <Button className="rounded-pill" type="submit">{modalShow === "SignUp" ? "Sign up" : "Log in"}</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}