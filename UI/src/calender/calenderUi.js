import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";



class calenderUI extends Component {


    render() {
        let Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

        return (<div className='calender-body'>

            <div className='row mt-1 mb-2'>
                <div className='col-md-2'>
                    <FontAwesomeIcon icon={faArrowCircleLeft} className='float-left mt-1'
                        onClick={() => this.props.onClick('left')}
                       
                    />
                </div>
                <div className='col-md-8'>
                    <center><h6 >{this.props.month} {this.props.date.getFullYear()}</h6></center>
                </div>
                <div className='col-md-2'>
                    <FontAwesomeIcon icon={faArrowCircleRight} 
                    className='float-right mt-1' onClick={() => this.props.onClick('right')} />
                </div>
            </div>
            <div className='row row-days'>
                {Days.map((element, index) =>
                    (<div className='days' key={index}> {element} </div>))
                }
            </div>
            <div >
                <div>{this.props.data}</div>
            </div>
            

        </div>
        );
    }


}


export default calenderUI;

