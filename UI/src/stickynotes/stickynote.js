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
const loadingStyle = {
    content: {
        top: '47%',
        left: '50%',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: '30px',
        padding: '0px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        overflow: 'hidden',
        color: '#ffffff',
        textAlign: 'center'


    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    }

}
class StickyNote extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.closeAndUpdateText = this.closeAndUpdateText.bind(this)

    }
    state = {}
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        let sDate = { date: this.props.selectedDate }
        console.log('i sadate', sDate)
        axios.post('http://localhost:3200/users', sDate).then(res => {
            console.log('im did mont', res)
            let data = res.data.content
            this.setState(state => (
                {
                    heading: data.headingText,
                    textData: data.bodyText
                }
            )
            )
        })
    }

    closeAndUpdateText = () => {

        console.log('im close ad update', this.state.heading, this.state.textData)

        axios.post('http://localhost:3200/users/updateData', {
            'date': this.props.selectedDate,
            'headingText': this.state.heading,
            'bodyText': this.state.textData
        }).then(res => {
            let data = res.data.content

        })
        this.props.onRequestClose()
    }


    render() {
        if (!this.state.heading && !this.state.textData) {
            return (
                <Modal isOpen={this.props.isOpen}
                    style={loadingStyle}
                    contentLabel="Example Modal">
                    <div>
                        loading....
                </div>
                </Modal>
            )
        } else {
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
                                            <input type="text" name="heading" value={this.state.heading} onChange={this.handleChange} />
                                        </div>

                                        <div className='col-md-2'>
                                            {/* <FontAwesomeIcon icon={faEdit} className='float-left mt-1'
                                           ></FontAwesomeIcon>  */}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2 '>
                                    <FontAwesomeIcon icon={faTimes} className='float-right mt-1'
                                        onClick={this.closeAndUpdateText}></FontAwesomeIcon>
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='body col-md-12'>
                                <textarea type="text" name="textData" value={this.state.textData} onChange={this.handleChange} />

                            </div>

                        </div>


                    </Modal>
                </div >)
        }
    }
}

export default StickyNote;
