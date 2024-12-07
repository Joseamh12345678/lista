import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const {data, setData} = useState({});
    const Navigate = useNavigate()

    const onChange = (e)=>{
        e.preventDefault()
        const dataTempo = data;
        dataTempo[e.target.name] = e.target.value;
        setData(dataTempo)
    }

    const onSubmit = async ()=>{
        try {
            const res = await axios.post("http://localhost.4000/Login",data);
            if(res.data.user.rol === "administrator"){
                Navigate("/home")
            }else{
                Navigate("/")
            }
        } catch (error) {
            console.log(error)
            alert("Hubo un error al iniciar sesion")
        }
    }
    return (
        <Container>
            <Card style={{
                width:"25rem",
                margin:"auto"
            }}>
                <Card.Body>
                    <Card.Title>inicia sesion</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control onChange={onChange} name="email" placeholder="ingresa tu correo"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control onChange={onChange} name="password" placeholder="ingrese contraseña" />
                        </Form.Group>
                    </Form>
                    <Button onClick={()=>onSubmit()}>Enviar</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}