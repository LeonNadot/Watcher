import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getDnsMonitored, deleteDnsMonitored, addDnsMonitored, patchDnsMonitored} from "../../actions/DnsFinder";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


export class DnsMonitored extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            showEditModal: false,
            showAddModal: false,
            id: 0,
            word: ""
        };
        this.inputRef = React.createRef();
    }

    static propTypes = {
        getDnsMonitored: PropTypes.func.isRequired,
        deleteDnsMonitored: PropTypes.func.isRequired,
        addDnsMonitored: PropTypes.func.isRequired,
        patchDnsMonitored: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getDnsMonitored();
    }

    displayDeleteModal = (id, word) => {
        this.setState({
            showDeleteModal: true,
            id: id,
            word: word,
        });
    };

    deleteModal = () => {
        let handleClose;
        handleClose = () => {
            this.setState({
                showDeleteModal: false
            });
        };

        let onSubmit;
        onSubmit = e => {
            e.preventDefault();
            this.props.deleteDnsMonitored(this.state.id, this.state.word);
            this.setState({
                word: "",
                id: 0
            });
            handleClose();
        };

        return (
            <Modal show={this.state.showDeleteModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Action Requested</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to <b><u>delete</u></b> <b>{this.state.word}</b> domain name, the
                <b> associated alerts</b>, and <b>twisted dns</b>?</Modal.Body>
                <Modal.Footer>
                    <form onSubmit={onSubmit}>
                        <Button variant="secondary" className="mr-2" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="danger">
                            Yes, I'm sure
                        </Button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    };

    displayEditModal = (id, word) => {
        this.setState({
            showEditModal: true,
            id: id,
            word: word,
        });
    };

    editModal = () => {
        let handleClose;
        handleClose = () => {
            this.setState({
                showEditModal: false
            });
        };

        let onSubmit;
        onSubmit = e => {
            e.preventDefault();
            const domain_name = this.inputRef.current.value;
            const dns_monitored = {domain_name}; // Object { domain_name: "..." }
            this.props.patchDnsMonitored(this.state.id, dns_monitored);
            this.setState({
                word: "",
                id: 0
            });
            handleClose();
        };

        let handleOnChange;
        handleOnChange = e => {
            e.preventDefault();
        };

        return (
            <Modal show={this.state.showEditModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Action Requested</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid">
                            <Col md={{span: 12}}>
                                <Form onSubmit={onSubmit}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="5">Domain name</Form.Label>
                                        <Col sm="7">
                                            <Form.Control required ref={this.inputRef} size="md"
                                                          type="text"
                                                          pattern="^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(?:\.[a-zA-Z]{2,})*$"
                                                          placeholder="example.com"
                                                          defaultValue={this.state.word}
                                                          onChange={handleOnChange}/>
                                        </Col>
                                    </Form.Group>
                                    <Col md={{span: 6, offset: 7}}>
                                        <Button variant="secondary" className="mr-2" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" variant="warning">
                                            Update
                                        </Button>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    };

    displayAddModal = () => {
        this.setState({
            showAddModal: true
        });
    };

    addModal = () => {
        let handleClose;
        handleClose = () => {
            this.setState({
                showAddModal: false
            });
        };

        let onSubmit;
        onSubmit = e => {
            e.preventDefault();
            const domain_name = this.inputRef.current.value;
            const dns_monitored = {domain_name};
            this.props.addDnsMonitored(dns_monitored);
            handleClose();
        };

        return (
            <Modal show={this.state.showAddModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Action Requested</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid">
                            <Col md={{span: 12}}>
                                <Form onSubmit={onSubmit}>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Domain name</Form.Label>
                                        <Col sm="7">
                                            <Form.Control required ref={this.inputRef} size="md"
                                                          type="text"
                                                          pattern="^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(?:\.[a-zA-Z]{2,})*$"
                                                          placeholder="example.com"/>
                                        </Col>
                                    </Form.Group>
                                    <Col md={{span: 5, offset: 8}}>
                                        <Button variant="secondary" className="mr-2" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" variant="success">
                                            Add
                                        </Button>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    };

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="float-left">
                            <h4>Corporate DNS Assets Monitored</h4>
                            <h6 className="text-muted">Dnstwist Algorithm</h6>
                        </div>
                        <div className="float-right mr-1 mb-2">
                            <button className="btn btn-success" onClick={() => {
                                this.displayAddModal()
                            }}>
                                <i className="material-icons mr-1 align-middle"
                                   style={{fontSize: 23}}>&#xE147;</i>
                                <span className="align-middle">Add New DNS</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div style={{height: '500px', overflow: 'auto'}}>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>Domain Name</th>
                                    <th>Created At</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.dnsMonitored.map(dns_monitored => (
                                    <tr key={dns_monitored.id}>
                                        <td><h5>{dns_monitored.domain_name}</h5></td>
                                        <td>{(new Date(dns_monitored.created_at)).toDateString()}</td>
                                        <td className="text-right" style={{whiteSpace: 'nowrap'}}>
                                            <button className="btn btn-outline-warning btn-sm mr-2"
                                                    data-toggle="tooltip"
                                                    data-placement="top" title="Edit" onClick={() => {
                                                this.displayEditModal(dns_monitored.id, dns_monitored.domain_name)
                                            }}>
                                                <i className="material-icons"
                                                   style={{fontSize: 17, lineHeight: 1.8, margin: -2.5}}>edit</i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" data-toggle="tooltip"
                                                    data-placement="top" title="Delete" onClick={() => {
                                                this.displayDeleteModal(dns_monitored.id, dns_monitored.domain_name)
                                            }}>
                                                <i className="material-icons"
                                                   style={{fontSize: 17, lineHeight: 1.8, margin: -2.5}}>delete</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {this.deleteModal()}
                {this.editModal()}
                {this.addModal()}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    dnsMonitored: state.DnsFinder.dnsMonitored,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getDnsMonitored,
    deleteDnsMonitored,
    addDnsMonitored,
    patchDnsMonitored
})(DnsMonitored);