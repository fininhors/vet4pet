// import AppointmentForm from './appointment_form.jsx';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.delAppointment =  this.delAppointment.bind(this);
    this.state = {
      appos: [],
      isHovering: false,
    };
    console.log('I am in constructor');
    // this.delAppointment = () => this.delAppointment(); // bind with class
    this.getApposFromRails = this.getApposFromRails.bind(this);
    this.getApposFromRails();
  }

  /*
   *  Get data to get the autofill field
   */
  getApposFromRails() {
    var link = {url: '/appointments/get_appos/'};
    console.log('DATA>>> link' + link);
    $.ajax({
      type: 'GET',
      url: link['url'],
      data: link,
      dataType: 'json',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        //I do this so the new added link will be on top of the array
        console.log('DATA getApposFromRails >>>>>>' + JSON.stringify(data));
        this.setState({appos: data});
      }.bind(this)
    });
  }

  /*
   *  Send data to get the autofill field
   */
  sendDataToRails(url) {
    return;
    link = {url: '/appointments/get_data'};
    $.ajax({
      type: 'GET',
      url: '/appointments/get_data/',
      data: link,
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        var data = this.state.data;
        //I do this so the new added link will be on top of the array
        var newLinks = [data].concat(links);
        // this.setState({data: newLinks});
        this.setState({owners: newLinks});
      }.bind(this)
    });
  }

  /*
   *  Add appointment
   *  Private
   */
  _addAppointment(record) {
    var records;
    records = React.addons.update(this.state.records, {
      $push: [record]
    });
    return this.setState({
      records: records
    });
  }

  /*
   *  Delete appointment
   *  Private
   */
  delAppointment(id) {
     return true;
  }

  render() {
    var todos = [];
    console.log("59 appo_array_prop >>>" + JSON.stringify(this.props.appo_array_prop));
    var trNodes = this.state.appos.map(function (appointment) {
      var row = <tr key={appointment.id}>
        <td><button onClick={this.delAppointment(appointment.id)}>Edit</button></td>
        <td>{appointment.date}</td>
        <td>{appointment.petname}</td>
        <td>{appointment.owner}</td>
        <td>{appointment.reason}</td>
        <td>{appointment.docname}</td>
        <td><button>Delete</button></td>
        </tr>;
        todos.push(row);
    });
    // console.log(todos);
    var appoNodes = <table className="myTable" key="myta"><thead><tr key="myt1">
      <td key="myt1.1"> Scheduled date </td>
      <td>Pet</td>
      <td>Owner</td>
      <td>Reason</td>
      <td>Doctor</td>
      <td>Delete</td>
      <td>Edit</td></tr>
      </thead>
      <tbody>
        { todos }
      </tbody>
      </table>
    ;
    //var form = React.createElement(AppointmentForm, {handleNewAppointment: this._addAppointment } );
    return (
      <div className="appoList" key="dfdsf">
         <div className="appoDivForm"></div><br />
        {appoNodes}
      </div>
    );
  }
}

Appointments.propTypes = {
    aStringProp:       React.PropTypes.string.isRequired,
    ownerStringProp:   React.PropTypes.string,
    petnameStringProp: React.PropTypes.string,
    docnameStringProp: React.PropTypes.string,
    reasonStringProp:  React.PropTypes.string,
    dateStringProp:    React.PropTypes.string,
    appo_array_prop:   React.PropTypes.array
};

Appointments.defaultProps = {
    aStringProp:       '',
    ownerStringProp:   '',
    petnameStringProp: '',
    docnameStringProp: '',
    dateDateProp:      '',
    reasonStringProp:  '',
    appo_array_prop:   []
 };

 export default Appointments;
