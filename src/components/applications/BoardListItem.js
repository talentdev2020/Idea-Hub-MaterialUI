import React, {useState} from "react";
import { Card, CardBody, Badge, } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {useSelector} from 'react-redux';
import { Colxx } from "../common/CustomBootstrap";
import AddNewBoard from "../../containers/applications/AddNewBoard";
import {setCurrentBoardId} from "../../redux/actions"
const TodoListItem = ({ item, handleCheckChange, isSelected }) => {
  const {  userid } = useSelector(({ authUser }) => authUser);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen)
    
  };
  

  const boardClickHandler=()=>{
    
    dispatch(setCurrentBoardId(item.id));
  }
   return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to="#"
              location={{}}
              id={`toggler${item.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <i
                className="simple-icon-doc heading-icon" 
                
              ></i>
           <span className="align-middle d-inline-block"><strong>{item.title}</strong></span></NavLink>

            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              Created at {item.createDate}
            </p>
            <div className="w-15 w-xs-100">
              <NavLink  to={{ 
                            pathname:`/hubs/${item.title}`, 
                            
                          }} location={{}} onClick = {(e)=>boardClickHandler()}>
              <Badge color="primary" pill  >
                Select Hub
              </Badge>
              </NavLink>
            </div>
            <div className="w-15 w-xs-100">
              {userid===item.userid?
              <Badge color="primary" pill  onClick={(e)=>toggleModal()}>
                Edit Hub
              </Badge>:""}
            </div>
          </CardBody>
          
        </div>
        <div className="card-body pt-1">
          <p className="mb-0">{item.detail}</p>
        </div>
        
      </Card>
      <AddNewBoard toggleModal={toggleModal} modalOpen={modalOpen} item={item}/>
    </Colxx>
  );
};

export default React.memo(TodoListItem);
