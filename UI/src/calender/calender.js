
import React, { Component } from 'react';
import './style.css';
import CalenderUI from './calenderUi';
import Modal from 'react-modal';
import StickyNote from '../stickynotes/stickynote';



Modal.setAppElement('#root');
class Calender extends Component {

    constructor(props) {
        super(props)
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.data = this.data.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let month = ''
        this.date = new Date()
        this.currnetMonth = new Date().getMonth()
        this.months.forEach((element) => {
            if (this.months.indexOf(element) === this.currnetMonth) {
                month = element
            }
        })
        this.state = { month: month, date: this.date, modalIsOpen: false }
    }

    changeMonth = (arrow) => {
        if (arrow === 'left') {
            if (this.currnetMonth !== 0) {
                this.currnetMonth = this.currnetMonth - 1;
                this.months.forEach((element) => {
                    if (this.months.indexOf(element) === this.currnetMonth) {
                        if (this.currnetMonth === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear()) {
                            this.setState(state => ({
                                month: element,
                                date: new Date()
                            }))
                        }
                        else {
                            this.setState(state => ({
                                month: element,
                                date: new Date(`${element}/1/${this.state.date.getFullYear()}`)
                            }))
                        }
                    }
                });
            } else {
                this.changeYear(arrow)
            }

        } else {
            if (this.currnetMonth !== 11) {
                this.currnetMonth = this.currnetMonth + 1;
                this.months.forEach((element) => {
                    if (this.months.indexOf(element) === this.currnetMonth) {
                        if (this.currnetMonth === new Date().getMonth() && this.state.date.getFullYear() === new Date().getFullYear()) {
                            console.log("im state", this.state.date)
                            this.setState(state => ({
                                month: element,
                                date: new Date()
                            }))
                        } else {
                            this.setState(state =>
                                ({

                                    month: element,
                                    date: new Date(`${element}/1/${this.state.date.getFullYear()}`)
                                }))
                        }
                    }
                });
            } else {
                this.changeYear(arrow)
            }
        }

        this.data()

    }

    changeYear = (arrow) => {
        if (arrow === 'right') {
            this.currnetMonth = 0
            this.setState(this.setState(state => ({
                month: 'January',
                date: new Date(`1/1/${this.state.date.getFullYear() + 1}`)
            })))
        } else {
            this.currnetMonth = 11
            this.setState(this.setState(state => ({
                month: 'December',
                date: new Date(`12/1/${this.state.date.getFullYear() - 1}`)
            })))
        }
        this.data()
    }
    openModal() {
        this.setState(state => ({ modalIsOpen: true }))
    }

    afterOpenModal() {

        this.subtitle.style.color = '#000';
    }

    closeModal() {
        console.log('im closing modal')
        this.setState({ modalIsOpen: false });
    }

    data = () => {
        var calender = {};
        var now_time = this.state.date
        var now_date = now_time.getDate();
        var now_year = now_time.getFullYear();
        var now_month = now_time.getMonth();
        var m = now_month === 12 ? 1 : parseInt(now_month) + 1;
        var d = new Date(now_year, m, 0);
        calender.days_num = d.getDate();


        if (now_date !== 1) {
            var first_time = new Date(now_year, now_month, 1);
            calender.first_day = first_time.getDay();

        } else {
            calender.first_day = now_time.getDay();
        }
        let html = []
        let num_for = 1;
        let flag = false;
        for (var week = 1; week <= 6; week++) {
            let days = []
            for (var day = 0; day <= 6 && num_for <= calender.days_num; day++) {
                if (day >= calender.first_day || flag) {
                    if (num_for === now_date && now_time.getMonth() === new Date().getMonth() && now_time.getFullYear() === new Date().getFullYear()) {
                        days.push(<div className="item today" onClick={this.openModal}> {num_for}</div>);
                    } else {
                        if (day === 0 || day === 6) {
                            days.push(<div className="item holiday" data-toggle="modal" data-target="#exampleModal" onClick={this.openModal} >{num_for}</div>);
                        } else {
                            days.push(<div className="item " onClick={this.openModal}> {num_for}</div>);
                        }
                    }

                    flag = true;
                    num_for++;
                } else {
                    days.push(<div className="item"></div>);
                }

            }
            html.push(<div className="row">{days}</div>)
        }

        return html
    }




    render() {

        return (
            <div>
                <br />
                {/* <center><h1>Hi, I'm Calender!</h1></center> */}
                <br />
                <CalenderUI data={this.data()} month={this.state.month} date={this.state.date} onClick={this.changeMonth} ></CalenderUI>
                <StickyNote isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}></StickyNote>
            </div>
        );
    }
}
export default Calender;
