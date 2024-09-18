import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';

import {
  login,
  selectUserMessage,
  selectUserStatusCode,
  setStatus,
} from '../features/user/userSlice';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedPath = location.state?.path || '/';
  const statusCode = useSelector(selectUserStatusCode);
  const message = useSelector(selectUserMessage);

  if (statusCode === '201') {
    navigate(redirectedPath);
    dispatch(setStatus());
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit handler
  const onSubmit = (formValues) => {
    try {
      dispatch(login({ ...formValues })).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-center">
        {message === 'Verifying' ? (
          <LoadingBox />
        ) : statusCode === '202' ? (
          <span className="text-center  fs-5 text-danger">{message}</span>
        )  : (
          <span></span>
        )}
      </div>
      <h4 className="text-center my-2">Login</h4>
      <div className="col-10 col-xs-12 col-sm-8 col-md-6 col-lg-5 mx-auto d-block text-bg-light mt-3">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="containter small-container bg-light border border-1 my-3 shadow"
        >
          <Row className="mx-2">
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: 'Invalid Email Format',
                    },
                  })}
                  placeholder="name@example.com"
                />
                <p className="error">{errors.email?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="pwd">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    pattern: {
                      value: /^[ A-Za-z0-9_@./#&+-]*$/,
                      message: 'Weak Password',
                    },
                  })}
                  placeholder="Enter password"
                  autoComplete="false"
                />
                <p className="error">{errors.password?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col xs={12}>
              <Button
                type="submit"
                className="mb-2 btn-info d-block mx-auto px-4"
              >
                Login
              </Button>
            </Col>
          </Row>
          <div className="my-3">
            <hr className="text-muted" />
            <h5 className="text-muted text-center fs-6">OR</h5>
            <hr className="text-muted" />
          </div>
          <div className="my-3 d-grid border border-0 bg-white">
            <Row>
              <Col className="text-center">
                <span className="text-dark">Don't have an account? </span>
                <span className="ms-1 text-info fw-bold">
                  <Link to="/signup" className="fs-6 text-info">
                    Sign Up
                  </Link>
                </span>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </>
  );
  // }
};

export default Login;
