import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-11 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      rating: '1',
      author: '',
      text: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);

  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleComment(values) {
    console.log("Current state is:" + JSON.stringify(values));
    alert("Current state is:" + JSON.stringify(values));
  }

  render() {
    return (
      <React.Fragment>
        
        <span className="col-md-5 m-1">
          <Button outline onClick={this.toggleModal}>
            <i className="fa fa-pencil fa-lg" /> Submit Comment
          </Button>
        </span>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleComment}>
              <div className="form-group">
                <Label htmlFor="rating" className="mr-2">Rating</Label>
                <Control.select md={12} 
                  model=".rating"
                  name="rating"
                  clasName="form-control"
                  validators={{ 
                    required,
                  }}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                <Errors 
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    component="div"
                    messages={{
                      required: 'Required',
                    }}
                  />
              </div>
              <div className="form-group">
                <Label htmlFor="author">
                  Your Name
                </Label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{ 
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors 
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be  at least 2 characters',
                      maxLength: 'Must be 15 characters of less'
                    }}
                  />
              </div>
              <div className="form-group">
                <Label htmlFor="comment">
                  Comment
                </Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
              </div>
              <Button type="submit" value="submit" color="primary">Submit Comment</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  };
}

function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              <p>
                {comment.text} <br />
                -- {comment.author},{""}{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>No comments</div>;
  }
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <RenderCampsite campsite={props.campsite} />
          </div>
          <div className="col-6">
            <RenderComments comments={props.comments} />
            <CommentForm />
          </div>
        </div>
      </div>
    );
  }
  return <div />; 
}

export default CampsiteInfo;
