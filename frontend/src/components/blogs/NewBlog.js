import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../../components/LoadingBox';

import { newBlog, selectStatus } from '../../features/blogs/blogSlice';

const NewBlog = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedPath = location.state?.path || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit handler
  const onSubmit = (formValues) => {
    try {
      console.log(formValues);
      dispatch(newBlog({ ...formValues })).unwrap();
      navigate(redirectedPath)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-center">
        {status === 'loading' && <LoadingBox />}
      </div>
      <h4 className="text-center my-2">New Blog</h4>
      <div className="col-10 col-xs-12 col-sm-8 col-md-6 col-lg-5 mx-auto d-block text-bg-light mt-3">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="containter small-container bg-light border border-1 my-3 shadow"
        >
          <Row className="mx-2">
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'title is required',
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Invalid title Format',
                    },
                  })}
                  placeholder="Enter title"
                />
                <p className="error">{errors.title?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'description is required',
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Weak description',
                    },
                  })}
                  placeholder="Enter description"
                />
                <p className="error">{errors.description?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  {...register('date', {
                    required: {
                      value: true,
                      message: 'date is required',
                    },
                  })}
                  placeholder="Enter date"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col xs={12}>
              <Button
                type="submit"
                className="mb-2 btn-info d-block mx-auto px-4"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
  // }
};

export default NewBlog;
