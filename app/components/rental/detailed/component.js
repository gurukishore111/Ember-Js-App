import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RentalDetailedComponent extends Component {
  @tracked firstName = '';
  @tracked lastName = '';
  @tracked email = '';
  @tracked apartmentName = '';
  @tracked mobileNo = '';

  @action
  update(attr, event) {
    console.log(attr, event);
    this[attr] = event.target.value;
    console.log(this.disabledBtn);
  }

  get disabledBtn() {
    const btnStatus =
      this.firstName.length == 0 ||
      this.lastName.length == 0 ||
      this.mobileNo.length == 0 ||
      this.email.length == 0;
    return btnStatus;
  }

  checkError = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error('Error,Try again later');
    }
  };

  @action
  async onsubmit(apartmentname, model, event) {
    event.preventDefault();

    this.apartmentName = apartmentname;
    let data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      apartmentName: this.apartmentName,
      mobileNo: this.mobileNo,
    };
    await fetch('http://localhost:9000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(this.checkError)
      .then((data) => {
        console.log('SuccessFully 🎯');
        alert('Successfully Registered!');
        window.location.replace(`/rentals/${model}`);
      })
      .catch((e) => {
        console.log(e);
        alert('Try again later!');
      });
  }
}
