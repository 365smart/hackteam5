import SelectModel from './SelectModel';

export default class LocationFormModel {
  constructor(obj = {}) {
    this.name = obj.name || "";
    this.address = obj.address || "";
    this.zip = obj.zip || "";
    this.city = obj.city || "";
    this.state = obj.state || "";
    this.country = new SelectModel(obj.country, obj.countrylist);
    // this.timezone = obj.timezone || "";
    // this.phone = obj.phone || "";
    // this.contact = obj.contact || "";
    // this.contactemail = obj.contactemail || "";
    // this.contactphone = obj.contactphone || "";
  }

  set(key, val) {
    if (!this[key]) return;
    switch (this[key].constructor) {
      case SelectModel:
        this[key].value = val;
        break;
      case String:
        this[key] = val;
        break;
    }
  }
}



/**

<LabeledInput label="Name">
   <TextInput
    name="name"
    value={data.name}
    onChange={this.onChange} />
</LabeledInput>
<LabeledInput label="Address">
   <TextInput
    name="address"
    value={data.address}
    onChange={this.onChange} />
</LabeledInput>
<LabeledInput label="Zip/Postal Code">
   <TextInput
    value=""
    onChange={() => {}} />
</LabeledInput>
<LabeledInput label="City">
   <TextInput
    value=""
    onChange={() => {}} />
</LabeledInput>
<LabeledInput label="State/Provice">
   <Select
    options={[
      {title: 'California', value: 'CA'},
      {title: 'Oregon', value: 'OR'}
    ]}
    value=""
    onChange={() => {}} />
</LabeledInput>
<LabeledInput label="Country">
   <Select
    options={[
      {title: 'United States', value: 'usa'},
      {title: 'Canada', value: 'can'}
    ]}
    value=""
    onChange={() => {}} />
</LabeledInput>
*/
