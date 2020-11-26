import React, { Component } from "react";
import { connect } from "react-redux";

import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import { Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { auth } from "../../helpers/Firebase";
import { addIdeaItem, editIdeaItem } from "../../redux/actions";
import { storage } from "../../helpers/Firebase";
class AddNewIdeaModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      detail: "",
      status: "PENDING",
      id: "",
      hubname: "",
      filepaths: [],
      files: [],
      filenames: [],
      originalfilepaths: [],
    };
  }
  componentDidMount() {
    if (!this.props.isAdd) {
      this.setState({
        ...this.props.item,
        originalfilepaths: this.props.item.filepaths
          ? [...this.props.item.filepaths]
          : [],
        files: this.props.item.filepaths ? [...this.props.item.filepaths] : [],
      });
    }
  }
  upload_images(e) {
    const filepaths = this.state.filepaths;
    const files = this.state.files;
    const filenames = this.state.filenames;
    // const data = new FormData();
    console.log("AAA", filepaths);
    for (var x = 0; x < e.target.files.length; x++) {
      // data.append("file", e.target.files[x]);
      filenames.push(e.target.files[0].name);
      files.push(e.target.files[x]);
      filepaths.push(URL.createObjectURL(e.target.files[x]));
    }
    console.log(filepaths);
    this.setState({ filepaths, files, filenames });
  }
  remove_image(index) {
    let filepaths = this.state.filepaths;
    filepaths.splice(index, 1);
    let filenames = this.state.filenames;
    filenames.splice(index, 1);
    let files = this.state.files;
    files.splice(index, 1);
    this.setState({ filepaths, files, filenames });
  }
  addNetItem = async () => {
    let username = "";
    let filepaths = [];
    let storageRef = storage.ref();
    const files = this.state.files;
    const len = this.state.filepaths.length;
    for (let index = 0; index < len; index++) {
      const image = this.state.filepaths[index];

      const arr = image.split("/");
      const imagename = arr[arr.length - 1];
      await storageRef
        .child("images/" + imagename)
        .put(files[index])
        .then(async function (snapshot) {
          await snapshot.ref.getDownloadURL().then(function (downloadURL) {
            filepaths.push(downloadURL);
          });
        });
    }
    username = auth.currentUser && auth.currentUser.displayName;
    const email = auth.currentUser && auth.currentUser.email;
    const newItem = {
      title: this.state.title,
      detail: this.state.detail,
      status: this.state.status,
      filepaths,
      filenames: this.state.filenames,
      userId: this.props.authUser.userid,
      boardId: this.props.ideaApp.currentBoardId,
      hubname: this.props.hubname,
      likeUsers: [],
      dislikeUsers: [],
      email,
      username,
    };
    this.props.addIdeaItem(newItem);
    this.props.toggleModal();
    this.setState({
      title: "",
      detail: "",
      filepaths: [],
      filenames: [],
      files: [],
      status: "PENDING",
    });
  };
  editNetItem = async () => {
    const email = auth.currentUser && auth.currentUser.email;
    const username = auth.currentUser && auth.currentUser.displayName;
    let storageRef = storage.ref();
    const files = this.state.files;
    let filepaths = [];
    const len = this.state.filepaths.length;
    for (let index = 0; index < len; index++) {
      const image = this.state.filepaths[index];
      if (!this.state.originalfilepaths.includes(image)) {
        const arr = image.split("/");
        const imagename = arr[arr.length - 1];
        await storageRef
          .child("images/" + imagename)
          .put(files[index])
          .then(async function (snapshot) {
            await snapshot.ref.getDownloadURL().then(function (downloadURL) {
              filepaths.push(downloadURL);
            });
          });
      } else filepaths.push(image);
    }
    const newItem = {
      id: this.state.id,
      email,
      username,
      filepaths: filepaths,
      filenames: this.state.filenames,
      userId: this.props.authUser.userid,
      title: this.state.title,
      detail: this.state.detail,
      status: this.state.status,
      hubname: this.state.hubname,
    };
    this.props.editIdeaItem(newItem);
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
          {this.props.isAdd ? "Add New" : "Edit Idea"}
        </ModalHeader>
        <ModalBody>
          <Label className="mt-4">Idea Title</Label>
          <Input
            type="text"
            defaultValue={this.state.title}
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
          />
          <Label className="mt-4">Description</Label>
          <Input
            type="textarea"
            defaultValue={this.state.detail}
            onChange={(event) => {
              this.setState({ detail: event.target.value });
            }}
          />
          <Row className="gallery gallery-page mb-2 mt-2">
            <Colxx xxs="6" lg="2" md="4" key="1" className="text-center">
              <input
                type="file"
                className="hidden"
                id="fileupload"
                name="profile-photo"
                multiple
                onChange={(e) => this.upload_images(e)}
              />
            </Colxx>
          </Row>
          <Row>
            {this.state.filenames.map((item, index) => {
              return (
                <Colxx xxs="6" lg="4" md="4" key={index}>
                  <a
                    href={`${this.state.filepaths[index]}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item}
                  </a>
                  <br></br>
                  <i
                    className="simple-icon-close image_close"
                    onClick={() => this.remove_image(index)}
                  ></i>
                </Colxx>
              );
            })}
          </Row>
          <Label className="mt-4">Status</Label>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="DEVELOPMENT"
            checked={this.state.status === "DEVELOPMENT"}
            onChange={(event) => {
              this.setState({
                status: event.target.value === "on" ? "DEVELOPMENT" : "",
              });
            }}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="PENDING"
            checked={this.state.status === "PENDING"}
            onChange={(event) => {
              this.setState({
                status: event.target.value === "on" ? "PENDING" : "",
              });
            }}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="COMPLETED"
            checked={this.state.status === "COMPLETED"}
            onChange={(event) => {
              this.setState({
                status: event.target.value === "on" ? "COMPLETED" : "",
              });
            }}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio2"
            label="CANCELLED"
            defaultChecked={this.state.status === "CANCELLED"}
            onChange={(event) => {
              this.setState({
                status: event.target.value === "on" ? "CANCELLED" : "",
              });
            }}
          />
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

const mapStateToProps = ({ ideaApp, authUser }) => {
  return {
    ideaApp,
    authUser,
  };
};
export default connect(mapStateToProps, {
  addIdeaItem,
  editIdeaItem,
})(AddNewIdeaModal);
