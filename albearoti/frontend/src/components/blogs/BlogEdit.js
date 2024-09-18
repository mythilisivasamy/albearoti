import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../../components/LoadingBox';
import {
  selectAllblogs,
  selectStatus,
  updateBlog,
} from '../../features/blogs/blogSlice';

const BlogEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = params;
  const status = useSelector(selectStatus);
  const blogs = useSelector(selectAllblogs);
  const blog = blogs.find((blog) => {
    return blog._id === id;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit handler
  const onSubmit = (formValues) => {
    try {
      dispatch(updateBlog({ ...formValues, id: `${id}` })).unwrap();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="text-center">
        {status === 'loading' && <LoadingBox />}
      </div>
      <h4 className="text-center my-2">Edit Blog</h4>
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
                  defaultValue={blog.title}
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
                  placeholder="Enter Title"
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
                  defaultValue={blog.description}
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
                  placeholder="Enter Description"
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
                  defaultValue={blog.date}
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
                Edit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default BlogEdit;
