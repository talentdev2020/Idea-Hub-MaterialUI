import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";

import { addBoardItem, editBoardItem } from "../../redux/actions";

class AddNewBoardModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      detail: "",
      status: "PENDING",
      id: ""
    };
  }
  componentDidMount() {
    if (!this.props.isAdd) {
      this.setState({ ...this.props.item });
    }
  }
  addNetItem = () => {
    
    const newItem = {
      title: this.state.title,
      detail: this.state.detail,
      status: this.state.status,
      userid: this.props.authUser.userid,
      
    };
    this.props.addBoardItem(newItem);
    this.props.toggleModal();
    this.setState({
      title: "",
      detail: "",
      status: "PENDING"
    });
  };
  editNetItem = () => {
    const newItem = {
      id: this.state.id,
      title: this.state.title,
      detail: this.state.detail,
      status: this.state.status,
      userId: this.props.authUser.userid
    };
    this.props.editBoardItem(newItem);
    this.props.toggleModal();
  };
  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          {this.props.isAdd ? "Add New" : "Edit Hub"}
        </ModalHeader>
        <ModalBody>
          <Label className="mt-4">Hub Title</Label>
          <Input
            type="text"
            defaultValue={this.state.title}
            onChange={event => {
              this.setState({ title: event.target.value });
            }}
          />
          <Label className="mt-4">Description</Label>
          <Input
            type="textarea"
            defaultValue={this.state.detail}
            onChange={event => {
              this.setState({ detail: event.target.value });
            }}
          />

          {/* <Label className="mt-4">Status</Label>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="COMPLETED"
            checked={this.state.status === "COMPLETED"}
            onChange={event => {
              this.setState({
                status: event.target.value === "on" ? "COMPLETED" : "PENDING"
              });
            }}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio2"
            label="PENDING"
            defaultChecked={this.state.status === "PENDING"}
            onChange={event => {
              this.setState({
                status: event.target.value !== "on" ? "COMPLETED" : "PENDING"
              });
            }}
          /> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() =>
              this.props.isAdd ? this.addNetItem() : this.editNetItem()
            }
          >
            Submit
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ boardApp, authUser }) => {
  return {
    boardApp,
    authUser
  };
};
export default connect(mapStateToProps, {
  addBoardItem,
  editBoardItem
})(AddNewBoardModal);
