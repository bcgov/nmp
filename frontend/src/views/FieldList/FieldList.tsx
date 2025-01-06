/**
 * @summary The Field List page for the application
 */
import { useState } from 'react';
import { CardHeader, Banner } from './fieldList.styles';
import { Card, InputField, Dropdown } from '../../components/common';
import { TabOptions, TabContentDisplay } from '../../components/common/Tabs/Tabs';
import Modal from '../../components/common/Modal/Modal';

export default function FieldList() {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fields, setFields] = useState<
    { fieldName: string; area: string; manure: string; comment: string }[]
  >([]);
  const [formData, setFormData] = useState({
    fieldName: '',
    area: '',
    manure: '',
    comment: '',
  });

  const manureOptions = [
    { value: 1, label: 'Manure 1' },
    { value: 2, label: 'Manure 2' },
  ];

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setFields([...fields, formData]);
    setFormData({
      fieldName: '',
      area: '',
      manure: '',
      comment: '',
    });
    setIsModalVisible(false);
  };

  const tabs = [
    {
      id: 'field-list',
      label: 'Field List',
      content: (
        <div>
          {fields.map((field) => (
            <div key={field.fieldName}>
              <h3>{field.fieldName}</h3>
              <p>Area: {field.area}</p>
              <p>Manure: {field.manure}</p>
              <p>Comment: {field.comment}</p>
            </div>
          ))}
        </div>
      ),
    },
    { id: 'tab-2', label: 'Tab 2', content: <div>Tab 2 Content</div> },
    { id: 'tab-3', label: 'Tab 3', content: <div>Tab 3 Content</div> },
  ];

  return (
    <>
      <Card
        height="500px"
        width="700px"
      >
        <CardHeader>
          <Banner>
            <TabOptions
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Banner>
        </CardHeader>
        <TabContentDisplay
          tabs={tabs}
          activeTab={activeTab}
        />
        <button
          type="button"
          onClick={() => setIsModalVisible(true)}
        >
          Add Field
        </button>
      </Card>
      <Modal
        isVisible={isModalVisible}
        title="Add Field"
        onClose={() => setIsModalVisible(false)}
        footer={
          <button
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        }
      >
        <InputField
          label="Field Name"
          type="text"
          name="fieldName"
          value={formData.fieldName}
          onChange={handleChange}
        />
        <InputField
          label="Area"
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
        <Dropdown
          label="Manure"
          name="manure"
          value={formData.manure}
          options={manureOptions}
          onChange={handleChange}
        />
        <InputField
          label="Comment"
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
}
