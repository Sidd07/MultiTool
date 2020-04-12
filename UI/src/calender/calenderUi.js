import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";


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
                    <div className='row'>
                        <div className={this.props.isMonthView ? 'col-md-8 offset-4 d-inline-flex' : 'col-md-8 offset-3 d-inline-flex'}>
                            <h6 className='mr-2' onClick={() => this.props.showMonthView()} > {this.props.isMonthView ? null : this.props.month} {this.props.date.getFullYear()}</h6>
                            <FontAwesomeIcon icon={faSync} onClick={() => this.props.refreshDate()} />

                        </div>

                    </div>
                </div>
                <div className='col-md-2'>
                    <FontAwesomeIcon icon={faArrowCircleRight}
                        className='float-right mt-1'
                        onClick={() => this.props.onClick('right')} />
                </div>
            </div>
            <div className='row row-days'>
                {Days.map((element, index) =>
                    (<div className='days' key={index}> {element} </div>))
                }
            </div>
            <div >
                {this.props.isMonthView ?
                    <div>
                        <div class='col-12 mt-2'>
                            <div class='row'>
                                {this.props.months.map((item, index) => {
                                    if (item == this.props.month) {
                                        return <div tabIndex='1' className='col-4 months active-month'
                                            name={item}
                                            key={index}
                                            onClick={(e) => this.props.selectMonth(e.target.getAttribute('name'))}>
                                            {item.substring(0, 3)}</div>
                                    }
                                    else {
                                        return <div tabIndex='1'
                                            className='col-4 months' name={item}
                                            key={index}
                                            onClick={(e) => this.props.selectMonth(e.target.getAttribute('name'))}
                                        >{item.substring(0, 3)}</div>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    :
                    <div>{this.props.data}</div>
                }
            </div>


        </div>
        );
    }


}


export default calenderUI;

