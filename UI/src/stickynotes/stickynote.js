import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import './style.css';
import axios from 'axios';



import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '0px',
        overflow: 'hidden',
        border: '1px solid blue'

    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
};
class StickyNote extends Component {
    constructor(props) {
        super(props);
        this.state = {heading: 'Sticky Notes', textData:''};
    
        this.handleChange = this.handleChange.bind(this);

    }
    
      handleChange (event) {
        const value = event.target.value;
        const name = event.target.name;
    
        this.setState({
          [name]: value
        });
      }

      componentDidMount(){
        axios.get('http://localhost:3000/users').then(res => {
            
            console.log('imdata',res)
            this.setState({ heading: res.data.header, textData:res.data.body });
          })
      }
    


    render() {
        return (
            <div className='container-fluid'>
                <Modal isOpen={this.props.isOpen}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className='container-fluid'>
                        <div className='row heading'>
                            <div className='col-md-10'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                    <input type="text" name="heading" value={this.state.heading} onChange={this.handleChange}/>
                                    </div>

                                    <div className='col-md-2'>
                                         {/* <FontAwesomeIcon icon={faEdit} className='float-left mt-1'
                                           ></FontAwesomeIcon>  */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-2 '>
                                <FontAwesomeIcon icon={faTimes} className='float-right mt-1'
                                    onClick={this.props.onRequestClose}></FontAwesomeIcon>
                            </div>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='body col-md-12'>
                        <textarea type="text" name="textData" value={this.state.textData} onChange={this.handleChange}/>

                        </div>

                    </div>


                </Modal>
            </div >)
    }
}

export default StickyNote;
