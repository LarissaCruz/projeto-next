import { Container, Row, Col } from "react-bootstrap";

export default function Button() {
  return (
    <main>
      <Container>
        <Row className="mt-5">
          <Col>
            <h1>Welcome to Next.js with Bootstrap!</h1>
            <p>This is an example of how to use Bootstrap in Next.js.</p>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
